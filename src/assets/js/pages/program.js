import { fcns } from "../utils/functions.js"
import splitWord from "../libs/splitTxt.js"
export default class program extends splitWord {
    constructor() {
        super({
            el : app.querySelector('.programm-page__title'),
            classNameParent : "split-js-parent hide",
            classNameChild : "split-js-child"
        })
        this.programm = app.querySelectorAll('.programm-page__item')
        this.event()
    }
    animScroll() {
        for (let index = 0; index < this.programm.length - 1; index++) {
            const fcnScroll = fcns.animationFixe(this.programm[index], window.innerHeight, false)
            this.programm[index].style.opacity = 1 - fcnScroll
            this.programm[index].style.transform = `scale3d(${1 - (fcnScroll * 0.6)}, ${1 - (fcnScroll * 0.6)}, 1)`
        }
       
       fcns.mediaQueries("max-width:992px").matches ? cancelAnimationFrame(this.animScroll.bind(this)) : requestAnimationFrame(this.animScroll.bind(this))
    }
    event(){
        this.animScroll()
        fcns.mediaQueries("max-width:992px").addEventListener('change', this.animScroll.bind(this))
    }
}