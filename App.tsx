import { StatusBar } from 'expo-status-bar';
import AppStack from './src/routes/AppStack';
import { Text, StyleSheet, View } from 'react-native';
import { AuthProvider } from './src/context/Auth';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [fontsLoaded, error] = useFonts({
    'SpaceGrotesk-Bold': require('./assets/fonts/SpaceGrotesk-Bold.ttf'),
    'SpaceGrotesk-SemiBold': require('./assets/fonts/SpaceGrotesk-SemiBold.ttf'),
    'SpaceGrotesk-Regular': require('./assets/fonts/SpaceGrotesk-Regular.ttf'),
    'Lexend-Bold': require('./assets/fonts/Lexend-Bold.ttf'),
    'Lexend-SemiBold': require('./assets/fonts/Lexend-SemiBold.ttf'),
    'Lexend-Regular': require('./assets/fonts/Lexend-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Carregando fontes</Text>;
  }

  if(error) {
    return <Text>{`${error.name} ${error.message}`}</Text>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AppStack />
        <StatusBar style="auto" />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {marginTop: 30},
  safeArea: {
    flex: 1,
    backgroundColor: "#1C1C1C",
    color: "white",
  }
});