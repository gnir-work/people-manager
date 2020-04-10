from .db import get_appointments_collection, get_people_collection
from .people import get_person_by_id
from .utils import format_document_id
from bson import ObjectId

def get_all_appointments():
    appointments_collection = get_appointments_collection()
    appointments = list(appointments_collection.find({}))
    for appointment in appointments:
        appointment["person"] = get_person_by_id(appointment["person"])
        appointment = format_document_id(appointment)
    return appointments


def update_appointment(appointment_id: str, new_values: dict):
    appointments = get_appointments_collection()
    result = appointments.update_one({"_id": ObjectId(appointment_id)}, {"$set": new_values})
    return result.acknowledged and result.matched_count == 1


def delete_appointment(appointment_id: str):
    appointments = get_appointments_collection()
    result = appointments.delete_one({"_id": ObjectId(appointment_id)})
    return result.acknowledged and result.deleted_count == 1


def create_appointment(appointment: dict):
    pass
