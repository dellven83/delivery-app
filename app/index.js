import { useRouter } from 'expo-router';
import { Button, StyleSheet, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Go to Map" onPress={() => router.push('/map')} />
      <Button title="Go to Barcode Scanner" onPress={() => router.push('/barcode')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
