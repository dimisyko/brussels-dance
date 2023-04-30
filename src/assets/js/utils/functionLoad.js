import home from "../pages/home.js";
import program from "../pages/program.js"
import artistes from "../pages/artistes.js"
import contact from "../pages/contact.js"
export default function loadFunction() {
    const path = new Map()
    
    path.set('/', home)
    path.set('/programme', program)
    path.set('/artistes', artistes)
    path.set('/contact', contact)
    new (path.get(window.location.pathname))
}


