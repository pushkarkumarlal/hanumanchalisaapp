import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * A number that survives app restarts.
 * Writes are skipped until the stored value has been loaded, so a tap during
 * startup can never overwrite the saved value with the default.
 */
export default function usePersistentNumber(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(key)
      .then((raw) => {
        if (cancelled || raw == null) return;
        const parsed = Number(raw);
        // If the user already tapped while loading, add the taps to the saved value.
        if (Number.isFinite(parsed)) setValue((current) => parsed + (current - defaultValue));
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
    // defaultValue is intentionally read once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(key, String(value)).catch(() => {});
  }, [key, value, loaded]);

  return [value, setValue, loaded];
}
