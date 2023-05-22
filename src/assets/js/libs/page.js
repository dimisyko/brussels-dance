export default class page {
    constructor({el, classNameParent, classNameChild}){
        this.el = el
        this.classNameParent = classNameParent
        this.classNameChild = classNameChild
        this.value = this.el.textContent
        this.split = this.value.split(' ')
        this.el.textContent = ""
        this.current = 0
        this.loop()
    }
    parentSplit(element){
        this.spanParent = document.createElement('span')
        this.spanParent.className = this.classNameParent
        this.el.insertAdjacentText('beforeend', " ")
        this.el.appendChild(this.spanParent)
        this.childSplit(element)
    }
    childSplit(element){
        for (const iterator of element) {
            const spanChild = document.createElement('span')
            spanChild.className = this.classNameChild
            spanChild.textContent = iterator
            this.spanParent.appendChild(spanChild)
        }
    }
    loop(){
        this.split.forEach((element) => {
            this.parentSplit(element)
        })
    }
}