const url = "";

const getArticles = async ()=>{
    let query = `${url}`
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
const getComments = async ()=>{

}

export {
    getArticles,
    getComments,
}