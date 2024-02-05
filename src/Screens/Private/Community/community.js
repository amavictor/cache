import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {useEffect} from 'react'
import { BackArrow } from '../../../../assets'

export const Community = () => {
    const navigation = useNavigation()

    useEffect(() => {
       navigation.setOptions({
           headerLeft:() => <BackArrow />,
       }) 
    },[])
    return (
        <View>
            <Text>community</Text>
        </View>
    )
}