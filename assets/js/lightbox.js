class Lightbox{

    static init(){
        const links = Array.from(document.querySelectorAll('a[href$=".png"],a[href$=".jpg"],a[href$=".jpeg"]'))
        const gallery = links.map(links => links.getAttribute('href'));
        links.forEach(links => links.addEventListener('click', e =>{
            e.preventDefault();
            new Lightbox(e.currentTarget.getAttribute('href'), gallery);
        }));
    }

    /**
     * @param {string} url 
     * @param {string[]} image 
     */
    constructor(url, image){
        this.element = this.buildDOM(url);
        this.image = image;
        this.loadImage(url);
        this.onKeyUp = this.onKeyUp.bind(this);
        document.body.appendChild(this.element);
        document.addEventListener('keyup',this.onKeyUp);
    }

    /**
     * @param {string} url 
     */
    loadImage(url){
        this.url = null;
        const image = new Image();
        const container = this.element.querySelector('.lightbox__container');
        const loader = document.createElement('div');
        loader.classList.add('lightbox__loader');
        container.innerHTML = '';
        container.appendChild(loader);
        image.onload = ()=>{
            container.removeChild(loader);
            container.appendChild(image);
            this.url = url;
        };
        image.src =  url;
    }

    /**
     * @param {KeyboardEvent} e 
     */
    onKeyUp(e){
        if (e.key === 'Escape') {
            this.close(e);
        } else if (e.key === 'ArrowLeft') {
            this.preview(e);
        } else if (e.key === 'ArrowRight') {
            this.nexts(e);
        }
    }

    /**
     * Permet de fermer la lightbox active
     * @param {MouseEvent/KeyboardEvent} e 
     */
    close(e){
        e.preventDefault();
        this.element.classList.add('fadeOut');
        window.setTimeout(() =>{
            this.element.parentElement.removeChild(this.element);
        },500);
        document.removeEventListener('keyup',this.onKeyUp);
    }


    /**
     * @param {MouseEvent/KeyboardEvent} e 
     */
    nexts(e){
        e.preventDefault();
        let i = this.image.findIndex(image => image.url);
        if (i === this.image.length -1) {
            i = -1;
        }
        this.loadImage(this.image[i+1]);
    }

    /**
     * @param {MouseEvent/KeyboardEvent} e 
     */
    preview(e){
        e.preventDefault();
        let i = this.image.findIndex(image => image.url);
        if (i === 0) {
            i = this.image.length;
        }
        this.loadImage(this.image[i-1]);
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
        <div class="lightbox__container"></div>`;
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this));
        dom.querySelector('.lightbox__next').addEventListener('click', this.nexts.bind(this));
        dom.querySelector('.lightbox__apres').addEventListener('click', this.preview.bind(this));
        return dom;
    }
}
Lightbox.init();