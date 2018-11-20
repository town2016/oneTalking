const IS_PUBLISH = 'ispublist'

export function dynamic (state = {ispublish: false}, action) {
  switch(action.type) {
    case IS_PUBLISH: 
      return {...state, ispublish: action.ispublish}
    default: 
      return state
  }
}

export function setPublish (obj) {
  return {type: IS_PUBLISH, ...obj}
}
