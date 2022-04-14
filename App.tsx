import {StatusBar} from 'react-native';
import React from 'react';
import useColorScheme from './src/hooks/useColorScheme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import {Provider} from 'react-redux';
import store from './src/redux/store';


const App = () => {
  const colorScheme = useColorScheme();

  
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{flex: 1}}>
        <StatusBar backgroundColor={'#25364D'} barStyle={'light-content'} />
        <Navigation colorScheme={colorScheme} />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
