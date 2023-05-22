import page from "../libs/page.js"
export default class places extends page {
    constructor(){
        super({
            el : app.querySelector('.artistes-page__title'),
            classNameParent : "split-js-parent hide",
            classNameChild : "split-js-child"
        })
        this.el = app.querySelector('.artistes-page__container')
        this.items = this.el.querySelectorAll('.artistes-page__item')
        this.child = this.el.querySelectorAll('.artistes-page__wrapper')
        this.nbr = app.querySelector('.nbr-wrapper')
        this.init = {
            index : 0,
            increVW : 0,
            increNbr : 0,
            posX : 0
        }
        this.child[this.init.index].classList.add('active')
        this.state = true
        this.dragable = false
    }
    drag(e){
        if (e.cancelable) e.preventDefault();
        this.dragable = true
        this.init.posX = e.clientX || e.targetTouches[0].clientX
        this.el.style.cursor = "grab"
    }
    move(e){
        if(!this.dragable) return
        const moveX = e.clientX || e.targetTouches[0].clientX
        this.moveEl =  this.init.posX - moveX
        this.anim()
        this.init.posX = moveX
    }
    get length(){
       return this.items.length - 1
    }
    dragUp(){
        this.dragable = false
        this.el.style.cursor = "auto"
    }
    moveContainer(index, incre, nbr){
        this.state = false
        index
        this.nbr.style.transform = "translate3d(0, -"+nbr+"px, 0)"
        this.el.style.transform = "translate3d(-"+incre+"px, 0, 0)"
        this.el.addEventListener('transitionend', () => this.state = true)
    }
    anim(){
        if(this.state){
            this.child[this.init.index].classList.remove('active')
            if(this.moveEl > 10 && this.init.index < this.length ){
                this.moveContainer(this.init.index++, this.init.increVW+=this.items[0].offsetWidth, this.init.increNbr+=this.nbr.firstElementChild.offsetHeight)
            }else if(this.moveEl < -10 && this.init.index > 0 ){
                this.moveContainer(this.init.index--, this.init.increVW-=this.items[0].offsetWidth, this.init.increNbr-=this.nbr.firstElementChild.offsetHeight)
            }
            this.child[this.init.index].classList.add('active')
        }
    }
    onResize(){
        this.init.increVW = window.innerWidth < 992 ? this.init.index * window.innerWidth : this.init.index * this.items[0].offsetWidth
        this.el.style.transform = "translate3d(-"+this.init.increVW+"px, 0, 0)"
    }
    run(){
        this.resize = this.onResize.bind(this)
        window.addEventListener('resize', this.resize)
        this.el.addEventListener('mousedown', this.drag.bind(this))
        this.el.addEventListener('touchstart', this.drag.bind(this), { passive : true})
        this.el.addEventListener('touchmove', this.move.bind(this), { passive : true})
        this.el.addEventListener('mousemove', this.move.bind(this), { passive : true})
        this.el.addEventListener('mouseup', this.dragUp.bind(this), { passive : true})
    }
    destroy(){
        window.removeEventListener('resize', this.resize)
    }
}