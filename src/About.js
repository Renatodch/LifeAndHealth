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


const About = (id)=>{
    pathContent("Sobre nosotros");
    setCurrentPage("initNavLink_id");

    let content = `
        <div id="aboutDiv_id" class="col d-flex align-self-center px-5">
            <div class="row pt-5">
                <div class="col-10 content align-self-center">
                    <h3>Life and <span> Health</span></h3>
                    <p>Somos una empresa dedicada al cuidado de tu salud. Nos centramos en la consejería de una dieta y mejor estilo de vida para ti. Para mas información de nuestros productos sigue navegando en la pagina.</p>
                    <button id="moreDetail_id" class="btn_class">MAS DETALLES</button>
                </div>
                <div class="col-2 align-self-center">
                    <div class="image">
                        <img src="./src/img/audifono.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    `;
    $(id).html(content);

    $("#moreDetail_id").on("click",(e)=>{
        let title ="Acerca de Life And Health";
        let content = "Loren ipsun";
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

export default About;