from flask import Flask, jsonify, request
import pymongo
from pymongo.errors import PyMongoError
from flask_login import (
    LoginManager,
    login_user,
    logout_user,
    login_required,
    current_user,
)

from .user import User
from .people import get_all_people, update_person, delete_person, create_person
from .appointments import (
    get_all_appointments,
    delete_appointment,
    update_appointment,
    create_appointment,
)
from .site_settings import get_all_settings, update_site_settings
from .const import DEBUG
from .exceptions import PersonExists, AppointmentExists

login_manager = LoginManager()


app = Flask(__name__)

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


login_manager.init_app(app)


if DEBUG:
    # We need only in dev mode so there is no reason to install it in production.
    # Therefor the local import.
    from flask_cors import CORS

    CORS(app)


@login_manager.user_loader
def load_user(user_id):
    return User(user_id, is_authenticated=True)


@app.route("/api/user/login", methods=["POST"])
def login():
    credentials = request.get_json()
    user = User(credentials["username"])
    user.authenticate(credentials["password"])

    if user.is_authenticated:
        login_user(user, remember=True)
        return jsonify({"username": user.username})
    else:
        return _get_failed_response(401)

@app.route("/api/user/logout", methods=["POST"])
def logout():
    try:
        logout_user()
        return _get_ok_response()
    except Exception:
        return _get_failed_response()


@app.route("/api/user")
def get_current_user():
    if current_user.is_authenticated:
        username = current_user.username
    else:
        username = None
    return jsonify({"currentUser": username})


@app.route("/api/people/person/")
def get_all_people_route():
    return jsonify(get_all_people())


@app.route("/api/people/person/<person_id>", methods=["PUT"])
def update_person_route(person_id: str):
    data = request.get_json()
    try:
        if update_person(person_id, data):
            return _get_ok_response()
        else:
            return _get_failed_response(404)
    except PersonExists:
        return (
            jsonify({"status": "Person already exists"}),
            409,
        )


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


@app.route("/api/site/settings")
def get_site_settings():
    return jsonify(get_all_settings())


@app.route("/api/site/settings", methods=["PUT"])
def update_site_settings_route():
    new_settings = request.get_json()
    try:
        update_site_settings(new_settings)
        return _get_ok_response()
    except PyMongoError:
        return _get_failed_response(500)


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
    try:
        if update_appointment(appointment_id, data):
            return _get_ok_response()
        else:
            return _get_failed_response(404)
    except AppointmentExists:
        return (
            jsonify({"status": f"Appointment already exists"}),
            409,
        )


@app.route("/api/appointments/appointment", methods=["POST"])
def create_appointment_route():
    appointment = request.get_json()
    try:
        appointment_id = create_appointment(appointment)
        if id:
            return jsonify({"id": appointment_id})
        else:
            return _get_failed_response(500)
    except AppointmentExists:
        return (
            jsonify({"status": f"Appointment already exists"}),
            409,
        )


def _get_ok_response():
    return jsonify({"status": "ok"})


def _get_failed_response(status_code: int):
    return jsonify({"status": "failed"}), status_code


if __name__ == "__main__":
    app.run("localhost", 8000, debug=DEBUG)
