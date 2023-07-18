import React from 'react'
import {View,Image,LinearGradient,Text} from 'react-native'

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
        textShadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset (x, y)
    textShadowRadius: 5,
    backgroundColor:'lightgrey',
        }}>Hanuman Chalisa</Text>


        <ChalisaTextScroll/>
        
    </View>    
    )
}
export default ImageSlider;