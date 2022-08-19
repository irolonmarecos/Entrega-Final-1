const express = require('express');
const { Router } = express
//const { json } = require('express');
//require('../Utils/stock.json')
const Container = require('../utils/conteiner');

//const app = express();
const routerProductos = Router();
const totalProductos = new Container('./utils/stock.json')

//app.use(express.json())
routerProductos.use(express.static( 'public/css'));



routerProductos.get('/',async (req,res)=>{
    let productos = await totalProductos.getAll();
    res.render('../views/formulario-prods');
})

routerProductos.get('/:id', async (req,res)=>{
    const id = Number(req.params.id);
    const prodId = await totalProductos.getById(id);
    console.log(prodId);
    prodId?res.json(prodId):res.status(404).end();
})

routerProductos.delete('/:id', async(req,res)=>{
    const id = Number(req.params.id);
    totalProductos.deleteById(id);
    res.status(204).end();
})

routerProductos.post('/', async (req,res)=>{
    const {nombre,descripcion,precio,stock,url} =  req.body;
    const productoAgregado= await totalProductos.save(nombre,descripcion,precio,url,stock);
    res.json({nombre,descripcion,precio,url,stock});
})

routerProductos.put('/:id', async (req,res)=>{
    const id = Number(req.params.id);
    const {product, price} = req.body;
    await totalProductos.update(id,product, price);
    res.status(200).end();

}) 



module.exports = routerProductos