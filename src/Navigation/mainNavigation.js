import { ScaledSheet } from "react-native-size-matters"
import { View } from "react-native"
import { Authlayout } from "../Layouts"
import { AuthNavigation } from "./authNavigation"
import { PrivateNavigation } from "./PrivateNavigation/privateNavigation"
import { BottomNavigation } from "./PrivateNavigation/bottomNavigation"
import { useDispatch, useSelector } from "react-redux"
import { AUTH_ACTIONS } from "../Redux"
import { useApiSend } from "../Hooks"
import { useLayoutEffect, useEffect } from "react"
import { refreshToken } from "../Urls"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { clearPersistRoot } from "../Utils"
import { useFocusEffect } from '@react-navigation/native';


export const MainNavigation = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const refereshTokenKey = user?.currentUser?.refreshToken

    // useEffect(() => {
    //     dispatch({
    //         type: AUTH_ACTIONS.LOGOUT,
    //         payload: null
    //     })
    //     dispatch({
    //         type: AUTH_ACTIONS.COMPLETE_PROFILE,
    //         payload: false
    //     })
    //         // clearAsyncStorage()
    //     clearPersistRoot()
    // }, [])

    // clearPersistRoot()


    const { mutate } = useApiSend(
        refreshToken,
        (data) => {
            dispatch({
                type: AUTH_ACTIONS.REFRESH,
                payload: {
                    accessToken: data?.accessToken,
                    refreshToken: data?.refreshToken
                }
            })
        }
    )

    const startTokenRefreshInterval = () => {
        return setInterval(() => {
            mutate({
                role: ["user"],
                refresh: refereshTokenKey
            });
        }, 100000);
    };

    useEffect(() => {
        mutate({
            role: ["user"],
            refresh: refereshTokenKey
        });
    }, [])

    useEffect(() => {
        let intervalId;

        if (user?.currentUser && user?.isProfileComplete) {
            intervalId = startTokenRefreshInterval();
        }

        return () => clearInterval(intervalId);
    }, [user, refreshToken]);



    return (
        (user?.currentUser && user?.isProfileComplete) ?
            <PrivateNavigation />
            :
            <AuthNavigation />
    )
}


const styles = ScaledSheet.create({
    container: {
        flex: 1,
    }
})

