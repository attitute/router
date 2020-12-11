

export default function createRouteMap(routes, oldPathMap) {


    // 一个参数时初始化 两个参数就是动态添加路由
    let pathMap = oldPathMap || {}

    routes.forEach(route =>{
        addRouteRecord(route,pathMap)
    })


    return {
        pathMap
    }

}


function addRouteRecord(route, pathMap, parent) {
    let path = parent ? parent.path + '/'+ route.path : route.path
    let record = { // route中的信息
        path,
        parent,
        component: route.component,
        name: route.name,
        props: route.props,
        params: route.params || {},
        meta: route.meta
    }

    if(!pathMap[path]){ // 如果映射表中没这个路径 那就新增一个
        pathMap[path] = record
    }

    // route 可能还有子 孙子
    if (route.children){
        route.children.forEach((childRoute)=>{
            addRouteRecord(childRoute, pathMap, record)
        })
    }


}
