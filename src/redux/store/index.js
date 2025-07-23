import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/authSlice';
import itemsReducer from './slices/itemsSlice';

// Persist config for items (don't persist auth loading states)
const itemsPersistConfig = {
  key: 'items',
  storage: AsyncStorage,
  blacklist: ['loading', 'error']
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: persistReducer(itemsPersistConfig, itemsReducer)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // Required for redux-persist
    })
});

export const persistor = persistStore(store);