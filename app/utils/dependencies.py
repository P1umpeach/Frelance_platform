from utils import users as users_utils
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, SecurityScopes
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel
from fastapi.openapi.models import OAuthFlowPassword
from fastapi.openapi.models import OAuth2 as OAuth2Model
from pydantic import BaseModel
from typing import List, Optional


class OAuth2PasswordBearerWithCookie(OAuth2PasswordBearer):
    def __init__(self, tokenUrl: str, scopes: dict = None, auto_error: bool = True):
        if not scopes:
            scopes = {}
        flows = OAuthFlowsModel(password=OAuthFlowPassword(tokenUrl=tokenUrl))
        super().__init__(tokenUrl=tokenUrl, scopes=scopes, auto_error=auto_error)
        self.model = OAuth2Model(flows=flows)


oauth2_scheme = OAuth2PasswordBearerWithCookie(tokenUrl="auth")


async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = await users_utils.get_user_by_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user