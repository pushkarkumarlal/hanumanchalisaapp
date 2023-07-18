import React from 'react'
import {View,Image,SafeAreaView,Text} from 'react-native'

const H1Img=require('../../assets/Hanumanji_image_1.jpg');
import styles from './imagesSlider.style';
import ChalisaTextScroll from '../chalisaText/chalisaTextScroll';

const ImageSlider=()=>{
    return(
    <View style={styles.container}>
        <Image style={styles.imageStyle} source={H1Img}/>

        <Text style={{ 
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 45,
        fontWeight: 'bold',
        color: 'black',
        }}>Hanuman Chalisa</Text>

        <ChalisaTextScroll/>
    </View>    
    )
}
export default ImageSlider;