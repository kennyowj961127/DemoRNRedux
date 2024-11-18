import React, {useEffect} from 'react';
import RootNavigation from './containers/navigation/rootNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {clearErrors, setIsNetworkConnected} from './containers/home/actions';
import {addEventListener} from '@react-native-community/netinfo';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearErrors());
    const unsubscribe = addEventListener(state => {
      if (state.isConnected) {
        dispatch(setIsNetworkConnected(true));
      } else {
        dispatch(setIsNetworkConnected(false));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <SafeAreaProvider>
      <RootNavigation />
    </SafeAreaProvider>
  );
};

export default App;
