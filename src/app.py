import os
from flask import Flask, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv

from extensions import bcrypt
from api.utils import APIException, generate_sitemap
from api.models import db
from api.admin import setup_admin
from api.commands import setup_commands

# ✅ Cargar variables de entorno desde .env
load_dotenv()

# ✅ Detectar entorno
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"

# ✅ Configuración de Flask
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../dist/')
app = Flask(__name__, static_folder=static_file_dir)
app.url_map.strict_slashes = False

# ✅ CORS (permitir específicamente el frontend si quieres más seguridad)
frontend_url = os.getenv("VITE_FRONTEND_URL", "*")  # Usa "*" o el dominio de GitHub Codespaces
CORS(app, resources={r"/api/*": {"origins": frontend_url}})

# ✅ Base de datos
db_url = os.getenv("DATABASE_URL")
if db_url:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# ✅ JWT y Bcrypt
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "super-secret-key")
jwt = JWTManager(app)
bcrypt.init_app(app)

# ✅ Inicialización de DB y Migraciones
db.init_app(app)
MIGRATE = Migrate(app, db, compare_type=True)

# ✅ Admin y Comandos
setup_admin(app)
setup_commands(app)

# ✅ Registrar rutas
from api.routes import api
app.register_blueprint(api, url_prefix="/api")

# ✅ Manejo de errores
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# ✅ Sitemap solo en desarrollo
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# ✅ Servir frontend (React)
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    file_path = os.path.join(static_file_dir, path)
    if not os.path.isfile(file_path):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response

# ✅ Ejecutar servidor
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
