from fastapi import APIRouter, Form, Request, Depends
from fastapi.templating import Jinja2Templates
from pydantic import EmailStr
from schemas.users import UserCreate, UserLogin
from routers.users import create_user as register_user_logic
from routers.users import auth

from routers.tasks import get_tasks

from utils.dependencies import get_current_user

from schemas.users import User

router = APIRouter(
    prefix="/pages",
    tags=["Pages"]
)

templates = Jinja2Templates(directory="templates")


@router.get("/home")
def get_base_page(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})


@router.get('/catalog/')
def get_cards_page(request: Request,
                   sphere: str = None,
                   salary: str = None,
                   terms: str = None,
                   name: str = None,
                   sort_by: str = None,
                   tasks=Depends(get_tasks)):
    task_data = tasks["data"] if tasks["data"] is not None else []
    task_count = tasks["count"] if tasks["status"] == "success" else 0
    category = sphere if sphere else "Услуги"
    return templates.TemplateResponse('catalog.html', {"request": request,
                                                       "sphere": sphere,
                                                       "salary": salary,
                                                       "terms": terms,
                                                       "name": name,
                                                       "category": category,
                                                       "tasks": task_data,
                                                       "sort_by": sort_by,
                                                       "task_count": task_count})


@router.get("/profile/")
def get_base_page(request: Request,
                  current_user: User = Depends(get_current_user)):
    return templates.TemplateResponse("profile.html", {"request": request,
                                                       "name": current_user.name})


@router.get("/auth")
def get_base_page(request: Request):
    return templates.TemplateResponse("auth.html", {"request": request})


@router.post("/get-user-data")
async def register_user(
    request: Request,
    email: EmailStr = Form(...),
    login: str = Form(...),
    password: str = Form(...)
):
    user_data = UserCreate(email=email, name=login, password=password)
    await register_user_logic(user_data)
    return templates.TemplateResponse("auth.html", {"request": request, "message": "User registered successfully!"})


@router.post("/get-login-data")
async def login_user(
    request: Request,
    email: EmailStr = Form(...),
    password: str = Form(...)
):
    user_data = UserLogin(email=email, password=password)
    await auth(user_data)

    return templates.TemplateResponse("auth.html", {"request": request, "message": "User logib successfully!"})
