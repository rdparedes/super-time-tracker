from typing import List, Dict
from datetime import datetime
from sqlalchemy_declarations import Base, Task
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from init_db import DATETIME_FORMAT


class DBService():
    def __init__(self):
        engine = create_engine('sqlite:///time_tracker.db')
        Base.metadata.bind = engine
        DBSession = sessionmaker()
        DBSession.bind = engine
        self.session = DBSession()

    def get_all_tasks(self) -> List[Task]:
        return self.session.query(Task).all()

    def post_task(self, t: Dict) -> List[Task]:
        new_task = Task(name=t.get('name'),
                        start=datetime.strptime(
                            t.get('start'), DATETIME_FORMAT),
                        end=datetime.strptime(t.get('end'), DATETIME_FORMAT))
        self.session.add(new_task)
        self.session.commit()
        return self.get_all_tasks()
