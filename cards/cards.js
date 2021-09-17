//generate random number from 0 to 52

let fiveUniqueNumber=[];
let index=["ace",2,3,4,5,6,7,8,9,10,"jack", "queen", "king"];
let cardType=["clubs","diamonds","hearts","spades"];

function generateRandom(){
    return Math.floor(Math.random()*53);
}

function generateFiveNumber(){
    while(fiveUniqueNumber.length<5){
        let newNumber=generateRandom();
        if(fiveUniqueNumber.indexOf(newNumber)<0){   //make sure the new number is not repeated
            fiveUniqueNumber.push(newNumber)
        }
    }
}

function getFileName(n){
    if(n==0) return "face_down";
    return index[(n-1)%13]+"_of_"+cardType[Math.floor((n-1)/13)];
}

document.addEventListener("DOMContentLoaded",function(){
    let refreshLink=document.querySelector("#deal_cards");
    //console.log(refreshLink);
    refreshLink.addEventListener("click",(e)=>{
        console.log("Refresh cards")
        generateFiveNumber();
        images=document.querySelectorAll("img");
        for(i=0; i<5; i++){
            images[i].src="images/"+getFileName(fiveUniqueNumber[i])+".png";
        }
        fiveUniqueNumber=[];
    })
})