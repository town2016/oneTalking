// gallery reducer
const SET = 'set'

export function gallery (state = {imgList: [], curIndex: 0}, action) {
  switch (action.type) {
    case SET:
      delete action.type
      return {...action}
    default:
      return state
  }
}
// 设置state
export function setGallery (obj = {}) {
  return Object.assign({}, {type: SET}, obj) 
}

// 异步设置state
/* export function setGalleryAsync (obj = {}) {
  return dispatch => {
    setTimeout(() => {
      dispatch(setGallery(obj))
    }, 2000)
  }
} */
