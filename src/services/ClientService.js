import fetch from 'auth/FetchMasterInterceptor'

const clientService = {}

clientService.getClient = function (data) {
  return fetch({
    url: '/client/list',
    method: 'post',
    data:data
  })
}
clientService.addClient = function (data) {
  return fetch({
    url: '/client/create',
    method: 'post',
    data:data
  })
}
clientService.editClient = function (data) {
  return fetch({
    url: '/client/edit',
    method: 'post',
    data:data
  })
}
clientService.deleteClient = function (data) {
  return fetch({
    url: '/client/delete',
    method: 'post',
    data:data
  })
}

clientService.getCompany = function (data) {
  return fetch({
    url: '/company/list',
    method: 'post',
    data:data
  })
}
clientService.addCompany = function (data) {
  return fetch({
    url: '/company/create',
    method: 'post',
    data:data
  })
}
clientService.editCompany = function (data) {
  return fetch({
    url: '/company/edit',
    method: 'post',
    data:data
  })
}
clientService.deleteCompany = function (data) {
  return fetch({
    url: '/company/delete',
    method: 'post',
    data:data
  })
}
    
    
export default clientService