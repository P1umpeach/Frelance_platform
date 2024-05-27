from datetime import datetime
from sqlalchemy import MetaData, Table, Column, String, Integer, ForeignKey, DateTime

from models.users import users_table

metadata = MetaData()

tasks_table = Table(
    "task",
    metadata,
    Column("id", Integer, primary_key=True),
    Column('sphere', String, nullable=False),
    Column("name", String, nullable=False),
    Column("description", String, nullable=False),
    Column("img", String, nullable=False),
    Column("user_id", Integer, ForeignKey(users_table.c.id)),
    Column("project_id", Integer, nullable=False),
    Column("term", DateTime(), nullable=False),
    Column("salary", Integer, nullable=False),
)


