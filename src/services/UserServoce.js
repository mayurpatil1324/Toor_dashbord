import fetch from 'auth/FetchMasterInterceptor'

const userService = {}

userService.getUser = function (data) {
  return fetch({
    url: '/employee/list',
    method: 'post',
    data:data
  })
}
userService.addUser = function (data) {
  return fetch({
    url: '/employee/create',
    method: 'post',
    data:data
  })
}
userService.editUser = function (data) {
  return fetch({
    url: '/employee/update',
    method: 'post',
    data:data
  })
}
userService.deleteUser = function (data) {
  return fetch({
    url: '/employee/delete',
    method: 'post',
    data:data
  })
}


    
    
export default userService