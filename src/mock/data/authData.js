import React from "react";
import { AUTH_DETAILS, MENU_ITEMS } from "constants/AuthConstant";
const details = localStorage.getItem(AUTH_DETAILS);
const items = localStorage.getItem(MENU_ITEMS);
export const signInUserData = JSON.parse(details || "{}");
export const menu_items = JSON.parse(items || "{}");
