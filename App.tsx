import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from './src/styles/globalStyles';


import { TimerProvider } from './src/context/TimerContext';
import HomeScreen from './src/screens/HomeScreen';
import AddTimerScreen from './src/screens/AddTimerScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Timers' }}
      />
      <Stack.Screen 
        name="AddTimer" 
        component={AddTimerScreen} 
        options={{ title: 'Add Timer' }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <TimerProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'HomeStack') {
                iconName = 'timer';
              } else if (route.name === 'History') {
                iconName = 'history';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#2196F3',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen 
            name="HomeStack" 
            component={HomeStack} 
            options={{ title: 'Timers', headerShown: false }}
          />
          <Tab.Screen 
            name="History" 
            component={HistoryScreen} 
            options={{ title: 'History' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TimerProvider>
  );
}

export default App;
