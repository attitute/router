
export let _Vue;


export function install(Vue, param) {
    _Vue = Vue

    // 我需要将当前得根实例的提供的router属性共享给所有子组件

    // 所有子组件初始化的时候 都会去调用Vue.extend Vue.options

    Vue.mixin({
        beforeCreate() {
            // 获取到每个人的实例，给实例添加属性
            if (this.$options.router){ // 有router就是根实例
                this._routerRoot = this
                this._router = this.$options.router
                this._router.init(this);

                // 将current 变成响应式得
                Vue.util.defineReactive(this, '_route', this._router.history.current)

            }else {
                // 将根实例绑定给所有的实列
                this._routerRoot = this.$parent.$options._routerRoot
            }
        },
    })
}