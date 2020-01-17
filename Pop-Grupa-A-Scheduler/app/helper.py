import requests
import os
from flask.sessions import SecureCookieSessionInterface
from itsdangerous import URLSafeTimedSerializer

BACKEND = os.environ.get('BACKEND_URL')
ALL_MACHINES = "/machines/all"
MACHINE_TASK_INFO = "/get-machine-task-info"
MACHINE_DATA = "/machine-data"
SECRET_KEY = os.getenv('SECRET_KEY')
ROLE = 'SCHEDULER'

def fetchMachines():
    try:
        data = requests.get(BACKEND + ALL_MACHINES, cookies=generateCookiesToAuthorize()).json()
    except ValueError:
        data = []
    return data

def machineHealthCheck(address):
    try:
        req = requests.get("http://{}:5500".format(address) + MACHINE_DATA, cookies=generateCookiesToAuthorize())
    except requests.ConnectionError:
        return False    
    return req.status_code == 200


def generateCookiesToAuthorize():
    return dict(session=encodeFlaskCookie(SECRET_KEY, dict(role=ROLE)))


class SimpleSecureCookieSessionInterface(SecureCookieSessionInterface):
    def get_signing_serializer(self, secret_key):
        if not secret_key:
            return None
        signer_kwargs = dict(
            key_derivation=self.key_derivation,
            digest_method=self.digest_method
        )
        return URLSafeTimedSerializer(secret_key, salt=self.salt,
                                        serializer=self.serializer,
                                        signer_kwargs=signer_kwargs)


def encodeFlaskCookie(secret_key, cookieDict):
    sscsi = SimpleSecureCookieSessionInterface()
    signingSerializer = sscsi.get_signing_serializer(secret_key)
    return signingSerializer.dumps(cookieDict)
