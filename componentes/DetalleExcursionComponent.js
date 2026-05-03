import { Component } from 'react';
import { View, StyleSheet, ImageBackground, Text, ScrollView, Modal } from 'react-native';
import { Card, IconButton, Divider, TextInput, Button } from 'react-native-paper';
import { baseUrl, colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
  excursiones: state.excursiones,
  comentarios: state.comentarios,
  favoritos: state.favoritos,
});

const mapDispatchToProps = (dispatch) => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario) =>
    dispatch(postComentario(excursionId, valoracion, autor, comentario)),
});

const etiquetaValoracion = ['', 'Pésimo', 'Malo', 'Normal', 'Bueno', 'Excelente'];

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={{ uri: baseUrl + excursion.imagen }}
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
          <IconButton
            icon="pencil"
            size={28}
            onPress={() => props.onPressLapiz()}
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
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false,
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      valoracion: 3,
      autor: '',
      comentario: '',
      showModal: false,
    });
  }

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  gestionarComentario(excursionId) {
    this.props.postComentario(
      excursionId,
      this.state.valoracion,
      this.state.autor,
      this.state.comentario
    );
    this.resetForm();
  }

  render() {
    const { excursionId } = this.props.route.params;

    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.props.favoritos.favoritos.some((el) => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
          onPressLapiz={() => this.toggleModal()}
        />

        <Modal
          visible={this.state.showModal}
          animationType="slide"
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitulo}>Añadir comentario</Text>

            <View style={styles.estrellas}>
              {[1, 2, 3, 4, 5].map((estrella) => (
                <IconButton
                  key={estrella}
                  icon={estrella <= this.state.valoracion ? 'star' : 'star-outline'}
                  size={36}
                  iconColor={colorGaztaroaOscuro}
                  onPress={() => this.setState({ valoracion: estrella })}
                />
              ))}
            </View>
            <Text style={styles.etiquetaValoracion}>
              {etiquetaValoracion[this.state.valoracion]}
            </Text>

            <View style={styles.inputRow}>
              <IconButton icon="account" size={24} />
              <TextInput
                style={styles.textInput}
                label="Autor"
                mode="outlined"
                value={this.state.autor}
                onChangeText={(texto) => this.setState({ autor: texto })}
              />
            </View>

            <View style={styles.inputRow}>
              <IconButton icon="comment-text" size={24} />
              <TextInput
                style={styles.textInput}
                label="Comentario"
                mode="outlined"
                value={this.state.comentario}
                onChangeText={(texto) => this.setState({ comentario: texto })}
              />
            </View>

            <View style={styles.botonesModal}>
              <Button
                icon="close"
                mode="outlined"
                onPress={() => this.resetForm()}
              >
                Cancelar
              </Button>
              <Button
                icon="send"
                mode="contained"
                onPress={() => this.gestionarComentario(excursionId)}
              >
                Enviar
              </Button>
            </View>
          </View>
        </Modal>

        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter(
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
  iconoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  comentarioItem: {
    marginBottom: 10,
  },
  divider: {
    marginTop: 8,
  },
  modal: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: colorGaztaroaOscuro,
  },
  estrellas: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4,
  },
  etiquetaValoracion: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
    color: colorGaztaroaOscuro,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  textInput: {
    flex: 1,
  },
  botonesModal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
