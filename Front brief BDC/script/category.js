var categories = document.getElementById('categories')
let params = new URLSearchParams(location.search);
var loc = params.get('loc')

axios.get('http://localhost:3000/category')
     .then( response => {
         var html = response.data.map(category => {
             return `
                        <a href="subcat.html?catid=${category._id}&catname=${category.name}&loc=${loc}" class="col-md-4 d-flex flex-column align-items-center">
                            <img src="/img/${category.img}" alt="">
                            <h3 class="mt-5">${category.name}</h3>
                        </a>
             `
         }).join(' ')

         categories.innerHTML = html
     })


