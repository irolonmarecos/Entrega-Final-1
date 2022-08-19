const express = require('express');

const {Server:HTTPServer} = require('http');
const {Server:SocketServer} = require('socket.io')

const app = express();
const routerProductos = require('./router/productos');
const routerCarrito = require('./router/carrito')
const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);
const Contenedor = require('./utils/conteiner');
const nvoCont = new Contenedor('./utils/stock.json')


app.use(express.json());
app.use(express.static( 'public'));
app.use(express.urlencoded({extended:true}));
app.use('/api/productos',routerProductos);
app.use('/api/carrito',routerCarrito);

app.set('view engine', 'pug');
app.set('views', './views')


socketServer.on('connection', async(socket)=>{
    console.log('Nuevo cliente conectado');
    const productos = await nvoCont.getAll();
    socket.emit('MOSTRAR_PRODUCTOS',productos)


    
})



const PORT = process.env.PORT || 2020
httpServer.listen(PORT, ()=>{
    console.log(`El servidor se esta ejecutando en el puerto ${PORT}`);
})
httpServer.on("error", error => `Error: ${error}`);