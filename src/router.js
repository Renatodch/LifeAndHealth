import $ from 'jquery'

import Home from './home'
const routes = {
    '/': Home,
}

const router = async ()=>{
    let hash = getHash();
    if(hash=='') return;
    let route = resolveRoutes(hash);
    let render = routes[route]?routes[route]:Error("Error");
}

const getHash =()=>{
    if(location.hash.toString().length == 0){
        return '/'; 
    }else{
        let arr = location.hash.toString().toLocaleLowerCase().split('/')
        if (arr[0]=="home") return "home";
        else return (arr[1] || '');
    }

}
const getIndex = (hash) =>{
    return location.hash.toString().toLocaleLowerCase().split('/')[2]
}


const resolveRoutes = (hash) =>{
    if(hash==="/") return hash
    return `/${hash}`;
}


export default router;