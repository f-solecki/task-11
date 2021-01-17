import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

export default function App() {

  const [locationPermission, setPermission] = useState('denied')
  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)

  useEffect(() => {
    async function askForPermission() {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        alert('No permission to use location.')
      } else {
        setPermission(status)
      }
    }
    askForPermission()
  }, [])

  useEffect(() => {
    if (locationPermission === 'granted') {
      saveLocation()
    } else {
      console.log('No')
    }
  }, [locationPermission])

  async function saveLocation() {
    const pos = await Location.getCurrentPositionAsync({})
    const latitude = pos.coords.latitude
    const longitude = pos.coords.longitude
    setLatitude(latitude)
    setLongitude(longitude)
  }

  return (
    <View style={styles.container}>
      <MapView
        style={{
          flex: 1, width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        initialRegion={{
          latitude: 52,
          longitude: 21,
          latitudeDelta: 100,
          longitudeDelta: 100,
        }}
      >
        {longitude != 0 ? <MapView.Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude
          }} /> : null}
      </MapView>
      <View style={{ position: 'absolute', bottom: 0 }}>
        <Button title='Save location again!' onPress={() => saveLocation()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
