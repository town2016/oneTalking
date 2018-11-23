import axios from 'axios'
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

// 点赞或取消点赞
export function pariseOrCancel (params) {
  return dispatch => {
    return axios.get('/api/parise', {params: params})
  }
}
