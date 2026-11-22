import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import chalisa from '../data/chalisa';
import { colors } from '../theme';

function ChalisaText({ fontScale = 1 }) {
  const fs = (size) => ({ fontSize: Math.round(size * fontScale), lineHeight: Math.round(size * fontScale * 1.55) });

  return (
    <View style={styles.container}>
      {chalisa.map((section, i) => {
        if (section.type === 'heading') {
          return (
            <View key={i} style={styles.headingWrap}>
              <View style={styles.rule} />
              <Text style={[styles.heading, fs(22)]} accessibilityRole="header">
                {section.text}
              </Text>
              <View style={styles.rule} />
            </View>
          );
        }
        const isDoha = section.type === 'doha';
        return (
          <View key={i} style={styles.verse}>
            {section.lines.map((line, j) => (
              <Text key={j} style={[isDoha ? styles.doha : styles.chaupai, fs(isDoha ? 19 : 20)]}>
                {line}
              </Text>
            ))}
          </View>
        );
      })}

      <Text style={[styles.closing, fs(18)]}>॥ सियावर रामचंद्र की जय ॥</Text>
      <Text style={[styles.closing, fs(18)]}>॥ पवनसुत हनुमान की जय ॥</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  headingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  rule: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  heading: {
    marginHorizontal: 12,
    fontWeight: '700',
    color: colors.saffronDark,
    textAlign: 'center',
  },
  verse: {
    marginBottom: 14,
  },
  doha: {
    textAlign: 'center',
    fontWeight: '700',
    color: colors.text,
  },
  chaupai: {
    textAlign: 'center',
    color: colors.text,
  },
  closing: {
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '700',
    color: colors.saffronDark,
  },
});

export default memo(ChalisaText);
