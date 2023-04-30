import { fcns } from "../utils/functions.js"
import splitWord from "../libs/splitTxt.js"
import video from "../libs/video.js"

export default class home extends splitWord {
    constructor() {
        super({
            el : app.querySelector('.home__title'),
            classNameParent : "split-js-parent hide",
            classNameChild : "split-js-child"
        })
        this.bgVideo = app.querySelector('.about__bg')
        this.toggleVideo = app.querySelectorAll('[data-toggle]')
        this.videoWrapper = app.querySelector('.about__wrapper-video')
        this.state = false
        this.el = app.querySelectorAll('.partners__wrapper')
        this.init = {
            incre : 0,
            direction : 0
        }
        this.paramsParallax = {
            x : {init : 0, posMouse : 0, ease : 12},
            y : {init : 0, posMouse : 0, ease : 12}
        }
        this.event()
        this.videoPlayer()
    }
    videoPlayer(){
        new video({
           el : app.querySelector('video'),
           btn : app.querySelector('.btn-play'),
           timer : app.querySelector('.video__current-time'),
           indicator : app.querySelector('.video__indicator-child'),
        })
    }
    openVideo(){
        this.state = true
        this.videoWrapper.style.transform = "translate("+this.centerVideo(this.videoWrapper).x+"px, "+this.centerVideo(this.videoWrapper).y+"px) scale(1.1)"
        document.body.classList.add('openVideo')
        this.bgVideo.style.transition = this.videoWrapper.style.transition = "transform 0.9s cubic-bezier(.75,0,.26,1)"
    }
    closeVideo(){
        document.body.classList.remove('openVideo')
        this.videoWrapper.children[1].pause()
        app.querySelector('.btn-play').setAttribute('data-play', false)
        this.videoWrapper.style.transform = "translate(0px, 0px) scale(1)"
        this.bgVideo.style.transition = this.videoWrapper.style.transition = "transform 0.9s cubic-bezier(.75,0,.26,1)"
        this.state = false
    }
    centerVideo(el){
       const y = (window.innerHeight - el.offsetTop + window.pageYOffset ) - (window.innerHeight + el.offsetHeight) / 2
       const x = (window.innerWidth - el.offsetLeft ) - (window.innerWidth + el.offsetWidth) / 2
       return {y, x}
    }
    onResize(){
        if(!this.state) return
          this.videoWrapper.style.transition = "0s"
          this.videoWrapper.style.transform = "translate("+this.centerVideo(this.videoWrapper).x+"px, "+this.centerVideo(this.videoWrapper).y+"px) scale(1.2)"
    }
    onOver(e){
        this.paramsParallax.x.posMouse = e.offsetX - this.videoWrapper.offsetWidth / 2
        this.paramsParallax.y.posMouse = e.offsetY - this.videoWrapper.offsetHeight / 2
    }
    onLeave(){
        this.paramsParallax.x.posMouse = this.paramsParallax.y.posMouse = 0
    }
    easing(){
        for (const key in this.paramsParallax) {
            this.paramsParallax[key].init = fcns.ease(this.paramsParallax[key].init, this.paramsParallax[key].posMouse, this.paramsParallax[key].ease)
        }
        this.videoWrapper.children[0].style.transform = "translate3d("+(this.paramsParallax["x"].init * 0.2).toFixed(2)+"px, "+(this.paramsParallax["y"].init * 0.2).toFixed(2)+"px, 0) translate(-50%, -50%)"
        this.videoWrapper.children[0].children[0].style.transform = "translate3d("+(this.paramsParallax["x"].init * 0.03).toFixed(2)+"px, "+(this.paramsParallax["y"].init * 0.03).toFixed(2)+"px, 0) translate(-50%, -50%)"
    }
    scroll(){
        const scrollY = window.scrollY
       this.direction = scrollY - this.init.direction
        this.init.direction = scrollY
    }
    raf(){
        this.marquee = this.init.incre % this.el[0].getBoundingClientRect().width
        if(this.marquee < 0){
            this.marquee = this.marquee + this.el[0].getBoundingClientRect().width
        }
        this.moveMarquee()
        this.easing()
        requestAnimationFrame(this.raf.bind(this))
    }
    directionMarquee(speed){
        Math.sign(this.direction) == 1 ? this.init.incre+=speed : this.init.incre-=speed
    }
    moveMarquee(){
        fcns.mediaQueries('max-width:992px').matches ? this.directionMarquee(1) : this.directionMarquee(2)
        this.el[0].style.transform = this.el[1].style.transform = "translate3d("+(-this.marquee)+"px, 0, 0)"
    }
    event(){
        this.raf()
        window.addEventListener('scroll', this.scroll.bind(this), { passive : true})
        this.toggleVideo.forEach(el => el.addEventListener('click', el.dataset.toggle == "open" ? this.openVideo.bind(this) : this.closeVideo.bind(this)))
        window.addEventListener('resize', this.onResize.bind(this))
        this.videoWrapper.addEventListener('mousemove', this.onOver.bind(this))
        this.videoWrapper.addEventListener('mouseleave', this.onLeave.bind(this))
    }
}