import pymongo
from .const import HOST

def get_db():
    return pymongo.MongoClient(HOST, 27017)["people-manager"]


def get_people_collection():
    return get_db().people


def get_appointments_collection():
    return get_db().appointments

def get_people_settings_collection():
    return get_db()["people-settings"]
