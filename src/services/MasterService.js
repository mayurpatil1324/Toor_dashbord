import fetch from "auth/FetchMasterInterceptor";

const masterService = {};

masterService.getCountry = function (data) {
  return fetch({
    url: "/country/list",
    method: "post",
    data: data,
  });
};
masterService.addCountry = function (data) {
  return fetch({
    url: "/country/add",
    method: "post",
    data: data,
  });
};
masterService.editCountry = function (data) {
  return fetch({
    url: "/country/update",
    method: "post",
    data: data,
  });
};
masterService.deleteCountry = function (data) {
  return fetch({
    url: "/country/delete",
    method: "post",
    data: data,
  });
};
masterService.getState = function (data) {
  return fetch({
    url: "/state/list",
    method: "post",
    data: data,
  });
};
masterService.addState = function (data) {
  return fetch({
    url: "/state/add",
    method: "post",
    data: data,
  });
};
masterService.editState = function (data) {
  return fetch({
    url: "/state/update",
    method: "post",
    data: data,
  });
};
masterService.deleteState = function (data) {
  return fetch({
    url: "/state/delete",
    method: "post",
    data: data,
  });
};



masterService.getCity = function (data) {
  return fetch({
    url: "/city/list",
    method: "post",
    data: data,
  });
};
masterService.addCity = function (data) {
  return fetch({
    url: "/city/add",
    method: "post",
    data: data,
  });
};
masterService.editCity = function (data) {
  return fetch({
    url: "/city/update",
    method: "post",
    data: data,
  });
};
masterService.deleteCity = function (data) {
  return fetch({
    url: "/city/delete",
    method: "post",
    data: data,
  });
};






masterService.getHotel = function (data) {
  return fetch({
    url: '/hotel/list',
    method: 'post',
    data:data
  })
}
masterService.addHotel = function (data) {
  return fetch({
    url: '/hotel/add',
    method: 'post',
    data:data
  })
}
masterService.editHotel = function (data) {
  return fetch({
    url: '/hotel/update',
    method: 'post',
    data:data
  })
}
masterService.deleteHotel = function (data) {
  return fetch({
    url: '/hotel/delete',
    method: 'post',
    data:data
  })
}


masterService.getRoom = function (data) {
  return fetch({
    url: '/room/list',
    method: 'post',
    data:data
  })
}
masterService.addRoom = function (data) {
  return fetch({
    url: '/room/add',
    method: 'post',
    data:data
  })
}
masterService.editRoom = function (data) {
  return fetch({
    url: '/room/update',
    method: 'post',
    data:data
  })
}
masterService.deleteRoom = function (data) {
  return fetch({
    url: '/room/delete',
    method: 'post',
    data:data
  })
}




masterService.getCab = function (data) {
  return fetch({
    url: '/cab/list',
    method: 'post',
    data:data
  })
}
masterService.addCab = function (data) {
  return fetch({
    url: '/cab/add',
    method: 'post',
    data:data
  })
}
masterService.editCab = function (data) {
  return fetch({
    url: '/cab/update',
    method: 'post',
    data:data
  })
}
masterService.deleteCab = function (data) {
  return fetch({
    url: '/cab/delete',
    method: 'post',
    data:data
  })
}







masterService.getGuide = function (data) {
  return fetch({
    url: "/guide/list",
    method: "post",
    data: data,
  });
};
masterService.addGuide = function (data) {
  return fetch({
    url: "/guide/add",
    method: "post",
    data: data,
  });
};
masterService.editGuide = function (data) {
  return fetch({
    url: "/guide/update",
    method: "post",
    data: data,
  });
};
masterService.deleteGuide = function (data) {
  return fetch({
    url: "/guide/delete",
    method: "post",
    data: data,
  });
};



masterService.getCategory = function (data) {
  return fetch({
    url: '/category/list',
    method: 'post',
    data:data
  })
}
masterService.addCategory = function (data) {
  return fetch({
    url: '/category/add',
    method: 'post',
    data:data
  })
}
masterService.editCategory = function (data) {
  return fetch({
    url: '/category/update',
    method: 'post',
    data:data
  })
}
masterService.deleteCategory = function (data) {
  return fetch({
    url: '/category/delete',
    method: 'post',
    data:data
  })
}















export default masterService;
