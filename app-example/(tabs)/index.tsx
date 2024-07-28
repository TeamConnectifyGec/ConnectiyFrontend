import { Image, StyleSheet, Platform, Button } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'white', dark: '#1D3D47' }}
      >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Logo will go here</ThemedText>
      </ThemedView>
      <Button style={styles.button} title='Log In'></Button>
      <Button title='Sign Up'></Button>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    textAlign: 'center',
    paddingBottom: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  text:{
    textAlign: 'center',
  },
  button:{
    height: 30,
    width: 40,
    borderCurve: 10,
  },
});
