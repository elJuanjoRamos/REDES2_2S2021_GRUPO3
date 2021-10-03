import mysql.connector as mysql
import os
from operator import itemgetter
from flask import Flask, request, jsonify
from dotenv import load_dotenv, find_dotenv
from flask_cors import CORS

load_dotenv(find_dotenv())

# ENV VARIABLES SQL
CLOUD_SQL_HOST = os.environ.get("CLOUD_SQL_HOST")
CLOUD_SQL_DATA = os.environ.get('CLOUD_SQL_DATABASE_NAME')
CLOUD_SQL_PASS = os.environ.get('CLOUD_SQL_PASSWORD')
CLOUD_SQL_USER = os.environ.get('CLOUD_SQL_USERNAME')
FIRMA = os.environ.get('FIRMA')

# FLASK CONFIG
app = Flask(__name__)
app.debug = True
CORS(app)

# GLOBAL VARIABLES

db = mysql.connect(host=CLOUD_SQL_HOST, user=CLOUD_SQL_USER, password=CLOUD_SQL_PASS, database=CLOUD_SQL_DATA)
cursor = db.cursor()


def parse_date(date):
    current = date.split('/')
    # YY -- MM -- DD
    return current[2] + '/' + current[1] + '/' + current[0]

@app.route('/')
def home():
    return jsonify({"message": "api montada correctamente"})

# trae todos los reportes

@app.route('/all', methods=['GET'])
def getAll():
    try:
        query = 'SELECT * FROM Reporte;'
        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  #
        data = cursor.fetchall()
        json_data = []
        for result in data:
            json_data.append(dict(zip(row_headers, result)))

        return jsonify({"message": f'Solicitud atendida por el servidor {FIRMA}', "data": json_data}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "error al obtener la data"}), 400


# todos los reportes de un carnet
@app.route('/all/<carnet>', methods=['GET'])
def getById(carnet):
    try:
        query = 'SELECT * FROM Reporte WHERE carnet = ' + str(carnet)
        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  #
        data = cursor.fetchall()
        json_data = []
        for result in data:
            json_data.append(dict(zip(row_headers, result)))

        return jsonify({"message": f'Solicitud atendida por el servidor {FIRMA}', "data": json_data}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "error al obtener la data"}), 400

# trae un reporte por su id
@app.route('/repo/<repo>', methods=['GET'])
def getRepo(repo):
    try:
        query = 'SELECT * FROM Reporte WHERE id = ' + str(repo)
        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  #
        data = cursor.fetchall()
        json_data = []
        for result in data:
            json_data.append(dict(zip(row_headers, result)))

        return jsonify({"message": f'Solicitud atendida por el servidor {FIRMA}', "data": json_data}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "error al obtener la data"}), 400


# publica un reporte
@app.route('/publicar', methods=['POST'])
def send():
    print(request)
    report = request.get_json()
    print(report)
    carnet, nombre, mensaje, curso = itemgetter('carnet', 'nombre', 'mensaje', 'curso')(report)
    try:
        query = 'INSERT INTO Reporte(carnet, nombre, curso, mensaje, procesado, fecha) VALUES(%s,%s,%s,%s,%s,NOW())'
        cursor.execute(query, (carnet, nombre, curso, mensaje, FIRMA))
        db.commit()
        # response = jsonify({"message": f'Solicitud atendida por el servidor {FIRMA}'}), 200
        # return response.headers.add("Access-Control-Allow-Origin", "*")
        return jsonify({"message": f'Solicitud atendida por el servidor {FIRMA}'}), 200
    except Exception as e:
        print(e)
        # response = jsonify({"message": "error to insert data"}), 400
        # return response.headers.add("Access-Control-Allow-Origin", "*")
        return jsonify({"message": "error to insert data"}), 400


@app.route('/finalizarCarga', methods=['GET'])
def close():
    global db
    db.disconnect()
    return jsonify({"message": "connection closed"})


if __name__ == '__main__':
    app.run()

