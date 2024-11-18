import {NavigationContainer} from '@react-navigation/native';
import React, { useEffect } from 'react';
import App from './App';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import {store} from './store';
export default function Root() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <GestureHandlerRootView style={{flex: 1}}>
          <ToastProvider
            placement="bottom"
            animationType="zoom-in"
            animationDuration={200}
            offsetTop={0}
            offsetBottom={100}
            textStyle={{fontSize: 16}}>
            <App />
          </ToastProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
}
