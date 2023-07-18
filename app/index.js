import React from 'react'
import {View,Text, SafeAreaView,ScrollView,Image} from 'react-native'
import {Stack,useRouter} from 'expo-router'


import ImageSlider from '../components/ImageSlider/imageSlider';
import ChalisaTextScroll from '../components/chalisaText/chalisaTextScroll';


const Home=()=>{
    const router=useRouter();
    return(
    <SafeAreaView style={{flex:1}}>
        
       <ImageSlider/>

       

    </SafeAreaView>)
}

export default Home;