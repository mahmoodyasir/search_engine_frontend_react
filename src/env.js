import Cookies from 'js-cookie';

export const domain = "https://limitless-oasis-42014.herokuapp.com";
export const userToken = window.localStorage.getItem("token")
export const adminToken = window.localStorage.getItem("admin_token")


export const header = {
    Authorization: `token ${userToken}`
}

export const admin_header = {
    Authorization: `token ${adminToken}`
}