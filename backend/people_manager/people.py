from .db import get_people_collection, get_people_settings_collection
from .exceptions import PersonExists
from .utils import format_document_id
from bson import ObjectId

def get_all_people():
    people = get_people_collection()
    return list(map(format_document_id, people.find({})))

def get_person_by_id(person_id: str):
    return format_document_id(get_people_collection().find_one({"_id": ObjectId(person_id)}))

def update_person(person_id: str, new_values: dict):
    people = get_people_collection()
    result = people.update_one({"_id": ObjectId(person_id)}, {"$set": new_values})
    return result.acknowledged and result.matched_count == 1


def delete_person(person_id: str):
    people = get_people_collection()
    result = people.delete_one({"_id": ObjectId(person_id)})
    return result.acknowledged and result.deleted_count == 1


def create_person(person: dict):
    people = get_people_collection()
    if people.find_one({"personalId": person["personalId"]}):
        raise PersonExists()

    result = people.insert_one(person)
    if result.acknowledged and result.inserted_id:
        return str(result.inserted_id)
    else:
        return None