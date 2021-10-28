CREATE DATABASE Redes;
USE Redes;
CREATE TABLE Reporte(
	id int auto_increment primary key,
	nombre varchar(100) not null,
	mensaje varchar(100) not null,
	carnet int not null,
	curso varchar(100) not null,
	procesado int not null,
	fecha date not null
);

CREATE TABLE Asistencia(
	id int auto_increment primary key,
	nombre varchar(100) not null,
	evento varchar(100) not null,
	carnet int not null,
	idEvento int not null,
	foto varchar(255) not null,
	procesado int not null,
	fecha date not null
);
