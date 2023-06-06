import '../style/style.scss';
import { fcns } from './utils/functions.js'
import preloader from './tlTransitions/preloader.js';
import home from "./pages/home.js";
import program from "./pages/program.js"
import artistes from "./pages/artistes.js"
import contact from "./pages/contact.js"
import { leavePage, enterPage } from "./tlTransitions/timeLine.js"
import ajax from './utils/ajax.js';


class appGlobal {
    constructor() {
        this.paths()
        this.page.run()
        this.menu = document.querySelector('.menu__wrapper')
        this.menuChild = {
            links : [...this.menu.querySelectorAll('.menu__link')],
            line :  this.menu.querySelector('.menu-line'),
            btnMenu : document.querySelector('.menu-btn')
        }
        this.onLoad()
        this.eventListener()
    }
    get lengthLinks(){
        return this.menuChild.links.length
    }
    paths() {
        this.path = new Map()
        
        this.path.set('/', home)
        this.path.set('/programme', program)
        this.path.set('/artistes', artistes)
        this.path.set('/contact', contact)
        this.page = new (this.path.get(window.location.pathname))
    }
    async createPage(url) {
        try {
            leavePage()
            const content = app.querySelector('.content')
            document.body.style = "overflow : hidden; pointer-events : none;"
            const response = await ajax(url)
            const dom = new DOMParser().parseFromString(response, 'text/html')
            typeof this.page.destroy == "function" && this.page.destroy()
            enterPage(dom.querySelector('.content')).then(() => {
                content.remove()
                document.body.removeAttribute('style')
                window.scrollTo(0, 0)
                this.page.run()
            })
            app.appendChild(dom.querySelector('.content'))
            document.title = dom.title
            this.paths()
        } catch {
            window.location.reload()
        }
    }
    toggle(){
        document.body.classList.toggle('open')
    }
    navigation(){
        this.currentLink(window.location.pathname)
        this.findElActive = this.menuChild.links.find((active) => active.hasAttribute('aria-current', 'active'))
        this.offsetEl(this.findElActive)
        this.menuChild.line.style.transition = "0.4s"
        document.body.classList.remove('open')
    }
    currentLink(url) {
        for (let index = 0; index < this.lengthLinks; index++) {
            const href = this.menuChild.links[index].getAttribute('href').replace(window.location.origin, "")
            url == href ? this.menuChild.links[index].setAttribute('aria-current', 'active') : this.menuChild.links[index].removeAttribute('aria-current')
            this.menuChild.links[index].addEventListener('mouseover', () => this.offsetEl(this.menuChild.links[index]))
        }
    }
    offsetEl(el) {
        const responsiveMenu = fcns.mediaQueries("max-width : 992px").matches ? "0,"+el.offsetTop+"px, 0" : el.offsetLeft+"px, 0, 0"
        this.menuChild.line.style.transform =  "translate3d("+responsiveMenu+")"
        this.menuChild.line.style.width = el.offsetWidth + "px"
        this.menuChild.line.style.height = el.offsetHeight + "px"
    }
    onLoad(){
        new preloader().preloader()
        this.navigation()
    }
    onResize(){
        this.offsetEl(this.findElActive)
    }
    onPopstate(){
        this.createPage(window.location.pathname)
        this.navigation()
    }
    onChange(target){
        window.history.pushState({}, '', target.getAttribute('href'))
       this.createPage(target.getAttribute('href')) 
        this.navigation()
    }
   clk(e) {
        let el = e.target
        while (el && !el.href) {
            el = el.closest('a')
        }
        
        if(!el || el.getAttribute('href').indexOf("mailto:") !== -1 || el.getAttribute('target')) return

        if(el.getAttribute('href') === window.location.pathname){
            e.preventDefault()
            return
        }
            e.preventDefault()
            e.stopPropagation()
            this.onChange(el)
    }
    eventListener() {
        this.menuChild.btnMenu.addEventListener('click', this.toggle.bind(this))
        this.menu.addEventListener('mouseleave', () => this.offsetEl(this.findElActive))
        document.addEventListener('click', this.clk.bind(this))
        window.addEventListener('resize', this.onResize.bind(this))
        window.addEventListener('popstate', this.onPopstate.bind(this))
    }    
}

document.addEventListener('readystatechange', () =>{
    document.readyState === "complete" && new appGlobal()
})
