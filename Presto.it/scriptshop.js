let navbarColor = document.querySelector('.navbar-expand-lg')
let linkColor = document.querySelectorAll('.linkColor')
let logo_navbar = document.querySelector('#logo_navbar')

window.addEventListener('scroll', () => {
    if(window.scrollY > 0){
        navbarColor.style.backgroundColor = 'var(--dark-custom)'
        linkColor.forEach((navLink) => {
            navLink.style.color = 'var(--white-custom)'
        })
        logo_navbar.src = './MediaP/LogoBianco.png'
    }else{
        navbarColor.style.backgroundColor = 'transparent'
        linkColor.forEach((navLink) => {
            navLink.style.color = 'var(--dark-custom)'
        }) 
        logo_navbar.src = './MediaP/LogoBlu.png'
    }
})

fetch('./shop.json')
.then((response) => response.json())
.then((data) => {
    console.log(data);

    let radioWrapper = document.querySelector('#radioWrapper')
    let cardWrapper = document.querySelector('#cardWrapper')

    function setCategoryRadios(){
        let categories = data.map((ad)=> ad.category);
        let uniqueCategories = Array.from(new Set(categories));
        uniqueCategories.forEach((category) => {
            category = category.split(' ').join('_');
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="categories" id="${category}">
            <label class="form-check-label" for="${category}">
            ${category.split('_').join(' ')}
            </label>
            `;
            radioWrapper.appendChild(div)
        })
    };

    setCategoryRadios();
    function showCards(array){
    cardWrapper.innerHTML = '';
    array.forEach((ad) => {
        let div = document.createElement('div');
        div.classList.add('card-custom');
        div.innerHTML = `
        <p class="h3" title="${ad.name}">${ad.name}</p>
        <p class="lead">${ad.category}</p>
        <p>${ad.price}€</p>
        `;
        cardWrapper.appendChild(div);
    })
    }

    showCards(data);
    
  
    function filterByCategory(array){
    let arrayFromNodeList = Array.from(radios);
    let button = arrayFromNodeList.find((button) => button.checked);
    let category = button.id.split('_').join(' ');
    if (category != 'All'){
        let filtered = array.filter((ad) => ad.category == category);
        return filtered;
    }else{
        return array;
    }
    }

    let radios = document.querySelectorAll('.form-check-input');
    let priceInput = document.querySelector('#priceInput');
    let priceRange = document.querySelector('#priceRange');
    
    radios.forEach((button) => {
    button.addEventListener('click', () =>{
        showCards(filterByCategory(data))
    });
    });

    function setRange(){
    let prices = data.map((ad) => +ad.price);
    prices.sort((a, b) => a - b);
    let maxPrice = Math.ceil(prices.pop());
    priceInput.max = maxPrice;
    priceInput.value = maxPrice;
    priceRange.innerHTML = maxPrice;
    }
    setRange();

    function filterByPrice(array){
    let filtered = array.filter((ad) => +ad.price <= priceInput.value);
    return filtered;
    }

    let wordInput = document.querySelector('#wordInput')

    function filterByWord(array){
    let filtered = array.filter((ad) => ad.name.toLowerCase().includes(wordInput.value.toLowerCase()));
    return filtered;
    }

    function globalFilter(){
    let filteredByWord = filterByWord(data);
    let filteredByPrice = filterByPrice(filteredByWord);
    let filteredByCategory = filterByCategory(filteredByPrice);

    showCards(filteredByCategory);
    }

    radios.forEach((button) => {
    button.addEventListener('click', () =>{
        globalFilter();
    })
    })

    priceInput.addEventListener('input', () =>{
    globalFilter();
    priceRange.innerHTML = priceInput.value;
    })

    wordInput.addEventListener('input', () =>{
    globalFilter();
    })
})