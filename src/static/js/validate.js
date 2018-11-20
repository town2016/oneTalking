import  { eventHandler } from './common'

export const rules = {
  required: (value) => {
    return value.length > 0
  },
  email: (value) => {
    return /^[a-z0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i.test(value)
  },
  phone: (value) => {
    return /^1[34578]\d{9}$/.test(value)
  }
}

export function getValidators() {
  return {
    required: {
      message: '此项为必填项',
      test: function(el) {
        return el.value.length > 0 && el.value !== el.defaultValue
      }
    },
    email: {
      message: '邮箱地址格式不正确',
      test: function(el) {
        var datasetList = dataset(el)
        if (el.value === '') {
          if (!datasetList.required) {
            return true
          }
        }
        return /^[a-z0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i.test(el.value)
      }
    },
    phone: {
      message: '手机号码格式不正确',
      test: function(el) {
        var datasetList = dataset(el)
        if (el.value === '') {
          if (!datasetList.required) {
            return true
          }
        }
        return /^1[34578]\d{9}$/.test(el.value)
      }
    }
  }
}

class Validater {
  constructor (form) {
    this.id = form.id
    this.elements = form.elements
    this.init(form)
  }
}

// 初始化表单验证对象
Validater.prototype.init = function() {
  for(var i = 0; i < this.elements.length; i++) {
    var item = this.elements[i]
    bindEventListener(item, dataset(item))
  }
}
// 验证表单
Validater.prototype.check = function() {
  var valid = true
  for(var i = 0; i < this.elements.length; i++) {
    var el = this.elements[i],checks = dataset(el)
    for (var k in checks) {
      var validator = Validater.rules[k]
      if (!validator.test(el)) {
        valid = false
        tip(el, 'add', validator.message)
      } else {
        tip(el, 'remove')
      }
    }
  }
  return valid
}
function bindEventListener(el, valis) {
  if (valis.required !== undefined) {
    el.parentNode.classList.add('required')
  }
  eventHandler.addEvent(el, 'change', function () {
    for (var k in valis) {
      var validator = Validater.rules[k]
      var valid = validator.test(el)
      if (!valid) {
        tip(el, 'add', validator.message)
      } else {
        tip(el, 'remove')
      }
    }
  })
}
function tip (el, operation, message) {
  var parent = el.parentNode
  parent.style.position = 'relative'
  if (operation === 'add') {
    if (parent.querySelector('.error-tip')) {
      parent.querySelector('.error-tip').innerText = message
    } else {
      var tips = document.createElement('div')
      tips.className = 'error-tip'
      tips.style.cssText = 'position:absolute;top:100%;left:0;color:red;line-height:20px;font-size:12px;margin-top: 12px;'
      tips.innerText = message
      parent.appendChild(tips)
    }
    
  } else {
    if (parent.querySelector('.error-tip')) {
      parent.querySelector('.error-tip').remove()
    }
  }
}
// 初始化表单验证实例的验证规则集
Validater.rules = getValidators()
// 获取所有表单控件的所有的自定义属性
function dataset(element) {
  var obj = {};
  if(element.dataset) {
    return element.dataset;
  } else {
    // console.log(element.attributes);
    for(var i = 0; i < element.attributes.length; i++) {
      var key = element.attributes[i].nodeName;
      if(/^data-\w+$/.test(key)) { //判断是否以data-开头的属性名
        var value = element.attributes[i].nodeValue; //值
        var keyName = key.match(/^data-(\w+)/)[1]; //键名
        obj[keyName] = value; //对象添加属性
      }
    }
  }
  return obj;
}

export default Validater