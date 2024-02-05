import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainNavigation } from './src/Navigation';
import { DrawerContextProvider, ThemeContextProvider } from './src/Contexts';
import { NavigationContainer } from '@react-navigation/native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider
} from 'react-native-paper';
import { Linking, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { persistor, store } from './src/Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { verticalScale } from 'react-native-size-matters';
import { useNavigationContainerRef } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';


const PERSISTENCE_KEY = 'NAV_STATE_V1'

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [initialState, setInitialState] = useState();
  const queryClient = new QueryClient()


  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };

  const rootViewStyle = {
    flex: 1,
  }


  const navigationRef = useNavigationContainerRef()

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        console.log(initialUrl, "url")
        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          console.log(savedStateString, "state string")
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          console.log(state, "state saved")

          if (state !== undefined) {
            setInitialState(state);
          }
        }

      }
      finally {
        setIsReady(true);
      }
    }

    if (!isReady) {
      restoreState();
    }
    
  }, [isReady])

  if(!isReady) {
    return null
  }


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <PaperProvider
                theme={theme}
              >
                <ThemeContextProvider>
                  <DrawerContextProvider>
                    <NavigationContainer
                      ref={navigationRef}
                      initialState={initialState}
                      onStateChange={(state) =>
                        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
                      }
                    >
                      <GestureHandlerRootView style={{ ...rootViewStyle }}>
                        <MenuProvider>
                          <MainNavigation />
                          <Toast
                            topOffset={verticalScale(50)}
                          />
                        </MenuProvider>
                      </GestureHandlerRootView>
                    </NavigationContainer>
                  </DrawerContextProvider>
                </ThemeContextProvider>
              </PaperProvider>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </PersistGate>
      <StatusBar style="auto" />
    </Provider>
  );
}
