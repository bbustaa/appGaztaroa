import { Component } from 'react';
import { FlatList, View, Image, StyleSheet } from 'react-native';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  excursiones: state.excursiones,
});
import { SafeAreaView } from 'react-native-safe-area-context';
import { List, Divider } from 'react-native-paper';

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