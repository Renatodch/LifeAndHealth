import './css/estilos.css'
import './router'
import $ from 'jquery'

import router from './router'

window.addEventListener("load",()=>{
    router();
})
window.addEventListener("hashchange",()=>{
    router();
})