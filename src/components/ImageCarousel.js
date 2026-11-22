import { memo, useCallback, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';

const Slide = memo(function Slide({ item, width, height }) {
  const size = { width, height };
  return (
    <View style={[size, styles.slide]} accessible accessibilityRole="image" accessibilityLabel={item.label}>
      {/* Blurred copy fills the frame; the sharp image uses "contain" so paintings are never cropped. */}
      <Image source={item.source} style={[size, styles.layer]} resizeMode="cover" blurRadius={25} />
      <View style={[size, styles.layer, styles.dim]} />
      <Image source={item.source} style={[size, styles.layer]} resizeMode="contain" />
    </View>
  );
});

function ImageCarousel({ images, width, height }) {
  const [index, setIndex] = useState(0);

  const onMomentumScrollEnd = useCallback(
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
    <View style={{ width, height }}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Slide item={item} width={width} height={height} />}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        getItemLayout={getItemLayout}
        initialNumToRender={2}
        windowSize={3}
        // Re-layout correctly if the window width changes (rotation / split screen).
        extraData={width}
      />

      <View style={styles.footer} pointerEvents="none">
        <Text style={styles.caption} numberOfLines={1}>
          {images[index]?.label}
        </Text>
        <View style={styles.dots}>
          {images.map((img, i) => (
            <View key={img.key} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    overflow: 'hidden',
    backgroundColor: '#1A0F08',
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  dim: {
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 18,
    paddingBottom: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  caption: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    paddingHorizontal: 16,
    marginTop: -12,
  },
  dots: {
    flexDirection: 'row',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    width: 18,
    backgroundColor: colors.gold,
  },
});

export default memo(ImageCarousel);
