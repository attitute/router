import createRouteMap from "./create-route-map";
import {createRoute} from "./history/base"


export default function createMatcher(routes) {
  // 根据用户配置创建一个映射表
  let { pathMap } = createRouteMap(routes);

  console.log(pathMap)

  function addRoutes(routes) {
    // 动态添加路由权限
    createRouteMap(routes, pathMap)
  }
  function match(path) { // 匹配路由
    let record = pathMap[path]
    return createRoute(record, {
        path
    })
  }
  return {
      addRoutes,
      match
  }
}
