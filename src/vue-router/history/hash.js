import History from "./base";

export default class HashHistory extends History {
    constructor(router){
        super(router)

        // 默认hash模式需要加 #/
        ensureSlash()

        // hash模式的核心功能就是 监听hash值的变化 window.addEventListener('hashchange')
    }

    setupListener(){ // 监听
        // popstate 也能监听路由变化 跟hashchange功能一样
        window.addEventListener('hashchange',()=>{
            // 根据当前hash值 去匹配对应的组件
            this.transitionTo(getHash())
        })
    }
    getCurrentLocation(){
        return getHash()
    }

}

function getHash() {
    return window.location.hash.slice(1)
}

function ensureSlash() {
    if(window.location.hash){
        return
    }
    window.location.hash = '/' // 初始化hash
}

