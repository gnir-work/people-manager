from db import (
    get_people_settings_collection,
    get_people_collection,
    get_appointments_collection,
)
from consts import DEFAULT_PEOPLE_SETTINGS

PEOPLE = [
    {
        "_id": "12345678",
        "fullName": "ניר",
        "personalId": "12345678",
        "phone": "123456789",
        "status": "חייל",
        "team": "דשדג",
        "remarks": "שלום",
        "preferences": ["להישאר לישון", "לבדוק תרגילים"],
        "tracks": [],
        "subjects": [],
        "availability": "לא זמין",
        "wasSegel": False,
    }
]

APPOINTMENTS = [
    {
        "_id": "12345678-1585249896000-1585349996000",
        "person": PEOPLE[0]["_id"],
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
    }
]


def create_default_people_settings():
    people_settings = get_people_settings_collection()
    people = get_people_collection()
    people_settings.insert_one(DEFAULT_PEOPLE_SETTINGS)


def create_default_people():
    people = get_people_collection()
    for person in PEOPLE:
        people.insert_one(person)


def create_default_appointments():
    appointments = get_appointments_collection()
    for appointment in APPOINTMENTS:
        appointments.insert_one(appointment)


if __name__ == "__main__":
    print("Creating people default settings...")
    create_default_people_settings()
    create_default_people()
    create_default_appointments()
    print("Finshed Creating people default settings")
