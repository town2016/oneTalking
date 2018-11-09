// gallery reducer

const SET = 'set'

export function gallery (state = [], action) {
  switch (action.type) {
    case SET:
      return state = action.imgList
    default:
      return state
  }
}

export function setGallery (obj = {}) {
  return Object.assign({}, {type: SET}, obj) 
}
// 异步设置state
export function setGalleryAsync (obj = {}) {
  return dispatch => {
    setTimeout(() => {
      dispatch(setGallery(obj))
    }, 2000)
  }
}
