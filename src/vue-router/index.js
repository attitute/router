import { install } from "./install"
import createMatcher from "./create-matcher"
import BrowserHistory from "./history/history";
import HashHistory from "./history/hash";

export default class VueRouter{
    constructor(options) {
        // 创建匹配器后，核心的方法就是匹配
        // match addRoutes
        this.matcher = createMatcher(options.routes || [])

        // 根据当前的mode 创建不同的history 管理策略
        switch (options.mode){
            case 'hash':
                this.history = new HashHistory(this)
                break;
            case 'history':
                this.history = new BrowserHistory(this)
                break;
        }

    }

    match(location){
        this.matcher.match(location)
    }

    init(app) { // app根实例
        console.log(app,' app')
        // 初始化后 需要先根据路径做一次匹配， 后续根据hash值得变化再次匹配

        const history = this.history

        const setupListener = ()=>{
            history.setupListener() // 监听hash值变化
        }

        history.transitionTo(history.getCurrentLocation(), setupListener) // 跳转到哪

        history.listen((route)=>{
            app._route = route
        })
    }
}
VueRouter.install= install
