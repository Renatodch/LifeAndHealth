import $ from 'jquery'
import * as s from "./utils/session"
import {uris} from "./utils/responses"
let user_id, fullname;

const Home = async (id)=>{
    let user = s.onSession()
    user_id = user._id||"";
    fullname = user.Data.Name||"";

    $(id).html(
        `
        <div id="homeDiv_id"  class="container-fluid px-0">
            <div class="row gx-0" >
                <div class="col-12" id="headerDiv_id">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light ">
                        <div class="container-fluid">
                            <a id="logo" href="${uris.PAGE_INIT}" class="mx-4">
                                <strong>Life and<span> Health</span></strong>
                            </a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link " id="initNavLink_id"  aria-current="page" href="${uris.PAGE_INIT}">Inicio</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link " id="articlesNavLink_id" href="#${uris.PAGE_ARTICLES}">Artículos</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link " id="detailsNavLink_id" href="#${uris.PAGE_DETAIL}">Detalles</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link " id="commentsNavLink_id" href="#${uris.PAGE_COMMENTS}">Comentarios</a>
                                    </li>                                    
                                    <li class="nav-item">
                                        <a class="nav-link " id="contactNavLink_id" href="#${uris.PAGE_CONTACT}">Contacto</a>
                                    </li>
                                    
                                </ul>
                                <div class="d-flex">
                                    <span class="me-4 " htmlFor="" id="profileModal_id">
                                        <div class="me-4 mt-0"> ${fullname}</div>
                                        <div class="me-4 mt-0">@${user_id}</div>
                                    </span>
                                    <button class="btn btn-outline-success" id="btnKill_id">Cerrar sesión</button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div class="row gx-0">
                <div class="col-12" id="navPathDiv_id">
                </div>
            </div >
            <div class="row gx-0 mt-4" id="navContentDiv_id" >
               
            </div>
            <div class="footer">
                <div class="caja-contenedor">
                    <div class="caja">
                        <h3>Noticias e información</h3>
                        <p>La multinacional de comida rápida estadounidense KFC ha sido acusada por las autoridades chinas de utilizar sustancias cancerígenas en el aceite de freír, informó el viernesRadio Internacional de China.
                        El caso ha saltado en la provincia de Shaanxi (al norte del país asiático), donde KFC ha sido acusada de reutilizar el aceite durante más de diez días...
                        <a href="https://www.20minutos.es/noticia/210425/0/kfc/acusada/cancerigenas/#:~:text=Seg%C3%BAn%20expertos%20chinos%20consultados%2C%20el,la%20benzopirina%2C%20reconocidas%20como%20cancer%C3%ADgenas.">Seguir leyendo</a>
                        </p>
                    </div>
        
                    <div class="caja">
                        <h3>Buscanos en</h3>
                        <a href="#">Facebook</a><a href="#">Instagram</a><a href="#">Pinterest</a><a href="#">Twitter</a>
                    </div>
        
                    <div class="caja">
                        <h3>Mas información</h3>
                        <div class="info">
                            <i class="fa fa-phone"></i>
                            <p>923-433-316 <br>913-158-337</p>
                        </div>
                    
                        <div class="info">
                            <i class="fa fa-envelope"></i>
                            <p>fze2133@gmail.com <br>joelacho2134@gmail.com</p>
                        </div>
        
                        <div class="info">
                            <i class="fa fa-map-marker"></i>
                            <p>Trujillo, Perú <br>13001</p>
                        </div>
                    </div>
                </div>
        
                <h4 class="creditos">
                    &copy, copyright @ 2022 Life and Health
                </h4>
            </div>
        </div>

        <div class="modal fade" id="articlesModal_id" tabindex="-1" aria-labelledby="articlesModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="articlesModalLabel">Formulario de Granja</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modalBody_id">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnCloseModal_id" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
                </div>
            </div>
        </div>
        `
    );

    $("#btnKill_id").on("click",()=>{
        s.closeSession();
        location.reload();   
    });

    
}

export default Home;