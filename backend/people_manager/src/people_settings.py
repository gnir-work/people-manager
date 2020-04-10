from .db import get_people_settings_collection

def get_all_settings():
    people_settings = get_people_settings_collection()
    return people_settings.find_one({}, {"_id": False})