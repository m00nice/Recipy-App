import React, { useState } from 'react';
import { ScrollView, Button, View, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import {database, storage} from '../config/firebase'
import {doc, setDoc, addDoc, updateDoc, collection} from 'firebase/firestore'
import { async } from '@firebase/util';
import { uploadBytes, ref, getDownloadURL  } from 'firebase/storage';


function Recipy({ navigation, route }) {
  
  const {item} = route.params;
  const [frontImagePath, setFrontImagePath ] = useState(null)
  const [ingreImagePath, setIngreImagePath ] = useState(null)
  const [endImagePath, setEndImagePath ] = useState(null)


  

  const getFrontImage = async () => {
    const storageRef = ref(storage, item.key)
    getDownloadURL(storageRef).then((url) => {
      setFrontImagePath(url+"/front")
    }).catch((error) => {
      switch (error.code) {
        case 'storage/object-not-found':
          break;

        case 'storage/unauthorized':
          break;
        
        case 'storage/canceled':
          break;
        
        case 'storage/unknown':
          break;
            
          
      }
    })
  }
if(item.hasFrontImage){
    getFrontImage()
  }
  

  const getIngreImage = async () => {
    const storageRef = ref(storage, item.key)
    getDownloadURL(storageRef)
    .then((url) => {
      setIngreImagePath(url+"/ingre")
      console.log("am i in?");
    })
    .catch((error) => {
      switch (error.code) {
        case 'storage/object-not-found':
          break;

        case 'storage/unauthorized':
          break;
        
        case 'storage/canceled':
          break;
        
        case 'storage/unknown':
          break;
            
          
      }
    })
  }
if(item.hasIngreImage){
    getIngreImage()
  }
  

  const getEndImage = async () => {
    const storageRef = ref(storage, item.key)
    getDownloadURL(storageRef).then((url) => {
      setEndImagePath(url+"/end")
    }).catch((error) => {
      switch (error.code) {
        case 'storage/object-not-found':
          break;

        case 'storage/unauthorized':
          break;
        
        case 'storage/canceled':
          break;
        
        case 'storage/unknown':
          break;
            
          
      }
    })
  }
if(item.hasEndImage){
    getEndImage(item.key)
  }

  return (
    <ScrollView style={styles.container}>
      <Image
      source={{uri: frontImagePath}}
      style={styles.image}
      alt="Image of Food"
      />
      <Text style={styles.Title}>{item.title}</Text>
      <View style={styles.info}>
        <Text>Prep time: {item.prepTime} minutes</Text>
        <Text>Cook time: {item.cookTime} minutes</Text>
        <Text>Serves: {item.serves}</Text>
      </View>
      <Text style={styles.underTitle}>Ingredients:</Text>

      <View style={styles.ingredients}>
      {item.ingredients.map((item3, index) => (
        <Text style={styles.ingredientsText} key={index}>{"●  "}{item3}{"\n"}</Text>
      ))}
      </View>
      <Image
      source={{uri: ingreImagePath}}
      style={styles.image}
      alt="Image of Ingredients"
      />

      <Text style={styles.underTitle}>Instructions:</Text>

      <View style={styles.instructions}>
      {item.instructions.map((item4, index) => (
        <Text style={styles.instructionsText} key={index}>{index+1+". "}{item4}{"\n\n"}</Text>
      ))}
      </View>

      <Image
      source={{uri: endImagePath}}
      style={styles.image}
      alt="Image of End Product"
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E0B970',
  },
  Title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    backgroundColor: 'black',
    color: 'white',
  },
  underTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    backgroundColor: 'black',
    color: 'white',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  info: {
    flexDirection: 'column',
    marginBottom: 16,
    backgroundColor: '#E5D2B3'
  },
  ingredients: {
    marginBottom: 16,
    backgroundColor: '#E5D2B3'
  },
  ingredientsText: {
    marginLeft: 10,
  },
  instructions: {
    marginBottom: 16,
    backgroundColor: '#E5D2B3'
  },
  instructionsText: {
    marginLeft: 10,
  },

});

export default Recipy;