BASE_URL = "auth"
import { generateUrlParams } from "../Utils"
import { request } from "../Utils/network"


export const registerUser = (data) =>
    request({
        url: `${BASE_URL}/register`,
        method: "POST",
        data
    })

export const loginUser = (data) =>
    request({
        url: `${BASE_URL}/login`,
        method: "POST",
        data
    })

export const requestPasswordReset = (data) =>
    request({
        url: `${BASE_URL}/request-reset`,
        method: "POST",
        data
    })


export const resetPassword = (data) =>
    request({
        url: `${BASE_URL}/reset-password`,
        method: "POST",
        data
    })



export const veriyEmail = (data) => {
    const params = {
        triggerlogin: true,
        client: "mobile"
    }
    console.log(generateUrlParams(params),"fghfghjjkujhkbvjhfchjkuhgfhgffjgjvhgfhkjhghkjy")
    return (
        request({
            url: `${BASE_URL}/verify-email?${generateUrlParams(params)}`,
            method: "POST",
            data
        })
    )
}


export const resendOTP = (data) =>
    request({
        url: `${BASE_URL}/resend-otp`,
        method: "POST",
        data
    })



export const refreshToken = (data) =>
    request({
        url: `${BASE_URL}/refresh`,
        method: "POST",
        data
    })


