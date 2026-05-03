import { Component } from 'react';
import { Platform, View, Pressable, Image, Text, StyleSheet } from 'react-native';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import Home from './HomeComponent';
import Contacto from './ContactoComponent';
import QuienesSomos from './QuienesSomosComponent';
import { EXCURSIONES } from '../comun/excursiones';
import Constants from 'expo-constants';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colorGaztaroaOscuro, colorGaztaroaClaro } from '../comun/comun';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function BotonMenu(props) {
  return (
    <Pressable onPress={props.onPress} hitSlop={8}>
      <MaterialCommunityIcons
        name="menu"
        size={40}
        color={Platform.OS === 'ios' ? colorGaztaroaOscuro : 'white'}
      />
    </Pressable>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <View style={styles.drawerHeader}>
          <View style={styles.drawerHeaderImageContainer}>
            <Image
              source={require('./imagenes/logo.png')}
              style={styles.drawerImage}
            />
          </View>
          <View style={styles.drawerHeaderTextContainer}>
            <Text style={styles.drawerHeaderText}>Gaztaroa</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

class Campobase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
    };
  }

  menuHeaderOptions = (title, navigation) => ({
    title,
    headerLeft: () => (
      <BotonMenu
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    ),
  });

  HomeNavegador = () => { 
    return (
      <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{ 
          headerTintColor: '#fff', 
          headerStyle: { backgroundColor: colorGaztaroaOscuro }, 
          headerTitleStyle: { color: '#fff' }, 
        }} 
      > 
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={({ navigation }) =>
            this.menuHeaderOptions('Campo Base', navigation)
          }
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
          headerStyle: { backgroundColor: colorGaztaroaOscuro }, 
          headerTitleStyle: { color: '#fff' }, 
        }} 
      > 
        <Stack.Screen 
          name="Calendario" 
          options={({ navigation }) =>
            this.menuHeaderOptions('Calendario Gaztaroa', navigation)
          } 
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
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: colorGaztaroaClaro,
          },
        }}
      > 
        <Drawer.Screen
          name="Campo base"
          component={this.HomeNavegador}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Calendario"
          component={this.CalendarioNavegador}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Quiénes somos"
          component={this.QuienesSomosNavegador}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="information" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Contacto"
          component={this.ContactoNavegador}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="card-account-phone" color={color} size={size} />
            ),
          }}
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
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <Stack.Screen
        name="QuienesSomos"
        component={QuienesSomos}
        options={({ navigation }) =>
          this.menuHeaderOptions('Quiénes somos', navigation)
        }
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
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <Stack.Screen
        name="Contacto"
        component={Contacto}
        options={({ navigation }) =>
          this.menuHeaderOptions('Contacto', navigation)
        }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: colorGaztaroaOscuro,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  drawerHeaderImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerHeaderTextContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerImage: {
    width: 80,
    height: 60,
    resizeMode: 'contain',
  },
});

export default Campobase;