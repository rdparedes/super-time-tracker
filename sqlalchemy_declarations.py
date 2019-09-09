import os
import sys
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


class Task(Base):
    __tablename__ = 'task'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    start = Column(DateTime, nullable=False)
    end = Column(DateTime, nullable=True)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


engine = create_engine('sqlite:///time_tracker.db')

# Bind engine to metadata of the Base class
Base.metadata.create_all(engine)
