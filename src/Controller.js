const url = "http://localhost:8766";
const url_login = `${url}/login`
const url_user = `${url}/user`
const url_articles = `${url}/articles`
const url_comments = `${url}/comments`

const Login = async(username, password)=>{
    try{
        const urlPath = `${url_login}`;
        const body = JSON.stringify({
            password:password,
            user:username,
        })
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        };
        
        const response = await fetch(`${urlPath}`, settings)
        console.log(response);
        const data = await response.json();
        return data;
    }
    catch(error){
        return 0;
    }
}

const SaveUser = async(User, newObjFlag)=>{
    try{
        const body = JSON.stringify(User)
        const settings = {
            method: newObjFlag?'POST':'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        };

        const response = await fetch(url_user, settings)
        //console.log(response.body);
        const data = await response.json();
        return data;
    }
    catch(error){
        return 0;
    }
}

const GetArticles = async ()=>{
    let query = `${url_articles}`
    try{
        const settings = {
            method: 'GET',                    
        };
        const response = await fetch(query,settings)
        const data = await response.json();

        return data;
    }
    catch(error){
        return 0;
    }
}
const GetComments = async ()=>{
    try{
        const settings = {
            method: 'GET',                    
        };
        const response = await fetch(url_comments,settings)
        const data = await response.json();

        return data;
    }
    catch(error){
        return 0;
    }
}

const SaveComment = async(Comment)=>{
    try{
        const body = JSON.stringify(Comment)
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        };

        const response = await fetch(url_comments, settings)
        //console.log(response.body);
        const data = await response.json();
        return data;
    }
    catch(error){
        return 0;
    }
}

export {
    Login,
    GetArticles,
    GetComments,
    SaveComment,
    SaveUser
}