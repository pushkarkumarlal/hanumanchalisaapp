import { Component } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';

// Prevents a render error from showing a blank/white screen to users.
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (__DEV__) console.error(error, info?.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>जय श्री राम</Text>
        <Text style={styles.body}>कुछ गलत हो गया। कृपया पुनः प्रयास करें।</Text>
        <Pressable style={styles.button} onPress={() => this.setState({ hasError: false })}>
          <Text style={styles.buttonText}>पुनः प्रयास करें</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  title: { fontSize: 24, fontWeight: '700', color: colors.saffronDark, marginBottom: 8 },
  body: { fontSize: 16, color: colors.text, textAlign: 'center', marginBottom: 20 },
  button: { backgroundColor: colors.saffron, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24 },
  buttonText: { color: colors.white, fontWeight: '700' },
});
