import mysql.connector as mysql
import os
from operator import itemgetter
from flask import Flask, request, jsonify
from dotenv import load_dotenv, find_dotenv
from flask_cors import CORS
from s3 import upload_file_to_s3
import pymysql

load_dotenv(find_dotenv())


# ENV VARIABLES SQL
CLOUD_SQL_HOST = os.environ.get("CLOUD_SQL_HOST")
CLOUD_SQL_DATA = os.environ.get('CLOUD_SQL_DATA')
CLOUD_SQL_PASS = os.environ.get('CLOUD_SQL_PASS')
CLOUD_SQL_USER = os.environ.get('CLOUD_SQL_USER')
FIRMA = os.environ.get('FIRMA')

print(CLOUD_SQL_DATA)
print(CLOUD_SQL_USER)
print(CLOUD_SQL_PASS)
print(CLOUD_SQL_HOST)

# FLASK CONFIG
app = Flask(__name__)
app.debug = True
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# DB MYSQL
# db = mysql.connect(host=CLOUD_SQL_HOST, user=CLOUD_SQL_USER, password=CLOUD_SQL_PASS, database=CLOUD_SQL_DATA)

db = pymysql.connect(
    host=CLOUD_SQL_HOST,
    port=3306,
    user=CLOUD_SQL_USER,
    password=CLOUD_SQL_PASS,
    db=CLOUD_SQL_DATA
)

if(db):
    print("conexion creda con exito")

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

        return jsonify({"message": f'Solicitud atendida por el servidor {FIRMA}', "data": json_data, "code": '200'}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "error al obtener la data", "code": '400'}), 400


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

        return jsonify({"message": f'Solicitud atendida por el servidor {FIRMA}', "data": json_data, "code": '200'}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "error al obtener la data", "code": '400'}), 400

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

        return jsonify({"message": f'Solicitud atendida por el servidor {FIRMA}', "data": json_data, "code": '200'}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "error al obtener la data", "code": '400'}), 400


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
        return jsonify({"message": f'Solicitud atendida por el servidor {FIRMA}', "code": '200'}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "error to insert data", "code": '200'}), 400

# publica un asistencia
@app.route('/asistencia', methods=['POST'])
def asistencia():
    if 'file' not in request.files:
        return jsonify({'message': 'la imagen es requerida'})

    asistencia = request.form
    carnet, nombre, evento, idEvento = itemgetter('carnet', 'nombre', 'evento', 'idEvento')(asistencia)

    file = request.files['file']
    # check whether a file is selected
    if file.filename == '':
        return jsonify({ 'message': 'NO selected files'})

    output = upload_file_to_s3(file)
    # if upload success,will return file name of uploaded file
    if output:

        query = 'INSERT INTO Asistencia(nombre, evento, carnet, idEvento, foto, procesado, fecha) VALUES(%s,%s,%s,%s,%s,%s,NOW())'
        cursor.execute(query, (nombre, evento, carnet, idEvento, output, FIRMA))
        db.commit()
        return jsonify({"message": f'Solicitud atendida por el servidor {FIRMA}', "code": '200'}), 200

    # upload failed, redirect to upload page
    else:
        return jsonify({ 'message': 'NO selected files'})


@app.route('/asistencia/evento/<event>', methods=['GET'])
def getAsistencia(event):
    try:
        query = 'SELECT * FROM Asistencia WHERE idEvento = ' + str(event)
        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  #
        data = cursor.fetchall()
        json_data = []
        for result in data:
            json_data.append(dict(zip(row_headers, result)))

        return jsonify({"message": f'Solicitud atendida por el servidor {FIRMA}', "data": json_data, "code": '200'}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "error al obtener la data", "code": '400'}), 400


@app.route('/asistencia/carnet/<carnet>', methods=['GET'])
def getAsistenciaByCarnet(carnet):
    try:
        query = 'SELECT * FROM Asistencia WHERE carnet = ' + str(carnet)
        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]  #
        data = cursor.fetchall()
        json_data = []
        for result in data:
            json_data.append(dict(zip(row_headers, result)))

        return jsonify({"message": f'Solicitud atendida por el servidor {FIRMA}', "data": json_data, "code": '200'}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "error al obtener la data", "code": '400'}), 400


@app.route('/finalizarCarga', methods=['GET'])
def close():
    #global db
    #db.disconnect()
    return jsonify({"message": "connection closed"})


if __name__ == '__main__':
    app.run()

