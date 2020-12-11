export default class History {

    constructor(router){
        this.router = router

        this.current = createRoute(null, { // 将这个current变成响应式得 current变化更新视图
            path: '/'
        })
    }
    transitionTo(location, onComplete){ // 默认会先执行一次
        // 根据调整路径获取匹配记录
        let route = this.router.match(location)

        this.current = route

        this.cb && this.cb(route) // 每次都修改app_route
        onComplete && onComplete() // 调用触发hash变化 hash变化触发transitionTo
    }
    listen(cb){
        this.cb = cb
    }
}


export function createRoute(record, location) {
    let res = []

    if (record){ // 将record中本身与父级放入到res中
        while (record){
            res.unshift(record)
            record = record.parent
        }
    }


    return {
        ...location,
        metched: res
    }
}



