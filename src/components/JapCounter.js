import { useCallback } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';

import { colors, MALA_SIZE } from '../theme';

function haptic(fn) {
  // Haptics can be unavailable (low power mode, no vibrator, web) — never crash.
  fn().catch(() => {});
}

export default function JapCounter({ count, setCount }) {
  const malas = Math.floor(count / MALA_SIZE);
  const beads = count % MALA_SIZE;

  const increment = useCallback(() => {
    // Functional update: rapid taps are never lost to a stale value.
    setCount((c) => c + 1);
    if ((count + 1) % MALA_SIZE === 0) {
      // A full mala (108) completed — stronger feedback.
      haptic(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success));
    } else {
      haptic(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));
    }
  }, [count, setCount]);

  const confirmReset = useCallback(() => {
    if (count === 0) return;
    Alert.alert('गिनती रीसेट करें?', `वर्तमान गिनती ${count} शून्य हो जाएगी।`, [
      { text: 'रद्द करें', style: 'cancel' },
      { text: 'रीसेट', style: 'destructive', onPress: () => setCount(0) },
    ]);
  }, [count, setCount]);

  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <Text style={styles.statLabel}>जाप</Text>
        <Text style={styles.statValue} accessibilityLiveRegion="polite">
          {count}
        </Text>
        <Text style={styles.statSub}>
          माला {malas} · {beads}/{MALA_SIZE}
        </Text>
      </View>

      <Pressable
        onPress={increment}
        style={({ pressed }) => [styles.countButton, pressed && styles.countButtonPressed]}
        accessibilityRole="button"
        accessibilityLabel={`जाप गिनें। वर्तमान गिनती ${count}`}
        hitSlop={8}
      >
        <Text style={styles.countButtonText}>जय श्री राम</Text>
        <Text style={styles.countButtonSub}>+1</Text>
      </Pressable>

      <Pressable
        onPress={confirmReset}
        onLongPress={confirmReset}
        style={({ pressed }) => [styles.resetButton, pressed && { opacity: 0.6 }]}
        accessibilityRole="button"
        accessibilityLabel="गिनती रीसेट करें"
        hitSlop={8}
      >
        <Text style={styles.resetText}>↺</Text>
        <Text style={styles.resetLabel}>रीसेट</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  stats: {
    minWidth: 84,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.saffronDark,
    fontVariant: ['tabular-nums'],
  },
  statSub: {
    fontSize: 11,
    color: colors.textMuted,
  },
  countButton: {
    flex: 1,
    marginHorizontal: 12,
    minHeight: 64,
    borderRadius: 32,
    backgroundColor: colors.saffron,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: colors.saffronDark,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  countButtonPressed: {
    backgroundColor: colors.saffronDark,
    transform: [{ scale: 0.97 }],
  },
  countButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  countButtonSub: {
    color: colors.saffronLight,
    fontSize: 12,
    fontWeight: '600',
  },
  resetButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: colors.saffron,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetText: {
    fontSize: 20,
    color: colors.saffron,
    lineHeight: 22,
  },
  resetLabel: {
    fontSize: 10,
    color: colors.saffron,
  },
});
