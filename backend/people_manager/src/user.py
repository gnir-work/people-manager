from flask_login import UserMixin


class User(UserMixin):
    def __init__(self, username, is_authenticated=False):
        self.username = username
        self._is_authenticated = is_authenticated

    @property
    def is_authenticated(self):
        return self._is_authenticated

    def get_id(self):
        return self.username

    def authenticate(self, password):
        self._is_authenticated = True  # TODO use ldap here
