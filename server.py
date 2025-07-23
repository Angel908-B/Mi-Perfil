# Este es el servidor http de Python para probar el envio de los datos del formulario en una url local
# Se debe ejecutar este archivo en cmd dentro del repositorio con "python server.py 8000" o "py server.py 8000"
from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import sys

class CORSRequestHandler(SimpleHTTPRequestHandler):
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super(CORSRequestHandler, self).end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        # Leer la longitud del contenido
        content_length = int(self.headers['Content-Length'])
        # Leer los datos del cuerpo de la solicitud
        post_data = self.rfile.read(content_length)
        
        # Procesar los datos JSON
        try:
            data = json.loads(post_data)
            print(data)  # Imprimir los datos en la consola
            
            # Enviar respuesta
            self.send_response(200)
            self.end_headers()
            response = {'message': 'Mensaje recibido'}
            self.wfile.write(json.dumps(response).encode('utf-8'))
        except json.JSONDecodeError:
            self.send_response(400)  # Bad Request
            self.end_headers()
            self.wfile.write(b'{"error": "Invalid JSON"}')

host = sys.argv[1] if len(sys.argv) > 2 else '0.0.0.0'
port = int(sys.argv[len(sys.argv)-1]) if len(sys.argv) > 1 else 8080

print("Listening on {}:{}".format(host, port))
httpd = HTTPServer((host, port), CORSRequestHandler)
httpd.serve_forever()
