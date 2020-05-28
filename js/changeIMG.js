const tvShowsList = document.querySelector('.tv-shows__list');

const changeImage = e => {
    const card = event.target.closest('.tv-shows__item');
    if(card){
        const img = card.querySelector('.tv-card__img'),
        /*     changeImg = img.dataset.backdrop;
        if(changeImg){
            img.dataset.backdrop = img.src;
            img.src = changeImg;
        } */
        //деструктуризация
        if(img.dataset.backdrop){
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src]
        }
    }
}

tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);