import React from 'react'
import {View,Text, SafeAreaView,} from 'react-native'
import {Stack,useRouter} from 'expo-router'

const Home=()=>{
    const router=useRouter();
    return(
    <SafeAreaView style={{flex:1,backgroundColor:'lightgreen'}}>
        <View style={{flex:1,align:'center'}}>
            <Text style={{flex:1,textAlign:'center'}}>Hanuman Chalisa</Text>
            <View style={{flex:1,align:'center'}}>
            <Text style={{flex:1,textAlign:'center'}}>Hanuman Chalisa2</Text>
        </View>
        </View>

       
    </SafeAreaView>)
}

export default Home;