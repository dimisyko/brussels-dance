import { offsetEl, mediaQueries } from "../utils/functions.js"

export default class parallaxScroll {
    constructor({ el, direction }) {
        this.el = el
        this.direction = direction
        this.raf()
        this.resize()
    }
    parallax(){
        this.el.forEach(element => {
            this.parallaxScrollY(element)
            if (mediaQueries("max-width : 992px").matches) element.removeAttribute('style')
        });
    }
    params(el, offset, size){
            this.pos = offset - size / 2;
            const data = el.dataset.v;
            this.newScroll = data * this.pos
    }
    parallaxScrollY(el){
            this.params(el, offsetEl(el).top, window.innerHeight)
            if(this.pos > window.innerHeight || -this.pos > window.innerHeight) return
            this.direction == "x" ? el.style.transform = "translate3d("+this.newScroll+"px, 0, 0)" : el.style.transform = "translate3d(0, "+this.newScroll+"px, 0)"
    }
    raf() {
        this.parallax()
        mediaQueries("min-width : 992px").matches ? requestAnimationFrame(this.raf.bind(this)) : cancelAnimationFrame(this.raf.bind(this))
    }
    resize() {
        mediaQueries("max-width : 992px").addEventListener('change', this.raf.bind(this))
    }
}