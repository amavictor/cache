import { request } from "../Utils"
const BASE_URL = "users"

export const getFollowers = () =>
    request({
        url: `${BASE_URL}/followers`,
        method: "GET",
    })

export const getFollowing = () =>
    request({
        url: `${BASE_URL}/followers`,
        method: "GET",
    })


export const searchUser = (filter) => {
    console.log("i ran")
    return request({
        url: `${BASE_URL}/find?q=${filter}`,
        method: "GET",
    })
}

export const followUser = (data) =>
    request({
        url: `${BASE_URL}/follow`,
        method: "POST",
        data
    })
