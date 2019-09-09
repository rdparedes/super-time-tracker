import traceback
import sys
import settings
import json
import tornado.ioloop
import tornado.web
from tornado import escape
from db_service import DBService


class TasksHandler(tornado.web.RequestHandler):
    def initialize(self, db_service: DBService):
        self.db = db_service

    def get(self, *args):
        entries = self.db.get_all_tasks()
        self.write(json.dumps([e.as_dict() for e in entries],
                              indent=4, sort_keys=True, default=str))

    def post(self, *args):
        task = json.loads(escape.to_unicode(self.request.body))
        updated_entries = self.db.post_task(task)
        self.write(json.dumps([e.as_dict() for e in updated_entries],
                              indent=4, sort_keys=True, default=str))

    def delete(self, task_id):
        updated_entries = self.db.delete_task(task_id)
        self.write(json.dumps([e.as_dict() for e in updated_entries],
                              indent=4, sort_keys=True, default=str))


def make_app():
    return tornado.web.Application(
        handlers=[
            (r"/time-entries/(.*)", TasksHandler, dict(db_service=DBService())),
            (r"/(.*)", tornado.web.StaticFileHandler, {'path': settings.STATIC_PATH,
                                                       'default_filename': 'index.html'})
        ]
    )


def main():
    try:
        app = make_app()
        app.listen(settings.PORT)
        tornado.ioloop.IOLoop.current().start()
    except Exception:
        print(traceback.format_exc())


if __name__ == "__main__":
    main()
