from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo

DEBUG = True

app = Flask(__name__)

if DEBUG:
    CORS(app)

def get_db():
    return pymongo.MongoClient("localhost", 27017)["people-manager"]


@app.route("/api/people/person/")
def get_all_people():
    db = get_db()
    return jsonify(list(db.people.find({}, {"_id": False})))


@app.route("/api/people/person/<person_id>", methods=["PUT"])
def update_person_field(person_id: str):
    db = get_db()
    data = request.get_json()
    result = db.people.update_one({"_id": person_id}, {"$set": data})
    if result.acknowledged and result.matched_count > 0:
        return jsonify({"status": "ok"})
    else:
        return jsonify({"status": "failed"}), 404


@app.route("/api/people/person/<person_id>", methods=["DELETE"])
def delete_person(person_id: str):
    db = get_db()
    result = db.people.delete_one({"_id": person_id})
    if result.acknowledged and result.deleted_count == 1:
        return jsonify({"status": "ok"})
    else:
        return jsonify({"status": "failed"}), 404


@app.route("/api/people/person", methods=["POST"])
def create_person():
    db = get_db()
    person = request.get_json()
    person["_id"] = person["id"]
    del person["id"]
    try:
        result = db.people.insert_one(person)
        if result.acknowledged and result.inserted_id == person["_id"]:
            return jsonify({"status": "ok"})
        else:
            return jsonify({"status": "failed"}), 500
    except pymongo.errors.DuplicateKeyError:
        return jsonify(
            {"status": f"person with {person['_id']} ID Already exists"}
        ), 409


@app.route("/api/people/settings/")
def get_people_settings():
    db = get_db()
    return jsonify(db["people-settings"].find_one({}, {"_id": False}))


if __name__ == "__main__":
    app.run("localhost", 8000, debug=DEBUG)
