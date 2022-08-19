const express = require('express');
const { Router } = express
const Container = require('../utils/conteiner');

const routerCarrito = Router();
const totalProductos = new Container('./utils/stock.json')

//app.use(express.json())
routerCarrito.use(express.static( 'public/css'));

routerCarrito.get('/',async (req,res)=>{
    let productos = await totalProductos.getAll();
    res.render('../views/carrito',{

    });
})

routerCarrito.get('/:id', async (req,res)=>{
    const id = Number(req.params.id);
    const prodId = await totalProductos.getById(id);
    console.log(prodId);
    prodId?res.json(prodId):res.status(404).end();
})

routerCarrito.delete('/:id', async(req,res)=>{
    const id = Number(req.params.id);
    totalProductos.deleteById(id);
    res.status(204).end();
})

routerCarrito.post('/', async (req,res)=>{
    const {nombre,precio} =  req.body;
    const productoAgregado= await totalProductos.save(nombre,precio);
    res.json({nombre,precio});
})

routerCarrito.put('/:id', async (req,res)=>{
    const id = Number(req.params.id);
    const {product, price} = req.body;
    await totalProductos.update(id,product, price);
    res.status(200).end();

}) 



module.exports = routerCarrito