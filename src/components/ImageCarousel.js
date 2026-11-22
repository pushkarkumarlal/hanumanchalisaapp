import { memo, useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { colors } from '../theme';

const Slide = memo(function Slide({ item, width, height }) {
  return (
    <Image
      source={item.source}
      style={{ width, height }}
      contentFit="cover"
      contentPosition={{ left: '50%', top: item.focus ?? '30%' }}
      accessibilityLabel={item.label}
      accessible
    />
  );
});

function ImageCarousel({ images, width, height }) {
  const [index, setIndex] = useState(0);

  // onScroll (not onMomentumScrollEnd) so dots update on every platform, including programmatic scrolls.
  const onScroll = useCallback(
    (e) => {
      const next = Math.round(e.nativeEvent.contentOffset.x / width);
      setIndex(Math.max(0, Math.min(images.length - 1, next)));
    },
    [width, images.length],
  );

  const getItemLayout = useCallback(
    (_, i) => ({ length: width, offset: width * i, index: i }),
    [width],
  );

  return (
    <View style={[styles.container, { width, height }]}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Slide item={item} width={width} height={height} />}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={32}
        getItemLayout={getItemLayout}
        initialNumToRender={2}
        windowSize={3}
        // Re-layout correctly if the window width changes (rotation / split screen).
        extraData={width}
      />

      <View style={styles.dots} pointerEvents="none">
        {images.map((img, i) => (
          <View key={img.key} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A0F08',
  },
  dots: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255,255,255,0.6)',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    elevation: 1,
  },
  dotActive: {
    width: 18,
    backgroundColor: colors.gold,
  },
});

export default memo(ImageCarousel);
