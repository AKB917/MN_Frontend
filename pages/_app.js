import '../styles/globals.css';
import Head from 'next/head';
import Header from '../components/Header';
import  hiddenArticles  from '../reducers/hiddenArticles';
import { Provider } from 'react-redux';
import bookmarks from '../reducers/bookmarks';
import user from '../reducers/user';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';





function App({ Component, pageProps }) {

  const reducers = combineReducers({ bookmarks, user, hiddenArticles });

  const persistConfig = { key: 'morningNews', storage };
  
  const store = configureStore({
    reducer: persistReducer(persistConfig, reducers),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  });
  
  const persistor = persistStore(store);

const data =0
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Morning News</title>
        </Head>
        <Header />
        <Component {...pageProps} />
        </PersistGate>
    </Provider>
  );
}

export default App;
