DEBUG = False

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
    }
}
