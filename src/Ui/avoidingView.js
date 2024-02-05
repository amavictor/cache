import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { AvoidSoftInput } from "react-native-avoid-softinput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

export const AvoidingView = ({ children, offset }) => {

    // const onFocusEffect = useCallback(() => {
    //     AvoidSoftInput.setAdjustPan();
    //     return () => {
    //         AvoidSoftInput.setDefaultAppSoftInputMode();
    //     }
    // }, []);

    // useFocusEffect(onFocusEffect);

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableResetScrollToCoords={false}
            bounces={false}
            contentContainerStyle={{
                flexGrow:1
            }}
            contentInsetAdjustmentBehavior="always"
            overScrollMode="always"
            showsVerticalScrollIndicator={true}
        >
            {children}
        </KeyboardAwareScrollView>
    );
}