//Variables
const $ = selector => document.querySelector(selector)
const selectYear = $('#year')
const selectMarca = $('#marca')
const selectMinimo = $('#minimo')
const selectMaximo = $('#maximo')
const selectPuertas = $('#puertas')
const selectTransmision = $('#transmision')
const selectColor = $('#color')

//Contenedor para los resultados
const resultado = $('#resultado')

const max = new Date().getFullYear();
const min = max-10;

// Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

//Eventos
document.addEventListener('DOMContentLoaded',()=>{
    mostrarAutos(autos)//Lista todos los autos de la base de datos al cargar

    //Llena las opciones de años
    llenarSelect();
})

//EventListener para los selects
selectMarca.addEventListener('change', (e) =>{
    agregarDatosBusqueda(e)
    filtrarAuto()
})

selectYear.addEventListener('change', (e) =>{
    agregarDatosBusqueda(e)
    filtrarAuto()
}) 

selectMinimo.addEventListener('change', (e) =>{
    agregarDatosBusqueda(e)
    filtrarAuto()
})

selectMaximo.addEventListener('change', (e) =>{
    agregarDatosBusqueda(e)
    filtrarAuto()
})

selectPuertas.addEventListener('change', (e) =>{
    agregarDatosBusqueda(e)
    filtrarAuto()
})

selectTransmision.addEventListener('change', (e) =>{
    agregarDatosBusqueda(e)
    filtrarAuto()
})

selectColor.addEventListener('change', (e) =>{
    agregarDatosBusqueda(e)
    filtrarAuto()
})

//Funciones
function mostrarAutos(autos){

    limpiarHTML();

    if(!autos.length){
        const alerta = document.createElement('P');
        alerta.classList.add('alerta','error')
        alerta.textContent = 'No hay autos con estas caracteristicas';

        resultado.appendChild(alerta);
        return;
    }

    autos.forEach(auto => {
        const autoHTML = document.createElement('P')

        const { marca, modelo, year, puertas, transmision, precio, color} = auto
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision ${transmision} - Precio ${precio} - Color ${color}
        `;

        //insertar en el html
        resultado.appendChild(autoHTML)
    });
}

//Generar los años del select
function llenarSelect(){
   for(let i=max; i > min; i--){
       const opt = document.createElement('OPTION')
       opt.value = i
       opt.textContent = i
   
       selectYear.appendChild(opt)//Agrega las opciones de año al select
   }
}

function agregarDatosBusqueda(e){
    datosBusqueda[e.target.id] = e.target.value
}


//Funcion que filtra en base a la busqueda
function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );

    //Generar HTMl con la busqueda filtrada
    mostrarAutos(resultado)
}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda;

    if(marca){
        return auto.marca === marca
    }
    return auto;

}

function filtrarYear(auto){
    const { year } = datosBusqueda;

    if(year){
        return auto.year === +year;
    }
    return auto;
}

function filtrarMinimo(auto){
    const { minimo } = datosBusqueda;

    if(minimo){
        return auto.precio >= +minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    const { maximo } = datosBusqueda;

    if(maximo){
        return auto.precio <= +maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;

    if(puertas){
        return auto.puertas === +puertas;
    }
    return auto;
}
 
function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;

    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;

    if(color){
        return auto.color === color;
    }
    return auto;
}

function limpiarHTML() {

    while(resultado.firstChild){
        resultado.removeChild(resultado.lastChild)
    }
}