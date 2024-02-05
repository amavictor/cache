import { View, Text, Pressable, ScrollView } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { BackArrow, VideoIcon } from '../../../../assets';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { AppBackground, SelectField, TextField, TextFieldArea } from '../../../Ui';
import { useContext } from 'react';
import { ThemeContext } from '../../../Contexts';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import HTMLView from 'react-native-htmlview';

export const AddJobs = () => {
    const navigation = useNavigation()
    const { colors } = useContext(ThemeContext)
    const RichText = useRef();
    const [article, setArticle] = useState("");


    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <Pressable
                onPress={() => navigation.goBack()}
            >
                <BackArrow />
            </Pressable>,
            headerLeftContainerStyle: {
                ...styles.headerLeft
            },
            headerTitleAlign: "left",
            headerTitleAllowFontScaling: true,
            headerTitleStyle: {
                fontSize: moderateScale(18),
                width: moderateScale(300)
            },

        })
    }, [])


    return (
        <AppBackground>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={[styles.scrollView, {
                    backgroundColor: colors.cardBackground
                }]}
            >
                <SelectField
                    light
                    topLabel={"Choose Company"}
                    options={[]}
                />

                <TextField
                    light
                    label={"Job Title"}
                />

                <SelectField
                    light
                    topLabel={"Job Category"}
                    options={[]}
                />

                
            </ScrollView>
        </AppBackground>
    )
}

const styles = ScaledSheet.create({
    headerLeft: {
        paddingLeft: "10@ms"
    },
    scrollView: {
        paddingVertical: "24@vs",
        paddingHorizontal: "15@ms",
        gap: "20@vs",
        flexGrow: 1,


    },
    scrollContainer: {
        height: "100%",
        marginTop: "11@vs",
        borderRadius: "8@ms",
    }
})