import { pathContent, setCurrentPage } from "./utils/general";
import $ from 'jquery'
import * as bootstrap from "bootstrap"

let myModal;

let buttonHandler = ()=>{
    console.log("Done")
}
let modalSave = (button, title, content)=> {

    return {
    "buttonHandler": buttonHandler,
    "buttonTitle":`${button}`,
    "title": `${title}`,
    "body": 
    `
    <div class="row" id="modalContent_id">
        <div class="col">
            ${content}
        </div>
    </div>
    `
}};

const Articles = (id)=>{
    pathContent("Artículos");
    setCurrentPage("articlesNavLink_id");
    let content =`
    <div class="col">
        <div class="row px-4 mb-4">
            <div class="card mx-2 my-2 pt-3" style="width: 25rem;">
                <img src="./src/img/icono1.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Alimentación Saludable</h5>
                    <p class="card-text">La alimentación, en todas sus variantes culturales y en un sentido amplio, define la salud de las personas, su crecimiento y su desarrollo. La alimentación diaria de cada individuo debe contener una cantidad suficiente de los diferentes macro nutrientes y micronutrientes para cubrir la mayoría de las necesidades fisiológicas.</p>
                    <button href="#" class="btn-card btn btn-primary">Ver Más</button>
                </div>
            </div>
            <div class="card mx-2 my-2 pt-3" style="width: 25rem;">
                <img src="./src/img/icono2.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Importancia de la alimentación saludable</h5>
                    <p class="card-text">Las enfermedades crónicas no transmisibles (diabetes mellitus tipo 2, enfermedades cardiovasculares, determinados tipos de neoplasias) suponen las principales causas de muerte y discapacidad en todo el mundo.</p>
                    <button href="#" class="btn-card btn btn-primary">Ver Más</button>
                </div>
            </div>
            <div class="card mx-2 my-2 pt-3" style="width: 25rem;">
                <img src="./src/img/icono3.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Dieta saludable</h5>
                    <p class="card-text">La dieta saludable debe ser "suficiente" y "completa", esto significa que debe cubrir las necesidades de energía, macro y micronutrientes, agua y fibra.</p>
                    <button href="#" class="btn-card btn btn-primary">Ver Más</button>
                </div>
            </div>
        </div>

        
    </div>
    `;
    $(id).html(content);

    $(".btn-card").on("click",(e)=>{
        let title = $(e.target).siblings(".card-title").text();
        let content = $(e.target).siblings(".card-text").text();

        //console.log(title);
        BuildModal(modalSave("Aceptar",title,content));
    })
}

function BuildModal(modal){
    $("#articlesModalLabel").html(modal.title)
    $("#modalBody_id").html(modal.body);
    $("#btnSaveModal_id").html(modal.buttonTitle)
    $("#btnSaveModal_id").off("click");
    $("#btnSaveModal_id").on("click",modal.buttonHandler);
    
    myModal = new bootstrap.Modal($("#articlesModal_id"), {});
    myModal.show();
}

export default Articles;