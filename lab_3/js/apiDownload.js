fetch('https://dummyjson.com/products')
.then(data => data.json())
.then(data => {

    const products = data.products.slice(0, 30);
    const tableBody = document.querySelector('#productTable tbody');



    products.forEach(element => {
        const row = document.createElement('tr')
        const col_image = document.createElement('td')
        const col_title = document.createElement('td')
        const col_desc = document.createElement('td')
        element.images.forEach(image =>{
            const img = document.createElement('img')
            img.src = image
            col_image.appendChild(img)
            row.appendChild(col_image)
        })



        col_title.textContent = element.title
        row.appendChild(col_title)

        col_desc.textContent = element.description
        row.appendChild(col_desc)

        tableBody.appendChild(row)

    });




})


const productTable = document.getElementById('productTable')
const searchBar = document.getElementById('textSearch')
const tableRows = productTable.getElementsByTagName('tr')

searchBar.addEventListener('keyup',search)


function search(){
    const searchValue = searchBar.value
    
    for (i=0 ; i < tableRows.length; i++){

        const row = tableRows[i]

        const cells = row.getElementsByTagName('td')
        let match = false
        for(let cell of cells){

            if (cell.textContent.includes(searchValue)){
                match = true
                break;
            }
        }

        row.style.display = match ? '' : 'none';
    }

}