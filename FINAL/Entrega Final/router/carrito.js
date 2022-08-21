const express = require('express');
const { Router } = express
const Container = require('../utils/conteiner');

const routerCarrito = Router();
const totalCarrito = new Container('./utils/carrito.json')
const totalProductos = new Container('./utils/stock.json')
const admin = true
//app.use(express.json())
routerCarrito.use(express.static( 'public/css'));

routerCarrito.get('/',async (req,res)=>{
    let prods = await totalCarrito.getAll();
    let carritoCompras = await totalCarrito.getAllCarr()
    console.log(carritoCompras);
    res.render('../views/catalogo',{
        carritoCompras:carritoCompras,
        prods:prods

    });
})
routerCarrito.get('/catalogo',async (req,res)=>{
    let prods = await totalCarrito.getAll();
    let carritoCompras = await totalCarrito.getAllCarr()
    res.render('../views/agregar-prods',{
        carritoCompras:carritoCompras,
        prods:prods

    });
})

routerCarrito.post('/catalogo',async (req,res)=>{
    if (admin){
        const ids = req.body;
        const carritoCompras = await totalCarrito.getAllCarr();
        const idCarr = carritoCompras[carritoCompras.length-1]
        const prodId = await totalProductos.getById(Number(ids.id))
        const compra = {...idCarr,
            Productos: prodId
        }
        console.log(prodId);
        if(idCarr.id && prodId != undefined){
            const prueba = await totalCarrito.updateCarr(idCarr.id, compra.Productos)
            res.redirect('/api/carrito/catalogo')
        }else{
            res.redirect('/api/carrito/catalogo')
        }
    }else{
        res.send('<h1>Usted no tiene permiso</h1>')
    }

})
routerCarrito.delete('/catalogo/:id',async (req,res)=>{
    let prods = await totalCarrito.getAll();
    let carritoCompras = await totalCarrito.getAllCarr()
    const id = Number(req.params.id);
    totalProductos.deleteById(id);

    res.render('../views/agregar-prods',{
        carritoCompras:carritoCompras,
        prods:prods

    });
})


routerCarrito.get('/:id', async (req,res)=>{
    const id = Number(req.params.id);
    const prodId = await totalCarrito.getByIdCar(id);
    prodId?res.json(prodId):res.status(404).end();
})

routerCarrito.delete('/:id', async(req,res)=>{
    if (admin){
        const id = Number(req.params.id);
        totalCarrito.deleteByIdCar(id);
        res.status(204).end();
    }else{
        res.send('<h1>Usted no tiene permiso</h1>')
    }

})

routerCarrito.post('/', async (req,res)=>{
    if(admin){
        totalCarrito.saveCarrito()
        res.redirect('/api/carrito/catalogo')
    }else{
        res.send('<h1>Usted no tiene permiso</h1>')
    }

})
routerCarrito.put('/:id', async (req,res)=>{
    if(admin){
        const id = Number(req.params.id);
        const {Productos} = req.body;
        await totalProductos.updateCar(id,Productos);
        res.status(200).end();
    }

}) 





module.exports = routerCarrito