const basedatos = require('./coneccion');

let querys = {
    getproducto: 'SELECT * FROM producto',
    getcategory: 'SELECT * FROM category',
    getcategoryID: 'SELECT * FROM category WHERE id = ?',
    insertproducto: 'INSERT INTO producto (codigo, nombre, descripcion, precio, category_id) VALUES(?, ?, ?, ?, ?)',
    insertcategory: 'INSERT INTO category(name) VALUES(?)',
    updateproducto: 'UPDATE producto SET codigo = ?, nombre = ?, descripcion = ?, precio = ?, category_id = ? WHERE id = ?',
    updatecategory: 'UPDATE category SET nombre = ? WHERE id = ?',
    deleteproducto: 'DELETE FROM producto WHERE id = ?',
    deletecategory: 'DELETE FROM category WHERE id = ?'
}

    module.exports = {

        getproducto(){
            return new Promise((resolve, reject)=>{
                basedatos.all(querys.getproducto, (err,rows)=>{
                    if(err) reject(err);
                    resolve(rows);
                })
            })
        },

        insertproducto(codigo, nombre, descripcion, precio, category_id){
            return new Promise((resolve, reject) => {
                basedatos.run(querys.insertproducto, [codigo, nombre, descripcion, precio, category_id], (err) => {
                    if(err) reject(err);
                        resolve()
                })
            })
        
        },

        updateproducto(codigo, nombre, descripcion, precio, category_id){
            return new Promise((resolve, reject) => {
                basedatos.run(querys.updateproducto, [codigo, nombre, descripcion, precio, category_id, id], (err) => {
                    if(err) reject(err);
                    resolve();
                })
            })
        },

        deleteproducto(id){
            return new Promise((resolve, reject) => {
                basedatos.run(querys.deleteproducto, [id], (err) => {
                    if(err) reject(err);
                    resolve();
                })
            })
        },

        getcategory(){
            return new Promise((resolve, reject) => {
                basedatos.all(querys.getcategory, (err, rows) => {
                    if(err) reject(err);
                    resolve(rows);
                })
            })
        },

        getcategoryID(id){
            return new Promise((resolve, reject) => {
                basedatos.all(querys.getcategoryID, [id], (err, rows) => {
                    if(err) reject(err);
                    resolve(rows);
                })
            })
        },

        insertcategory(name, id){
            return new Promise((resolve, reject) => {
                basedatos.all(querys.insertcategory, [name, id], (err) => {
                    if(err) reject(err);
                    resolve();
                })
            })
        },

        updatecategory(id, name){
            return new Promise((resolve, reject) => {
                basedatos.run(querys.updatecategory, [name, id], (err) => {
                    if(err) reject(err);
                    resolve();
                })
            })
        },
    
        deletecategory(id){
            return new Promise((resolve, reject) => {
                basedatos.run(querys.deletecategory, [id], (err) => {
                    if(err) reject(err);
                    resolve();
                })
            })
        },
}