// import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { ThemeContext } from '../Contexts';
import { useContext, forwardRef } from 'react';
import { StyleSheet, View, Text } from "react-native"
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';


export const BottomSheetElement = forwardRef(({
    children,
    detached,
    index,
    snapPoints,
    ...otherProps
}, ref) => {
    const { colors } = useContext(ThemeContext)
    const insets = useSafeAreaInsets()
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const CustomBackdrop = useCallback((props) => {
        return (
            <BottomSheetBackdrop
                {...props}
                opacity={0.5}
                enableTouchThrough={false}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                }}
            />
        );
    }, []);

    const backgroundComponent = useCallback(() =>
        <View style={{
            ...styles.background,
            backgroundColor: "red"
        }}>

        </View>,
        []
    )

    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            detached={detached}
            bottomInset={detached && insets.bottom}
            style={detached && styles.detachedStyle}
            backgroundStyle={{
                backgroundColor: colors.bottomSheet,
            }}
            onChange={handleSheetChanges}
            backdropComponent={CustomBackdrop}
            {...otherProps}
            
        >
            <View style={
                styles.contentContainer}
            >
                {children}
            </View>
        </BottomSheet>
    )
})


const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        width: "100%",
    },
    detachedStyle: {
        marginHorizontal: moderateScale(20),
    }

});