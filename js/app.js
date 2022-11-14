//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos'); 
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregar un curso precionando 'Agregar Al Carrito'
    listaCursos.addEventListener('click', agregarCurso);
    //Elimina Cursos del Carrito
    carrito.addEventListener('click', eliminarCurso)
    //Vaciar carrito por completo
    vaciarCarrito.addEventListener('click', () => {
        console.log('vaciando carrito...')
        articulosCarrito = []; //reseteamos el arreglo
        limpiarHTML();//eliminamos todo el HTML
    })
}

//Funciones
function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement 
        leerDatosCurso(cursoSeleccionado)
    }
}
//Elimina un cursos del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();//Iterar sobre el carrito y mostrar su HTML;
    }
}

//Lee el contenido del HTML y extrae la informacion del curso.
function leerDatosCurso(curso){
    //Crear un objeto con el contenido del objeto.
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        title: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //Revisa si un elemento ya existe en el carrito 
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad 
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
    }else{
    //Agrega Elementos Al Arreglo De Carrito
    articulosCarrito = [...articulosCarrito, infoCurso]
    }

    //Llamamos a la funcion carritoHTML para que muestre los datos
    carritoHTML();
}

//Muestra el carrito de compras en el HTML

function carritoHTML(){
    //Limpiar HTML
    limpiarHTML();
    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const {imagen, title, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}">
            </td>
            <td>
                ${title}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
            <a href="#" class="borrar-curso" data-id="${id}">x</a>
            </td>

        `
        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    });
}

function limpiarHTML(){
    //Forma Lenta
    //contenedorCarrito.innerHTML = "";
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}