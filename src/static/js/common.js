export let eventHandler = {
  // 页面加载完成后
  readyEvent: function(fn) {
    if (fn === null) {
      fn = document
    }
    var oldonload = window.onload
    if (typeof window.onload !== 'function') {
      window.onload = fn;
    } else {
      window.onload = function() {
        oldonload()
        fn()
      }
    }
  },
  // 视能力分别使用dom0||dom2||IE方式 来绑定事件
  // 参数： 操作的元素,事件名称 ,事件处理程序
  addEvent: function (element, type, handler) {
    if(element.addEventListener) {
      //事件类型、需要执行的函数、是否捕捉
      element.addEventListener(type, handler, false);
    } else if(element.attachEvent) {
      element.attachEvent('on' + type, function() {
        handler.call(element)
      });
    } else {
      element['on' + type] = handler
    }
  },
  // 移除事件
  removeEvent: function(element, type, handler) {
    if(element.removeEnentListener) {
      element.removeEnentListener(type, handler, false)
    } else if(element.datachEvent) {
      element.detachEvent('on' + type, handler)
    } else {
      element['on' + type] = null
    }
  },
  // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
  stopPropagation: function(ev) {
    if(ev.stopPropagation) {
      ev.stopPropagation()
    } else {
      ev.cancelBubble = true
    }
  },
  // 取消事件的默认行为
  preventDefault: function(event) {
    if(event.preventDefault) {
      event.preventDefault()
    } else {
      event.returnValue = false
    }
  },
  // 获取事件目标
  getTarget: function(event) {
    return event.target || event.srcElement
  },
  // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
  getEvent: function(e) {
    var ev = e || window.event
    if(!ev) {
      var c = this.getEvent.caller
      while(c) {
        ev = c.arguments[0]
        if(ev && Event === ev.constructor) {
          break
        }
        c = c.caller
      }
    }
    return ev
  },
  // 获取指定父级对象
  getParent: function() {
    var el = arguments[0],
      sign = arguments[1];
    if(!el) throw new Error('请传入要获取父节点的对象')
    if(!sign) throw new Error('请传入父节点的标识')
    var type = sign.charAt(0) === '.' ? 'class' : sign.charAt(0) === '#' ? 'id' : 'tag',
      parent = el.parentNode
      sign = sign.substr(1)
    if(parent === document) {
      return document.querySelector('html')
    }
    switch(type) {
      case 'class':
        if(parent.classList.contains(sign)) return parent
        return this.getParent(parent, sign)
      case 'id':
        if(parent.id === sign) return parent
        return this.getParent(parent, sign)
      default:
        if(parent.tagName === sign.toUpperCase()) return parent
        return this.getParent(parent, sign)
    }
  },
  dataset: function(element) {
    var obj = {};
    if(element.dataset) {
      return element.dataset
    } else {
      // console.log(element.attributes);
      for(var i = 0; i < element.attributes.length; i++) {
        var key = element.attributes[i].nodeName
        if(/^data-\w+$/.test(key)) { //判断是否以data-开头的属性名
          var value = element.attributes[i].nodeValue //值
          var keyName = key.match(/^data-(\w+)/)[1] //键名
          obj[keyName] = value; //对象添加属性
        }
      }
    }
    return obj
  }
}