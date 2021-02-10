// post category


function send() {
    var namee = document.getElementById('category').value;
var img = document.getElementById('img').value;
    obj = {
        name : namee,
        img : img
    }
    console.log(obj);

    axios.post('http://localhost:3000/category',obj)
      .then(function (response) {
        console.log(response);
        window.location.href='./category.html'
      })
      .catch(function (error) {
        console.log(error);
      });
    
   

}

// afficher les categories


function getCat() {
    var table = document.getElementById('catTable');
    var html = "";
    axios.get('http://localhost:3000/category')
.then(function (response) {
  for (let index = 0; index < response.data.length; index++) {
      html +=`
      <tr>
                <td>${response.data[index].name}</td>
                <td><button class="btn btn-success" onclick="updateCat('${response.data[index]._id}')">Update</button>
                <button class="btn btn-danger" onclick="deleteCat('${response.data[index]._id}')">Delete</button></td>
            </tr>
      `
      
  }

  table.innerHTML = html
})
}

// delete category by id

function deleteCat(id) {
    axios.delete('http://localhost:3000/category/'+ id)
    .then(function (response) {
        console.log(response);
        window.location.href='./category.html'
      })
      .catch(function (error) {
        console.log(error);
      });
    
}

// update category

function updateCat(id) {

  var nameeupdate = document.getElementById('category').value;
  var imgupdate = document.getElementById('img').value;
      obj = {
          name : nameeupdate,
          img : imgupdate
      }
      console.log(obj);
  
      axios.patch('http://localhost:3000/category/' +id ,obj)
        .then(function (response) {
          console.log(response);
          window.location.href='./category.html'
        })
        .catch(function (error) {
          console.log(error);
        });
  
 

}

// load subcategory

async function  loadsubCat() {
  var table2 = document.getElementById('subcatTable');
  var html = "";
  await axios.get('http://localhost:3000/subcategory')
.then(function (res) {
  
for (let index = 0; index < res.data.length; index++) {
    html +=`
    <tr>
              <td>${res.data[index].name}</td>
              <td><button class="btn btn-success" onclick="updatesubCat('${res.data[index]._id}')">Update</button>
              <button class="btn btn-danger" onclick="deletesubCat('${res.data[index]._id}')">Delete</button></td>
          </tr>
    `
    
  }

  table2.innerHTML = html
})
}

// get category


async function getsubCat() {
    var selectsubcat = document.getElementById('selectsubcat');
    var html = "";
   await axios.get('http://localhost:3000/category')
.then(function (response) {
 
  for (let index = 0; index < response.data.length; index++) {
      html +=`
      
                <option value="${response.data[index]._id}">${response.data[index].name}</option>
            
      `

  }
  selectsubcat.innerHTML = html
}

)}

// onload les deux functions

function loadsub(){
  loadsubCat()
  getsubCat()
}

// post subcategory

function send1() {
    var subcategory = document.getElementById('subcategory').value;
    var imgsubcat = document.getElementById('imgsubcat').value;
    var categoryid = document.getElementById('selectsubcat').value;
    obj = {
        name : subcategory,
        img : imgsubcat,
        catid : categoryid
    }
    console.log(obj);

    axios.post('http://localhost:3000/subcategory',obj)
      .then(function (response) {
        console.log(response);
        window.location.href='./subcategory.html'
      })
      .catch(function (error) {
        console.log(error);
      });
    
   

}


// delete subcategory 

function deletesubCat(id) {
  axios.delete('http://localhost:3000/subcategory/'+ id)
  .then(function (response) {
      console.log(response);
      window.location.href='./subcategory.html'
    })
    .catch(function (error) {
      console.log(error);
    });
  
}

// update subcategory

function updatesubCat(id) {
  var updatesubcategory = document.getElementById('subcategory').value;
  var updateimgsubcat = document.getElementById('imgsubcat').value;
  var updatecategoryid = document.getElementById('selectsubcat').value;
  obj = {
      name : updatesubcategory,
      img : updateimgsubcat,
      catid : updatecategoryid
  }
  console.log(obj);

  axios.patch('http://localhost:3000/subcategory/'+id ,obj)
    .then(function (response) {
      console.log(response);
      window.location.href='./subcategory.html'
    })
    .catch(function (error) {
      console.log(error);
    });
  
 

}

// load products


async function  loadproduct() {
  var products = document.getElementById('productstable');
  var html = "";
  await axios.get('http://localhost:3000/produit')
.then(function (res) {
  
for (let index = 0; index < res.data.length; index++) {
    html +=`
    <tr>
              <td style="margin-right: 20px">${res.data[index].name}</td>
              <td><button class="btn btn-success" onclick="updateproduct('${res.data[index]._id}')">Update</button>
              <button class="btn btn-danger" onclick="deleteproduct('${res.data[index]._id}')">Delete</button></td>
          </tr>
    `
    
  }

  products.innerHTML = html
})
}



async function getselectsubcategory() {
  var selectdesubcategory = document.getElementById('selectdesubcategory');
  var html = "";
 await axios.get('http://localhost:3000/subcategory')
.then(function (response) {

for (let index = 0; index < response.data.length; index++) {
    html +=`
    
              <option value="${response.data[index]._id}">${response.data[index].name}</option>
          
    `

}
selectdesubcategory.innerHTML = html
}

)}

// update product

function updateproduct(id) {
  var updateproductname = document.getElementById('productname').value;
  var updateproductprice = document.getElementById('productprice').value;
  var updateproductimg = document.getElementById('productimg').value;
  var updateselectdesubcategory = document.getElementById('selectdesubcategory').value;
  var updateselectextra = document.getElementById('selectextra').value;
  obj = {
      name : updateproductname,
      price : updateproductprice,
      img : updateproductimg,
      subcatid : updateselectdesubcategory,
      extraid : updateselectextra

  }
  console.log(obj);

  axios.patch('http://localhost:3000/produit/' +id ,obj)
    .then(function (response) {
      console.log(response);
      window.location.href='./product.html'
    })
    .catch(function (error) {
      console.log(error);
    });
  
 

}


async function selectextra() {
  var selectextra = document.getElementById('selectextra');
  var html = "";
 await axios.get('http://localhost:3000/extra')
.then(function (response) {

for (let index = 0; index < response.data.length; index++) {
    html +=`
    
              <option value="${response.data[index]._id}">${response.data[index].name}</option>
          
    `

}
selectextra.innerHTML = html
}

)}

function loadproducts(){
  loadproduct()
  getselectsubcategory()
  selectextra()
}

// post produit

function sendproduit() {
  var productname = document.getElementById('productname').value;
  var productprice = document.getElementById('productprice').value;
  var productimg = document.getElementById('productimg').value;
  var selectdesubcategory = document.getElementById('selectdesubcategory').value;
  var selectextra = document.getElementById('selectextra').value;
  obj = {
      name : productname,
      price : productprice,
      img : productimg,
      subcatid : selectdesubcategory,
      extraid : selectextra

  }
  console.log(obj);

  axios.post('http://localhost:3000/produit',obj)
    .then(function (response) {
      console.log(response);
      window.location.href='./product.html'
    })
    .catch(function (error) {
      console.log(error);
    });
  
 

}

// delete product

function deleteproduct(id) {
  axios.delete('http://localhost:3000/produit/'+ id)
  .then(function (response) {
      console.log(response);
      window.location.href='./product.html'
    })
    .catch(function (error) {
      console.log(error);
    });
  
}




// Promo codes affichage

async function  loadpromocodes() {
  var Promocodestable = document.getElementById('Promocodestable');
  var html = "";
  await axios.get('http://localhost:3000/promocode')
.then(function (res) {
  
for (let index = 0; index < res.data.length; index++) {
    html +=`
    <tr>
              <td>${res.data[index].code}</td>
              <td>${res.data[index].reduc}</td>
              <td>${res.data[index].is_valid}</td>
              <td><button class="btn btn-warning" onclick="offpromocode('${res.data[index]._id}','${res.data[index].code}','${res.data[index].reduc}')">Turn Off</button>
              <button class="btn btn-danger" onclick="deleteproduct('${res.data[index]._id}')">Delete</button></td>
          </tr>
    `
    
  }

  Promocodestable.innerHTML = html
})
}



function promocodes(){
  loadpromocodes()
}

// post promo codes


function sendpromo() {
  var Promocode = document.getElementById('Promocode').value;
  var reduction = document.getElementById('reduction').value;
  obj = {
      code : Promocode,
      reduc : reduction,
      is_valid : true

  }
  console.log(obj);

  axios.post('http://localhost:3000/promocode',obj)
    .then(function (response) {
      console.log(response);
      window.location.href='./promocode.html'
    })
    .catch(function (error) {
      console.log(error);
    });
  
 

}



// update promocode

function offpromocode(id,code,reduc) {

  obj = {
    code : code,
    reduc : reduc,
    is_valid : false
}

  axios.patch('http://localhost:3000/promocode/'+id,obj)
    .then(function (response) {
      console.log(response);
      window.location.href='./promocode.html'
    })
    .catch(function (error) {
      console.log(error);
    });
  
 

}