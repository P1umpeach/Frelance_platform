from datetime import datetime, timedelta
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, and_, or_, text, desc, asc
from sqlalchemy.ext.asyncio import AsyncSession
from babel.dates import format_date as babel_format_date

from models.tasks import tasks_table

from models.database import get_async_session

from utils.tasks import format_date

router = APIRouter(
    prefix='/cards',
    tags=['Op']
)


@router.get("/")
async def get_tasks(sphere: str = None,
                    salary: str = None,
                    terms: str = None,
                    name: str = None,
                    sort_by: str = None,
                    session: AsyncSession = Depends(get_async_session)):
    try:
        query = select(tasks_table)
        if sphere:
            query = query.where(tasks_table.c.sphere == sphere)
        if salary:
            if salary == "cheap":
                query = query.where(tasks_table.c.salary <= 30)
            elif salary == "medium":
                query = query.where(and_(tasks_table.c.salary > 30, tasks_table.c.salary <= 58))
            elif salary == "expensive":
                query = query.where(tasks_table.c.salary > 58)
            else:
                salary = int(salary)
                query = query.where(tasks_table.c.salary > salary)
        if terms:
            if terms == "express":
                query = query.where(tasks_table.c.term <= (datetime.now() + timedelta(hours=24)))
                print(tasks_table.c.term)
                print(datetime.now() - timedelta(hours=24))
            elif terms == "average":
                query = query.where(and_(tasks_table.c.term <= (datetime.now() + timedelta(days=3)), tasks_table.c.term > (datetime.now() + timedelta(hours=24))))
            elif terms == "long":
                query = query.where(and_(tasks_table.c.term <= (datetime.now() + timedelta(days=3)), tasks_table.c.term > (datetime.now() + timedelta(days=3))))
            else:
                query = select(tasks_table)
            if name:
                query = query.where(text(f"task.name ILIKE :pattern")).params(pattern=f"%{name}%")

        if sort_by:
            if sort_by == "price_desc":
                query = query.order_by(desc(tasks_table.c.salary))
            elif sort_by == "date_asc":
                query = query.order_by(asc(tasks_table.c.term))

        result = await session.execute(query)
        tasks = result.fetchall()

        tasks_list = []
        for row in tasks:
            formatted_term = format_date(row.term)
            subscription_dict = {
                "id": row.id,
                'sphere': row.sphere,
                "name": row.name,
                "description": row.description,
                "img": row.img,
                "user_id": row.user_id,
                "project_id": row.project_id,
                "term": formatted_term,
                "salary": row.salary,
            }
            tasks_list.append(subscription_dict)


        return {
            "status": "success",
            "data": tasks_list,
            "count": len(tasks_list),  # Подсчет количества найденных задач
            "details": None
        }
    except Exception as e:
        return {
            "status": "error",
            "data": None,
            "details": str(e)
        }
