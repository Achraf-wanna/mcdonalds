let params = new URLSearchParams(location.search);
var subCatId = params.get('subcatid')
var subCatName = params.get('subCatname')
var products = document.getElementById('product')
var loc = params.get('loc')

document.getElementById('subCatName').innerHTML = subCatName

axios.get('http://localhost:3000/produit/findProdBySubId/'+subCatId)
     .then( response => {
         var html = response.data.map(product => {
             return `
                        <a href="commande.html?prodId=${product._id}&prodName=${product.name}&extraId=${product.extraid}&loc=${loc}" class="col-md-4 d-flex flex-column align-items-center">
                            <img src="/img/${product.img}" alt="">
                            <h3 class="mt-5">${product.name}</h3>
                            <div class="price">${product.price} DH</div>
                        </a>
             `
         }).join(' ')

         products.innerHTML = html
     })

