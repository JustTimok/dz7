const GET_ID = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
const SEARCH_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const input = document.querySelector('input');
let container = document.querySelector('#content');
const button = document.querySelector('button');
const imgContainer = document.querySelector('.show-content');
let content = document.getElementById('detail')
const list = document.querySelector('.li-create');
const ins = document.querySelector('#des');

document.querySelector('#close').addEventListener('click', () => {
    content.style.display = 'none'
})

button.onclick = async () => {
    const response = await fetch(SEARCH_URL + input.value)
    const {drinks} = await response.json();
    renderData(drinks)
}

async function getDetail(e) {
    const req = await fetch(`${GET_ID}${e.target.id}`)
    const detail = await req.json()
    showDetail(detail)
    content.style.display = 'block'
}

function showDetail(data) {
    console.log(data)
    list.innerHTML = ''
    imgContainer.innerHTML = ''
    const {strInstructions} = data.drinks[0]
    ins.innerHTML = strInstructions
    for (let i = 1; i < 15; i++) {
        if (data.drinks[0][`strIngredient${i}`] !== null) {
            console.log(data.drinks[0][`strIngredient${i}`])
            let li = document.createElement('li')
            let imgHtml = document.createElement('img')
            console.log(data.drinks[0][`strIngredient${i}`])
            fetch(`https://www.thecocktaildb.com/images/ingredients/${data.drinks[0][`strIngredient${i}`]}-Small.png`)
                .then((req) => req.blob())
                .then((data) => console.log(imgHtml.src = URL.createObjectURL(data)))
            imgContainer.append(imgHtml)
            let span = document.createElement('span')
            let span2 = document.createElement('span')
            span.innerHTML = data.drinks[0][`strIngredient${i}`]
            span.style.marginRight = '10px'
            span2.innerHTML = data.drinks[0][`strMeasure${i}`]
            li.append(span)
            li.style.marginBottom = '35px'
            li.append(span2)
            li.style.marginBottom = '35px'
            list.append(li)
        }
    }
}

function renderData(data) {
    let element = []
    for (let i = 0; i < data.length; i++) {
        element.push(`<div class="card"  style="width: 18rem;">
                      <img src=${data[i].strDrinkThumb} class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${data[i].strDrink}</h5>
                        <p class="card-text">${data[i].strCategory}</p>
                        <a href="#" class="btn btn-primary" id=${data[i].idDrink} onclick="getDetail(event)">Ingredients</a>
                      </div>
                    </div>`
        )
    }
    container.innerHTML = element.reduce((el, html) => el += html)
}