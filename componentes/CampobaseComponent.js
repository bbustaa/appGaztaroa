import { Component } from 'react';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { EXCURSIONES } from '../comun/excursiones';
import { Platform, View } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

class Campobase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
    };
  }

  render() {
    return (
      <NavigationContainer>
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
          <Stack.Navigator
            initialRouteName="Calendario"
            screenOptions={{
              headerTintColor: '#fff',
              headerStyle: { backgroundColor: '#015afc' },
              headerTitleStyle: { color: '#fff' },
            }}
          >
            <Stack.Screen
              name="Calendario"
              options={{
                title: 'Calendario Gaztaroa',
              }}
            >
              {(props) => (
                <Calendario
                  {...props}
                  excursiones={this.state.excursiones}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="DetalleExcursion"
              options={{
                title: 'Detalle Excursión',
                headerBackTitle: 'Calendario',
              }}
            >
              {(props) => (
                <DetalleExcursion
                  {...props}
                  excursiones={this.state.excursiones}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    );
  }
}

export default Campobase;