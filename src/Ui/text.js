import { Text as RNText } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useContext } from 'react';
import { ThemeContext } from '../Contexts';

const Text = ({ style, children, ...rest }) => {
    const { colors } = useContext(ThemeContext)
    return (
        <RNText style={[styles.text, { color: colors.alternate }, style]} {...rest}>{children}</RNText>
    );
};

const styles = ScaledSheet.create({
    text: {
        fontSize: '14@ms',
    },
    h1: {
        fontSize: '26@ms',
        fontWeight: 600
    },
    h2: {
        fontSize: '24@ms',
        fontWeight: 600
    },
    h3: {
        fontSize: '22@ms',
        fontWeight: 500
    },
    h4: {
        fontSize: '20@ms',
        fontWeight: 500
    },
    h5: {
        fontSize: '18@ms',
        fontWeight: 500
    },
    h6: {
        fontSize: '16@ms',
        fontWeight: 400
    },
    p: {
        fontSize: '14@ms',
    },
    s: {
        fontSize: '12@ms',
    },
    drawer: {
        fontSize: '14@ms',
        fontWeight: 500
    }
});

const H1 = ({ style, children }) => {
    const { colors } = useContext(ThemeContext)
    return (
        <Text style={{
            color: colors.alternate,
            ...styles.h1,
            ...style,
        }}>
            {children}
        </Text>
    )
}

const H2 = ({ style, children }) => {
    const { colors } = useContext(ThemeContext)
    return (
        <Text style={{
            ...styles.h2,
            color: colors.alternate,
            ...style,
        }}>
            {children}
        </Text>
    )
}

const H3 = ({ style, children }) => {
    const { colors } = useContext(ThemeContext)
    return (
        <Text style={{
            ...styles.h3,
            color: colors.alternate,
            ...style,
        }}>
            {children}
        </Text>
    )
}

const H4 = ({ style, children }) => {
    const { colors } = useContext(ThemeContext)
    return (
        <Text style={{
            ...styles.h4,
            color: colors.alternate,
            ...style,
        }}>
            {children}
        </Text>
    )
}

const H5 = ({ style, children }) => {
    const { colors } = useContext(ThemeContext)
    return (
        <Text style={{
            color: colors.alternate,
            ...styles.h5,
            ...style,

        }}>
            {children}
        </Text>
    )
}

const H6 = ({ style, children }) => {
    const { colors } = useContext(ThemeContext)
    return (
        <Text style={{
            color: colors.text,
            ...styles.h6,
            ...style,
        }}>
            {children}
        </Text>
    )
}

const P = ({ style, children }) => {
    const { colors } = useContext(ThemeContext)
    return (
        <Text style={{
            color: colors.text,
            ...styles.p,
            ...style,

        }}>
            {children}
        </Text>
    )
}

const S = ({ style, children }) => {
    const { colors } = useContext(ThemeContext)
    return (
        <Text style={{
            color: colors.text,
            ...styles.s,
            ...style,
        }}>
            {children}
        </Text>
    )
}

const Danger = ({ style, children }) => {
    const { colors } = useContext(ThemeContext)
    return (
        <Text style={{
            color: colors.danger,
            ...styles.text,
            ...style,
        }}>
            {children}
        </Text>
    )
}



const Drawer = ({ style, children }) => {
    const { colors } = useContext(ThemeContext)
    return (
        <Text style={{
            ...styles.drawer,
            ...style,
            color: colors.drawerText
        }}>
            {children}
        </Text>
    )
}

Text.h1 = H1;
Text.h2 = H2;
Text.h3 = H3;
Text.h4 = H4;
Text.h5 = H5;
Text.h6 = H6;
Text.p = P;
Text.s = S;
Text.drawer = Drawer;
Text.danger = Danger;




export default Text;