import $ from 'jquery'
import * as s from "./utils/session"
import Home from './Home'
import Login from './Login'

import {getHash, resolveRoutes} from "./utils/general"
import About from './About'
import Articles from './Articles'
import Contact from './Contact'
import { paths, uris } from './utils/responses'
import Details from './Details'

const loading = `
<div class="col d-flex justify-content-center" style="margin-top:150px; height:300px">
    <img src='./src/img/loading.gif' width="100" height="100"/>
</div>`;

const routes = {
    [uris.PAGE_INIT]: About,
    [uris.PAGE_DETAIL]: Details,
    [uris.PAGE_ARTICLES]: Articles,
    [uris.PAGE_CONTACT]: Contact,
}

const router = async ()=>{
    let hash = getHash();
    if(hash=='') return;
    let route = resolveRoutes(hash);

    let render = routes[route]?routes[route]:Error("Error");

    if(s.onSession()){
        await Home($('#root'));
        $('#navContentDiv_id').html(loading);
        await render('#navContentDiv_id');
        
    }else if(!s.onSession()){
        $("body").css({"background-image": `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%), url("./src/img/login.jpg")`});
        $("body").css({"background-size": `cover`});
        $("body").css({"background-repeat": `no-repeat`});
        $("body").css({"background-position": `center center`});
        Login($('#root'));
        location.hash ="";
    }  
}

export default router;