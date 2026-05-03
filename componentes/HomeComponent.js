import { Component } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  excursiones: state.excursiones,
  cabeceras: state.cabeceras,
  actividades: state.actividades,
});

function RenderItem({ item }) {
  if (!item) {
    return <View />;
  }

  return (
    <Card style={styles.card}>
      <ImageBackground
        source={{ uri: baseUrl + item.imagen }}
        style={styles.image}
        resizeMode="cover"
      >
        <Text style={styles.tituloSobreImagen}>
          {item.nombre}
        </Text>
      </ImageBackground>

      <Card.Content>
        <Text style={styles.descripcion}>
          {item.descripcion}
        </Text>
      </Card.Content>
    </Card>
  );
}

class Home extends Component {
  render() {
    return (
      <ScrollView>
        <RenderItem item={this.props.cabeceras.cabeceras.filter((item) => item.destacado)[0]} />
        <RenderItem item={this.props.excursiones.excursiones.filter((item) => item.destacado)[0]} />
        <RenderItem item={this.props.actividades.actividades.filter((item) => item.destacado)[0]} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  image: {
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tituloSobreImagen: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default connect(mapStateToProps)(Home);