document.addEventListener("DOMContentLoaded",function(){

    document.querySelector(".checkOut").addEventListener("click",handleCheckOut);

    document.querySelector(".reset").addEventListener("click",handleReset);

})



function handleCheckOut(e){
    console.log(e);

    // If the confirmation box has been generated, remove it when reset
    let box2=document.querySelector(".Box2");
    if(box2){
        box2.remove();
    }

    const bodyContext=document.querySelector("body");

    //create 2nd box
    const confirmationTable=document.createElement("div");
    confirmationTable.className="Box2";

    const confirmTitle=document.createElement("h1");
    confirmTitle.innerText="Order Confirmation";
    confirmationTable.appendChild(confirmTitle);

    const line1=document.createElement("p");
    line1.className="order_text";
    line1.innerText="You ordered:";
    confirmationTable.appendChild(line1);

    let item=document.querySelectorAll(".item");

    let sum=0;
    for(i=0; i<4; i++){
        if(item[i].querySelector("input").checked){
            
            const selectedItem=document.createElement("p");
            selectedItem.className="indented";
            // node 2 is text, node 3 is price
            selectedItem.innerText=item[i].childNodes[2].textContent.trim();
            console.log(i);

            let price_copy=item[i].childNodes[3].cloneNode(true);
            selectedItem.appendChild(price_copy);

            confirmationTable.appendChild(selectedItem);

            sum = sum + parseFloat(item[i].childNodes[3].innerText.substring(1));
        }
    }

    //for T-shirt
    if(item[4].querySelector("input").checked){
            
        const selectedItem=document.createElement("p");
        selectedItem.className="indented";
        selectedItem.innerText = item[4].childNodes[2].textContent.trim() + " (" + getSize() + ")";


        let price_copy=item[4].childNodes[3].cloneNode(true);
        selectedItem.appendChild(price_copy);

        confirmationTable.appendChild(selectedItem);

        sum = sum + parseFloat(item[4].childNodes[3].innerText.substring(1));
    }

    
    const breakLine=document.createElement("hr");
    confirmationTable.appendChild(breakLine);

    const total=document.createElement("p");
    total.innerText="Your Total";
    total.className="indented_total";
    const totalPrice=document.createElement("span");
    totalPrice.innerText="$"+sum.toFixed(2);
    totalPrice.className="price";
    total.appendChild(totalPrice);
    confirmationTable.appendChild(total);

    bodyContext.appendChild(confirmationTable);
}


function handleReset(e){
    console.log(e);
    let checkBox=document.querySelectorAll("input");

    for (el of checkBox){
        el.checked=false;
    }

    // If the confirmation box has been generated, remove it when reset
    let box2=document.querySelector(".Box2");
    if(box2){
        box2.remove();
    }


}

function selectOnlyThis(id){
    let sizeSelection=document.querySelectorAll("size input");
    Array.prototype.forEach.call(sizeSelection,function(e){
        e.checked=false;
    });
    id.checked=true;
}

// get the only selected size of T-shirt
function getSize(){
    let sizeSelection=document.querySelectorAll("size input");
    for(i=0; i<4; i++){
        if(sizeSelection[i].checked){
            return sizeSelection[i].dataset.size;
        }
    }
    return "";
}

