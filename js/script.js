const header = document.querySelector('header');
function checkScroll() {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
checkScroll();
window.addEventListener('resize', checkScroll);
window.addEventListener('scroll', checkScroll);


let swiper = new Swiper(".topslider__slider", {
    loop: false,
    spaceBetween: 10,
    slidesPerView: 1.48,
    allowTouchMove: true,
    breakpoints: {
        769: {
            spaceBetween: 20,
            slidesPerView: 4,
        },
    },
});

let productImages = undefined;
function initSwiper() {
    if (window.innerWidth < 769 && productImages === undefined) {
        productImages = new Swiper(".product__images", {
            loop: false,
            spaceBetween: 10,
            slidesPerView: 1,
            allowTouchMove: true,
            pagination: {
                el: ".product__images-pagination",
                clickable: true,
            },
        });
    } else if (window.innerWidth >= 769 && productImages !== undefined) {
        productImages.destroy(true, true);
        productImages = undefined;
    }
}
window.addEventListener('load', initSwiper);
window.addEventListener('resize', initSwiper);

let blogSlider = new Swiper(".blogslider__slider", {
    loop: false,
    spaceBetween: 10,
    slidesPerView: 1,
    allowTouchMove: true,
    pagination: {
        el: ".blogslider__slider-pagination",
        clickable: true,
    },
    breakpoints: {
        769: {
            spaceBetween: 20,
            slidesPerView: 3,
        },
    },
});

let prodSlider = new Swiper(".prodslider__slider", {
    loop: false,
    spaceBetween: 10,
    slidesPerView: 2,
    allowTouchMove: true,
    pagination: {
        el: ".prodslider__pagination",
        clickable: true,
    },
    breakpoints: {
        769: {
            slidesPerView: 'auto',
            spaceBetween: 20,
        },
    },
});

document.addEventListener('DOMContentLoaded', () => {
    const langBlock = document.querySelector('.header__lang');
    const langSelected = document.querySelector('.header__lang-selected');
    const langContent = document.querySelector('.header__lang-content');
    langSelected.addEventListener('click', (e) => {
        e.stopPropagation();
        langBlock.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
        if (!langContent.contains(e.target) && !langSelected.contains(e.target)) {
            langBlock.classList.remove('active');
        }
    });
});




const catalogOpenBtn = document.querySelectorAll('.header__catalog-open');
const catalog = document.querySelector('.header-catalog');
const catalogCloseBtn = catalog.querySelector('.header-menu-close');
catalogOpenBtn.forEach(element => {
   element.addEventListener('click', () => {
        catalog.classList.add('show');
    }); 
});
catalogCloseBtn.addEventListener('click', () => {
    catalog.classList.remove('show');
});
const menuOpenBtn = document.querySelectorAll('.header__menu-open');
const menu = document.querySelector('.header-menu');
const menuCloseBtn = menu.querySelector('.header-menu-close');
menuOpenBtn.forEach(element => {
   element.addEventListener('click', () => {
        menu.classList.add('show');
    }); 
});
menuCloseBtn.addEventListener('click', () => {
    menu.classList.remove('show');
});



document.addEventListener('DOMContentLoaded', function () {

    if (typeof Fancybox !== 'undefined' && Fancybox.bind) {
        const images = document.querySelectorAll('.gallery__image img');
        images.forEach((img) => {
            img.setAttribute('data-fancybox', 'gallery');
            img.setAttribute('data-src', img.src);
            img.style.cursor = 'zoom-in';
        });

        Fancybox.bind('[data-fancybox="gallery"]', {
            Thumbs: true,
            Toolbar: {
                display: [
                    { id: "counter", position: "center" },
                    "zoom",
                    "slideshow",
                    "fullscreen",
                    "close",
                ],
            },
        });
    } else {
        console.warn('Fancybox не подключен или не найден.');
    }
});



document.querySelectorAll('.gallery__video').forEach(container => {
    const btn = container.querySelector('.gallery__video-start');
    const video = container.querySelector('video');
    btn.addEventListener('click', () => {
        video.setAttribute('controls', '');
        video.play(); 
        btn.style.display = 'none';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.catalog__item-btn');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth < 769) {
                if (e.target.tagName.toLowerCase() !== 'span') {
                    e.preventDefault(); 
                    this.classList.toggle('active'); 
                }
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const breakpoint = 769;
    
    const searchOpenBtns = document.querySelectorAll('.header__search-open');
    const allSearchForms = document.querySelectorAll('.header__search');

    function toggleClearButton(searchInput, clearBtn) {
        clearBtn.style.display = searchInput.value.trim() === '' ? 'none' : 'flex';
    }

    allSearchForms.forEach(searchForm => {
        const searchInput = searchForm.querySelector('.header__search-input');
        const clearBtn = searchForm.querySelector('.header__search-clear');
        
        searchInput.addEventListener('focus', () => {
            searchForm.classList.add('active');
            toggleClearButton(searchInput, clearBtn);
        });

        document.addEventListener('click', (e) => {
            if (!searchForm.contains(e.target)) {
                
                const isClickOnOpenBtn = e.target.closest('.header__search-open'); 
                
                if (window.innerWidth < breakpoint) {
                    if (!isClickOnOpenBtn) {
                        searchForm.classList.remove('active');
                    }
                } else {
                    searchForm.classList.remove('active');
                }
            }
        });

        searchInput.addEventListener('input', () => toggleClearButton(searchInput, clearBtn));
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            toggleClearButton(searchInput, clearBtn);
            searchInput.focus();
        });
        
        toggleClearButton(searchInput, clearBtn);
    });
    
    searchOpenBtns.forEach(searchOpenBtn => {
        
        const targetSearchForm = searchOpenBtn.nextElementSibling;
        
        if (targetSearchForm && targetSearchForm.classList.contains('header__search')) {
            
            searchOpenBtn.addEventListener('click', function(e) {
                if (window.innerWidth < breakpoint) {
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    
                    targetSearchForm.classList.toggle('active'); 
                    
                    if (targetSearchForm.classList.contains('active')) {
                        targetSearchForm.querySelector('.header__search-input').focus();
                    }
                }
            });
        } 
    });
    
    window.addEventListener('resize', function() {
        allSearchForms.forEach(searchForm => {
            if (window.innerWidth >= breakpoint && searchForm.classList.contains('active')) {
                searchForm.classList.remove('active');
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const HEADERS = [
        "Код", 
        "Модель", 
        "Довжина, м", 
        "Тест,г", 
        "Лад", 
        "Вага, г", 
        "К-ть секцій", 
        "Трансп. довжина, см", 
        "Діаметр/довжина квівертипів, мм", 
        "Тест квівертипів", 
        "Ціна, грн"
    ];
    const originalHTMLStore = new Map();
    function transformToMobile(item) {
        if (item.hasAttribute('data-mobile-transformed')) {
            return;
        }
        originalHTMLStore.set(item, item.innerHTML);
        const blocks = item.querySelectorAll('.models__table-block');
        const firstBlockNew = blocks[0]; 
        if (blocks[2] && blocks[2].querySelector('.models__table-descr')) {
            firstBlockNew.appendChild(blocks[2].querySelector('.models__table-descr'));
        }
        if (blocks[3] && blocks[3].querySelector('.models__table-descr')) {
            firstBlockNew.appendChild(blocks[3].querySelector('.models__table-descr'));
        }
        if (blocks[2]) blocks[2].remove();
        if (blocks[3]) blocks[3].remove();
        const newBlocks = item.querySelectorAll('.models__table-block');
        for (let i = 1; i < newBlocks.length; i++) {
            let originalIndex;
            if (i === 1) { 
                originalIndex = 1; 
            } else if (i === 2) { 
                 originalIndex = 4; 
            } else if (i === 3) { 
                 originalIndex = 5; 
            } else if (i === 4) { 
                 originalIndex = 6; 
            } else if (i === 5) { 
                 originalIndex = 7; 
            } else if (i === 6) { 
                 originalIndex = 8; 
            } else if (i === 7) { 
                 originalIndex = 9; 
            } else if (i === 8) { 
                 originalIndex = 10; 
            } else {
                 continue; 
            }

            if (newBlocks[i] && originalIndex < HEADERS.length) {
                const headerText = HEADERS[originalIndex];
                
                const header = document.createElement('h4');
                header.className = 'models__table-title';
                header.textContent = headerText;
                
                newBlocks[i].prepend(header);
            }
        }

        firstBlockNew.addEventListener('click', function handler() {
            if (window.innerWidth < 768) {
                item.classList.toggle('active');
            }
        });
        item.setAttribute('data-mobile-transformed', 'true');
    }
    function restoreToDesktop(item) {
        if (item.hasAttribute('data-mobile-transformed')) {
            const originalHTML = originalHTMLStore.get(item);
            if (originalHTML) {
                item.innerHTML = originalHTML;
                item.removeAttribute('data-mobile-transformed');
                item.classList.remove('active');
            }
        }
    }
    function handleScreenSizeChange() {
        const tableItems = document.querySelectorAll('.models__table-item');
        const isMobile = window.innerWidth < 768;
        tableItems.forEach(item => {
            if (isMobile) {
                transformToMobile(item);
            } else {
                restoreToDesktop(item);
            }
        });
    }
    handleScreenSizeChange();
    window.addEventListener('resize', handleScreenSizeChange);
});


resizeHeight()
function resizeHeight(){
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', () => {
  resizeHeight()
});