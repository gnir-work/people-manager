import pymongo
from .db import (
    get_site_settings_collection,
    get_people_collection,
    get_appointments_collection,
)
from .const import DATASET_SIZE, DAY
from random import randrange
from datetime import timedelta

DEFAULT_PEOPLE_SETTINGS = {
    "settings": {
        "possibleTracks": ["נאון", "ארגון"],
        "possiblePreferences": ["להישאר לישון", "לבדוק תרגילים"],
        "possibleSubjects": ["TPY", "C"],
        "possibleAppointmentReasons": ["מרצה", "בודק תרגילים"],
        "possibleCourses": ["bisZ"],
        "currentCourse": "bisZ"
    }
}

PEOPLE = [
    {
        "fullName": "ניר",
        "personalId": str(randrange(10000000, 99999999)),
        "phone": "123456789",
        "status": "סדיר",
        "team": "דשדג",
        "remarks": "שלום",
        "preferences": ["להישאר לישון", "לבדוק תרגילים"],
        "tracks": [],
        "subjects": [],
        "availability": "לא זמין",
        "wasSegel": False,
    }
    for _ in range(DATASET_SIZE)
]

APPOINTMENTS = [
    {
        "phase": "אחוד",
        "week": 1,
        "from": 1585249896000,
        "to": 1585349996000,
        "bedStatus": "לא צריך",
        "entryStatus": "יש",
        "invitor": "gnir",
        "makishur": False,
        "makishurInvitor": "gnir",
        "track": "pasten",
        "reason": "reasons",
        "remarks": "remarkss",
        "course": "bisZ"
    }
    for _ in range(DATASET_SIZE)
]


def create_default_site_settings():
    site_settings = get_site_settings_collection()
    people = get_people_collection()
    site_settings.insert_one(DEFAULT_PEOPLE_SETTINGS)


def create_default_people():
    people = get_people_collection()
    for person in PEOPLE:
        people.insert_one(person)

    people.create_index("personalId", unique=True)


def create_default_appointments():
    appointments = get_appointments_collection()
    people_collection = get_people_collection()
    people = list(people_collection.find({}))
    for index, appointment in enumerate(APPOINTMENTS):
        appointment["person"] = str(people[index]["_id"])
        appointments.insert_one(appointment)

    appointments.create_index(
        [
            ("person", pymongo.DESCENDING),
            ("from", pymongo.DESCENDING),
            ("to", pymongo.DESCENDING),
        ],
        unique=True,
    )


if __name__ == "__main__":
    print("Creating people default settings...")
    create_default_site_settings()
    create_default_people()
    create_default_appointments()
    print("Finshed Creating people default settings")
