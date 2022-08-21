const fs = require("fs");

function calcId (id,dataNuevo){
    if(id == 0 ){
        return 1
    } else{
        return dataNuevo.Productos[dataNuevo.Productos.length - 1].id + 1
    }
}
function calcIdCarr (id,dataNuevo){
    if(id == 0 ){
        return 1
    } else{
        return dataNuevo.Carrito[dataNuevo.Carrito.length - 1].id + 1
    }
}

class Almacen  {
    constructor(id,nombre, descripcion,price,img,date,stock,){
        this.id = id,
        this.Nombre = nombre,
        this.Descripcion=descripcion
        this.Price = price,
        this.Img = img,
        this.Date = date,
        this.stock=stock
    }

} 
class container  {
    async getAllCarr(){
        try{
            const data =  fs.readFileSync("./utils/carrito.json", "utf-8");
            let dataNuevo = JSON.parse(data)
            return dataNuevo.Carrito
        }catch(err){
            throw new error ('ERROR')
        }
    }
    async getAll(){
        try{
            const data =  fs.readFileSync("./utils/stock.json", "utf-8");
            let dataNuevo = JSON.parse(data)
            return dataNuevo.Productos
        }catch(err){
            throw new error ('ERROR')
        }
    }
    async saveCarrito(){
        try{
            const data =  fs.readFileSync("./utils/carrito.json", "utf-8");
            const dataNuevo = JSON.parse(data)
            let idCar = dataNuevo.Carrito.length;
            const nvoCarr = new Almacen (idCar);
            nvoCarr.id = calcIdCarr (nvoCarr.id, dataNuevo)
            const _nvoCarr = {...nvoCarr,
            Date:Date.now(),
            Productos: [],
            };
            dataNuevo.Carrito.push(_nvoCarr)
            fs.writeFileSync("./utils/carrito.json", JSON.stringify(dataNuevo, null, 2))

        }catch(err){
            throw new error ('ERROR')
        }
    }

    async save(nombre,descripcion,price,img,stock){
        try{
            const data =  fs.readFileSync("./utils/stock.json", "utf-8");
            const dataNuevo = JSON.parse(data)
            let id = dataNuevo.Productos.length
            const nvoProd = new Almacen (id,nombre,descripcion,price,img,stock)
            nvoProd.id = calcId (nvoProd.id, dataNuevo)
            const _nvoProd = {...nvoProd,
                Date: Date.now(),
                Code: Math.ceil(Math.random()*10000000000000),
                
            }
            dataNuevo.Productos.push(nvoProd)
            fs.writeFileSync("./utils/stock.json", JSON.stringify(dataNuevo, null, 2))
        }catch(err){
            throw new error ('ERROR')
        }
    }
    async getById (id){
        try{
            const data =  fs.readFileSync("./utils/stock.json", "utf-8");
            const dataNuevo = JSON.parse(data)
            let find = dataNuevo.Productos.find((el) => el.id === id)
            return find;
        } catch(err){
            throw new error ('ERROR')
        }
    }
    async getByIdCar (id){
        try{
            const data =  fs.readFileSync("./utils/carrito.json", "utf-8");
            const dataNuevo = JSON.parse(data)
            let find = dataNuevo.Carrito.find((el) => el.id === id)
            return find;
        } catch(err){
            throw new error ('ERROR')
        }
    }
    async deleteById(id) {
        try{
            const data =  fs.readFileSync("./utils/stock.json", "utf-8");
            const dataNuevo = JSON.parse(data)
            const {Productos} = dataNuevo
            let filtro = Productos.filter((el) => el.id !== id)
            dataNuevo.Productos = filtro
            fs.writeFileSync("./utils/stock.json", JSON.stringify(dataNuevo, null, 2))
        }catch(err){
            throw new error ('ERROR')
        }
    }
    async deleteByIdCar(id) {
        try{
            const data =  fs.readFileSync("./utils/carrito.json", "utf-8");
            const dataNuevo = JSON.parse(data)
            const {Carrito} = dataNuevo
            let filtro = Carrito.filter((el) => el.id !== id)
            dataNuevo.Carrito = filtro
            fs.writeFileSync("./utils/carrito.json", JSON.stringify(dataNuevo, null, 2))
        }catch(err){
            throw new error ('ERROR')
        }
    }  
    async deleteAll() {
        try{
            const data =  fs.readFileSync("./utils/stock.json", "utf-8");
            const dataNuevo = JSON.parse(data)
            const {Productos} = dataNuevo
            let borrado = []
            dataNuevo.Productos = borrado
            fs.writeFileSync("./utils/stock.json", JSON.stringify(dataNuevo, null, 2))
        }catch(err){
            throw new error ('ERROR')
        }
    }
    async deleteAllCar() {
        try{
            const data =  fs.readFileSync("./utils/carrito.json", "utf-8");
            const dataNuevo = JSON.parse(data)
            const {Carrito} = dataNuevo
            let borrado = []
            dataNuevo.Carrito = borrado
            fs.writeFileSync("./utils/carrito.json", JSON.stringify(dataNuevo, null, 2))
        }catch(err){
            throw new error ('ERROR')
        }
    } 
    async update(id,prod,pric) {
        try{
            const data =  fs.readFileSync("./utils/stock.json", "utf-8");
            const dataNuevo = JSON.parse(data)
            let filtro = dataNuevo.Productos.find((el) => el.id === id)
            filtro.product = prod;
            filtro.price =  pric;
            fs.writeFileSync("./utils/stock.json", JSON.stringify(dataNuevo, null, 2))
        }catch(err){
            throw new error (err)
        }
    } 
    async updateCarr(id,prod) {
        try{
            const data =  fs.readFileSync("./utils/carrito.json", "utf-8");
            const dataNuevo = JSON.parse(data)
            let filtro = dataNuevo.Carrito.find((el) => el.id === id)
            filtro.Productos.push(prod)
            fs.writeFileSync("./utils/carrito.json", JSON.stringify(dataNuevo, null, 2))
        }catch(err){
            throw new error (err)
        }
    }
} 
module.exports = container

const viewList = new container()

//viewList.update(30)
//mostrarProductos()
//viewList.save()
//viewList.getById (28)
//viewList.deleteById(4)
//viewList.deleteAll()
//viewList.getAll()