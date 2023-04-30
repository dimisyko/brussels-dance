const fcns = {
    ease : function(start, end, ease){
        return start + (end - start) / ease
    },
    clamp : function(min, max, nbr){
        return Math.max(min, Math.min(nbr, max))
    },
    promiseTl : function(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, time)
        })
    },
    styles : function(el, pamams){
        Object.assign(el.style, pamams)
    },
    mediaQueries : function(size){
        return window.matchMedia(`(${size})`)
     },
    animationFixe : function(elTop, heightParent, boo){
        const topEl = window.pageYOffset - elTop.offsetTop
        const calcVh = (topEl <= 0 ? 0 : topEl) / (heightParent - (boo ? window.innerHeight : false))
        return calcVh < 1 ? calcVh : 1
    }, 
    offsetEl : function(el){
       const offset = el.getBoundingClientRect()
        return {
            top : offset.top,
            left : offset.left,
            height : offset.height,
            width : offset.width
        }
    }
}

export{ fcns }