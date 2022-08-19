const socket = io()

socket.on('connect', ()=>{
    console.log('Conectado al Servidoaa');
})

socket.on('MOSTRAR_PRODUCTOS', (msg)=>{
    document.getElementsByClassName('lista').innerHTML = "" ;
    CatalogoAdmin(msg)

})

socket.on('NUEVO_PRODUCTO', (msg)=>{
    nuevoProductos(msg)
})

function nuevoProductos(info){

    document.getElementsByClassName('lista').innerHTML +=`
        <tr>    
            <td>${info.Id}</td>
            <td>${info.Data}</td>
            <td>${info.Price}</td>
            <td><img width="50" src={${this.Img}} alt="img-item">
        </tr>
    `
}

const CatalogoAdmin =  (prods) => {
    return fetch('../../views/formulario-prods').then((resp) => {
        return resp.text();
    }).then((text) => {
      const template = Handlebars.compile(text);
      const html = template({prods:prods});
      document.getElementById('listado-prods').innerHTML = html;
    });
}