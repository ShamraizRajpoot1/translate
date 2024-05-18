import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Image, TouchableOpacity, Text, Platform, PermissionsAndroid, StatusBar } from 'react-native';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import Model from '../../../component/Model';
import { AuthContext } from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
const Home = () => {
  const { user } = useContext(AuthContext);
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [historyData, setHistoryData] = useState([])

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = stopListening;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = (error) => console.log('onSpeechError: ', error);

    const androidPermissionChecking = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);

          if (!granted) {
            const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
              title: 'Audio Recording Permission',
              message: 'This app needs access to your microphone to record audio.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            });

            if (result === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('Audio recording permission granted');
            } else {
              console.log('Audio recording permission denied');
              Alert.alert('Permission Denied', 'You need to grant audio recording permission to use this feature.');
            }
          } else {
            console.log('Audio recording permission already granted');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    androidPermissionChecking();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (event) => {
    console.log('Recording Started...', event);
  };

 
  const onSpeechResults = (event) => {
    console.log('Speech results: ', event);
    const text = event.value[0];
    setInputText(text);
  };

  const startListening = async () => {
    console.log('Start listening');
    setIsListening(true);
    try {
      await Voice.start();
    } catch (error) {
      console.log('Start listening error: ', error);
    }
  };

  const stopListening = async () => {
    try {
      
      await Voice.stop();
      Voice.removeAllListeners();
      setIsListening(false);
    } catch (error) {
      console.log('Stop listening error: ', error);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historyRef = firestore().collection('History').doc(user.uid);
        historyRef.onSnapshot((doc) => {
          if (doc.exists) {
            const data = doc.data();
            const reversedTranslations = data.translations.reverse();
            setHistoryData(reversedTranslations);
            console.log(reversedTranslations);
          } else {
            console.log('No history found for the user');
          }
        });
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };
  
    fetchHistory();
  }, [user.uid]);
  
  

  const handleTranslate = async () => {
    if (inputText.trim()) {
      try {
        Tts.stop();
        const toLang = 'en';
        const text = inputText;
        const API_KEY = "AIzaSyBMW4-7ozg5cnzPH-wRZg76IZTeut9sKjI";
        const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

        const response = await axios.post(url, {
          q: text,
          target: toLang,
        });

        const translated = response.data.data.translations[0].translatedText;
        setTranslatedText(translated);

        Tts.speak(translated)

        const historyRef = firestore().collection('History').doc(user.uid);

      // Check if the document exists
      const doc = await historyRef.get();

      if (doc.exists) {
        // Document exists, update it
        await historyRef.update({
          translations: firestore.FieldValue.arrayUnion(inputText),
        });
      } else {
        // Document doesn't exist, create it
        await historyRef.set({
          translations: [inputText], // Start with an array containing only the input text
        });
      }
      } catch (error) {
        console.error('Error translating text:', error);
        Alert.alert('Error translating text. Please try again.');
      }
    } else {
      Alert.alert('Please enter text to translate');
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#000000'} />
      <View style={[styles.translatedTextContainer,{borderRadius: 0, height:responsiveScreenHeight(7)}]}>
        <Text style={[styles.translatedTextTitle,{fontSize:responsiveFontSize(2.7)}]}>Translator</Text>
      </View>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter text..."
          placeholderTextColor={"rgba(255,255,255,0.6)"}
          value={inputText}
          onChangeText={setInputText}
          multiline={true}
        />
        {isListening ? (
          <Image source={require('../../../assets/icons/dot2.png')} style={styles.icon} />
        ) : (
          <TouchableOpacity onPress={() => (isListening ? stopListening() : startListening())}>
            <Image source={require('../../../assets/icons/mic.png')} style={styles.icon} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleTranslate}>
          <Image source={require('../../../assets/icons/search.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.outputSection}>
        <View style={styles.translatedTextContainer}>
          <Text style={styles.translatedTextTitle}> Translated Text </Text>
        </View>
        <Text style={styles.outputText}>{translatedText}</Text>
      </View>

      <Model
        isVisible={isModalVisible}
        historyData={historyData}
        onClose={toggleModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
   
  },
  inputSection: {
    marginTop: responsiveScreenHeight(15),
    marginHorizontal:responsiveScreenWidth(5),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E45B5B',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: responsiveScreenWidth(5),
    width: responsiveScreenWidth(90),
  },
  icon: {
    width: scale(23),
    height: scale(23),
    tintColor: '#FFFFFF',
    marginLeft: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    maxHeight: responsiveScreenHeight(10),
    textAlignVertical: 'top',
  },
  outputSection: {
    marginTop: responsiveScreenHeight(5),
    justifyContent: 'center',
    marginHorizontal:responsiveScreenWidth(5)
  },
  translatedTextContainer: {
    padding: responsiveScreenWidth(2),
    backgroundColor: '#E45B5B',
    alignItems: 'center',
    borderRadius: scale(10),
    justifyContent:'center'
  },
  translatedTextTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  outputText: {
    marginLeft: responsiveScreenWidth(5),
    marginTop: responsiveScreenHeight(3),
    color: '#FFFFFF',
    fontSize: responsiveFontSize(2),
  },
});

export default Home;