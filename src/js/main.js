import '../../node_modules/focus-visible/dist/focus-visible';
import '../scss/main.scss';
import '../index.html';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const expandGallery = document.querySelectorAll(".expand-gallery");
const expandText = document.querySelectorAll(".expand-text");

if (window.innerWidth <= 1120) {
    const swiperServices = new Swiper('.section__inner--services', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        loop: false,
        threshold: 30,
        preventInteractionOnTransition: true
    });
}

window.addEventListener("resize",() =>{
    if (window.innerWidth <= 1120) {
        const swiperServices = new Swiper('.section__inner--services', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            loop: false,
            threshold: 30,
            preventInteractionOnTransition: true
        });
    }
});

const swiperBrends = new Swiper('.swiper__inner', {
    modules: [Navigation, Pagination],
    slidesPerView: 'auto',
    spaceBetween: 16,
    pagination: {
        el: ".swiper-pagination",
      },
      breakpoints: {
        768: {
            init: false,
        },
      }
});


//com отключаю всплывание для инпута чтобы небыло двойного срабатывания
document.querySelectorAll('button.expand>input[type=checkbox]').forEach(input => {
    input.addEventListener('click',e=>{
        e.stopPropagation();
    })
})


const buttonChecked = (buttons) =>{
    buttons.forEach(button =>{
        button.addEventListener('change', e =>{

                if(button.classList.contains('expand-gallery')){
                    if(e.target.checked === true){

                        button.querySelector('span').textContent = 'Скрыть'
                     
                        toggleExpandGallery('gallery__brends-repair',"gallery__inner--brends-repair", 2, 30, e.currentTarget, e.target.checked);
                        
                        toggleExpandGallery('gallery__tech-repair',"gallery__inner--tech-repair", 1, 30, e.currentTarget, e.target.checked);
                        
                    } 
                    else if(e.target.checked === false){
                        button.querySelector('span').textContent = 'Показать всё'
                        
                        toggleExpandGallery('gallery__brends-repair',"gallery__inner--brends-repair", 2, 30, e.currentTarget, e.target.checked);
                        
                        toggleExpandGallery('gallery__tech-repair',"gallery__inner--tech-repair", 1, 30, e.currentTarget, e.target.checked);
                        
                    }

                }
                if(button.classList.contains('expand-text')){
                    if(e.target.checked === true){
                        toggleExpandText('about-text', 1);
                        button.querySelector('span').textContent = 'Скрыть'
                    } 
                    else if(e.target.checked === false){
                        toggleExpandText('about-text', 1);
                        button.querySelector('span').textContent = 'Читать далее'
                    }
                }
           

        })
    })
}

buttonChecked(expandGallery)
buttonChecked(expandText)


const toggleExpandText = (nameTextBlock, numberVisiblePortion, button = document.querySelector(`.${nameTextBlock}>.expand`), checked = button.querySelector('input[type="checkbox"]').checked) =>{

    const textPortions = document.querySelectorAll(`.${nameTextBlock} .text-portion`);

    if(window.innerWidth <= 767){
        for(let i = 0; i < numberVisiblePortion; i++){
            textPortions[i].style.display = 'inline';
        }

         if(checked === false){
    
            for(let i = numberVisiblePortion + 0; i < textPortions.length; i++){
                textPortions[i].style.display = 'none';
                textPortions[i].style.marginBottom = 20;
            }
        }

    }
    else if(window.innerWidth >= 767 && window.innerWidth <= 1119){

        for(let i = 0; i < numberVisiblePortion + 2; i++){
            textPortions[i].style.display = 'inline';
        }

         if(checked === false){
    
            for(let i = numberVisiblePortion + 2; i < textPortions.length; i++){
                textPortions[i].style.display = 'none';
                textPortions[i].style.marginBottom = 20;
            }
        }

    }
    else if(window.innerWidth >= 1120){

        for(let i = 0; i < numberVisiblePortion + 3; i++){
            textPortions[i].style.display = 'inline';
        }

         if(checked === false){
    
            for(let i = numberVisiblePortion + 3; i < textPortions.length; i++){
                textPortions[i].style.display = 'none';
                textPortions[i].style.marginBottom = 20;
            }
        }

    }

    if(checked === true){
        
        for(let i = numberVisiblePortion; i < textPortions.length; i++){
            textPortions[i].style.display = 'inline';
        } 
    }


}



const toggleExpandGallery = (nameGallery,nameGalleryWrapper, numberVisibleRows, gap, button = document.querySelector(`.${nameGallery}>.expand`), checked = button.querySelector('input[type="checkbox"]').checked) => {

    const innerW = document.querySelector('.page__wrapper').offsetWidth;
    const gallery = document.querySelector(`.${nameGalleryWrapper}`);
    const galleryCard = Array.from(gallery.querySelectorAll('.gallery__card'));
    
    const cardWidth = parseInt(window.getComputedStyle(galleryCard[0]).width);
        
    const maxCardInRow = Math.floor((innerW) / cardWidth);
    const maxCardInRowGap = Math.floor((innerW - gap * (maxCardInRow)) / cardWidth);

    if(button !== undefined && button.parentElement.classList.contains(nameGallery)){
        // document.querySelector(`.${button.className} * span`).textContent = 'Скрыть' 
        for(let i = maxCardInRowGap * numberVisibleRows; i < galleryCard.length; i++) {
            galleryCard[i].style.display = 'none';
        }
    } 
    
    for(let i = 0; i < maxCardInRowGap * numberVisibleRows && i < galleryCard.length; i++){
        // document.querySelector(`.${button.className} * span`).textContent = 'Скрыть' 
        galleryCard[i].style.display = 'grid';
    }


   
    if(button !== undefined && button.parentElement.classList.contains(nameGallery)){

        if(checked === true){
            galleryCard.forEach(card => {
                card.style.display = 'grid';
            })

        } 
        else if (checked === false){
            for(let i = maxCardInRowGap * numberVisibleRows; i < galleryCard.length; i++) {
                galleryCard[i].style.display = 'none';
            }
        }          
       
    }

}

toggleExpandText('about-text', 1);
toggleExpandGallery('gallery__brends-repair',"gallery__inner--brends-repair", 2, 30)
toggleExpandGallery('gallery__tech-repair',"gallery__inner--tech-repair", 1, 30)

window.addEventListener('resize', () => {
    toggleExpandText('about-text', 1);
    toggleExpandGallery('gallery__brends-repair',"gallery__inner--brends-repair", 2, 30)
    toggleExpandGallery('gallery__tech-repair',"gallery__inner--tech-repair", 1, 30)
})


//com функция заполнения таблицы
const tableFill = (tableName, {tableHeader, tableBody}) =>{

    const table = document.querySelector(`.${tableName}`);
    const tHead = document.createElement('thead');
    const tBody = document.createElement('tbody');
    const tr = document.createElement('tr');
   
    // com добавление значений в theader таблицы
    tableHeader.forEach(header =>{
        
        const th = document.createElement('th');
        th.append(header);
        tr.appendChild(th);       
        
    })

    tHead.appendChild(tr);
    table.appendChild(tHead);
    
    
    // com добавление значений в tbody таблицы
    tableBody.forEach(row => {

        const tr = document.createElement('tr');

        row.forEach(value => {  
            const td = document.createElement('td');

            if(value instanceof HTMLElement) {
                td.append(value.cloneNode(true));
            } else{
                td.append(value);
            }

            tr.appendChild(td);
        })
        
        tBody.appendChild(tr);
    })

    table.appendChild(tBody);

}

const priceServiceButton = document.querySelector('.price-service__button');

//com объект данных для таблицы
const tableValue = {

    tableHeader: ['Ремонтные услуги','Цена','Срок'],
    
    tableBody: [
        ['Диагностика','Бесплатно','30 мин', priceServiceButton],
        ['Замена дисплея','1 000 ₽','30-120 мин', priceServiceButton],
        ['Замена полифонического динамика','1 000 ₽','30-120 мин', priceServiceButton],
        ['Тестирование с выдачей технического заключения','1 000 ₽','30-120 мин', priceServiceButton],
    ]

}

//com вызов функции заполняющей таблицу
tableFill('table__prices', tableValue)


const sidebarLink = document.querySelectorAll('.sidebar__list>li');

sidebarLink[0].classList.add('active-link');

sidebarLink.forEach(link =>{
    
    link.addEventListener('click', (e) =>{

        sidebarLink.forEach(link =>{

          link.classList.remove('active-link');  
          
        })
        
        e.currentTarget.classList.add('active-link');

    })

})


const siteLanguages = document.querySelectorAll('.language-selection>.language-selection__language');

siteLanguages[0].classList.add('selected');

siteLanguages.forEach(language =>{
    
    language.addEventListener('click', (e) =>{

        siteLanguages.forEach(language =>{
            language.classList.remove('selected');  
        })
        
        e.currentTarget.classList.add('selected');

    })
    
})

const buttonBurgers = document.querySelectorAll('.button__burger');
const sidebar = document.querySelector('.sidebar');
const root = document.querySelector('#root');

window.addEventListener('resize', e =>{
    if(window.innerWidth >= 1440){
        sidebar.style.display = 'block';
        root.classList.remove('sidebar-active');
    }
    if(window.innerWidth < 1440 && !root.classList.contains('sidebar-active')){
        sidebar.style.display = 'none';
    }
})

buttonBurgers.forEach(buttonBurger => {
    buttonBurger.addEventListener('click', (e) =>{
        if(window.getComputedStyle(sidebar).display == 'none'){
            sidebar.style.display = 'block';
            root.classList.add('sidebar-active');
            document.body.style.overflow = 'hidden';
        }
        else if(window.getComputedStyle(sidebar).display == 'block'){
            sidebar.style.display = 'none';
            root.classList.remove('sidebar-active');
            document.body.style.overflow = 'auto';
        }
    })
});



const modals = document.querySelectorAll('dialog');





const toggleModal = (modals,nameClassButtonOpen, nameClassButtonClose, nameClassButtonSubmit, nameModal) => {

    document.querySelectorAll(`.${nameClassButtonOpen}`).forEach(button => button.addEventListener('click', (e) => {

        modals.forEach(modal => {
            if(modal.open){
                modal.style.overflow = 'auto'
                root.classList.add('modal-active');
                document.body.style.overflow = 'hidden';
               document.querySelector('.sidebar').style.zIndex = "0";
            }
        });
    
    }))

    document.querySelectorAll(`.${nameClassButtonClose}`).forEach(closeButton => closeButton.addEventListener('click', e =>{
    
        root.classList.remove('modal-active');
        document.body.style.overflow = 'auto';
        document.querySelector('.sidebar').style.zIndex = "2";
    }))
    document.querySelector(`.${nameModal}`).addEventListener('submit', function(e) {
        e.preventDefault();
        let data = new FormData(this);
        if(data.get('firstName')){
            alert('Скоро с вами свяжутся ' + data.get('firstName'));
        } else{
            alert('Скоро с вами свяжутся');
        }

        modals.forEach(modal => {
            if(modal.open){
                modal.close()
                document.querySelector('.sidebar').style.zIndex = "2";
            }
        });

        root.classList.remove('modal-active');
        document.body.style.overflow = 'auto';

    });


};

toggleModal(modals, 'button__repair', 'close-button', 'order-call__button', 'ordercall')
toggleModal(modals, 'button__checkstatus', 'close-button', 'feedback__button', 'feedback')
 