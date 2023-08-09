import React from "react";
import {StyleSheet} from 'react-native'

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    imageBackgroundStyle:{
        alignSelf:'center',
        resizeMode: 'cover',
        height: 500,
        width: 450,},

    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    Text1:{ 
        
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        textShadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Shadow offset (x, y)
        textShadowRadius: 5,
        
        },
        Text2:{
          alignSelf:'center',
          fontWeight:"bold",
          
        },
        buttonTouch:{
            borderRadius: 50, // Making the button perfectly rounded
            backgroundColor: '#f5a34f',
            paddingVertical: 15,
            paddingHorizontal: 20,
            alignItems: 'center',
            
        },
        middleContainer: {
            flex: 8,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 40,
          },
          buttonView:{
            flexDirection:'row',
            justifyContent:"space-between",
            padding:15,
            paddingTop:100,
            
          }
         
})
export default styles;