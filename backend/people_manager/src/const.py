from datetime import timedelta

DEBUG = False
MONGO_HOST = "mongo"

try:
    from .dev_settings import DEBUG, MONGO_HOST
except ModuleNotFoundError:
    pass

DAY = timedelta(days=1).seconds

DATASET_SIZE = 100
