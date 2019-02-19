// 组件通信 findComponents 系列方法
// 以下场景：
// 1、由一个组件，向上找到最近的指定组件
// 2、向上找所有的指定组件
// 3、向下找最近的指定组件
// 4、向下找所有指定组件
// 5、指定组件的兄弟组
function findComponentsUpward (context, componentName) {
    let parent = context.$parent
    let name = parent.$options.name
    while (parent && (!name || [componentName].indexOf(name) < 0)) {
        parent = parent.$parent
        if (parent) name = parent.$options.name
    }
    return parent
}

export {findComponentsUpward}
