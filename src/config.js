import Cookie from 'js-cookie'
global.dictionary = {
  ERR_OK: 200,
  clearCookie: function () {
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
    if (keys) {
      for (var i = keys.length; i--;) {
        Cookie.remove(keys[i])
      }
    } 
  } 
}
