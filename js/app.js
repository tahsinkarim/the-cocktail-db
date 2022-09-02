const loadData = async (id, dataLimit) =>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${id}` ;
    const res = await fetch(url)
    const data = await res.json()
    return displayData(data.drinks, dataLimit)
}
const displayData = (data, dataLimit) =>{
     //If no phones found
     const noDrink = document.getElementById('no-drink')
     if(data === null){
         toggleSpinner(false)
         noDrink.classList.remove('d-none');
     } else {
         noDrink.classList.add('d-none');
     }
    //If Data length more than 6
    const showAll = document.getElementById('show-all')
    if(data !== null){
        if(dataLimit && data.length > 6){
            data = data.slice(0,6)
            showAll.classList.remove('d-none');
        } else {
            showAll.classList.add('d-none');
        }
    } else {
        showAll.classList.add('d-none');
    }

    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ''
    data.forEach(element => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col')
        cardDiv.innerHTML = `
        <div class="card h-100 shadow-sm">
            <img src="${element.strDrinkThumb}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 style="color: #ffc7b6" class="card-title">${element.strDrink}</h5>
                <p class="card-text text-muted fw-semibold">${element.strAlcoholic}</p>
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadDetails(${element.idDrink})" class="btn">Details</button>
            </div>
        </div>
        `
        cardContainer.appendChild(cardDiv)
        toggleSpinner(false)
    })
}
const searchElement = document.getElementById('search-input')
const processSearch = dataLimit => {
    toggleSpinner(true)
    const searchText = searchElement.value
    loadData(searchText, dataLimit)
}


searchElement.addEventListener('keyup', (e)=>{
    processSearch(10)
})

document.getElementById('btn-show-all').addEventListener('click', ()=>{
    processSearch()
})

//Toggle Spinner
const toggleSpinner = isLoading =>{
    const spinnerSection = document.getElementById('spinner')
    if(isLoading){
        spinnerSection.classList.remove('d-none')
    } else {
        spinnerSection.classList.add('d-none')
    }
}
//Display Details In a Modal
const loadDetails = async idDrink =>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
    const res = await fetch(url)
    const data = await res.json()
    return displayDetails(data.drinks[0])
}
const displayDetails = data =>{
    const modalTitle = document.getElementById('modal-title')
    modalTitle.innerText = data.strDrink
    const modalBody = document.getElementById('modal-body')
    modalBody.innerHTML=`
    <img src="${data.strDrinkThumb}" class="rounded img-fluid" alt="..." />
    <p class="mt-4 fw-semibold text-white" >${data.strDrink} is a ${data.strAlcoholic} beverage</p>
    <p>Ingredients:</p>
    <ul>
        <li>${data.strMeasure1} ${data.strIngredient1}</li>
        <li>${data.strMeasure2} ${data.strIngredient2}</li>
        <li>${data.strMeasure3} ${data.strIngredient3}</li>
    </ul>
    <p class="text-white" >Instructions: ${data.strInstructions}</p>
    `
} 
toggleSpinner(true)
loadData('a', 10)
