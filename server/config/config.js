//=====================
//puerto
//=====================

process.env.PORT = process.env.PORT || 3000;

//=====================
//entorno
//=====================

process.env.NODE_ENV === process.env.NODE_ENV || 'dev';

//=====================
//Base de datos
//=====================
/*
//para heroku
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://User_DataBase:kevin@pruebamongodb-6oz0y.mongodb.net/test'
}
*/