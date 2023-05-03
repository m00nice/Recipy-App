import React, { useState } from 'react';
import {  TextInput,ScrollView, Button, View, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants'

import {database, storage} from '../config/firebase'
import {doc, setDoc, addDoc, updateDoc, collection} from 'firebase/firestore'
import { async } from '@firebase/util';
import { uploadBytes, ref, getDownloadURL, updateMetadata  } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';

export default function RecipyMaker( {navigation, route} ) {

  
  const [recipyInputs, setRecipyInputs] = useState({})
  const [ingredientList, setIngredientList] = useState([])
  const [instructionsList, setInstructionsList] = useState([])


  

  const InputChange = (inputName, inputValue) => {
    setRecipyInputs({...recipyInputs, [inputName]: inputValue})
  }

  const AddToIngredients = () => {
    setIngredientList([...ingredientList, recipyInputs.listItem]);
    setRecipyInputs({ ...recipyInputs, listItem: '' });
  };

  const AddToInstructions = () => {
    setInstructionsList([...instructionsList, recipyInputs.listItem]);
    setRecipyInputs({ ...recipyInputs, listItem: '' });
  };

  const removeFromIngredients = (indexRemove) => {
    setIngredientList(ingredientList.filter((value, index) => index !== indexRemove))
  }

  const removeFromInstructions = (indexRemove) => {
    setInstructionsList(instructionsList.filter((value, index) => index !== indexRemove))
  }


//Front Image

  const [hasFrontImage, setHasFrontImage] = useState(null)
  const [frontImagePath, setFrontImagePath] = useState(null)

  const selectFrontImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(
      {
        allowsEditing:true
      }
    )
    setFrontImagePath(result.assets[0].uri)
    setHasFrontImage(true);
  }
  const uploadFrontImage = async (id) => {
    
    const res = await fetch(frontImagePath);
    const blob = await res.blob();
    const storageRef = ref(storage, id)
    uploadBytes(storageRef, blob).then((snapshot)=>{
      console.log("image upload good")
    })
    const url = await getDownloadURL(snapshot.ref)
    const urlEnd = url+"/front"

    const metadata = {
      customMetaData: {
        'url': urlEnd
      }
    }

    await updateMetadata(storageRef, metadata)
  }


  

//Ingredients Image

  const [hasIngreImage, setHasIngreImage] = useState(null)
  const [ingreImagePath, setIngreImagePath] = useState(null)

  const selectIngreImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(
      {
        allowsEditing:true
      }
    )
    setIngreImagePath(result.assets[0].uri)
    setHasIngreImage(true);
  }
  const uploadIngreImage = async (id) => {

    const res = await fetch(ingreImagePath);
    const blob = await res.blob();
    const storageRef = ref(storage, id)
    uploadBytes(storageRef, blob).then((snapshot)=>{
      console.log("image upload good")
    })
    const url = await getDownloadURL(snapshot.ref)
    const urlEnd = url+"/ingre"

    const metadata = {
      customMetaData: {
        'url': urlEnd
      }
    }

    await updateMetadata(storageRef, metadata)
  }

//End Image

  const [hasEndImage, setHasEndImage] = useState(null)
  const [endImagePath, setEndImagePath] = useState(null)

  const selectEndImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(
      {
        allowsEditing:true
      }
    )
    setEndImagePath(result.assets[0].uri)
    setHasEndImage(true);
  }
  const uploadEndImage = async (id) => {

    const res = await fetch(endImagePath);
    const blob = await res.blob();
    const storageRef = ref(storage, id)
    uploadBytes(storageRef, blob).then((snapshot)=>{
      console.log("image upload good")
    })
    const url = await getDownloadURL(snapshot.ref)
    const urlEnd = url+"/end"

    const metadata = {
      customMetaData: {
        'url': urlEnd
      }
    }

    await updateMetadata(storageRef, metadata)
  }

  //saving
  const saveRecipy = async () => {
    const newDocRef = await addDoc(collection(database, 'recipies'),{
      
    title: recipyInputs.title,
    author: recipyInputs.author,
    hasFrontImage: hasFrontImage,
    ingredients: ingredientList,
    hasIngreImage: hasIngreImage,
    instructions: instructionsList,
    hasEndImage: hasEndImage,
    prepTime: recipyInputs.prepTime,
    cookTime: recipyInputs.cookTime,
    serves: recipyInputs.serves,
    })


    var id = newDocRef.id;
    console.log(id);
    if(hasFrontImage){
      uploadFrontImage(id)
    }
    if(hasIngreImage){
      uploadIngreImage(id)
    }
    if(hasEndImage){
      uploadEndImage(id)
    }
    navigation.goBack();
    
  }



  return (
    <ScrollView>

      <Text>Choose Thumbnail</Text>
      <Button title="Choose image for thumbnail" onPress={selectFrontImage}/>
      {hasFrontImage && <Image source={{uri: frontImagePath}} style={{width: "100%", height: 200}}/>}


      <Text>Write title</Text>
      <TextInput placeholder='Title' value={recipyInputs.title} onChangeText={(text) => InputChange('title', text)}/>

      <Text>Write author</Text>
      <TextInput placeholder='Author' value={recipyInputs.author} onChangeText={(text) => InputChange('author', text)}/>



      <Text>Write Preparation time in minutes</Text>
      <TextInput placeholder='0' value={recipyInputs.prepTime} onChangeText={(text) => InputChange('prepTime', text)}/>

      <Text>Write Cooking time in minutes</Text>
      <TextInput placeholder='0' value={recipyInputs.cookTime} onChangeText={(text) => InputChange('cookTime', text)}/>

      <Text>Write serves amount</Text>
      <TextInput placeholder='0' value={recipyInputs.serves} onChangeText={(text) => InputChange('serves', text)}/>

      <View>
        <Text>Add ingredients</Text>
        <TextInput
        placeholder='ingredient'
        onChangeText={(text) => InputChange('listItem', text)}
        value={recipyInputs.ingredientList}
        />
        <Button title='Add' onPress={AddToIngredients}/>
        {ingredientList.map((value, index) => (
          <View key={index}>
            <Text>{value}</Text>
            <Button title='remove' onPress={() => removeFromIngredients(index)}/>
          </View>
        ))}
      </View>

      <Text>Choose Image for ingredient</Text>
      <Button title="Choose image for ingredients" onPress={selectIngreImage}/>
      {hasIngreImage && <Image source={{uri: ingreImagePath}} style={{width: "100%", height: 200}}/>}


      <View>
        <Text>Add instructions</Text>
        <TextInput
        placeholder='instructions'
        onChangeText={(text) => InputChange('listItem', text)}
        value={recipyInputs.instructionsList}
        />
        <Button title='Add' onPress={AddToInstructions}/>
        {instructionsList.map((value, index) => (
          <View key={index}>
            <Text>{value}</Text>
            <Button title='remove' onPress={() => removeFromInstructions(index)}/>
          </View>
        ))}
      </View>

      <Text>Choose Image for end</Text>
      <Button title="Choose image for end" onPress={selectEndImage}/>
      {hasEndImage && <Image source={{uri: endImagePath}} style={{width: "100%", height: 200}}/>}


      <Button title='Create Recipy' onPress={saveRecipy}/>

    </ScrollView>
  )
}