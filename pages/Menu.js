import React, {useState, useEffect} from 'react';
import { Button, View, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { database, storage } from '../config/firebase';
import { uploadBytes, ref, getDownloadURL  } from 'firebase/storage';



function Menu({ navigation }) {

const chatColl = "recipies";
const [recipies, setRecipies] = useState([])
const getRecipies = async () => {
  const collectionRef = collection(database, chatColl)
  const q = query(collectionRef, ref => ref.orderBy('createdAt', 'desc'))
  onSnapshot(q, snapshot =>{
    const _recipies = []
    snapshot.forEach(doc => {
      _recipies.push({
        ...doc.data(),
        key: doc.id
      })
    })
    setRecipies(_recipies);
    console.log(recipies)
  })
}

useEffect(() => {
  getRecipies();
}, [])

  const ImageButton = ({ onPress, imageSource, title, Author }) => (
      <TouchableOpacity onPress={onPress} style={{borderColor: "#2B1313", borderWidth: 15, padding: 0, backgroundColor: "#491C1C",}}>
      <Text style={{
        backgroundColor: "#491C1C",
        fontSize: 40,
        color: "white",
        marginLeft: 5,
        }}>{title}</Text>
        <Text
        style={{
          backgroundColor: "#491C1C",
          fontSize: 15,
          color: "white",
          marginBottom: 5,
          marginLeft: 10,
          }}
        >{"By: "}{Author}</Text>
      <Image source={{uri: imageSource}} style={{width: '100%', height: 300, resizeMode: 'cover', backgroundColor: "#491C1C"}}/>
      
    </TouchableOpacity>
  );


  return (
    
    <View>
      <Button title='Add new recipy' onPress={() => navigation.navigate('RecipyMaker')}/>
      <FlatList
        data={recipies}
        renderItem={({item}) => 
        <ImageButton
        title={item.title}
        Author={item.author}
        
        imageSource={item.key}
        onPress={() => navigation.navigate('Recipy', {item})}
        />
      }
      />
    </View>
  );
}

export default Menu;