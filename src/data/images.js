// Max 5 images. Sources and licences are listed in ASSET_CREDITS.md.
// `focus` is the vertical point (CSS object-position style) kept in view when
// the image is cropped to fill the frame — set so Hanuman Ji's face is never cut.
const images = [
  // hanuman_1.jpg removed from the release: artist/licence unknown (see ASSET_CREDITS.md).
  { key: 'sanjeevani', source: require('../../assets/images/hanuman_2.jpg'), label: 'संजीवनी पर्वत लाते हनुमान जी', focus: '20%' },
  { key: 'lanka-dahan', source: require('../../assets/images/hanuman_4.jpg'), label: 'लंका दहन', focus: '12%' },
  { key: 'pahari', source: require('../../assets/images/hanuman_5.jpg'), label: 'पहाड़ी चित्रकला में हनुमान जी', focus: '30%' },
];

export default images;
