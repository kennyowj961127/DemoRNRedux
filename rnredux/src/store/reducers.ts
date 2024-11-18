import { combineReducers } from 'redux';
import homeReducer from '../containers/home/reducer';
import { PersistConfig, persistReducer, persistStore, Storage } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig: PersistConfig<any> = {
    key: 'home',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, homeReducer);

export const combinedReducers = combineReducers({
    home: persistedReducer,
});

export type RootState = ReturnType<typeof combinedReducers>;
