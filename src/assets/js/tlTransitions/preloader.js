import { fcns } from "../utils/functions.js"
import { loadPage } from "./timeLine.js"

export default class{
    preloader(){
        fcns.styles(document.body,{
            position : "fixed",
            width : "100%",
            transform : "scale(0.3)",
            transformOrigin: "center top"
        })
        fcns.promiseTl().then(() =>{
            fcns.styles(document.body,{
                clipPath: "polygon(0px 0%, 100% 0%, 100% 100%, 0px 100%)",
                transition: "1.5s ease"
            })
            return fcns.promiseTl(1500)
        }).then(() =>{
            fcns.styles(document.body,{
                transform : "scale(1)",
                transition: "1.4s cubic-bezier(0.73, 0, 0.25, 1)"
            })
            return fcns.promiseTl(400)
        }).then(() =>{
            loadPage()
            return fcns.promiseTl(1000)
        }).then(() =>{
            document.body.removeAttribute('style')
        })
    }
}
