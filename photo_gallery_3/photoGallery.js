let app={}

document.addEventListener("DOMContentLoaded",function(){
    document.querySelector("#update").addEventListener("click",handleUpdate)
    const list=document.querySelector("#photoList");
    app.list=list;
})


async function handleUpdate(e){
    e.preventDefault();

    var i;
    const count=document.querySelector("#quantity").value
    const api_url='https://api.unsplash.com/photos/?client_id=KoWWLZgLwFpAVYzKGJ5XepJBUR-o0q7kuUCPuwdovvw&GET/photos/random?count='+count;
    const httpResponse=await fetch(api_url)
    app.data=await httpResponse.json()

    console.log(app.data)

    console.log(count)

    removeAllChildNodes(app.list)

    let UniqueNumberList=[];
    while(UniqueNumberList.length<count){
        let newNumber=generateRandom();
        if(UniqueNumberList.indexOf(newNumber)<0){   //make sure the new number is not repeated
            UniqueNumberList.push(newNumber)
        }
    }

    for(i=0; i<count; i++){
        addFigure(UniqueNumberList[i])
    }

}

function addFigure(n){
    const content=document.createElement("section")
    content.className="col-sm-3 pt-3" 

    const image=document.createElement("img")
    //image.src=Object.values(app.data[n].urls)[0]

    image.src=app.data[n].urls.regular
    image.className="rounded .img-fluid"

    const description=document.createElement("p")
    description.className="pb-3 text-center mt-3"
    const innerText=document.createTextNode(app.data[n].alt_description)
    description.appendChild(innerText)

    content.appendChild(image)
    content.appendChild(description)

    app.list.appendChild(content)
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function generateRandom(){
    return Math.floor(Math.random()*10);
}

