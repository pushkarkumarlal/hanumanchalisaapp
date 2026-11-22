import { useCallback, useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';

export const TEXT_SIZES = [
  { label: 'छोटे अक्षर', value: 0.85 },
  { label: 'सामान्य अक्षर', value: 1 },
  { label: 'बड़े अक्षर', value: 1.2 },
  { label: 'बहुत बड़े अक्षर', value: 1.45 },
];

/** Hamburger (☰) button that opens a dropdown of text-size options. */
export default function OptionsMenu({ fontScale, onChangeFontScale }) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState({ top: 0, right: 0 });
  const buttonRef = useRef(null);

  const openMenu = useCallback(() => {
    // Position the dropdown just below the button, aligned to its right edge.
    buttonRef.current?.measureInWindow((x, y, w, h) => {
      setAnchor({ top: y + h + 4, left: x + w });
      setOpen(true);
    });
  }, []);

  const select = useCallback(
    (value) => {
      onChangeFontScale(value);
      setOpen(false);
    },
    [onChangeFontScale],
  );

  // Closest preset to the stored value, so older saved values still show a tick.
  const current = TEXT_SIZES.reduce((best, s) =>
    Math.abs(s.value - fontScale) < Math.abs(best.value - fontScale) ? s : best,
  ).value;

  return (
    <>
      <Pressable
        ref={buttonRef}
        onPress={openMenu}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        accessibilityRole="button"
        accessibilityLabel="विकल्प"
        hitSlop={8}
      >
        <View style={styles.bar} />
        <View style={styles.bar} />
        <View style={styles.bar} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)} statusBarTranslucent>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} accessibilityLabel="बंद करें" />
        <View style={[styles.menu, { top: anchor.top, left: anchor.left - MENU_WIDTH }]}>
          <Text style={styles.menuTitle}>अक्षर का आकार</Text>
          {TEXT_SIZES.map((s) => {
            const selected = s.value === current;
            return (
              <Pressable
                key={s.value}
                onPress={() => select(s.value)}
                style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
                accessibilityRole="menuitem"
                accessibilityState={{ selected }}
              >
                <Text style={[styles.itemText, { fontSize: Math.round(15 * s.value) }, selected && styles.itemTextSelected]}>
                  {s.label}
                </Text>
                {selected && <Text style={styles.tick}>✓</Text>}
              </Pressable>
            );
          })}
        </View>
      </Modal>
    </>
  );
}

const MENU_WIDTH = 210;

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: colors.saffronLight,
  },
  bar: {
    width: 22,
    height: 2.5,
    borderRadius: 2,
    marginVertical: 2.5,
    backgroundColor: colors.saffronDark,
  },
  menu: {
    position: 'absolute',
    width: MENU_WIDTH,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: colors.surface,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  menuTitle: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 4,
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
    paddingHorizontal: 16,
  },
  itemPressed: {
    backgroundColor: colors.saffronLight,
  },
  itemText: {
    color: colors.text,
  },
  itemTextSelected: {
    fontWeight: '700',
    color: colors.saffronDark,
  },
  tick: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.saffron,
  },
});
