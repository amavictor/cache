import {
  Image,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { useContext, useState } from 'react'
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { ThemeContext, DrawerContext } from '../../../../Contexts';
import {
  Avatar,
  TouchableRipple
} from 'react-native-paper';
import { SimpleLineIcons } from '@expo/vector-icons';
import Text from '../../../../Ui/text';
import {
  Comment,
  DislikeIcon,
  Like,
  MuteIcon,
  SaveIcon,
  Share,
  UnfollowIcon,
  Views
} from '../../../../../assets';
import { PopupMenu, Ripple } from '../../../../Ui';
import { useNavigation } from '@react-navigation/native';
import ImageView from "react-native-image-viewing";

export const PostCard = ({
  text,
  time,
  media,
  author,
}) => {
  const { navigate } = useNavigation()
  const { colors } = useContext(ThemeContext)
  const {
    openBottomSheet,
    setBottomSheetContent,
    setShowHeader
  } = useContext(DrawerContext)

  const [visible, setIsVisible] = useState(false);


  const setBottomSheet = () => {
    setBottomSheetContent(BottomSheetContent)
    openBottomSheet()
  }

  const handleNavigate = () => {
    navigate("Post")
    setShowHeader(false)
  }

  const images = [
    require("../../../../../assets/postImage.png"),
    require("../../../../../assets/postImage.png"),
    require("../../../../../assets/postImage.png")
  ];


  return (
    <Ripple onPress={() => navigate("Post")}>
      <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.header}>
          <View style={styles.info}>
            <Avatar.Image size={moderateScale(48)} />
            <View>
              <Text.h5 style={styles.name}>Kyer Fisher</Text.h5>
              <Text.s style={styles.time}>27m ago</Text.s>
            </View>
          </View>
          <View>
            <PopupMenu
              trigger={() =>
                <SimpleLineIcons
                  name='options'
                  size={moderateScale(18)}
                  color="black"
                />
              }
            />

          </View>
        </View>

        <View style={styles.content}>
          <Text.p>
            How’s your day going, guys?
            I really love this piece by Joe Public United. It’s fun and brings a
            smile to your face. Exciting and interesting advertising that
            isn’t about ticking boxes. Michael Nyathi - a lone crusader
            in a dangerous world of banner ads and programmatic thinking.
          </Text.p>

          <TouchableOpacity
            onPress={()=>setIsVisible(true)}
          >
            <Image
              style={styles.image}
              source={require("../../../../../assets/postImage.png")}
            />
          </TouchableOpacity>


          <ImageView
            style={styles.image}
            images={images}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.footerReactions}>
            <View style={styles.footerItems}>
              <Comment
                width={moderateScale(14)}
                height={moderateScale(14)}
              />
              <Text.s>42</Text.s>
            </View>
            <View style={styles.footerItems}>
              <Like
                width={moderateScale(14)}
                height={moderateScale(14)}
              />
              <Text.s>9</Text.s>
            </View>
            <View style={styles.footerItems}>
              <Views
                width={moderateScale(14)}
                height={moderateScale(14)}
              />
              <Text.s>235</Text.s>
            </View>
          </View>
          <View style={styles.footerItems}>
            <Share />
            <Text.s>Share</Text.s>
          </View>
        </View>
      </View>
    </Ripple>

  )
}


const BottomSheetContent = () => {
  return (

    <View style={bottomStyles.container}>
      <ScrollView
        contentContainerStyle={bottomStyles.scrollView}
      >
        <Ripple onPress={() => console.log("hiop")}>
          <View style={bottomStyles.item}>
            <SaveIcon
              width={moderateScale(16)}
              height={moderateScale(16)}
            />
            <Text.h5 style={bottomStyles.text}>Save Post</Text.h5>
          </View>
        </Ripple>

        <Ripple>
          <View style={bottomStyles.item}>
            <Share
              width={moderateScale(16)}
              height={moderateScale(16)}
            />
            <Text.h5 style={bottomStyles.text}>Share Post</Text.h5>
          </View>
        </Ripple>


        <Ripple>
          <View style={bottomStyles.item}>
            <MuteIcon
              width={moderateScale(16)}
              height={moderateScale(16)}
            />
            <View>
              <Text.h5 style={bottomStyles.text}>Mute Kyle Fisher</Text.h5>
              <Text.s>Stop seeing posts from Kyle Fisher in feed</Text.s>
            </View>
          </View>
        </Ripple>


        <Ripple>
          <View style={bottomStyles.item}>
            <UnfollowIcon
              width={moderateScale(16)}
              height={moderateScale(16)}
            />
            <View>
              <Text.h5 style={bottomStyles.text}>Unfollow Kyle Fisher</Text.h5>
              <Text.s>Lose connections and stop seeing posts from Kyle Fisher </Text.s>
            </View>
          </View>
        </Ripple>



        <Ripple>
          <View style={bottomStyles.item}>
            <DislikeIcon
              width={moderateScale(16)}
              height={moderateScale(16)}
            />
            <View>
              <Text.h5 style={bottomStyles.text}>Not interested in this Post</Text.h5>
              <Text.s>Stop seeing post like this in the feed anymore</Text.s>
            </View>
          </View>
        </Ripple>




      </ScrollView>
    </View>

  )
}

const HashTag = ({ children }) => {
  const { colors } = useContext(ThemeContext)
  return (
    <Text.p style={{ color: "red" }}>{children}</Text.p>
  )
}

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    // height: "300@vs",
    borderRadius: "5@ms",
    padding: "18@ms",
    gap: "10@vs"
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: "8@ms"
  },
  name: {
    fontSize: "14@ms",
    fontWeight: 600
  },
  time: {
    fontWeight: 500,
    fontSize: "10@ms"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {

  },
  image: {
    marginTop: "14@vs",
    height: "140@vs",
    width: "100%"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    justifySelf: "flex-end",
  },
  footerItems: {
    flexDirection: "row",
    alignItems: "center",
    gap: "8@ms"
  },
  footerReactions: {
    flexDirection: "row",
    gap: "35@ms"
  }
})

const bottomStyles = ScaledSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: "20@ms",
    paddingVertical: "20@ms"
  },
  scrollView: {
    width: "100%",
    height: "100%",
    // gap: "10@vs"
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    height: "45@vs",
    gap: "20@ms"
  },
  text: {
    fontSize: "14@ms"
  }
})