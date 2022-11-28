import $ from 'jquery'
import './router'

import './sass/styles.scss'
import 'font-awesome/css/font-awesome.css'
import router from './router'


window.addEventListener("load",()=>{
    router();
})
window.addEventListener("hashchange",()=>{
    router();
})