import { View, Text } from 'react-native'
import { DrawerContext } from '../../../Contexts'

export const post = () => {
  const { setShowHeader } = useContext(DrawerContext)
  useEffect(() => {
    setShowHeader(false)
  }, [])
  return (
    <View>
      <Text>post</Text>
    </View>
  )
}

