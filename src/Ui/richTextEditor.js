import HTMLView from "react-native-htmlview";
import { forwardRef } from "react";
import Text from "./text";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor"
import { View } from 'react-native';

export const RichText = forwardRef(({
    disabled,
    value,
    article,
    setArticle
}, ref) => {


    // const strikethrough = require("./assets/strikethrough.png"); //icon for strikethrough


    // this function will be called when the editor has been initialized
    // function editorInitializedCallback() {
    //     RichText.current?.registerToolbar(function (items) {
    //         // items contain all the actions that are currently active
    //         console.log(
    //             "Toolbar click, selected items (insert end callback):",
    //             items
    //         );
    //     });
    // }

    // // Callback after height change
    // function handleHeightChange(height) {
    //     // console.log("editor height change:", height);
    // }

    // function onPressAddImage() {
    //     // you can easily add images from your gallery
    //     RichText.current?.insertImage(
    //         "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
    //     );
    // }

    // function insertVideo() {
    //     // you can easily add videos from your gallery
    //     RichText.current?.insertVideo(
    //         "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
    //     );
    // }


    return (
        <View>
            {/* <HTMLView value={value} stylesheet={styles} /> */}
            {/* <RichToolbar
                style={[styles.richBar]}
                editor={RichText}
                disabled={false}
                iconTint={"purple"}
                selectedIconTint={"pink"}
                disabledIconTint={"purple"}
                onPressAddImage={onPressAddImage}
                iconSize={40}
                actions={[
                    "insertVideo",
                    ...defaultActions,
                    actions.setStrikethrough,
                    actions.heading1,
                ]}
                map icons for self made actions
                iconMap={{
                    [actions.heading1]: ({ tintColor }) => (
                        <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
                    ),
                    [actions.setStrikethrough]: strikethrough,
                    ["insertVideo"]: <VideoIcon/>,
                }}
                insertVideo={insertVideo}
            />  */}
{/* 
            <RichEditor
                // disabled={disabled}
                // containerStyle={styles.editor}
                // ref={ref}
                // style={styles.rich}
                // placeholder={"Start Writing Here"}
                // onChange={(text) => setArticle(text)}
                // editorInitializedCallback={editorInitializedCallback}
                // onHeightChange={handleHeightChange}
            /> */}

            <Text>Hisdf</Text>
            
        </View>

    )
})