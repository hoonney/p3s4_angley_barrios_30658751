const sqlite3 = require('sqlite3').verbose();
const basedatos = new sqlite3.Database('./basedatos/database.sqlite', (err) =>{
    if(err) console.log(err);
    basedatos.run('CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT)'); 
    basedatos.run('CREATE TABLE IF NOT EXISTS producto (id INTEGER PRIMARY KEY AUTOINCREMENT, codigo INTEGER NOT NULL, nombre TEXT, descripcion TEXT, precio REAL NOT NULL, category_id INTEGER, FOREIGN KEY(category_id) REFERENCES category(id))');
console.log('base de datos creada')
});
module.exports = basedatos;