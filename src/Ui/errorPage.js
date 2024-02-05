import { View } from 'react-native'
import Text from './text'
import React from 'react'
import { ScaledSheet } from 'react-native-size-matters';

export const ErrorPage = (error) => {
    return (
        <View style={styles.container}>
            <Text>{error?.error}</Text>
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
})