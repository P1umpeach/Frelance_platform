from os import environ

import databases

DB_USER = environ.get("DB_USER", "postgres")
DB_PASSWORD = environ.get("DB_PASSWORD", "p12056so21")
DB_HOST = environ.get("DB_HOST", "localhost")

TESTING = environ.get("TESTING")

if TESTING:
    # Use separate DB for tests
    DB_NAME = "postgres"
    TEST_SQLALCHEMY_DATABASE_URL = (
        f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:5432/{DB_NAME}"
    )
    database = databases.Database(TEST_SQLALCHEMY_DATABASE_URL)
else:
    DB_NAME = "postgres"
    SQLALCHEMY_DATABASE_URL = (
        f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:5432/{DB_NAME}"
    )
    database = databases.Database(SQLALCHEMY_DATABASE_URL)