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

let numberOne = document.querySelector('#numberOne')
let numberTwo = document.querySelector('#numberTwo')
let numberThree = document.querySelector('#numberThree')

function createInterval(finalN, element){
    let counter = 0;
    let interval = setInterval(() => {
        if(counter < finalN){
            counter++
            element.innerHTML = counter
        }else{
            clearInterval(interval)
        }
    })
}

let confirm = false;

let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting && confirm == false){
            createInterval(250, numberOne);
            createInterval(180, numberTwo);
            createInterval(300, numberThree);
            confirm = true
            setTimeout(() => {
                confirm = false
            }, 5000)
        }
    })
})

observer.observe(numberOne)

let reviews = [
    {name: 'Franco', review:'Molto affidabili'},
    {name: 'Alfonso', review:'Ottima qualità'},
    {name: 'Mirco', review:'Bei prodotti'},
]

let carouselInner = document.querySelector('.carousel-inner');

reviews.forEach((review) => {
    let div = document.createElement('div');
    div.classList.add('carousel-item');
    div.innerHTML = `
    <div class="reviewCard">
        <p class="lead fw-bold">${review.name}</p>
        <p class="p-3">${review.review}</p>
        </div>
        `
        carouselInner.appendChild(div)
})