from .db import get_site_settings_collection
from bson.objectid import ObjectId

def get_all_settings():
    site_settings = get_site_settings_collection()
    return site_settings.find_one({}, {"_id": False})

def update_site_settings(new_settings: dict):
    site_settings = get_site_settings_collection()
    current_settings_id = site_settings.find_one({})["_id"]
    site_settings.update_one({"_id": ObjectId(current_settings_id)}, {"$set": {"settings": new_settings}})