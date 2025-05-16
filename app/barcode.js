import BarcodeScannerScreen from '../components/BarcodeScannerScreen';

export default function Page() {
  const handleScanned = (data) => {
    console.log('Scanned:', data);
  };

  return <BarcodeScannerScreen onScanned={handleScanned} />;
}
