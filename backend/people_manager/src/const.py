DEBUG = True

if DEBUG:
    HOST = "localhost"
else:
    HOST = "mongo"

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
        "possiblePhases": ["אחוד", "מכינה"]
    }
}
