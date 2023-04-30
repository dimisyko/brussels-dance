import { fcns } from "../utils/functions.js"
export default class player {
    constructor({ el, btn, timer, indicator }) {
        this.el = el
        this.btn = btn
        this.timer = timer
        this.indicator = indicator
        this.state = false
        this.event()
    }
    runVideo() {
        this.el.paused ? this.el.play() : this.el.pause()
        app.querySelector('.btn-play').getAttribute('data-play') == 'false' ? app.querySelector('.btn-play').setAttribute('data-play', true) : app.querySelector('.btn-play').setAttribute('data-play', false)
    }
    condition(el) {
        return el < 10 ? `0${el} ` : `${el}`
    }
    currentTime(){
        const minutes = parseInt(this.el.currentTime / 60)
        const secondes = parseInt(this.el.currentTime % 60) 
        return this.timer.textContent = this.condition(minutes) + " : " + this.condition(secondes)
    }
    time() {
        this.currentTime()
        const currentIndicator = this.el.currentTime / this.el.duration
        this.indicator.style.transform = "scale3d(" + currentIndicator + ", 1, 1)"
    }
    mouseDown(e) {
        this.state = true
        const downX = e.clientX || e.targetTouches[0].clientX
        this.el.currentTime = (downX - this.indicator.getBoundingClientRect().left) / this.indicator.parentElement.getBoundingClientRect().width * this.el.duration
    }
    mouseMove(e) {
        if (!this.state) return
        const moveX = e.clientX || e.targetTouches[0].clientX
        const drag = (moveX - this.indicator.getBoundingClientRect().left) / this.indicator.parentElement.getBoundingClientRect().width
        const clamp = fcns.clamp(0, drag, 1)
        this.el.currentTime = clamp * this.el.duration
        this.indicator.style.transform = "scale3d(" + clamp + ", 1, 1)"
        this.currentTime()
    }
    mouseUp() {
        this.state = false
    }
    endVideo() {
        this.el.currentTime = 0
    }
    event() {
        this.btn.addEventListener('click', this.runVideo.bind(this))
        this.el.addEventListener('click', this.runVideo.bind(this))
        this.el.addEventListener('timeupdate', this.time.bind(this))
        this.el.addEventListener('loadeddata', this.time.bind(this))
        this.el.addEventListener('ended', this.endVideo.bind(this))
        this.indicator.parentElement.addEventListener('mousedown', this.mouseDown.bind(this))
        window.addEventListener('mousemove', this.mouseMove.bind(this))
        window.addEventListener('mouseup', this.mouseUp.bind(this))
        this.indicator.parentElement.addEventListener('touchstart', this.mouseDown.bind(this))
        window.addEventListener('touchmove', this.mouseMove.bind(this))
        window.addEventListener('touchend', this.mouseUp.bind(this))
    }
}
