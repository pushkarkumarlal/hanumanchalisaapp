import React from 'react'
import { useState } from 'react';
import {View,Image,LinearGradient,Text,ImageBackground} from 'react-native'

const H1Img=require('../../assets/Hanumanji_image_1.jpg');
import styles from './imagesSlider.style';
import ChalisaTextScroll from '../chalisaText/chalisaTextScroll';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const ImageSlider=()=>{
    const[count,setCount]=useState(0);

    return(
    <SafeAreaView style={styles.container}>

        <ImageBackground style={styles.imageBackgroundStyle} source={H1Img}>

            <View style={{flex:1,justifyContent:'flex-end'}}>  
            <View style={styles.buttonView}>

            <TouchableOpacity style={styles.buttonTouch} activeOpacity={false} onPress={() => {setCount(0)}}><Text style={styles.Text2}>Reset Count</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonTouch} activeOpacity={false} onPress={() => {setCount(count+1)}}><Text style={styles.Text2}>+ {count} Press</Text>
            </TouchableOpacity>

            </View>
            </View>

        </ImageBackground>

        <View >
        <Text style={styles.Text1}>Hanuman Chalisa</Text>
        </View>

        <ChalisaTextScroll/>
        
    </SafeAreaView>    
    )
}
export default ImageSlider;