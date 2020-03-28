from .db import get_appointments_collection, get_people_collection
from .people import get_person_by_id
from .utils import format_document_id

def get_all_appointments():
    appointments_collection = get_appointments_collection()
    appointments = list(appointments_collection.find({}))
    for appointment in appointments:
        appointment["person"] = get_person_by_id(appointment["person"])
        appointment = format_document_id(appointment)
    return appointments


def update_person(person_id: str, new_values: dict):
    appointments = get_appointments_collection()
    result = appointments.update_one({"_id": person_id}, {"$set": new_values})
    return result.acknowledged and result.matched_count == 1


def delete_person(person_id: str):
    appointments = get_appointments_collection()
    result = appointments.delete_one({"_id": person_id})
    return result.acknowledged and result.deleted_count == 1


def create_person(person: dict):
    appointments = get_appointments_collection()
    person["_id"] = person["id"]
    del person["id"]
    result = appointments.insert_one(person)
    return result.acknowledged and result.inserted_id == person["_id"]
