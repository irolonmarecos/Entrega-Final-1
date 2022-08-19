const { error, log } = require("console");
const fs = require("fs");

function calcId (id,dataNuevo){
    if(id == 0 ){
        return 1
    } else{
        return dataNuevo.Productos[dataNuevo.Productos.length - 1].id + 1
    }
}

class Almacen  {
    constructor(Nombre, Descripcion,price,img, id,date,stock,){
        this.id = id,
        this.Nombre = Nombre,
        this.Descripcion=Descripcion
        this.Price = price,
        this.Img = img,
        this.Date = date,
        this.stock=stock
    }
} 
class container  {
    async getAll(){
        try{
            const data =  fs.readFileSync("./utils/stock.json", "utf-8");
            let dataNuevo = JSON.parse(data)
            return dataNuevo.Productos
        }catch(err){
            throw new error ('ERROR')
        }
    }
    async save(Nombre,Descripcion,price,img,stock){
        try{
            const data =  fs.readFileSync("./utils/stock.json", "utf-8");
            const dataNuevo = JSON.parse(data)
            let Id = dataNuevo.Productos.length
            const nvoProd = new Almacen (Id,Nombre,Descripcion,price,img,stock)
            nvoProd.id = calcId (nvoProd.id, dataNuevo)
            const _nvoProd = {...nvoProd,
                Date: Date.now(),
                Code: Math.ceil(Math.random()*10000000000000),
                
            }
            dataNuevo.Productos.push(_nvoProd)
            fs.writeFileSync("./utils/stock.json", JSON.stringify(dataNuevo, null, 2))
        }catch(err){
            throw new error ('ERROR')
        }
    }
    async getById (id){
        try{
            const data =  fs.readFileSync("./utils/stock.json", "utf-8");
            const dataNuevo = JSON.parse(data)
            let filtro = dataNuevo.Productos.find((el) => el.id === id)
            return filtro;
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