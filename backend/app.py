from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)


def get_db():
    return MongoClient("localhost", 27017)["people-manager"]


@app.route("/api/people/person/")
def get_all_people():
    db = get_db()
    return jsonify(list(db.people.find({}, {"_id": False})))


@app.route("/api/people/person/<person_id>", methods=["PUT"])
def update_person_field(person_id: str):
    db = get_db()
    data = request.get_json()
    result = db.people.update_one({"personalId": person_id}, {"$set": data})
    if result.acknowledged and result.matched_count > 0:
        return jsonify({"status": "ok"})
    else:
        return jsonify({"status": "failed"}), 404


@app.route("/api/people/settings/")
def get_people_settings():
    db = get_db()
    return jsonify(db["people-settings"].find_one({}, {"_id": False}))


if __name__ == "__main__":
    app.run("localhost", 8000, debug=True)
