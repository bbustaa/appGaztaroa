import { Component } from 'react';
import { FlatList, View, Image, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { List, Divider } from 'react-native-paper';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = (state) => ({
  excursiones: state.excursiones,
});

class Calendario extends Component {
  render() {
    const { navigate } = this.props.navigation;

    const renderCalendarioItem = ({ item }) => {
      return (
        <View>
          <List.Item
            title={item.nombre}
            description={item.descripcion}
            titleNumberOfLines={0}
            descriptionNumberOfLines={6}
            onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
            left={(props) => (
              <Image
                source={{ uri: baseUrl + item.imagen }}
                style={[props.style, styles.imagen]}
                resizeMode="cover"
              />
            )}
            titleStyle={styles.titulo}
            descriptionStyle={styles.descripcion}
            contentStyle={styles.contenido}
          />
          <Divider />
        </View>
      );
    };

    if (this.props.excursiones.isLoading) {
      return <IndicadorActividad />;
    }
    else if (this.props.excursiones.errMess) {
      return (
        <View style={styles.container}>
          <Text>{this.props.excursiones.errMess}</Text>
        </View>
      );
    }
    else {
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.props.excursiones.excursiones}
            renderItem={renderCalendarioItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagen: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  contenido: {
    paddingRight: 8,
  },
  titulo: {
    fontSize: 16,
  },
  descripcion: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default connect(mapStateToProps)(Calendario);