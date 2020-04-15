from datetime import timedelta

DEBUG = False
MONGO_HOST = "mongo"

try:
    from .dev_settings import DEBUG, MONGO_HOST
except ModuleNotFoundError:
    pass

DEFAULT_PEOPLE_SETTINGS = {
    "settings": {
        "possibleTracks": ["נאון", "ארגון"],
        "possiblePreferences": ["להישאר לישון", "לבדוק תרגילים"],
        "possibleSubjects": ["TPY", "C"],
        "possibleAppointmentReasons": ["מרצה", "בודק תרגילים"]
    }
}

DAY = timedelta(days=1).seconds

DATASET_SIZE = 100
