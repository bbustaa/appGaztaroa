import React, { Component } from 'react';
import { ScrollView, View, Image, StyleSheet } from 'react-native';
import { Card, Text, List, Divider } from 'react-native-paper';
import { baseUrl } from '../comun/comun';
import { ACTIVIDADES } from '../comun/actividades';

function Historia() {
  return (
    <Card style={styles.card}>
      <Card.Title title="Un poquito de historia" />
      <Card.Content>
        <Text style={styles.texto}>
          El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.{'\n'}{'\n'}
          Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.{'\n'}{'\n'}
          Gracias!
        </Text>
      </Card.Content>
    </Card>
  );
}

class QuienesSomos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actividades: ACTIVIDADES,
    };
  }

  render() {
    return (
      <ScrollView>
        <Historia />

        <Card style={styles.card}>
          <Card.Title title="Actividades y recursos" />
          <Card.Content>
            {this.state.actividades.map((item) => (
              <View key={item.id}>
                <List.Item
                  title={item.nombre}
                  description={item.descripcion}
                  titleNumberOfLines={0}
                  descriptionNumberOfLines={8}
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
            ))}
          </Card.Content>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  texto: {
    lineHeight: 22,
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

export default QuienesSomos;