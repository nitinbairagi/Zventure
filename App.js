import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Dimensions,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/Screen/Home';
import {Provider} from 'react-redux';
import Store from './src/api/Redux/store';

const windowWidth = Dimensions.get('window').width;

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={Store}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: true,
              headerStyle: {
                backgroundColor: isDarkMode ? '#000' : '#fff',
              },
              headerTitleStyle: {
                color: isDarkMode ? '#fff' : '#000',
                fontWeight: 'bold',
                fontSize: windowWidth * 0.06,
              },
            }}>
            <Stack.Screen name="Profile" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingTop: 0,
  },
});

export default App;
