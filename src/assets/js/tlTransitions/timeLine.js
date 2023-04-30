import { fcns } from "../utils/functions.js"

export function loadPage(){
    const titleChild = document.querySelectorAll('.split-js-child')
    titleChild.forEach((el, i) =>{
            el.style.transition = "transform 0.7s "+(i * 0.035)+"s ease"
            el.style.transform = "translate(0%, 0%)"
    })
}

export function leavePage() {
    fcns.styles(document.querySelector('.bg-black'), {
        opacity : 0.5, 
        transition : "opacity 0.8s", 
        zIndex : 4
    })
}

export function enterPage(nextApp) {
    return new Promise(resolve => {
        fcns.promiseTl().then(() => {
            fcns.styles(nextApp, { 
                position : "fixed", 
                top : 0, 
                width : "100%",
                zIndex : 4,
                transform : "translate3d(100%, 0, 0)"
            })
            return fcns.promiseTl(100)
        }).then(() => {
            fcns.styles(nextApp, { 
                transition : "1.2s cubic-bezier(.5,-0.01,.35,1)",
                transform : "translate3d(0%, 0, 0)"
            })
            fcns.styles(document.querySelector('.content'), { 
                transform : "translate3d(-30%, 0, 0)",
                transition : "1.4s cubic-bezier(.5,-0.01,.35,1)",
            })
            loadPage()
            return fcns.promiseTl(1300)
        }).then(() => {
            nextApp.removeAttribute('style')
            resolve()
        })
    })
}
