import { pathContent, setCurrentPage } from "./utils/general";
import * as c from "./Controller"
import $ from 'jquery'
import * as bootstrap from "bootstrap"
import {Comments} from "./Comments"

let myModal;

let buttonHandler = ()=>{
    console.log("Done")
}
let modalSave = async(button, title)=> {

    return {
    "buttonHandler": buttonHandler,
    "buttonTitle":`${button}`,
    "title": `${title}`,
    "body": 
    `
    <div class="container" >
        <div class="row" id="modalContent_id">
        </div>
    </div>
    `
}};

const Articles = async (id)=>{
    pathContent("Artículos");
    setCurrentPage("articlesNavLink_id");
    let articles = await c.GetArticles();
    console.log(articles)
    let content =`
    <div class="col">
        <div class="row px-4 mb-4">
            ${articles.map(a=>`
                    <div class="card mx-2 my-2 pt-3" style="width: 25rem;" id="${a._id}">
                        <img src="./src/img/${a.Data.ImageFileName}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${a.Data.Title}</h5>
                            <p class="card-text">${a.Data.Content}</p>
                            <button href="#" class="btn-card btn btn-primary">Ver Comentarios</button>
                        </div>
                    </div>
            `).join("")}
        </div>
    </div>
    `;
    $(id).html(content);

    $(".btn-card").on("click", async (e)=>{
        let title = $(e.target).siblings(".card-title").text();
        let id = $(e.target).parent().parent()[0].id
        //console.log(title);
        let modal = await modalSave("Aceptar",`Comentarios de "${title}"`)
        BuildModal(modal);
        Comments("#modalContent_id",id) 
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