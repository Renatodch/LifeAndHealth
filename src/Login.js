import $ from 'jquery'
import {responses, messages, lengths} from "./utils/responses"
import * as s from "./utils/session";
import * as da from "./Controller"
//import * as da from "../Controller/UserController"
import * as bootstrap from "bootstrap"

let myModal;

function centerObject(obj){
    $(obj).css({
        "justify-content": "center",
        "display": "flex",
        "align-items": "center",
    });
}
function validations(){
    let Password = $("#idPass").val();
    let Email = $("#idEmail").val();
    let Name = $("#idName").val();
    let _id = $("#idUser").val();

    let fields = document.querySelectorAll('.needs-validation')
    fields.forEach(element => {
        element.classList.add('was-validated');
    });

    if(Name == "" || Password == "" || _id == ""){
        return null;
    }
    Name = Name.trim();
    
    let user= {
        _id,Password,Email,Name
    };
    let obj={
        Data:user,
        _id,
    }
    return obj;
}


let buttonSave=async()=>{
    let obj = validations();
    if(obj==null) return;

    let res =   await da.SaveUser(obj, false);
    if(res === 0){
        alert(messages.BAD_GATEWAY); return;
    }
    switch(res.res){
        case responses.SUCCESS_SAVE:
            alert("Has sido registrado con éxito");
            break;
        case responses.SERVER_ERROR:
            alert(messages.SERVER_ERROR);
            return;
    }
    myModal.hide();

}
let modalSave =async (e, button)=> {

    return {
    "buttonHandler": buttonSave,
    "buttonTitle":`${button}`,
    "title": `Regístrate es gratis!`,
    "body": 
    `
    <div class="row" id="modalContent_id">
        <div class="col">
            <div class="row px-4">
                <div class="col mb-3 needs-validation">
                    <label for="idName" class="form-label">Nombre Completo *</label>
                    <input type="text" maxlength="${lengths.MAX_32}" class="form-control" id="idName" required value="">
                </div>
                <div class="col mb-3">
                    <label for="idEmail" class="form-label">Email</label>
                    <input type="text" maxlength="${lengths.MAX_64}" class="form-control" id="idEmail" value="">
                </div>
            </div>
            <div class="row  px-4">
                <div class="col mb-3">
                    <label for="idUser" class="form-label">ID de Usuario *</label>
                    <input enabled type="text" class="form-control" id="idUser" required value="">
                </div>
                <div class="col mb-3 needs-validation">
                    <label for="idPass" class="form-label">Clave de Usuario *</label>
                    <input type="password" maxlength="${lengths.MAX_8}" class="form-control" id="idPass" required value="">
                </div>
            </div>
            <div class="row mt-3 mb-1 px-4">
                <div class="col-6 mb-3">
                    <img src="./src/img/captcha.png"  height="100"/>
                </div>
            </div>
            <div class="row mt-3 mb-1 px-4">
                <strong>(*) Campos obligatorios</strong> 
            </div>
        </div>
    </div>
    `
}};

const Login = (content)=>{
    centerObject("body");

    content.html(
    `<div id="homeDiv_id">
        <div id="loginDiv_id">
            <form class="px-4 mt-4">
                <div class="row">
                    <div class="col d-flex justify-content-center">
                        <h5 class="loginTitle">Bienvenido a Life and Health</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col d-flex justify-content-center">
                        <h5 class="loginTitle">Autentícate</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col d-flex justify-content-center">
                        <div class="form-group mb-4">
                            <label class="credential_Class mb-1 control-label" for="user_id">
                                Usuario
                            </label>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1"><i class="fa fa-user"></i></span>
                                <input type="text" id="user_id" placeholder="iD de usuario" class="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
                    
                <div class="row">
                    <div class="col d-flex justify-content-center">
                        <div class="form-group mb-4">
                            <label class="credential_Class mb-1 control-label" for="pass_id">
                                Clave
                            </label>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1"><i class="fa fa-key"></i></span>
                                <input type="password" id="pass_id" placeholder="clave de usuario" class="form-control" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col d-flex justify-content-center">
                        <button id="btnLogin_id" type="button" class="btn btn-outline-success mb-4">Iniciar Sesión</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col d-flex justify-content-center">
                        ¿Aun no te has registrado? hazlo&nbsp<a href="#" id="signup_id">aqui</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- Modal Template -->
    <div class="modal fade" id="templateModal_id" tabindex="-1" aria-labelledby="templateModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <p class="modal-title" id="templateModalLabel">Formulario de Granja</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="modalBody_id">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" id="btnSaveModal_id" class="btn btn-primary">Aceptar</button>
                <button type="button" id="btnCloseModal_id" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
            </div>
        </div>
    </div>
    `);

    $("#signup_id").on("click",async (e)=>{
        let modal = await modalSave($(e.target),"Registrar");
        BuildModal(modal);
    })

    $("#btnLogin_id").on("click",async (e)=>{
        let username = $("#user_id").val()
        let pass = $("#pass_id").val()
        if(!username || !pass){
            alert(messages.EMPTY_LOGIN)
            return;
        }

        let res = await da.Login(username,pass);
        console.log(res)
        console.log(res.d.Data)
        if(res==0){
            alert(messages.SERVER_ERROR);
            return;
        }
        switch(res.res){
            case responses.SERVER_ERROR:
                alert(messages.SERVER_ERROR);
                return;
            case responses.SUCCESS_LOGIN:                
                s.setSession(res.d);
                location.reload();
                return;
            case responses.FAILED_LOGIN:
                $("#user_id").val("")
                $("#pass_id").val("")
                alert(messages.FAILED_LOGIN);
            return;
        }   
        
    });
    
}

function BuildModal(modal){
    $("#templateModalLabel").html(modal.title)
    $("#modalBody_id").html(modal.body);
    $("#btnSaveModal_id").html(modal.buttonTitle)
    $("#btnSaveModal_id").off("click");
    $("#btnSaveModal_id").on("click",modal.buttonHandler);
    
    myModal = new bootstrap.Modal(document.getElementById("templateModal_id"), {});
    myModal.show();

    //bootstrap.Modal.show("#templateModal_id");
    //$("#templateModal_id").modal("show");
}
export default Login;