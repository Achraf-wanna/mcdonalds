var categories = document.getElementById('categories')

axios.get('http://localhost:3000/category')
     .then( response => {
         var html = response.data.map(category => {
             return `
                        <a href="subcat.html?catid=${category._id}&catname=${category.name}" class="col-md-4 d-flex flex-column align-items-center">
                            <img src="/img/${category.img}" alt="">
                            <h3 class="mt-5">${category.name}</h3>
                        </a>
             `
         }).join(' ')

         categories.innerHTML = html
     })


