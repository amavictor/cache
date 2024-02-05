import { ScrollView, View, FlatList, Dimensions } from "react-native"
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext } from 'react';
import { ThemeContext } from "../../../../Contexts";
import { BarChart } from "react-native-gifted-charts";
import { ActivityItem } from "../components/activityItem";
import {
    ProfileCarbonIcon,
    ProfileFireIcon,
    ProfileMapIcon,
    ProfilePiggyIcon,
    ProfileSpeedIcon,
    ProfileTimeIcon
} from "../../../../../assets";

export const Activity = () => {
    const insets = useSafeAreaInsets()
    const { colors } = useContext(ThemeContext)
    const barData = [
        {
            value: 250,
            label: 'Mon',
            frontColor: colors.primary
        },
        {
            value: 500,
            label: 'Tue',
            frontColor: colors.primary
        },
        {
            value: 745,
            label: 'Wed',
            frontColor: colors.primary
        },
        {
            value: 320,
            label: 'Thur',
            frontColor: colors.primary
        },
        {
            value: 600,
            label: 'Fri',
            frontColor: colors.primary
        },
        {
            value: 256,
            label: 'Sat',
            frontColor: colors.primary
        },
        {
            value: 300,
            label: 'Sun',
            frontColor: colors.primary
        },
    ];

    const activityData = [
        {
            title: 'Distance Covered',
            data: '102 km',
            icon: <ProfileMapIcon />,
        },
        {
            title: 'Total Time',
            data: '1:34:02',
            icon: <ProfileTimeIcon />,
        },
        {
            title: 'Burnt Calories',
            data: '302',
            icon: <ProfileFireIcon />,
        },
        {
            title: 'Heart Rate',
            data: '602 BPM',
            icon: <ProfilePiggyIcon />,
        },
        {
            title: 'Breath Control',
            data: '202',
            icon: <ProfileCarbonIcon />,
        },
        {
            title: 'Speed',
            data: '15 km/h',
            icon: <ProfileSpeedIcon />,
        },
    ];

    return (
        <ScrollView
            contentContainerStyle={styles.scrollStyle}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
        >
            <View style={[styles.activityContainer, {
                backgroundColor: colors.cardBackground
            }]}>
                <BarChart
                    data={barData}
                    barStyle={{
                        borderRadius: moderateScale(30)
                    }}
                    barWidth={moderateScale(20)}
                    noOfSections={moderateScale(3)}
                    barBorderRadius={moderateScale(4)}
                    frontColor="lightgray"
                    dashWidth={0}
                    xAxisLabelTextStyle={{
                        fontSize: moderateScale(10),
                        fontWeight: '300',
                        color: colors.text
                    }}
                    isAnimated={true}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    yAxisTextStyle={{
                        display: 'none'
                    }}
                    showXAxisIndices={false}
                    lineBehindBars={false}
                />
            </View>


            <FlatList
                data={activityData}
                renderItem={({ item }) => <ActivityItem title={item.title} data={item.data} icon={item.icon} />}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={styles.activityItemsContainer}
                columnWrapperStyle={styles.activityRow}
                numColumns={2}
            />

        </ScrollView>
    )
}

const styles = ScaledSheet.create({
    activityContainer: {
        padding: "10@ms",
        borderRadius: "5@ms",
        alignItems: "center",
        justifyContent: "center"
    },
    activityRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: "20@ms"
    },
    activityItemsContainer: {
        marginTop: "25@vs",
        flexGrow: 1,
        justifyContent: "space-between",
        gap: Dimensions.get('window').width / moderateScale(20)
    },
    scrollStyle: {
        flexGrow: 1,
        paddingTop: "25@vs",
        paddingBottom:"20@vs"
    }
})