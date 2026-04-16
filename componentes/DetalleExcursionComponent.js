import { Component } from 'react';
import { View, StyleSheet, ImageBackground, Text, ScrollView } from 'react-native';
import { Card, IconButton, Divider } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={require('./imagenes/40Años.png')}
          style={styles.image}
          resizeMode="cover"
        >
          <Text style={styles.tituloSobreImagen}>
            {excursion.nombre}
          </Text>
        </ImageBackground>

        <Card.Content>
          <Text style={styles.descripcion}>
            {excursion.descripcion}
          </Text>
        </Card.Content>

        <View style={styles.iconoContainer}>
          <IconButton
            icon={props.favorita ? 'heart' : 'heart-outline'}
            size={28}
            onPress={() =>
              props.favorita
                ? console.log('La excursión ya se encuentra entre las favoritas')
                : props.onPress()
            }
          />
        </View>
      </Card>
    );
  } else {
    return <View />;
  }
}

function formatearFecha(fecha) {
  const fechaLimpia = fecha.replace(/\s*:\s*/g, ':');
  const d = new Date(fechaLimpia);

  if (isNaN(d.getTime())) {
    return fecha;
  }

  return d.toLocaleString();
}

function RenderComentario(props) {
  const comentarios = props.comentarios;

  return (
    <Card style={styles.card}>
      <Card.Title title="Comentarios" />
      <Card.Content>
        {comentarios.map((item) => (
          <View key={item.id} style={styles.comentarioItem}>
            <Text style={styles.textoComentario}>{item.comentario}</Text>
            <Text>Valoración: {'⭐'.repeat(item.valoracion)}</Text>
            <Text style={styles.autorFecha}>
              -- {item.autor}, {formatearFecha(item.dia)}
            </Text>
            <Divider style={styles.divider} />
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}


class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      comentarios: COMENTARIOS,
      favoritos: [],
    };
  }

  marcarFavorito(excursionId) {
    this.setState({
      favoritos: this.state.favoritos.concat(excursionId),
    });
  }

  render() {
    const { excursionId } = this.props.route.params;

    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.state.excursiones[+excursionId]}
          favorita={this.state.favoritos.some((el) => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
        />

        <RenderComentario
          comentarios={this.state.comentarios.filter(
            (c) => Number(c.excursionId) === Number(excursionId)
          )}
        />
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
    color: 'chocolate',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
  iconoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  comentarioItem: {
    marginBottom: 10,
  },
  divider: {
    marginTop: 8,
  },
});

export default DetalleExcursion;