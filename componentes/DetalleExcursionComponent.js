import { View, StyleSheet } from 'react-native'; 
import { Card, Text } from 'react-native-paper'; 

function RenderExcursion(props) { 
    const excursion = props.excursion; 
    if (excursion != null) { 
        return ( 
        <Card style={styles.card}> 
            <Card.Title title={excursion.nombre} /> 
            <Card.Cover 

          source={require('./imagenes/40Años.png')} 
          style={styles.image} 
        /> 
        <Card.Content> 
          <Text style={styles.descripcion}> 
            {excursion.descripcion} 
          </Text> 
        </Card.Content> 
      </Card> 
    ); 
  } else { 
    return <View />; 
  } 
} 
 
function DetalleExcursion(props) { 
  return <RenderExcursion excursion={props.excursion} />; 
} 
 
const styles = StyleSheet.create({ 
  card: { 
    margin: 8, 
  }, 
  image: { 
    marginHorizontal: 0, 
  }, 
  descripcion: { 
    marginTop: 20, 
    marginBottom: 20, 
  }, 
}); 
 
export default DetalleExcursion;