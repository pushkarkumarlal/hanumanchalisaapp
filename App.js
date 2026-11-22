import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useKeepAwake } from 'expo-keep-awake';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import ChalisaText from './src/components/ChalisaText';
import ErrorBoundary from './src/components/ErrorBoundary';
import ImageCarousel from './src/components/ImageCarousel';
import JapCounter from './src/components/JapCounter';
import OptionsMenu from './src/components/OptionsMenu';
import images from './src/data/images';
import usePersistentNumber from './src/hooks/usePersistentNumber';
import { colors } from './src/theme';

function HomeScreen() {
  // Keep the screen on while the user is reciting / counting.
  useKeepAwake();

  const { width, height } = useWindowDimensions();
  const carouselHeight = Math.round(Math.min(height * 0.4, width * 1.15));

  const [count, setCount] = usePersistentNumber('@hanuman-chalisa/count', 0);
  const [fontScale, setFontScale] = usePersistentNumber('@hanuman-chalisa/fontScale', 1);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View style={styles.headerSide} />
        <Text style={styles.title} accessibilityRole="header" numberOfLines={1}>
          श्री हनुमान चालीसा
        </Text>
        <View style={[styles.headerSide, styles.headerRight]}>
          <OptionsMenu fontScale={fontScale} onChangeFontScale={setFontScale} />
        </View>
      </View>

      <ImageCarousel images={images} width={width} height={carouselHeight} />

      <JapCounter count={count} setCount={setCount} />

      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent}>
          <ChalisaText fontScale={fontScale} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <ErrorBoundary>
        <HomeScreen />
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 56,
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  headerSide: {
    width: 44,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: colors.saffronDark,
  },
  scrollContent: {
    paddingTop: 4,
  },
});
