import traceback
import sys
import settings

import json

import tornado.ioloop
import tornado.web


class TimeEntriesHandler(tornado.web.RequestHandler):
    db = {
        1: {
            "id": 1,
            "name": "Task 1",
            "start": "2019-04-30T15:19:57.469Z",
            "end": "2019-04-30T16:19:57.469Z"
        },
        2: {
            "name": "Task 2",
            "start": "2019-04-28T15:19:57.469Z",
            "end": "2019-04-28T16:19:57.469Z",
            "id": 2
        },
        3: {
            "name": "Task 3",
            "start": "2019-04-27T15:19:57.469Z",
            "end": "2019-04-27T16:19:57.469Z",
            "id": 3
        },
        4: {
            "name": "Task 4",
            "start": "2019-04-27T15:19:57.469Z",
            "end": "2019-04-27T16:19:57.469Z",
            "id": 4
        }
    }

    def get(self):
        self.write(json.dumps(self.db))

def make_app():
    return tornado.web.Application(
        handlers=[
            (r"/time-entries", TimeEntriesHandler),
            (r"/(.*)", tornado.web.StaticFileHandler, { 'path': settings.STATIC_PATH,
                                                        'default_filename': 'index.html' })
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
