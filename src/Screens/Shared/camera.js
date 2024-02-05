import { View, StatusBar, Image, TouchableOpacity, Platform } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { useState, useRef } from 'react'
import { CameraType, Camera as CameraComponent } from 'expo-camera'
import Text from '../../Ui/text'

import { moderateScale } from 'react-native-size-matters'
import { useNavigation, useRoute } from '@react-navigation/native';

export const Camera = () => {
    const { back, front } = CameraType
    const { navigate } = useNavigation()
    const [type, setType] = useState(front)
    const ref = useRef(null)
    const { params } = useRoute()


    const toggleCameraType = () => setType(type === front ? back : front)

    const snap = async () => {
        if (ref) {
            const photo = await ref?.current?.takePictureAsync()
            console.log(photo, "photo")
            navigate(
                params.route,
                {
                    ...params.transferData,
                    profilePicUrl: photo
                })
        }
    }


    return (
        <>
            <View style={
                styles.container
            }>
                <CameraComponent
                    type={type}
                    style={styles.camera}
                    ref={ref}
                    ratio={Platform.OS === 'android' ? "4:3" : "16:9"}
                />
                <View
                    style={styles.flip}
                >
                    <TouchableOpacity
                        onPress={() => navigate(params.route)}
                    >
                        <Text.h1 style={{
                            color: "#ffffff"
                        }}
                        >X</Text.h1>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={toggleCameraType}
                    >
                        <Image
                            style={{
                                width: moderateScale(35),
                                height: moderateScale(35),
                            }}
                            source={require("../../../assets/cameraIcons/flip.png")}
                        />
                    </TouchableOpacity>

                </View>
                <TouchableOpacity
                    style={styles.snap}
                    onPress={snap}
                >
                    <Image
                        source={require("../../../assets/cameraIcons/snap.png")}
                    />
                </TouchableOpacity>

            </View>
            <StatusBar
                barStyle={"light-content"}
            />
        </>

    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        width: "100%",
        position: "relative"
    },
    camera: {
        flex: 1
    },
    snap: {
        position: "absolute",
        bottom: "40@vs",
        left: "50%",
        marginLeft: "-25@s",
        zIndex: 2,
    },
    flip: {
        position: "absolute",
        top: "60@vs",
        flexDirection: "row",
        right: 0,
        zIndex: 2,
        width: "100%",
        justifyContent: "space-between"
    }
})