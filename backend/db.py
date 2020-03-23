import pymongo


def get_db():
    return pymongo.MongoClient("localhost", 27017)["people-manager"]


def get_people_collection():
    return get_db().people


def get_people_settings_collection():
    return get_db()["people-settings"]
