from flask import Flask, jsonify, request
from flask_cors import CORS
from people import get_all_people, update_person, delete_person, create_person
from people_settings import get_all_settings

DEBUG = True

app = Flask(__name__)

if DEBUG:
    CORS(app)


@app.route("/api/people/person/")
def get_all_people_route():
    return jsonify(get_all_people())


@app.route("/api/people/person/<person_id>", methods=["PUT"])
def update_person_route(person_id: str):
    data = request.get_json()
    if update_person(person_id, data):
        return _get_ok_response()
    else:
        return _get_failed_response(404)


@app.route("/api/people/person/<person_id>", methods=["DELETE"])
def delete_person_route(person_id: str):
    if delete_person(person_id):
        return _get_ok_response()
    else:
        return _get_failed_response(404)


@app.route("/api/people/person", methods=["POST"])
def create_person_route():
    person = request.get_json()
    try:
        if create_person(person):
            return _get_ok_response()
        else:
            return _get_failed_response(500)
    except pymongo.errors.DuplicateKeyError:
        return (
            jsonify({"status": f"person with {person['_id']} ID Already exists"}),
            409,
        )


@app.route("/api/people/settings/")
def get_people_settings():
    return jsonify(get_all_settings())


def _get_ok_response():
    return jsonify({"status": "ok"})


def _get_failed_response(status_code: int):
    return jsonify({"status": "failed"}), status_code


if __name__ == "__main__":
    app.run("localhost", 8000, debug=DEBUG)
