import { fcns } from "../utils/functions.js"
import { loadPage } from "./timeLine.js"

export default class{
    preloader(){
        fcns.promiseTl().then(() =>{
            fcns.styles(document.body,{
                opacity : 1,
                transition :"0.7s",
                transitionDelay : "0.5s"
            })
            return fcns.promiseTl(1100)
        }).then(() =>{
            loadPage()
            return fcns.promiseTl(1000)
        }).then(() =>{
            document.body.removeAttribute('style')
        })
    }
}
