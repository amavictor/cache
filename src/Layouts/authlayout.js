import {
    Dimensions,
    Image,
    View,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native'
import { ScaledSheet, verticalScale, moderateScale } from 'react-native-size-matters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useContext, forwardRef } from 'react';
import { ThemeContext } from '../Contexts/themeContext';
import { BottomSheetElement } from '../Ui';

export const Authlayout = forwardRef(({
    children,
    bottomSheetContent,
    snapPoints,
    detached
}, ref) => {
    const insets = useSafeAreaInsets()
    const { colors } = useContext(ThemeContext)
    const { height } = Dimensions.get("window")


    const styles = ScaledSheet.create({
        container: {
            flex: 1,
            width: "100%",
            position: "relative",
            backgroundColor: colors.background
        },

        background: {
            flex: 1,
            zIndex: -2,
            justifyContent: "space-between",
            paddingTop: "40@vs",
        },

        logo_container: {
            width: "100%",
            alignItems: "center",
        },

        children: {
            position: 'absolute',
            zIndex: 0,
            width: "100%",
            flex: 1,
            height: (height / 2) + verticalScale(150),
            left: 0,
            top: height / 2 - moderateScale(200),
            paddingBottom: insets.bottom,
        },
    })

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
            <>
                <View style={{
                    ...styles.container,
                    paddingTop: insets.top,
                }}>
                    <View style={styles.background}>
                        <View style={styles.logo_container}>
                            <Image
                                source={require('../../assets/logo.png')}
                                resizeMode="contain"
                            />
                        </View>

                        <Image
                            source={require('../../assets/auth/auth_background.png')}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.children}>
                        {children}
                    </View>
                    {
                        bottomSheetContent &&
                        <BottomSheetElement
                            ref={ref}
                            snapPoints={snapPoints}
                            detached={detached}
                        >
                            {bottomSheetContent}
                        </BottomSheetElement>
                    }

                </View>
            </>
        </TouchableWithoutFeedback>

    )
})
