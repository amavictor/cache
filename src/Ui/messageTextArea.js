import {
    KeyboardAvoidingView,
    TextInput
} from 'react-native'
import {forwardRef} from 'react'
import { ScaledSheet } from 'react-native-size-matters';

export const MessageTextArea = forwardRef(({
    placeholder,
    onChange,
    value,
    ...otherProps
}, ref) => {
    return (
        <KeyboardAvoidingView
            style={styles.container}
        >
            <TextInput
                {...otherProps}
                ref={ref}
                style={styles.input}
                placeholder={placeholder}
                value={value}
                keyboardType={'default'}
                multiline={true}
                scrollEnabled={true}
            />
        </KeyboardAvoidingView>
    )
})

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    input: {
        fontSize: "14@ms"
    }

}) 