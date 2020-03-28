from flask import Flask, jsonify, request
from .people import get_all_people, update_person, delete_person, create_person
from .appointments import get_all_appointments, delete_appointment, update_appointment
from .people_settings import get_all_settings
from .const import DEBUG
from .exceptions import PersonExists
import pymongo

app = Flask(__name__)

if DEBUG:
    # We need only in dev mode so there is no reason to install it in production.
    # Therefor the local import.
    from flask_cors import CORS

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
        person_id = create_person(person)
        if id:
            return jsonify({"id": person_id})
        else:
            return _get_failed_response(500)
    except PersonExists:
        return (
            jsonify(
                {"status": f"person with {person['personalId']} ID Already exists"}
            ),
            409,
        )


@app.route("/api/people/settings/")
def get_people_settings():
    return jsonify(get_all_settings())


@app.route("/api/appointments/appointment")
def get_all_appointments_route():
    return jsonify(get_all_appointments())


@app.route("/api/appointments/appointment/<appointment_id>", methods=["DELETE"])
def delete_appointment_route(appointment_id: str):
    if delete_appointment(appointment_id):
        return _get_ok_response()
    else:
        return _get_failed_response(404)


@app.route("/api/appointments/appointment/<appointment_id>", methods=["PUT"])
def update_appointment_route(appointment_id: str):
    data = request.get_json()
    if update_appointment(appointment_id, data):
        return _get_ok_response()
    else:
        return _get_failed_response(404)


def _get_ok_response():
    return jsonify({"status": "ok"})


def _get_failed_response(status_code: int):
    return jsonify({"status": "failed"}), status_code


if __name__ == "__main__":
    app.run("localhost", 8000, debug=DEBUG)
