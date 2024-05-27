from datetime import datetime
from typing import Optional

from pydantic import UUID4, BaseModel, EmailStr, validator, Field


class TokenBase(BaseModel):
    access_token: str
    token_type: str


class UserBase(BaseModel):
    """ Return response data """
    id: int
    email: EmailStr
    name: str


class UserCreate(BaseModel):
    """ Validate request data """
    email: EmailStr
    name: str
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class User(UserBase):
    """ Return detailed response data with token """
    token: TokenBase = {}