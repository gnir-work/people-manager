from datetime import timedelta

DEBUG = False
MONGO_HOST = "mongo"

try:
    from .dev_settings import DEBUG, MONGO_HOST
except ModuleNotFoundError:
    pass

DEFAULT_PEOPLE_SETTINGS = {
    "settings": {
        "possibleStatuses": ["אזרח", "חייל"],
        "possibleTracks": ["נאון", "ארגון"],
        "possiblePreferences": ["להישאר לישון", "לבדוק תרגילים"],
        "possibleSubjects": ["TPY", "C"],
        "possibleAvailabilities": ["לא זמין", "זמין"],
        "possibleAppointmentReasons": ["מרצה", "בודק תרגילים"],
        "possibleEntryStates": ["אין", "מחכה לאישור", "יש"],
        "possibleBedStatus": ["אין צורך", "טרם", "יש"],
        "possiblePhases": ["אחוד", "מכינה"],
    }
}

DAY = timedelta(days=1).seconds

DATASET_SIZE = 1000
