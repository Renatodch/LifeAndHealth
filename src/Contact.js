import { pathContent, setCurrentPage } from "./utils/general";
import { lengths } from "./utils/responses";
import * as s from "./utils/session"
import $ from 'jquery'

const Contact = (id)=>{
    
    pathContent("Contacto");
    setCurrentPage("contactNavLink_id");
    let user = s.onSession()
    let email = user.Data.Email||"";
    let fullname = user.Data.Name||"";
    let content =`
        <div class="col" id="contactDiv_id">
            <div class="row  justify-content-center py-3">
                <div class="col-5">
            
                    <div class="row px-4">
                        <div class="col mb-3 needs-validation">
                            <label for="idName" class="form-label">Nombre *</label>
                            <input type="text" maxlength="${lengths.MAX_32}" class="form-control" id="idName" required value="${fullname}">
                        </div>
                    </div>
                    <div class="row  px-4">
                        <div class="col mb-3">
                            <label for="idEmail" class="form-label">Email *</label>
                            <input type="text" maxlength="${lengths.MAX_64}" class="form-control" id="idEmail" value="${email}">
                        </div>
                    </div>
                    <div class="row  px-4">
                        <div class="col mb-3">
                            <label for="idPhone" class="form-label">Teléfono</label>
                            <input enabled type="text" class="form-control" id="idPhone" required value="">
                        </div>
                    </div>
                    <div class="row  px-4">
                        <div class="col mb-3 needs-validation">
                            <label for="idMessage" class="form-label">Mensaje *</label>
                            <textarea  maxlength="${lengths.MAX_64}" class="form-control" id="idMessage" required value=""></textarea>
                        </div>
                    </div>
                    <div class="row mt-3 mb-1 px-4">
                        <strong>(*) Campos obligatorios</strong> 
                    </div>
                    <div class="row mt-4 px-4">
                        <div class="col mb-3 needs-validation">
                            <button class="btn btn-primary" id="btnSendContact">Enviar</button>
                        </div>
                    </div>   
                </div>
                <div class="col-2 align-self-center">                
                    <div class="image">
                        <img src="./src/img/form_img.png" alt="">
                    </div>
                </div>
            </div>
        </div>

    `;
    $(id).html(content);

    $("#btnSendContact").on("click",()=>{
        alert("Contacto enviado")
    });
}

export default Contact;