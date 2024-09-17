import { StatusBar } from 'expo-status-bar';
import AppStack from './src/routes/AppStack';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import { AuthProvider } from './src/context/Auth';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
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

  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
        <Text>Teste</Text>
        <AppStack />
        <StatusBar style="auto" />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {marginTop: 30},
  safeArea: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: "#1C1C1C",
    color: "white",
  }
});