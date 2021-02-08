let params = new URLSearchParams(location.search);
var productID = params.get("prodId");
var extraId = params.get("extraId");

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

function checkOut() {
    var prodPrice = document.getElementById("prodPrice").dataset.price
    var extraTotalPrice = 0
    var totalPrice = 0

    for (let index = 0; index < extraArray.length; index++) {

        extraTotalPrice += extraArray[index].extraPrice * extraArray[index].extraQuantity
    }

    totalPrice = parseInt(prodPrice) + parseInt(extraTotalPrice)

    document.getElementById("total").innerHTML = "Total Price : "+totalPrice



}




supplemntaire()

