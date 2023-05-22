import { fcns } from "../utils/functions.js"
import page from "../libs/page.js"
export default class program extends page {
    constructor() {
        super({
            el : app.querySelector('.programm-page__title'),
            classNameParent : "split-js-parent hide",
            classNameChild : "split-js-child"
        })
        this.programm = app.querySelectorAll('.programm-page__item')
        this.event()
    }
    run() {
        for (let index = 0; index < this.programm.length - 1; index++) {
            const fcnScroll = fcns.animationFixe(this.programm[index], window.innerHeight, false)
            this.programm[index].style.opacity = 1 - fcnScroll
            this.programm[index].style.transform = `scale3d(${1 - (fcnScroll * 0.6)}, ${1 - (fcnScroll * 0.6)}, 1)`
        }
       fcns.mediaQueries("max-width:992px").matches ? this.raf = cancelAnimationFrame(this.run.bind(this)) : this.raf = requestAnimationFrame(this.run.bind(this))
    }
    event(){
        fcns.mediaQueries("max-width:992px").addEventListener('change', this.run.bind(this))
    }
    destroy(){
        cancelAnimationFrame(this.raf)
    }
}