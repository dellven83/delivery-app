import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const dummyPackages = [
  {
    id: '1',
    address: '123 Main St, City, State',
    latitude: 37.78825,
    longitude: -122.4324,
    count: 3,
  },
  {
    id: '2',
    address: '456 Side St, City, State',
    latitude: 37.78925,
    longitude: -122.435,
    count: 1,
  },
];

export default function MapScreen() {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return alert('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  if (!region) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} showsUserLocation={true}>
        {dummyPackages.map((pkg) => (
          <Marker
            key={pkg.id}
            coordinate={{ latitude: pkg.latitude, longitude: pkg.longitude }}
            title={pkg.address}
            description={`${pkg.count} package(s)`}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>{pkg.count}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#000',
  },
  markerText: {
    fontWeight: 'bold',
  },
});
