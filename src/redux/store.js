import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
 } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from "./reducers/user";
import moviesReducer from "./reducers/movies";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  };

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {user: persistedReducer, movies: moviesReducer},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
});

export const persistor = persistStore(store);