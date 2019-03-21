// 组件通信 findComponents 系列方法
// 以下场景：
// 1、由一个组件，向上找到最近的指定组件
// 2、向上找所有的指定组件
// 3、向下找最近的指定组件
// 4、向下找所有指定组件
// 5、指定组件的兄弟组
function findComponentUpward (context, componentName) {
    let parent = context.$parent
    let name = parent.$options.name
    while (parent && (!name || [componentName].indexOf(name) < 0)) {
        parent = parent.$parent
        if (parent) name = parent.$options.name
    }
    return parent
}

function findComponentsUpward (context, componentName) {
    let parents = []
    const parent = context.$parent
    if (parent) {
        if (parent.$options.name === componentName) parents.push(parent)
        return parents.concat(findComponentsUpward(parent, componentName))
    } else {
        return []
    }
}

function findComponentDownward (context, componentName) {
    const childrens = context.$children
    let children = null
    if (childrens.length) {
        // Reflect.ownKeys(childrens).forEach((item,index)=>{
        // })
        for (const child of childrens) {
            const name = child.$options.name
            if (name === componentName) {
                children = child
                break
            } else {
                children = findComponentDownward(child, componentName)
                if (children) break
            }
        }
    }
    return children
}

function findComponentsDownward (context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child)
        const foundChilds = findComponentsDownward(child, componentName)
        return components.concat(foundChilds)
    }, [])
}

function findBrothersComponents (context, componentName, exceptMe = true) {
    let res = context.$parent.$children.filter(item => {
        return item.$optons.name === componentName
    })
    let index = res.findIndex(item => item._uid === context._uid)
    if (exceptMe) res.splice(index, 1)
    return res
}

export {findComponentUpward}
