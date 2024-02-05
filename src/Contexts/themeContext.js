import { createContext, useState } from "react";
import { useColorScheme } from "react-native"
import { moderateScale } from "react-native-size-matters";

export const ThemeContext = createContext()

export const ThemeContextProvider = ({ children }) => {
    const colorScheme = useColorScheme()
    const [isExtraMenuOpen, setIsExtraMenuOpen] = useState(false)

    const getColors = (theme) => {

        if (theme === 'light') {
            return {
                primary: '#119548',
                secondary: '#F1F6EE',
                authPrimary: "#576E72",
                background: "#F5F7F9",
                text: "#646464",
                inputField: "#d5ebcc",
                buttonText: "#F1F6EE",
                alternate: '#02374C',
                placeHolderColor: "#7B908B",
                inputTextColor: "#02374C",
                bottomSheet: "#ffffff",
                bottomSheetHandle: "#02374C",
                headerBackground: "#F0F0F0",
                drawerText: "#02374C",
                drawerActive: "#d5ebcc",
                drawerBackground: "#ffffff",
                cardBackground: "#ffffff",
                headerBodyBackground: "#ffffff",
                senderColor: "#7CC017",
                danger: "#F44A4A",
                gray: "#CFDADD"
            }
        }
        else if (theme === 'dark') {
            return {
                primary: '#119548',
                secondary: '#576E72',
                alternate: '#F1F6EE',
                background: "#02374C",
                buttonText: "#02374C",
                inputField: "#d5ebcc",
                text: "#ffff",
                placeHolderColor: "#7B908B",
                inputTextColor: "#02374C",
                bottomSheet: "#02374C",
                bottomSheetHandle: "#ffffff",
                headerBackground: "#F0F0F0",
                drawerText: "#ffffff",
                drawerActive: "#d5ebcc",
                drawerBackground: "#02374C",
                cardBackground: "#104a61",
                headerBodyBackground: "#02374C",
                senderColor: "#7CC017",
                danger: "#F44A4A",
                gray: "#CFDADD"

            }
        }
    }

    const fontSize = {
        xxl: moderateScale(24),
        xl: moderateScale(22),
        l: moderateScale(20),
        m: moderateScale(18),
        s: moderateScale(16),
        xs: moderateScale(14),
        xxs: moderateScale(12),
    }

    const fontWeight = {
        light: '300',
        regular: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
        extraBold: '800',
        black: '900'
    }

    const colors = getColors(colorScheme)

    return (
        <ThemeContext.Provider
            value={{
                colors,
                fontSize,
                fontWeight,
                isExtraMenuOpen,
                setIsExtraMenuOpen
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}