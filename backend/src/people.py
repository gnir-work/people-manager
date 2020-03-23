from db import get_people_collection, get_people_settings_collection


def get_all_people():
    people = get_people_collection()
    return list(people.find({}, {"_id": False}))


def update_person(person_id: str, new_values: dict):
    people = get_people_collection()
    result = people.update_one({"_id": person_id}, {"$set": new_values})
    return result.acknowledged and result.matched_count == 1


def delete_person(person_id: str):
    people = get_people_collection()
    result = people.delete_one({"_id": person_id})
    return result.acknowledged and result.deleted_count == 1


def create_person(person: dict):
    people = get_people_collection()
    person["_id"] = person["id"]
    del person["id"]
    result = people.insert_one(person)
    return result.acknowledged and result.inserted_id == person["_id"]
