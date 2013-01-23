from tornado import websocket
import tornado
import tornado.ioloop

class EchoWebSocket(websocket.WebSocketHandler):
    def open(self):
        print "WebSocket opened"

    def on_message(self, message):
        self.write_message(u"You said: " + message)

    def on_close(self):
        print "WebSocket closed"

if __name__ == "__main__":
    application = tornado.web.Application([
        (r"/", EchoWebSocket),
    ])
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
    
        
