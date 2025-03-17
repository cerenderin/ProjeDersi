import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function NativeMap() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.0082,
          longitude: 28.9784,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{ latitude: 41.0082, longitude: 28.9784 }}
          title="Mama İstasyonu"
          description="Aktif İstasyon"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});