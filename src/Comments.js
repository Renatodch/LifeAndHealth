import { pathContent, setCurrentPage, monthNames } from "./utils/general";
import $, { data, isPlainObject } from 'jquery'
import * as s from "./utils/session"
import * as da from "./Controller"
import { lengths, messages, responses } from "./utils/responses";
import {Timestamp} from "firebase/firestore"

let numberOfComments;
let comments;
let currentSec;
let numberOfSec;

const publishComment = async(article_id)=>{
    let user = s.onSession();
    let data = {
        UserName :user.Data.Name,
        UserID :user._id,
        Content: $("#idComment").val(),
        Rate: $("#idRate").val(),
        article_id
    }
    if(data.Content == ""){
        alert("No has escrito tu comentario");return;
    }
    data.Rate = (+data.Rate).toFixed(1)
    console.log(data.Rate);
    let obj = {
        Data:data,
        _id:"",
    }
    let res = await da.SaveComment(obj);
    if(res === 0){
        alert(messages.BAD_GATEWAY); return;
    }
    switch(res.res){
        case responses.SUCCESS_SAVE:
            //console.log(res.d);
            await UpdateComments(0, article_id);
            break;
        case responses.SERVER_ERROR:
            alert(messages.SERVER_ERROR);
            return;
    }
}

async function UpdateComments(num, article_id){
    if($("#noComments_id").length>0){
        $("#noComments_id").remove();
    }

    comments = await da.GetComments(article_id);

    numberOfComments = comments.length;
    if(comments === 0){
        alert(messages.BAD_GATEWAY);return;
    }
    currentSec = +num+1;
    $("#commentsDiv_id").html(MakeComments(num))
    $("#index_id").html(MakeIndex());
    $("#detailIndex_id").html(MakeDetailIndex());

    for(let i = 1; i<=numberOfSec; i++){
        $(`#comments_${i}`).off("click")
        $(`#comments_${i}`).on("click",(e)=>{
            UpdateComments($(e.target).html()-1, article_id);
        })
    }
    $(`#prevPage_id`).off("click")
    $(`#prevPage_id`).on("click",(e)=>{
        if(currentSec > 1)
            UpdateComments(currentSec-2, article_id);
    })
    $(`#nextPage_id`).off("click")
    $(`#nextPage_id`).on("click",(e)=>{
        if(currentSec < numberOfSec)
            UpdateComments(currentSec, article_id);
    })
}


const MakeDetailIndex = ()=>{
    return `Pág. ${currentSec} de ${numberOfSec}`;
}
function MakeComments(num){
    let left = numberOfComments - num*5;
    left = left > 5? 5:left;
    let segment = comments.slice(5*num, 5*num+left)
    return numberOfComments === 0? `<h5 id="noComments_id" class="mt-3">Aun no hay comentarios</h5>`:segment.map(obj => {
        let dateStr = MakeDateString(obj.Data.FullDate);  
        let rate = +obj.Data.Rate;
        console.log(rate)
        let stars="";
        for(let s = 1; s<= 5; s++){
            if(rate>=s){
                stars += `<span class="me-2"><i class="fa fa-star"></i></span>`;
            }else if(s > rate){
                if((s - rate) < 1){
                    stars += `<span class="me-2"><i class="fa fa-star-half-o"></i></span>`;
                }else{
                    stars += `<span class="me-2"><i class="fa fa-star-o"></i></span>`;
                }
            }
        }
        return (`
        <div class="row mt-4 text-justify float-left shadow  bg-body rounded">
            <div class="col">
                <div class="row p-1">
                    <div class="col-1 me-4">
                        <div class="row " style="width:85px">
                            <img src="./src/img/profile.png" alt="" class="rounded-circle" width="50" height="60">
                        </div>
                    </div>
                    <div class="col-6 pt-1">
                        <div class="row">
                            <strong>${obj.Data.UserName}</strong>
                        </div>
                        <div class="row">
                            <div>@${obj.Data.UserID}</div>
                        </div>
                    </div>
                    <div class="col pt-2">
                        <div class="row">
                            <div class="col">
                            ${stars}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row pt-2 px-3 pb-3">
                    <p>${obj.Data.Content}</p>
                    <br>
                    <span>${dateStr}</span>
                </div>
            </div>
    
        </div>
        `);
    }).join("");
}

function MakeDateString(timestamp){
    let fulldate = new Timestamp(timestamp.seconds,timestamp.nanoseconds);
    let date = fulldate.toDate();
    return `${date.getHours()}:${date.getMinutes()} - ${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`; 
}
function MakeIndex(){
    numberOfSec = parseInt(""+numberOfComments/5);
    numberOfSec += +(!(numberOfComments%5===0) ||  numberOfComments===0)
   
    
    let content = `<li class="page-item"><button class="page-link" id="prevPage_id">Previous</button></li>`;
    for(let i = 1; i<=numberOfSec; i++){
        content += `<li class="page-item"><button class="page-link" id="comments_${i}">${i}</button></li>`
    }
    content += `<li class="page-item"><button class="page-link" id="nextPage_id">Next</button></li>`;
    return content;
}
const Comments = async (id, article_id)=>{

    let content =`
        <div class="col">
            <div class="row">
                        
                <div class="col pt-2 align-self-end">
                    <span id="detailIndex_id"></span>
                </div>
            </div>
            <div class="row ">
                <div id="commentsDiv_id" class="col-sm-12  pb-1">
                    
                </div>
            </div>
            <div class="row  mt-3">
                <div class="col-5 ">
                    <nav aria-label="Page navigation ">
                        <ul class="pagination" id="index_id">
                        
                        </ul>
                    </nav>
                </div>
                
            </div>
            
            <div class="row mb-1 mt-3 pe-5">
                <div class="col-6 pt-2">
                    <label for="idRate" class="form-label">Califica este artículo</label>
                </div>
                <div class="col-4 pe-5">
                    <input type="number" min=0.0 max=5.0 step=0.5 class="form-control" id="idRate" value=0 required value="">
                </div>
            </div>
            <div class="row mb-3 mt-3">
                <label for="idComment" class="form-label">Y déjanos tu comentario</label>
                <textarea  maxlength="${lengths.MAX_256}" class="form-control" id="idComment" required value=""></textarea>
            </div>
            <div class="row mb-3">
                <div class="col-3">
                    <button id="btnPublish_id" class="btn btn-primary">Publicar</button>
                </div>
            </div>
        </div>
    `;
    $(id).html(content);

    await UpdateComments(0, article_id);

    $("#btnPublish_id").on("click",async ()=>{
        await publishComment(article_id);
    });

    $("#idRate").on("input", (e)=>{
        let val = +$(e.target).val();
        val = String(val).match(/[0-9]+([.][0-9]*)?/g);
        if(val ){
            $(e.target).val(+val[0] > 5? 0: +val[0] );
        }
         
    })
}

export {
    Comments
};