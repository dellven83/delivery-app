import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { usePackages } from '../context/PackageContext';

export default function MapScreen() {
  const [region, setRegion] = useState(null);
  const { packages } = usePackages();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
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
        {packages.map((pkg, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: pkg.latitude, longitude: pkg.longitude }}
            title={`Stop #${index + 1}`}
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
