window.dom = {
  //创建元素
  create(string) {
    const container = document.createElement('template')    //创建容器
    container.innerHTML = string.trim()                     //把string插入容器
    return container.content.firstChild                     //把容器里的第一个孩子返回
  },
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling)   //在node的父节点里插入一个node2在node的后面
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2,node)                //在node的父节点里插入一个node2在node的前面
  },
  append(parent, node) {
    parent.appendChild(node)                                //在parent里添加node节点
  },
  wrap(node, parent) {
    dom.before(node,parent)
    dom.append(parent, node)
  },
  remove(node) {
    node.parentNode.removeChild(node)
    return node
  },
  empty(node) {
    const array = []
    let x = node.firstChild
    while (x){
      array.push(dom.remove(node.firstChild))
    }
    return array
  },
  attr(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute(name, value)
    } else if (arguments.length === 2){
      return node.getAttribute(name)
    }
  },
  text(node, string) {
    if (arguments.length === 2) {
      if('innerText' in node){
        node.innerText = string
      } else {
        node.textContent = string
      }
    } else if (arguments.length === 1){
      if('innerText' in node){
        return node.innerText
      } else {
        return node.textContent
      }
    }
  },
  html(node, string){
    if (arguments.length === 2){
      node.innerHTML = string
    } else if(arguments.length ===1){
      return node.innerHTML
    }
  },
  style(node, name, value){
    //三个参数
    if(arguments.length === 3){
      node.style[name] = value
    //两个参数
    } else if (arguments.length === 2){
      //如果name是string
      if (typeof name === 'string'){
        return node.style[name]
      }else if(name instanceof Object){
      //name是object
      const object = name
        for(let key in name){
          node.style[key] = object[key]
        }
      }
    }
  },
  on(node, eventName, fn){
    node.addEventListener(eventName, fn)
  },
  off(node, eventName, fn){
    node.removeEventListener(eventName, fn)
  },
  find(selector, scope){
    return (scope || selector).querySelectorAll(selector)
  },
  parent(node){
    return node.children
  },
  siblings(node){
    return Array.from(node.parentNode.children).filter(n => n !== node)
  },
  next(node){
    let x = node.nextSibling
    while(x && x.nodeType === 3){
      x = x.nextSibling
    }
    return x
  },
  previous(node){
    let x = node.previousSibling
    while(x && x.nodeType === 3){
      x = x.previousSibling
    }
    return x
  },
  each(nodeList, fn){
    for(let i=0;i<nodeList.length;i++){
      fn.call(null, nodeList[i])
    }
  },
  index(node){
    const list = dom.children(node.parentNode)
    let i
    for(i=0;i<list.length;i++){
      if(list[i] === node){
        break
      }
    }
    return i
  },
  class: {
    add(node, className) {
      node.classList.add(className)
    },
    remove(node, className){
      node.classList.remove(className)
    },
    has(node, className){
      return node.classList.container(className)
    }
  }
}
