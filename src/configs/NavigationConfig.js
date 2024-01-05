import {
  DashboardOutlined,
  
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";


const dashBoardNavTree = [
  {
    key: "dashboards",
    path: `${APP_PREFIX_PATH}/dashboards`,
    title: "sidenav.dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,
    isGroupTitle: true,
    //submenu:menu_items,
    submenu: [
      {
        "key": "dashboards-default",
        "path": "/dashboards/default",
        "title": "Dashboard",
        "icon": "DashboardOutlined",
        "breadcrumb": false,
        "submenu": []
      },


      {
        "key": "dashboards-master",
        "path": "",
        "title": "Master",
        "icon": "OrderedListOutlined",
        "breadcrumb": false,
        "submenu": [
          {
            "key": "dashboards-country",
            "path": "/dashboards/country",
            "title": "Country",
            "icon": "OrderedListOutlined",
            "breadcrumb": false,
            "submenu": []
          },
          {
            "key": "dashboards-state",
            "path": "/dashboards/state",
            "title": "State",
            "icon": "UnorderedListOutlined",
            "breadcrumb": false,
            "submenu": []
          },
          {
            "key": "dashboards-city",
            "path": "/dashboards/city",
            "title": "City",
            "icon": "UnorderedListOutlined",
            "breadcrumb": false,
            "submenu": []
          },
          
        ]
      },
      {
        "key": "dashboards-booking",
        "path": "/dashboards/booking",
        "title": "Booking",
        "icon": "UserOutlined",
        "breadcrumb": false,
        "submenu": [
          {
            "key": "dashboards-hotel",
            "path": "/dashboards/hotel",
            "title": "Hotel Booking",
            "icon": "UnorderedListOutlined",
            "breadcrumb": false,
            "submenu": []
          },
          {
            "key": "dashboards-roombooking",
            "path": "/dashboards/roombooking",
            "title": "Room Booking",
            "icon": "UnorderedListOutlined",
            "breadcrumb": false,
            "submenu": []
          },
          {
            "key": "dashboards-cabbooking",
            "path": "/dashboards/cabbooking",
            "title": "Cab Booking",
            "icon": "UnorderedListOutlined",
            "breadcrumb": false,
            "submenu": []
          },
          {
            "key": "dashboards-tourguidebooking",
            "path": "/dashboards/tourguidebooking",
            "title": "Tour Guide Booking",
            "icon": "UnorderedListOutlined",
            "breadcrumb": false,
            "submenu": []
          },
          
          
        ]
      },
      {
        "key": "dashboards-tourmanagement",
        "path": "/dashboards/tourmanagement",
        "title": "Tour Management ",
        "icon": "UserOutlined",
        "breadcrumb": false,
        "submenu": [
          {
            "key": "dashboards-category",
            "path": "/dashboards/category",
            "title": "Category",
            "icon": "UnorderedListOutlined",
            "breadcrumb": false,
            "submenu": []
          },
          {
            "key": "dashboards-tour",
            "path": "/dashboards/tour",
            "title": "Tour",
            "icon": "UnorderedListOutlined",
            "breadcrumb": false,
            "submenu": []
          },
          
          
        ]
      },
      
      {
        "key": "dashboards-usermanagement",
        "path": "/dashboards/usermanagement",
        "title": "User Management",
        "icon": "UserOutlined",
        "breadcrumb": false,
        "submenu": [
          {
            "key": "dashboards-rolemanagement",
            "path": "/dashboards/rolemanagement",
            "title": "Role Management",
            "icon": "UnorderedListOutlined",
            "breadcrumb": false,
            "submenu": []
          },
          {
            "key": "dashboards-permissionmanagement ",
            "path": "/dashboards/permissionmanagement ",
            "title": "Permission management ",
            "icon": "UnorderedListOutlined",
            "breadcrumb": false,
            "submenu": []
          },
          {
            "key": "dashboards-employeemanagement ",
            "path": "/dashboards/employeemanagement",
            "title": "Employee management ",
            "icon": "UnorderedListOutlined",
            "breadcrumb": false,
            "submenu": []
          },
          
          
          
        ]
      },
    ]
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
