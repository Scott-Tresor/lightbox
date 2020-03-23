class Lightbox{

    static init(){
        const links = document.querySelectorAll('a[href$=".png"],a[href$=".jpg"],a[href$=".jpeg"]')
        .forEach(links => links.addEventListener('click', e =>{
            e.preventDefault();
            new Lightbox(e.currentTarget.getAttribute('href'));
        }));
    }

    /**
     * @param {string} url 
     */
    constructor(url){
        const element = this.buildDOM(url);
        
    }

    /**
     * @param {string} url 
     * @returns {HTMLElement}
     */
    buildDOM(url){
        const dom = document.createElement('div');
        dom.classList.add('lightbox');
        dom.innerHTML = `<button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__apres">Apres</button>
        <div class="lightbox__container">
            <img src="img/axosoft-gitkraken-logo-desktop-landscape.jpg" alt="">
        </div>`;
        return dom;
    }
}
Lightbox.init();