import $ from 'jquery'

function setCurrentPage(id){
    let _id= $(`#${id}`);
    if(!_id.hasClass("active")){
        _id.addClass("active");
        _id.attr("aria-current","page")   
    }
}
function centerObject(obj){
    $(obj).css({
        "justify-content": "center",
        "display": "flex",
        "align-items": "center",
    });
}

function pathContent(path){
    $("#navPathDiv_id").html(
        `
        <div>
            <div class="p-2 bg-success text-white">
                ${path}
            </div>
        </div>
        `
    );
}
function containsWhitespace(str) {
    return /\s/.test(str);
  }
function customDT(obj){
    return {
        order: [[2, 'asc']],
        scrollX:true,
        scrollY:true,
        
        autoWidth:false,
        
        "language": {
            "lengthMenu": `Mostrar _MENU_ ${obj.plural}`,
            "zeroRecords": `No se encontraron ${obj.plural}`,
            "info": "",
            "infoEmpty": `Ninguna ${obj.singular} disponible`,
            "infoFiltered": `(Filtrado de _MAX_ ${obj.plural})`,
            "search": "Buscar",
            "paginate": {
            "first":      "Primero",
            "last":       "Último",
            "next":       "Siguiente",
            "previous":   "Anterior"
            },
        }
    }
}

const getHash =()=>{
    if(location.hash.toString().length == 0){
        return '/'; 
    }else{
        let arr = location.hash.toString().toLocaleLowerCase().split('/')
        if (arr[0]=="home") return "home";
        else return (arr[1] || '');
    }
}
/*
const getHash =()=>{
    if(location.hash.toString().length == 0){
        return '/'; 
    }else{
        let arr = location.hash.toString().toLocaleLowerCase().split('/')
        if (arr[0]=="home") return "home";
        else return (arr[1] || '');
    }

}
*/
const getIndex = (hash) =>{
    return location.hash.toString().toLocaleLowerCase().split('/')[2]
}


const resolveRoutes = (hash) =>{
    if(hash==="/") return hash
    return `/${hash}`;
}
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]
export {
    monthNames,
    setCurrentPage, 
    centerObject,
    pathContent,
    customDT,
    getHash,
    getIndex,
    resolveRoutes,
    containsWhitespace
}