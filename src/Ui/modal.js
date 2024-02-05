import {
    View,
    Modal as RNModal,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters';

export const Modal = ({
    isOpen,
    setIsOpen,
    children
}) => {

    
    return (
        <RNModal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => {
                setIsOpen(!isOpen);
            }}
        >
            <TouchableOpacity
                style={styles.background}
                onPress={()=>setIsOpen(!isOpen)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {children}
                    </View>
                </View>
            </TouchableOpacity>
        </RNModal>
    )
}

const styles = ScaledSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: "20@ms",
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        width: Dimensions.get('window').width * 0.85,
        height: Dimensions.get('window').height * 0.5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})