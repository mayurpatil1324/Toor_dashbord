import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

export const publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('views/auth-views/authentication/login')),
    },
    {
        key: 'register',
        path: `${AUTH_PREFIX_PATH}/register`,
        component: React.lazy(() => import('views/auth-views/authentication/register')),
    },
    {
        key: 'forgot-password',
        path: `${AUTH_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('views/auth-views/authentication/forgot-password')),
    },
    {
        key: 'reset-password',
        path: `${AUTH_PREFIX_PATH}/reset-password`,
        component: React.lazy(() => import('views/auth-views/authentication/reset-password')),
    }
]

export const protectedRoutes = [
    {
        key: 'dashboard.default',
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        component: React.lazy(() => import('views/app-views/dashboards/default')),
    },
    {
        key: 'dashboard.country',
        path: `${APP_PREFIX_PATH}/dashboards/country`,
        component: React.lazy(() => import('views/app-views/dashboards/Master/Country/index')),
    },
    {
        key: 'dashboard.state',
        path: `${APP_PREFIX_PATH}/dashboards/state`,
        component: React.lazy(() => import('views/app-views/dashboards/Master/State/index')),
    },
    
    {
        key: 'dashboard.city',
        path: `${APP_PREFIX_PATH}/dashboards/city`,
        component: React.lazy(() => import('views/app-views/dashboards/Master/City')),
    },
    
    

    {
        key: 'dashboard.category',
        path: `${APP_PREFIX_PATH}/dashboards/category`,
        component: React.lazy(() => import('views/app-views/dashboards/Tour management/Category/index')),
    },
    {
        key: 'dashboard.tour',
        path: `${APP_PREFIX_PATH}/dashboards/tour`,
        component: React.lazy(() => import('views/app-views/dashboards/Tour management/Tour/index')),
    },



    {
        key: 'dashboard.hotel',
        path: `${APP_PREFIX_PATH}/dashboards/hotel`,
        component: React.lazy(() => import('views/app-views/dashboards/Booking/Hotel Booking/index')),
    },
    {
        key: 'dashboard.roombooking',
        path: `${APP_PREFIX_PATH}/dashboards/roombooking`,
        component: React.lazy(() => import('views/app-views/dashboards/Booking/Room Booking/index')),
    },
    {
        key: 'dashboard.cabbooking',
        path: `${APP_PREFIX_PATH}/dashboards/cabbooking`,
        component: React.lazy(() => import('views/app-views/dashboards/Booking/Cab Booking/index')),
    },
    {
        key: 'dashboard.tourguidebooking',
        path: `${APP_PREFIX_PATH}/dashboards/tourguidebooking`,
        component: React.lazy(() => import('views/app-views/dashboards/Booking/Tour Guide Booking/index')),
    }
    
]