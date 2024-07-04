var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/dashboard", function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/', function(req, res, next) {
  res.redirect("/dashboard");
});

var express = require('express');
var router = express.Router();
const basedatos = require('../basedatos/models');
require('dotenv').config()


//index
router.get('/index', (req, res) => {
  basedatos.getproducto()
    .then(data => {        
      console.log(data)
      res.render('index', { producto: data });
  })
  .catch(err => {
      res.render('index', { producto: [] });
  })

  

});


router.get('/tabcategory', (req, res) => {
  basedatos.getcategory()
    .then(data => {        
      console.log(data)
      res.render('tabcategory', { category: data });
  })
  .catch(err => {
      res.render('tabcategory', { category: [] });
  })

});


router.get('/insertcat', (req, res) => {
  res.render('insertcat')
} )

//insertar producto
router.get('/insert', (req, res) => {
  res.render('insert')
} )


router.post('/insert', (req, res) => {
  const {codigo, nombre, descripcion, precio, category_id} = req.body;
  console.log(codigo, nombre, descripcion, precio, category_id);
  basedatos.insertproducto(codigo, nombre, descripcion, precio, category_id)
  .then(() => {
     res.redirect('index')
  })
  .catch(err => {
    console.log(err);
  })
});

router.post('/insertcat', (req, res) => {
  const {name} = req.body;
  console.log(name);
  basedatos.insertcategory(name)
  .then(() => {
     res.redirect('tabcategory')
  })
  .catch(err => {
    console.log(err);
  })
});


//editar producto
router.post('/edit/', (req, res)=>{
  const {id,codigo, nombre, descripcion, precio, category_id,} = req.body;
  basedatos.updateproducto(id,codigo, nombre, descripcion, precio, category_id)
  .then(() =>{
    res.redirect('/index');
  })
  .catch(err =>{
    console.log(err);

  })
});

router.post('/editcat/', (req, res)=>{
  const {id, namecat} = req.body;
  basedatos.updatecategory(id, namecat)
  .then(() =>{
    res.redirect('/tabcategory');
  })
  .catch(err =>{
    console.log(err);

  })
});


router.get('/edit/:id', (req, res)=>{
  const id = req.params.id
  basedatos.getproductoID(id)
  .then(data =>{
    console.log(data)
    res.render('edit', {producto: data[0]})
  })
    .catch(err =>{
      console.log(err);
      res.render('edit', {producto: []})
    }) 


    
})


router.get('/editcat/:id', (req, res)=>{
  const id = req.params.id
  basedatos.getcategoryID(id)
  .then(data =>{
    console.log(data)
    res.render('editcat', {category: data[0]})
  })
    .catch(err =>{
      console.log(err);
      res.render('editcat', {category: []})
    }) 


    
})

router.get('/delete/:id', (req, res)=>{
  const id = req.params.id;
  basedatos.deleteproducto(id)
    .then(() => {
    res.redirect('/index');
  })
  .catch(err => {
  console.log(err);
  });
})

router.get('/administrar', (req, res) =>{
  res.render('administrar')
})

router.get('/tabcategory', (req, res) =>{
  res.render('tabcategory')
})

router.get('/deletecat/:id', (req, res)=>{
  const id = req.params.id;
  basedatos.deletecategory(id)
    .then(() => {
    res.redirect('/tabcategory');
  })
  .catch(err => {
  console.log(err);
  });
})


module.exports = router;


