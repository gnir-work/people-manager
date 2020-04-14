from .db import get_appointments_collection, get_people_collection
from .people import get_all_people
from .utils import format_document_id
from .exceptions import AppointmentExists
from bson import ObjectId
from pymongo.errors import DuplicateKeyError

def get_id_to_person_mapping():
    people = get_people_collection().find({})
    return {
        str(person["_id"]): format_document_id(person) for person in people
    }


def get_all_appointments():
    appointments_collection = get_appointments_collection()
    appointments = list(appointments_collection.find({}))
    id_to_person = get_id_to_person_mapping()
    for appointment in appointments:
        appointment["person"] = id_to_person[appointment["person"]]
        appointment = format_document_id(appointment)
    return appointments


def update_appointment(appointment_id: str, new_values: dict):
    appointments = get_appointments_collection()
    try:
        result = appointments.update_one(
            {"_id": ObjectId(appointment_id)}, {"$set": new_values}
        )
        return result.acknowledged and result.matched_count == 1
    except DuplicateKeyError:
        raise AppointmentExists


def delete_appointment(appointment_id: str):
    appointments = get_appointments_collection()
    result = appointments.delete_one({"_id": ObjectId(appointment_id)})
    return result.acknowledged and result.deleted_count == 1


def create_appointment(appointment: dict):
    appointments = get_appointments_collection()
    try:
        result = appointments.insert_one(appointment)
        if result.acknowledged and result.inserted_id:
            return str(result.inserted_id)
        else:
            return None
    except DuplicateKeyError:
        raise AppointmentExists
