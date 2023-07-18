import React from "react";
import {StyleSheet} from 'react-native'

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingTop:45,
        paddingBottom:0,
    },
    imageStyle:{
        
        resizeMode: 'cover',
        height: 450,
        width: 450,
        flexDirection: 'column',
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
})
export default styles;