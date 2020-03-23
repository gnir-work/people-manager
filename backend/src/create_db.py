from db import get_people_settings_collection, get_people_collection
from consts import DEFAULT_PEOPLE_SETTINGS

def create_default_people_settings():
    people_settings = get_people_settings_collection()
    people = get_people_collection()
    people_settings.insert_one(DEFAULT_PEOPLE_SETTINGS)

if __name__ == "__main__":
    print("Creating people default settings...")
    create_default_people_settings()
    print("Finshed Creating people default settings")
