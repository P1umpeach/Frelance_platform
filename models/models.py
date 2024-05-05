from datetime import datetime

from sqlalchemy import MetaData, Table, Column, Integer, String, TIMESTAMP, ForeignKey

metadata = MetaData()

users = Table(
    "user",
    metadata,
    Column("user_id", Integer, primary_key=True),
    Column("email", String, nullable=False),
    Column("username", String, nullable=False),
    Column("hashed_password", String, nullable=False),
    Column("role", String, nullable=False),
    Column("registered_at", TIMESTAMP, default=datetime.utcnow),
)