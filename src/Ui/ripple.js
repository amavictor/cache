import { TouchableRipple } from "react-native-paper"

export const Ripple = ({ children, ...otherProps }) => {
    return (
        <TouchableRipple
            rippleColor="rgba(0,0,0,0.08)"
            {...otherProps}

        >
            {children}
        </TouchableRipple>
    )
}