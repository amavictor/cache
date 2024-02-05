import { request } from "../Utils"
export const getAllCountries = () =>
    request({
        url: `/countries`,
        method: "GET",
    })

export const getAllActivities = () =>
    request({
        url: `/activities`,
        method: "GET",
    })
