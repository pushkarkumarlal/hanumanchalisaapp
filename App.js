import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useKeepAwake } from 'expo-keep-awake';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import ChalisaText from './src/components/ChalisaText';
import ErrorBoundary from './src/components/ErrorBoundary';
import ImageCarousel from './src/components/ImageCarousel';
import JapCounter from './src/components/JapCounter';
import images from './src/data/images';
import usePersistentNumber from './src/hooks/usePersistentNumber';
import { colors } from './src/theme';

const FONT_MIN = 0.8;
const FONT_MAX = 1.6;
const FONT_STEP = 0.1;

function HomeScreen() {
  // Keep the screen on while the user is reciting / counting.
  useKeepAwake();

  const { width, height } = useWindowDimensions();
  const carouselHeight = Math.round(Math.min(height * 0.4, width * 1.2));

  const [count, setCount] = usePersistentNumber('@hanuman-chalisa/count', 0);
  const [fontScale, setFontScale] = usePersistentNumber('@hanuman-chalisa/fontScale', 1);

  const changeFont = useCallback(
    (delta) =>
      setFontScale((s) => Math.min(FONT_MAX, Math.max(FONT_MIN, Math.round((s + delta) * 10) / 10))),
    [setFontScale],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ImageCarousel images={images} width={width} height={carouselHeight} />

      <JapCounter count={count} setCount={setCount} />

      <View style={styles.titleRow}>
        <Text style={styles.title} accessibilityRole="header">
          श्री हनुमान चालीसा
        </Text>
        <View style={styles.fontControls}>
          <Pressable
            onPress={() => changeFont(-FONT_STEP)}
            disabled={fontScale <= FONT_MIN}
            style={({ pressed }) => [styles.fontBtn, (pressed || fontScale <= FONT_MIN) && styles.fontBtnDim]}
            accessibilityRole="button"
            accessibilityLabel="अक्षर छोटे करें"
            hitSlop={6}
          >
            <Text style={styles.fontBtnTextSmall}>A−</Text>
          </Pressable>
          <Pressable
            onPress={() => changeFont(FONT_STEP)}
            disabled={fontScale >= FONT_MAX}
            style={({ pressed }) => [styles.fontBtn, (pressed || fontScale >= FONT_MAX) && styles.fontBtnDim]}
            accessibilityRole="button"
            accessibilityLabel="अक्षर बड़े करें"
            hitSlop={6}
          >
            <Text style={styles.fontBtnText}>A+</Text>
          </Pressable>
        </View>
      </View>

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
      <StatusBar style="light" />
      <ErrorBoundary>
        <HomeScreen />
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#1A0F08',
  },
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  title: {
    flexShrink: 1,
    fontSize: 22,
    fontWeight: '800',
    color: colors.saffronDark,
  },
  fontControls: {
    flexDirection: 'row',
  },
  fontBtn: {
    marginLeft: 8,
    minWidth: 40,
    height: 36,
    borderRadius: 18,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.saffronLight,
  },
  fontBtnDim: {
    opacity: 0.5,
  },
  fontBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.saffronDark,
  },
  fontBtnTextSmall: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.saffronDark,
  },
  scrollContent: {
    paddingTop: 4,
  },
});
