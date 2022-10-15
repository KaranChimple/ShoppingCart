import React, {useState} from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {Provider} from 'react-redux';
import { SCREEN_NAMES } from './constants';
import { CartListPage } from './src/screens/CartListPage';
import {ListingPage} from './src/screens/ListingPage';
import store from './src/store';

export default function App() {
  const [selectedScreen, changeSelectedScreen] = useState(SCREEN_NAMES.LIST);
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        {selectedScreen === SCREEN_NAMES.LIST && <ListingPage changeScreen={changeSelectedScreen} />}
        {selectedScreen === SCREEN_NAMES.CART && <CartListPage changeScreen={changeSelectedScreen} />}
      </Provider>
    </SafeAreaView>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
