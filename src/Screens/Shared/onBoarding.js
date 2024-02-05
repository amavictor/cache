import {
    View,
    Image,
    FlatList,
    Dimensions,
} from 'react-native'
import {
    useState,
    useRef,
    useContext
} from 'react'
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { Authlayout } from '../../Layouts';
import { ThemeContext } from '../../Contexts';
import { Button } from '../../Ui';
import { useNavigation } from '@react-navigation/native';
import Text from '../../Ui/text';


const { width } = Dimensions.get("window")


export const OnBoarding = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const navigation = useNavigation()
    const ref = useRef(null);
    const {colors} = useContext(ThemeContext)

    const slides = [
        {
            id: 1,
            image: require("../../../assets/auth/onboardConnect.png"),
            title: "Connect with like minded people",
        },
        {
            id: 2,
            image: require("../../../assets/auth/onboardInsight.png"),
            title: "Regain your insights",
        },
        {
            id: 3,
            image: require("../../../assets/auth/onboardThoughts.png"),
            title: "Share your thoughts",
        },
    ];

    const updateCurrentSlideIndex = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    }

    const login = () => navigation.navigate("Login")

    const register = () => navigation.navigate("Register")

    return (
        <Authlayout>
            <View style={styles.container}>
                <View style={styles.slideContainer}>
                    <FlatList
                        ref={ref}
                        data={slides}
                        horizontal
                        pagingEnabled
                        overScrollMode='never'
                        style={styles.slider}
                        onMomentumScrollEnd={updateCurrentSlideIndex}
                        contentContainerStyle={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <Slide key={item.id} item={item} />}
                        keyExtractor={item => item.id}
                    />
                    <SlideFooter
                        slides={slides}
                        currentSlideIndex={currentSlideIndex}
                    />

                    <View style={styles.buttonContainer}>
                        <Button
                            title="Get Started"
                            onPress={register}
                        />
                        <Button
                            title="Sign In"
                            outline
                            onPress={login}
                        />
                    </View>
                </View>


                <View style={styles.terms}>
                    <Text.s style={{
                        ...styles.termsText,
                    }}>
                        By Clicking Continue, you agree to TheBaseNet User Agreement 
                        <Text
                            style={{
                                color: colors.primary,
                                fontSize: moderateScale(12),
                            }}
                        > Privacy Policy</Text> and
                        <Text
                            style={{
                                color: colors.primary,
                                fontSize: moderateScale(12),
                            }}
                        > Cookie Policy
                        </Text>.
                    </Text.s>
                </View>
            </View>

        </Authlayout>
    )
}

const Slide = ({ item }) => {
    return (
        <View style={styles.slideImage}>
            <Text.h1 style={styles.text}>{item.title}</Text.h1>
            <Image
                style={styles.image}
                source={item.image}
            />
        </View>
    )
}


const SlideFooter = ({ slides, currentSlideIndex }) => {
    const { colors } = useContext(ThemeContext);
    return (
        <View style={styles.footerContainer}>
            <View style={styles.indicatorContainer}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={{
                            ...styles.indicator,
                            backgroundColor: index === currentSlideIndex ? colors.primary : "grey",
                        }}
                    />
                ))}
            </View>
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    termsText: {
        textAlign: "center",
    },
    terms: {
        justifySelf: "flex-end",
        marginHorizontal: "20@ms",
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
        gap: "10@vs",
    },
    slideContainer: {
        flex: 0.8,
        width: "100%",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "150@vs",
        resizeMode: "contain",
        alignSelf: "center",
    },
    slideImage: {
        width: width,
        alignItems: "center",
        paddingHorizontal: "20@ms",
    },
    text: {
        textAlign: "center",
        marginBottom: "10@vs",
    },
    slider: {
        height: 100,
        width: "100%",
    },
    footerContainer: {
        height: "50@ms",
        justifyContent: "space-between",
        paddingHorizontal: "20@ms",
        marginTop:"20@vs"
    },
    indicatorContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    indicator: {
        height: "8@vs",
        width: "8@vs",
        marginHorizontal: 10,
        borderRadius: 50,
    }
});