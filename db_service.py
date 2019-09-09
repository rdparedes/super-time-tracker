from typing import List
from sqlalchemy_declarations import Base, Task
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine


class DBService():
    def __init__(self):
        engine = create_engine('sqlite:///time_tracker.db')
        Base.metadata.bind = engine
        DBSession = sessionmaker()
        DBSession.bind = engine
        self.session = DBSession()

    def get_all_tasks(self) -> List[Task]:
        return self.session.query(Task).all()
