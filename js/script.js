document.addEventListener('DOMContentLoaded', () =>{
    const leftMenu = document.querySelector('.left-menu'),
        hamburger = document.querySelector('.hamburger'),
        cardImg = document.querySelector('.tv-shows');
    
    let image;
        
    hamburger.addEventListener('click', () => {  
        leftMenu.classList.toggle('openMenu');
        hamburger.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if(!e.target.closest('.left-menu')) {
            leftMenu.classList.remove('openMenu');
            hamburger.classList.remove('open');
        }
    });

    leftMenu.addEventListener('click', (e) => {
        const target = e.target,
            dropdown = target.closest('.dropdown');
        
        if(dropdown){
            dropdown.classList.toggle('active');
            leftMenu.classList.add('openMenu');
            hamburger.classList.add('open');
        }
    });

    cardImg.addEventListener('mouseover', (e) => {
        let target = e.target.matches('img');
            image = e.target.src;
            if(target) {
              event.target.src = event.target.dataset.backdrop;
            }
    })
    cardImg.addEventListener('mouseout', (e) => {
        e.target.src = image;
    })
})