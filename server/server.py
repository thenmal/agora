from tornado import websocket
import tornado
import tornado.ioloop

listeners = []

class EchoWebSocket(websocket.WebSocketHandler):
    def open(self):
        print "WebSocket opened"
        listeners.append(self)

    def on_message(self, message):
        for l in listeners:
            l.write_message(u"You said: " + message)

    def on_close(self):
        print "WebSocket closed"
        listeners.remove(self)

if __name__ == "__main__":
    application = tornado.web.Application([
        (r"/", EchoWebSocket),])
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
