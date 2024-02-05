import {
    View,
    ScrollView
} from 'react-native'
import Text from '../../Ui/text'
import { Authlayout } from '../../Layouts'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { Button, Chips, ErrorPage, ScreenLoader } from '../../Ui'
import { useState, useMemo } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useApiReceive } from '../../Hooks'
import { getAllActivities } from '../../Urls/select'
import { formatOptions } from '../../Utils'


export const ProfileActivities = () => {
    const [selected, setSelected] = useState([])
    const [activeIndex, setActiveIndex] = useState(-1)
    const { params } = useRoute()
    const { navigate } = useNavigation()

    console.log(params, "params")

    const { data: activities, error, isLoading } = useApiReceive(
        ["activities"],
        getAllActivities,
        {
            enabled: true
        }
    )

    const allActivities = useMemo(() => formatOptions(activities, "name", "id"),
        [activities]
    )

    console.log(allActivities)

    const onSubmit = () => {
        navigate("Profile picture", {
            ...params,
            activities: [...selected]
        })
    }

    const skip = () => {
        navigate("Profile picture", {
            ...params,
        })
    }

    const handleSelect = (item) => {
        if (!selected.includes(item.key)) {
            setSelected([...selected, item.key]);
        }
    };


    if (isLoading)
        return <ScreenLoader />

    if (error)
        return <ErrorPage error={error?.message} />

    return (
        <Authlayout>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text.h1>Activities</Text.h1>
                    <Text.s style={styles.sub}>
                        What health activites do you do for fun.
                        Select as many as is available.
                    </Text.s>
                </View>

                <ScrollView
                    style={styles.activitiesContainer}
                    contentContainerStyle={{
                        justifyContent: "center",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: moderateScale(10)
                    }}
                >
                    {
                        allActivities.map((item, index) => {
                            return (
                                <Chips
                                    key={index}
                                    mode={"outlined"}
                                    showSelectedCheck={true}
                                    selected={index === activeIndex || selected.includes(item.key)}
                                    onPress={() => {
                                        handleSelect(item)
                                        setActiveIndex(index)
                                    }}
                                >
                                    {item.value}
                                </Chips>
                            )
                        })
                    }

                </ScrollView>

                <View style={styles.buttonContainer}>
                    <Button
                        title={"Continue"}
                        onPress={onSubmit}
                    />
                    <Button
                        title={"Skip"}
                        outline
                        onPress={skip}
                    />

                </View>
            </View>
        </Authlayout>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        width: "100%",
        position: "relative",
        paddingTop: "50@vs",
        paddingHorizontal: "20@ms",
        alignItems: "center",
        gap: "42@vs"
    },
    title: {
        alignItems: "center"
    },
    sub: {
        marginTop: "10@vs",
        textAlign: "center",
    },
    activitiesContainer: {
        width: "100%",
    },
    buttonContainer: {
        gap: "12@vs"
    }
})