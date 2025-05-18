import { images } from "@/constants/images";
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text } from 'react-native';

const _layout = () => {
  return (
<Tabs>
    <Tabs.Screen 
    name = "index"
    options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({focused}) =>(
            <>
              <ImageBackground 
              source={images.highlight}>
                <Image source = {images.highlight} tintColor = "#151312" className = "size-5 " />  
                <Text>Home</Text>
                            </ImageBackground>

            </>
        )
    }}
    />
      
     <Tabs.Screen 
    name = "profile"
    options={{
        title: 'Profile',
        headerShown: false
    }}
    /> 
    
  

</Tabs>


  )
}

export default _layout

const styles = StyleSheet.create({})