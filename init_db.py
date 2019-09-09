from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_declarations import Base, Task

DATETIME_FORMAT = '%Y-%m-%dT%H:%M:%S.%fZ'


def main():
    engine = create_engine('sqlite:///time_tracker.db')
    Base.metadata.bind = engine

    # Create DB session
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    # Insert values
    task_1 = Task(name='Task 1', start=datetime.strptime('2019-04-30T15:19:57.469Z', DATETIME_FORMAT),
                  end=datetime.strptime('2019-04-30T16:19:57.469Z', DATETIME_FORMAT))
    task_2 = Task(name='Task 2', start=datetime.strptime('2019-04-28T15:19:57.469Z', DATETIME_FORMAT),
                  end=datetime.strptime('2019-04-28T16:19:57.469Z', DATETIME_FORMAT))
    task_3 = Task(name='Task 3', start=datetime.strptime('2019-04-27T15:19:57.469Z', DATETIME_FORMAT),
                  end=datetime.strptime('2019-04-27T16:19:57.469Z', DATETIME_FORMAT))
    task_4 = Task(name='Task 4', start=datetime.strptime('2019-04-27T12:19:57.469Z', DATETIME_FORMAT),
                  end=datetime.strptime('2019-04-27T13:19:57.469Z', DATETIME_FORMAT))
    session.add_all([task_1, task_2, task_3, task_4])
    session.commit()

    print("Success!")


if __name__ == "__main__":
    main()
