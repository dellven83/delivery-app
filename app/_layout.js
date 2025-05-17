import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { PackageProvider } from '../context/PackageContext';

export default function Layout() {
  return (
    <PackageProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: 'Map',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="barcode"
          options={{
            title: 'Scan',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="scan" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </PackageProvider>
  );
}
