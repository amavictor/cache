import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Home, Post, Reply, Search } from '../../../Screens';
import {
    useNavigation,
    DrawerActions
} from '@react-navigation/native';
import { useContext } from 'react';
import { DrawerContext, ThemeContext } from '../../../Contexts';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import {
    Avatar,
    Divider
} from 'react-native-paper';
import {
    View,
    Dimensions,
    Pressable,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {
    Ripple,
    BottomSheetElement,
    Button,
    FilterItem
} from '../../../Ui';
import Text from '../../../Ui/text';
import {
    Search as SearchIcon,
    Filter,
    Notification,
    Menu,
    SortIcon,
    TypeIcon,
    CheckIcon
} from '../../../../assets';
import { sortOptions, typeOptions } from '../../../Utils';



const HomeStack = createStackNavigator()
const placeholder = "../../../../assets/auth/profile.jpeg"
const height = Dimensions.get("window").height


export const HomeStackNavigation = () => {
    const { colors } = useContext(ThemeContext)
    const {
        bottomSheetContent,
        sheetRef,
        snapPoints
    } = useContext(DrawerContext)
    const { dispatch } = useNavigation()

    const screens = [
        {
            name: "Home",
            component: Home
        },
        {
            name: "Post",
            component: Post
        },

        {
            name: "Reply Comment",
            component: Reply,
            options: {
                ...TransitionPresets.ModalTransition,
            }
        },

    ]

    return (
        <View style={styles.container}>
            <HomeStack.Navigator
                screenOptions={{
                    headerShown: true,
                    headerRight: HeaderComponent,
                    headerStyle: {
                        height: 0.14 * height,
                        backgroundColor: colors.headerBodyBackground
                    },
                    headerLeft: () =>
                        <Pressable onPress={() => dispatch(DrawerActions.openDrawer())}>
                            <Menu
                                height={moderateScale(23)}
                                width={moderateScale(23)}
                            />
                        </Pressable>,
                    headerLeftContainerStyle: {
                        ...styles.headerLeft
                    },
                    headerTitleStyle: {
                        fontSize: moderateScale(18)
                    },
                    headerTitleAlign: "left",
                    headerTitleAllowFontScaling: true,
                    headerRightContainerStyle: {
                        width: "auto",
                        width: moderateScale(700)
                    },
                    headerTitleContainerStyle: {
                        width: moderateScale(100)
                    },
                }}
            >
                {
                    screens.map(({ name, component, options }, index) => (
                        <HomeStack.Screen
                            key={index}
                            name={name}
                            component={component}
                            options={{
                                ...options
                            }}
                        />
                    ))
                }
            </HomeStack.Navigator>

            <BottomSheetElement
                ref={sheetRef}
                snapPoints={snapPoints}
            >
                {bottomSheetContent}
            </BottomSheetElement>
        </View>
    )
}

const HeaderComponent = () => {
    const { colors } = useContext(ThemeContext)
    const { navigate } = useNavigation()
    const {
        openBottomSheet,
        setBottomSheetContent,
    } = useContext(DrawerContext)
    const handleBottomContent = () => {
        setBottomSheetContent(BottomSheetContent)
        openBottomSheet()
    }

    return (
        <View style={styles.headerRight}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>navigate("Search User")}
            >
                <View style={{
                    ...styles.iconBackground,
                    backgroundColor: colors.headerBackground
                }}>
                    <SearchIcon />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleBottomContent}
                style={styles.ripple}
            >
                <View style={{
                    ...styles.iconBackground,
                    backgroundColor: colors.headerBackground
                }}>
                    <Filter />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.8}
            >
                <View style={{
                    ...styles.iconBackground,
                    backgroundColor: colors.headerBackground
                }}>
                    <Notification />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigate("User Profile")}>
                <View style={{
                    ...styles.iconBackground,
                    backgroundColor: colors.headerBackground
                }}>
                    <Avatar.Image
                        size={moderateScale(28)}
                        source={require(placeholder)}
                    />
                </View>
            </TouchableOpacity>


        </View>
    )
}




const BottomSheetContent = () => {

    return (
        <View style={bottomStyles.container}>
            <ScrollView
                contentContainerStyle={bottomStyles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={bottomStyles.firstSection}>
                    <View style={bottomStyles.section}>
                        <SortIcon />
                        <Text.h5 style={bottomStyles.sectionHeader}>Sort By</Text.h5>
                    </View>

                    <View style={bottomStyles.listContainer}>
                        {
                            sortOptions.map((option, index) =>
                                <FilterItem
                                    title={option}
                                    key={index}
                                />
                            )
                        }
                    </View>
                </View>
                <View>
                    <View>
                        <View style={bottomStyles.section}>
                            <TypeIcon />
                            <Text.h5 style={bottomStyles.sectionHeader}>Type</Text.h5>
                        </View>

                        <View style={bottomStyles.listContainer}>
                            {
                                typeOptions.map((option, index) =>
                                    <FilterItem
                                        title={option}
                                        key={index}
                                    />
                                )
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={bottomStyles.buttonContainer}>
                <Button
                    title={"Reset"}
                    type={"transparent"}
                />
                <Button
                    title={"Apply"}
                    type={"primary"}
                />
            </View>
        </View>
    )
}



const styles = ScaledSheet.create({
    container: {
        flex: 1
    },
    headerRight: {
        flexDirection: "row",
        width: "auto",
        paddingRight: "12@ms",
        justifyContent: "flex-end",
        gap: moderateScale(7)
    },
    iconBackground: {
        alignItems: "center",
        justifyContent: "center",
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(16)
    },
    ripple: {
        borderRadius: moderateScale(16)
    },
    headerLeft: {
        paddingLeft: "12@ms"
    },
})


const bottomStyles = ScaledSheet.create({
    container: {
        height:"100%",
        width: "100%",
        paddingHorizontal: "20@ms",
        paddingVertical: "20@ms"
    },
    itemContainer: {
        width: "100%"
    },
    scrollView: {
        width: "100%",
        flexGrow:1
    },
    // filterItemContainer: {
    //     width: "100%",
    //     gap: "12@vs"
    // },
    // filterItem: {
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     alignItems: "center",
    //     width: "100%"

    // },
    section: {
        width: "100%",
        flexDirection: "row",
        gap: "10@ms",
        marginBottom: "20@vs"
    },
    sectionHeader: {
        fontSize: "14@ms",

    },
    // listText: {
    //     fontSize: "14@ms"
    // },
    listContainer: {
        gap: "10@vs"
    },
    firstSection: {
        marginBottom: "20@vs"
    },
    buttonContainer: {
        marginTop: "10@vs",
        marginBottom: "10@vs",
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: "20@ms"
    }
})