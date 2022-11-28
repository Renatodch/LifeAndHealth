import { pathContent, setCurrentPage } from "./utils/general";
import $ from 'jquery'
import * as s from "./utils/session"

const Details = (id)=>{
    pathContent("Detalles");
    setCurrentPage("detailsNavLink_id");

    let user = s.onSession()
    let email = user.Data.Email||"";
    
    let content =`
        <div class="col mb-4" id="detailsDiv_id">
            <div class="row justify-content-center mb-3">
                <div class="col-6">
                    <h1>Una alimentación saludable</h1>
                </div>
            </div>
            <div class="row mb-3">                
                <div class="col-4 align-self-center px-5">
                    <div class="row justify-content-start">
                        <img src="./src/img/auriculares_2.png" alt="" height=300>
                    </div>
                </div>
                <div class="col-8 px-5">
                    <h3>Calidad de los alimentos</h3>
                    <p>Cuando hablamos de calidad de alimentos, nos referimos al conjunto de cualidades que son aceptadas o valoradas por el consumidor (es decir nosotros mismos).</p>
                    <p>Estas cualidades incluyen tanto las percibidas por lo sentidos (sabor, olor, color, textura, forma y apariencia) así como también las higiénicas y nutricionales. La calidad de los alimentos es una de las cualidades exigidas a los procesos de manufactura alimentaria, debido a que el destino final de los productos es la alimentación humana y los alimentos son susceptibles en todo momento de sufrir cualquier forma de contaminación.</p>

                    <div class="bottons">
                        <button class="btn_class"><i class="fa fa-facebook"></i> Facebook</button>
                        <button class="btn_class"><i class="fa fa-instagram"></i> Instagram</button>
                    </div>
                </div>
            </div>
           
            
            <div class="row  justify-content-end">
                <div class="col-8 px-5">
                    <h3>Suscribete para tener mas novedades</h3>
                    <p>Ingrese un correo para hacerle llegar alguna novedad o actualización de Life and Health.</p>
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" placeholder="Ingresa tu email" value="${email}">
                        <div class="input-group-append mx-4">
                            <button class="btn_class" id="btnSuscribe_id" type="button">Suscribir</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    `;
    $(id).html(content);
    $("#btnSuscribe_id").on("click",()=>{
        alert("Suscrito!")
    })
}

export default Details;