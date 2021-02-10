let params = new URLSearchParams(location.search);
var productID = params.get("prodId");
var extraId = params.get("extraId");
var loc = params.get("loc");
var prodName = params.get('prodName')
document.getElementById('productName').innerHTML = prodName
var supp = document.getElementById('supp')
var oneProduct = document.getElementById("oneProduct")

var oneP=""

//   get One Product
axios
  .get("http://localhost:3000/produit/" + productID)
  .then((response) => {
    var extraName = "";
     axios.get('http://localhost:3000/extra/'+extraId)
    .then(res =>{
       extraName = res.data.name
    oneP=`
            <a class="col-md-4 d-flex flex-column align-items-center">
                                    <img src="/img/${response.data.img}" alt="">
                                    <p class="extraname mt-5">${extraName}</p>
                                    <div class="price" id="prodPrice" data-price="${response.data.price}">${response.data.price} DH</div>
                                </a>
            `
    oneProduct.innerHTML = oneP;
})
  })
  .catch((error) => console.log(error));


  //---------------------------------
const supplemntaire=async ()=>{

    var suppArr=[]
     await axios.get('http://localhost:3000/subcategory/')
    .then(response =>{

        var arr=[];
        for (let index = 0; index < response.data.length; index++) {
            if(response.data[index].name == 'Soda' || response.data[index].name == 'Café' || response.data[index].name == 'Other(Frite)' || response.data[index].name == 'Other(Sauce)' ){
                arr.push(response.data[index]._id)
            }
        }

       for (let index = 0; index < arr.length; index++) {
            axios.get('http://localhost:3000/produit/findProdBySubId/'+arr[index])
                .then(response =>{
                    for (let index = 0; index < response.data.length; index++) {
                        suppArr.push(response.data[index])

                    }

                    var html=""
                    for (let index = 0; index < suppArr.length; index++) {

                         html += `
                        <option value="${suppArr[index].price}" data-name="${suppArr[index].name}">${suppArr[index].name}</option>
                        `

                    }
                    supp.innerHTML = html

                })

       }
    })



}

var extraArray = [];

function getExtras() {
    obj = {
        extraName : supp.options[supp.selectedIndex].dataset.name,
        extraPrice : supp.value,
        extraQuantity : document.getElementById("extraQ").value
    }

    extraArray.push(obj)
    html = extraArray.map(extra =>{
        return `
        <p>+ ${extra.extraName} x ${extra.extraQuantity} : ${extra.extraPrice*extra.extraQuantity} DH </p>
        `
    }).join(" ")
    document.getElementById("extra").innerHTML = html
}



async function checkOut() {
    var prodPrice = document.getElementById("prodPrice").dataset.price

    var servTable = document.getElementById('ServTable').value
    var quantity = document.getElementById('quantity').value
    var codePromo = document.getElementById('codePromo').value
    var fidelCode = document.getElementById('carteF').value
    var codePromoReduc = await checkPromo();
    var fidelObj = await checkFidele()


    


    var points = 0


    var extraTotalPrice = 0
    var totalPrice = 0
    

    for (let index = 0; index < extraArray.length; index++) {

        extraTotalPrice += extraArray[index].extraPrice * extraArray[index].extraQuantity
    }

    totalPrice = parseInt(prodPrice) + parseInt(extraTotalPrice)

    if (codePromoReduc>0) {
        var reducedPrice = (totalPrice*quantity) - (totalPrice*quantity)*codePromoReduc/100
        console.log(reducedPrice);
    } else {
        var reducedPrice =  totalPrice*quantity
        console.log(reducedPrice);
    }

    if (fidelObj.reduction == 0) {
        
        newPin = Math.floor(Math.random() * 9999)+1000;
        if(prodPrice>=7 && prodPrice<=20){
            points = 2
        }
        if(prodPrice>=21 && prodPrice<=49){
            points = 12
        }
        if(prodPrice>=50){
            points = 20
        }

       await  axios.post('http://localhost:3000/cardfidele/',{
            pin : newPin,
            reduction : points
        })

      await  axios.post('http://localhost:3000/commande/',{
                productid : productID,
                price : reducedPrice,
                quantite : quantity,
                tableserv : servTable,
                promocode : codePromo,
                cardfidele : newPin,
                location : loc

            })

            
    await  axios.post('http://localhost:3000/exportTicket/',{
        extraArray : extraArray,
        ProdName : prodName,
        ProdPrice : prodPrice,
        quantity : quantity,
        servTable : servTable,
        promoCode : codePromo,
        fidelCode : newPin,
        totalPrice : reducedPrice
        

    }).then(response=>{
        console.log(response);
    })



    }else if(fidelObj.reduction){
        if(prodPrice>=7 && prodPrice<=20){
            points = 2
        }
        if(prodPrice>=21 && prodPrice<=49){
            points = 12
        }
        if(prodPrice>=50){
            points = 20
        }
        

        await  axios.patch('http://localhost:3000/cardfidele/'+fidelObj._id,{
            
            reduction : fidelObj.reduction+points
        }).then(response=>{
            console.log(response);
        })

        
        await  axios.post('http://localhost:3000/commande/',{
            productid : productID,
            price : reducedPrice,
            quantite : quantity,
            tableserv : servTable,
            promocode : codePromo,
            cardfidele : fidelCode,
            location : loc

        }).then(response=>{
            console.log(response);
        })

        await  axios.post('http://localhost:3000/exportTicket/',{
            extraArray : extraArray,
            ProdName : prodName,
            ProdPrice : prodPrice,
            quantity : quantity,
            servTable : servTable,
            promoCode : codePromo,
            fidelCode : fidelCode,
            totalPrice : reducedPrice
            

        }).then(response=>{
            console.log(response);
        })


    }



   
    

}

async function checkPromo() {
    var codePromo = document.getElementById('codePromo').value
    var valid = document.getElementById('promoValid')
    var reduction = 0
    

    await axios.get('http://localhost:3000/promocode/')
         .then(response =>{
            const result = response.data.find( obj => obj.code == codePromo);
            if(result){
                console.log("yes");
                reduction = result.reduc
                valid.innerHTML = 'Your code is valid, this is your reduction ' + result.reduc + '%'
              


            }else{
                console.log("no");
                valid.innerHTML = 'Your code is not valid'
            

            }
         }).catch(er => console.log(er))

         return reduction

}

async function checkFidele() {
    var pin = document.getElementById("carteF").value
    var valid = document.getElementById("fideleValid")
    var fideleObject

    await axios.get('http://localhost:3000/cardfidele/')
    .then(response =>{
       const result = response.data.find( obj => obj.pin == pin);
       if(result){
           console.log("yes");
           fideleObject = result
           valid.innerHTML = 'Your Pin is valid, this is your Points ' + result.reduction

       }
       else{
        valid.innerHTML = 'Your Pin is not valid'
        fideleObject = {
            reduction : 0
        }
       }
    })

    return fideleObject
}




supplemntaire()

