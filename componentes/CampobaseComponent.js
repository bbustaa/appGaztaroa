import { Component } from 'react';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { EXCURSIONES } from '../comun/excursiones';
import { Platform, View } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import Home from './HomeComponent';
import Contacto from './ContactoComponent';
import QuienesSomos from './QuienesSomosComponent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

class Campobase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
    };
  }

  HomeNavegador = () => { 
    return (
      <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{ 
          headerTintColor: '#fff', 
          headerStyle: { backgroundColor: '#015afc' }, 
          headerTitleStyle: { color: '#fff' }, 
        }} 
      > 
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ 
            title: 'Campo Base', 
          }} 
        /> 
      </Stack.Navigator> 
    ); 
  }; 
 
  CalendarioNavegador = () => { 
    return ( 
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
    ); 
  }; 
 
  DrawerNavegador = () => { 
    return ( 
      <Drawer.Navigator 
        initialRouteName="Campo base" 
        screenOptions={{ 
          headerShown: false, 
          drawerStyle: { 
            backgroundColor: '#c2d3da', 
          }, 
        }} 
      > 
        <Drawer.Screen 
          name="Campo base" 
          component={this.HomeNavegador} 
        /> 
        <Drawer.Screen 
          name="Calendario" 
          component={this.CalendarioNavegador} 
        /> 
        <Drawer.Screen
          name="Quiénes somos"
          component={this.QuienesSomosNavegador}
        />
        <Drawer.Screen
          name="Contacto"
          component={this.ContactoNavegador}
        />
      </Drawer.Navigator> 
    ); 
  };

  QuienesSomosNavegador = () => {
  return (
    <Stack.Navigator
      initialRouteName="QuienesSomos"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <Stack.Screen
        name="QuienesSomos"
        component={QuienesSomos}
        options={{
          title: 'Quiénes somos',
        }}
      />
    </Stack.Navigator>
  );
};

ContactoNavegador = () => {
  return (
    <Stack.Navigator
      initialRouteName="Contacto"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <Stack.Screen
        name="Contacto"
        component={Contacto}
        options={{
          title: 'Contacto',
        }}
      />
    </Stack.Navigator>
  );
};

  render() {
    return (
      <NavigationContainer>
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
          <this.DrawerNavegador />
        </View>
      </NavigationContainer>
    );
  }
}

export default Campobase;