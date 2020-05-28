document.addEventListener('DOMContentLoaded', () =>{

    const leftMenu = document.querySelector('.left-menu'),
        hamburger = document.querySelector('.hamburger'),
        cardImg = document.querySelector('.tv-shows'),
        tvShowsList = document.querySelector('.tv-shows__list'),
        modal = document.querySelector('.modal'),
        IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2',
        API_KEY = '8058b76cfe14f7f1fb9ba4ea4876efb7';
    
    let image;

    const DBService = class{
        getData = async (url) => {
            const res = await fetch(url);
            if(res.ok){
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }

        getTestData = async () => {
            return await this.getData('test.json');
        }
    };

    const renderCard = (data) => {
        console.log(data)
        tvShowsList.textContent = '';
        data.results.forEach(item => {
            const {backdrop_path: backdrop, 
                name: title, 
                poster_path: poster, 
                vote_average: vote} = item;
            
            const posterIMG = poster ? IMG_URL + poster : '../img/no-poster.jpg';
            const backdropIMG = backdrop ? IMG_URL + backdrop : '../img/no-poster.jpg';
            const voteElem = vote ? `<span class="tv-card__vote">${vote}</span>` : '';

            const card = document.createElement('li');
            card.classList.add('tv-shows__item');
            card.innerHTML =`
                <a href="#" class="tv-card">
                ${voteElem}
                <img class="tv-card__img"
                    src="${posterIMG}"
                    data-backdrop="${backdropIMG}"
                    alt="${title}">
                <h4 class="tv-card__head">${title}</h4>
                </a>
            `;

            tvShowsList.append(card);
        }) 
    };

    new DBService().getTestData().then(renderCard);
        
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
    });

    tvShowsList.addEventListener('click', e => {
        event.preventDefault();
        const target = e.target;
        const card = target.closest('.tv-card');
        if(card){
            document.body.style.overflow = 'hidden';
            modal.classList.remove('hide');
        }
    });

    modal.addEventListener('click', e => {
        const target = e.target;

        if(target.classList.contains('modal') || target.closest('.cross')){
            document.body.style.overflow = '';
            modal.classList.add('hide');
        }
    });
})