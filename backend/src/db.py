import pymongo
from consts import HOST

def get_db():
    return pymongo.MongoClient(HOST, 27017)["people-manager"]


def get_people_collection():
    return get_db().people


def get_people_settings_collection():
    return get_db()["people-settings"]
