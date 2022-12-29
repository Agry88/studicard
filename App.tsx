import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
      <FlashMessage position="top" />
    </SafeAreaProvider>
  );

}
