let app={}
app.data={}
app.totalValue=0.00
app.sortList=1  //1: asc  , -1: desc

document.addEventListener("DOMContentLoaded",async function(){
    const stockList=document.querySelector("tbody");
    app.list=stockList;

    
    //fetch local data and present current list
    fetchLocalStorage()
    await updateStockList()

    //add stock
    document.querySelector("#addButton").addEventListener("click",handleFormSubmit);

    //sell stock
    document.querySelector("#sellButton").addEventListener("click",handleSelling);
    
})

fetchLocalStorage=()=>{
  let i=0
  for (var symbol in localStorage) {
    if(i>=localStorage.length){
      break;
    }
    app.data[symbol]=parseInt(localStorage[symbol])
    i=i+1

  }
  console.log(app.data)
}

//check if the symbol is already inside the current list
function ifStockAlreadyExist(stock){
  console.log(stock in app.data)
  return (stock in app.data)
}

async function handleFormSubmit(e){
    e.preventDefault();

    //update data to app.data
    const newStock = document.querySelector("#new_stock").value.toUpperCase();
    const numOfShares = document.querySelector("#num_stock").value;

    if (ifStockAlreadyExist(newStock)){
      app.data[newStock]=parseInt(app.data[newStock])+parseInt(numOfShares);
    }else{
      app.data[newStock]=parseInt(numOfShares)
    }

    //update stock list based on app.data
    updateStockList()

    document.querySelector("#new_stock").value=""
    document.querySelector("#num_stock").value=""
}

async function handleSelling(e){
    e.preventDefault();
    //update data to app.data
    const newStock = document.querySelector("#sell_stock").value.toUpperCase();
    const numOfShares = document.querySelector("#sell_num").value;

    if(!ifStockAlreadyExist(newStock)){
      window.alert("You do not have this stock")
    }else if(numOfShares > app.data[newStock]){
      window.alert("You do not have enough shares")
    }else{
      app.data[newStock]=parseInt(app.data[newStock])-parseInt(numOfShares);

      if(app.data[newStock]==0){   //remove this stock if it is sold out 
        localStorage.removeItem(newStock)
      }
          //update stock list based on app.data
      updateStockList()
    }

    document.querySelector("#sell_stock").value=""
    document.querySelector("#sell_num").value=""
}

function clearPreviousList(){
    var i;
    let item_list=document.querySelectorAll(".stock-item")
    for(i=0;i<item_list.length;i++){
      item_list[i].remove()
    }
}

async function updateStockList(){
    var i;
    //clear previous stock list
    clearPreviousList()

    console.log(app.data)

    app.totalValue=0.00
    for (var symbol in app.data) {
      //console.log(symbol + " has value " + app.data[symbol]);
      if(app.data[symbol]>0){
        await updateOneStock(symbol);
      }
    }
  
    console.log(app.totalValue)

    //after updating each stock, output total value
    document.querySelector(".totalValue").innerText=`$${app.totalValue.toFixed(2)}`;

}

async function updateOneStock(symbol){

  //create new row of stock table 
    const tr = document.createElement("tr")
    tr.className="stock-item"

    //stock name
    const content=document.createElement("td")
    const innerText=document.createTextNode(symbol)
    content.appendChild(innerText)

    //number of shares
    const numOfShares=app.data[symbol]
    const content1=document.createElement("td")
    const innerText1=document.createTextNode(numOfShares)
    content1.appendChild(innerText1)


    //unit price
    const content2=document.createElement("td")
    const price=await getStockPrice(symbol)
    const innerText2=document.createTextNode(`${price}`)
    content2.appendChild(innerText2)

    //total price
    const content3=document.createElement("td")
    const totalPrice=price*numOfShares
    const innerText3=document.createTextNode(parseFloat(totalPrice).toFixed(2))
    content3.appendChild(innerText3)

    tr.appendChild(content)
    tr.appendChild(content1)
    tr.appendChild(content2)
    tr.appendChild(content3)

    app.list.appendChild(tr)

    app.totalValue = parseFloat(app.totalValue) + parseFloat(totalPrice)

    //save each item to localStorage
    localStorage.setItem(symbol, numOfShares);
}

async function getStockPrice(newStock){
    const api_url='https://cloud.iexapis.com/stable/tops?token=pk_44f10fc8c3a44a3f8476c67e102dd811&symbols='+newStock
    const httpResponse=await fetch(api_url)

    const data=await httpResponse.json()
                
    console.log(data[0].lastSalePrice)
    return data[0].lastSalePrice
}



// apply bubble sort
// n: the index of column
function handleSort(n) {
  var i, j, x, y;

  let rows = app.list.rows;

  for(j=rows.length-1; j>=0; j--){
    for(i=0; i<j; i++){
      x = rows[i].getElementsByTagName("td")[n].innerHTML;
      y = rows[i + 1].getElementsByTagName("td")[n].innerHTML;

      //it has problem to compare integer, so convert to float first
      if(n>0){
        x=parseFloat(x)
        y=parseFloat(y)
      }

      if(app.sortList==1){
        if(x > y){
          //insertedNode = parentNode.insertBefore(newNode, referenceNode)
          //parentNode : The parent of the newly inserted node.
          //newNode:  The node to be inserted.
          //referenceNode :The node before which newNode is inserted. If this is null, then newNode is inserted at the end of parentNode's child nodes.
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        }
      }

      else{
        if(x < y){
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        }
      }
    }
  }
  //console.log(app.sortList)
  app.sortList= -app.sortList  //double click will switch the order
  
}