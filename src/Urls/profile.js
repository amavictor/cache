import { request } from "../Utils"
export const createProfile = (data) =>
    request({
        url: `/profile`,
        method: "POST",
        data
    })

export const getProfile = () =>
    request({
        url: `/profile`,
        method: "GET",
    })

export const updateProfile = (data) =>
    request({
        url: `/profile`,
        method: "PATCH",
        data
    })

