const {Producto, Imagen, Categoria, Reviews, Users, Estado, Ordenes, ProductosOrden} = require('./models/index')
const crypto = require('crypto');




const productos = [
    {detalle: {
    nombre: 'Producto 1',
    descripcion: 'Soy el producto uno',
    precio: 20,
    disponibilidad: 10,
    imagens: [
        {ruta: '/img/NIK_9984_edited_nik_800.jpg'},
        {ruta: '/img/NIK_9984_edited_nik_800.jpg'}
    ]},
    asociacion: {include: [ Imagen ]
  }},
  {detalle: {
    nombre: 'Producto 2',
    descripcion: 'Soy el producto dos',
    precio: 50,
    disponibilidad: 20,
    imagens: [
        {ruta: '/img/NIK_9984_edited_nik_800.jpg'}
    ]},
    asociacion: {include: [ Imagen ]
  }},
  {detalle: {
    nombre: 'Producto 3',
    descripcion: 'Soy el producto tres',
    precio: 150,
    disponibilidad: 3,
    imagens: [
        {ruta: '/img/NIK_9984_edited_nik_800.jpg'},
        {ruta: '/img/NIK_9984_edited_nik_800.jpg'},
        {ruta: '/img/NIK_9984_edited_nik_800.jpg'}
    ]},
    asociacion: {include: [ Imagen ]
  }}]

const categorias = [{
    categoria: 'Categoría 1'
  },{
    categoria: 'Categoría 2'
  },{
    categoria: 'Categoría 3'
  },{
    categoria: 'Categoría 4'
  }]

const catprod = [{
      nombreprod: 'Producto 1',
      categorias:[{nombrecat: 'Categoría 1'},{nombrecat: 'Categoría 2'}]
  },{
    nombreprod: 'Producto 2',
    categorias:[{nombrecat: 'Categoría 2'}]
  },{
    nombreprod: 'Producto 3',
    categorias:[{nombrecat: 'Categoría 1'},{nombrecat: 'Categoría 3'}]
}]

const reviews = [{
  detalle: {
    comentario: 'Muy bueno, che!',
    rating: 5,
},
  usuario: "Alan",
  producto: "Producto 1"
},{
  detalle: {
    comentario: 'Medio flojo',
    rating: 3
},
  usuario: "Toni",
  producto: "Producto 1"
},{
  detalle: {
    comentario: 'Carísimo para lo que es.',
    rating: 1,
},
  usuario: "Alan",
  producto: "Producto 2"
},{
  detalle: {
    comentario: 'Es usado',
    rating: 2
},
  usuario: "Alan",
  producto: "Producto 3"
},{
  detalle: {
    comentario: 'La puta hostia',
    rating: 5
  },
  usuario: "Toni",
  producto: "Producto 3"
}]

const usuarios = [{
    nombre: 'Alan',
    apellido: 'Sainz',
    edad: 25,
    mail: 'alansainz@plataforma5.la',
    password: 'provoleta',
    admin: false
},{
    nombre: 'Toni',
    apellido: 'Tralice',
    edad: 31,
    mail: 'toni@plataforma5.la',
    password: 'todobien',
    admin: true
}]

const estados =  [{
  estado: 'Creado'
},{
  estado: 'Procesando'
},{
  estado: 'Cancelado'
},{
  estado: 'Completado'
}]


const ordenes = [
  {detalle: {
    fecha: new Date("2018/08/18"),
    direccion: 'Av. Siempreviva 1234',
    mail: "soyelmaildelcheckout@gmail.com",
    total: 20,
    productosOrdens: [
        {nombre: 'Producto 1',
        descripcion: 'Soy el producto uno',
        precio: 20,
        cantidad: 1}
    ]},
    asociacion: {include: [ ProductosOrden ]
  },
  usuario: "Alan",
  estado: "Completado"},
  {detalle: {
    fecha: new Date("2018/06/30"),
    direccion: 'Av. Siempreviva 1234',
    mail: "soyelmaildelcheckout@gmail.com",
    total: 500,
    productosOrdens: [
        {nombre: 'Producto 3',
        descripcion: 'Soy el producto tres',
        precio: 150,
        cantidad: 3},
        {nombre: 'Producto 2',
        descripcion: 'Soy el producto dos',
        precio: 50,
        cantidad: 1}
    ]},
    asociacion: {include: [ ProductosOrden ]
  },
  usuario: "Alan",
  estado: "Cancelado"},
  {detalle: {
    fecha: new Date("2018/01/07"),
    direccion: 'Elm Street 1428',
    mail: "soyotromaildelcheckout@gmail.com",
    total: 50,
    productosOrdens: [
        {nombre: 'Producto 2',
        descripcion: 'Soy el producto dos',
        precio: 50,
        cantidad: 1}
    ]},
    asociacion: {include: [ ProductosOrden ]
  },
  usuario: "Toni",
  estado: "Procesando"}
]

function seed(){
    var pcat = categorias.map((categ) => Categoria.create(categ))
    var pprod = productos.map((producto) => Producto.create(producto.detalle, producto.asociacion))
    var puser = usuarios.map((usuario) => Users.create(usuario))
    var pestado = estados.map((estado) => Estado.create(estado))
   

    Promise.all([...pcat,...pprod,...puser,...pestado]).then(() => {
        catprod.map(obj => Producto.findOne({where:{nombre:obj.nombreprod}}).then(foundProd => obj.categorias.map(cat => Categoria.findOne({where:{categoria:cat.nombrecat}}).then(foundCat => foundProd.addCategory(foundCat.id)))))
    })
    .then(() => {reviews.map((review) => Producto.findOne({where:{nombre:review.producto}}).then((foundProd) => Users.findOne({where: {nombre: review.usuario}}).then((foundUser) => Reviews.create(review.detalle).then((reviewCreated) => {reviewCreated.setProducto(foundProd); reviewCreated.setUsuario(foundUser)}))))})
    .then(() => {ordenes.map((orden) => Users.findOne({where:{nombre:orden.usuario}}).then((foundUser) => Estado.findOne({where:{estado:orden.estado}}).then(foundEstado => Ordenes.create(orden.detalle, orden.asociacion).then(ordenCreated => {ordenCreated.setUsuario(foundUser);ordenCreated.setStatus(foundEstado)}))))})
}

module.exports = seed;