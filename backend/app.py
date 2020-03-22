from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)


def get_db():
    return MongoClient("localhost", 27017)["people-manager"]


@app.route("/api/people/person/")
def get_all_people():
    db = get_db()
    return jsonify(list(db.people.find({}, {"_id": False})))

@app.route("/api/people/settings/")
def get_people_settings():
    db = get_db()
    return jsonify(db["people-settings"].find_one({}, {"_id": False}))

if __name__ == "__main__":
    app.run("localhost", 8000, debug=True)