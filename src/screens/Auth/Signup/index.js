import {
    View,
    Text,
    SafeAreaView,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Alert,
  } from 'react-native';
  import React, {useRef, useState, useEffect, useContext} from 'react';
  import { AuthContext } from '../../../navigation/AuthProvider';
  import firestore from '@react-native-firebase/firestore';
  import auth from '@react-native-firebase/auth';
  import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
  import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const SignUp = ({navigation}) => {
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setComfirmPassword] = useState();
    const passwordInputRef = useRef(null);
    const [isChecked, setIsChecked] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
  
   
    const toggle = {
      width: scale(15),
      height: scale(15),
      borderWidth: 2,
      borderRadius: 100,
      borderColor: isChecked ? '#F6CD5B' : '#222222',
      backgroundColor: isChecked ? '#F6CD5B' : null,
      alignItems: 'center',
      justifyContent: 'center',
    };
    
    const {register} = useContext(AuthContext);
    const {user} = useContext(AuthContext);
   
    const Register = async () => {
        try {
          // setIsLoading(true);
      
        
      
          const userCredential = await auth().createUserWithEmailAndPassword(
            email,
            password
          );
      
          const userId = userCredential.user.uid;
      
          await firestore().collection('Users').doc(userId).set({
            userId: userId,
            email: email,
          });
      
          await AsyncStorage.setItem('Token', userId);
          // setIsLoading(false);
          // showCustomToast();
          console.log('Registration successful');
          navigation.navigate('AppStack');
        } catch (error) {
          // setIsLoading(false);
          console.error('Registration error:', error.message);
          // Handle registration errors, show error messages to the user
        }
      };
   
  
  
    return (
      <>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            <View style={styles.top}>
             
              <View style={{flex: 2, justifyContent: 'flex-end'}}>
                <Text style={styles.text}>Welcome to Login!</Text>
              </View>
            </View>
            <View style={styles.line} />
  
            <View style={{flex: 4, justifyContent:'space-between'}}>
              <View style={styles.mid}>
                <View style={styles.email}>
                  <Text style={styles.fieldtitle}>Email</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={userEmail => setEmail(userEmail)}
                    placeholder="johndoe@email.com"
                    placeholderTextColor="#222222"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCompleteType="email"
                  />
                </View>
               
  
                <View
                  onTouchStart={() => passwordInputRef.current.focus()}
                  style={styles.password}>
                  <Text style={styles.fieldtitle}>Password</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      ref={passwordInputRef}
                      style={styles.input}
                      onChangeText={userPassword => setPassword(userPassword)}
                      placeholder="Enter your password"
                      placeholderTextColor="#222222"
                      secureTextEntry={showPassword}
                      autoCapitalize="none"
                      autoCompleteType="password"
                    />
                    
                  </View>
                </View>
               
               
  
                <TouchableOpacity onPress={Register} style={styles.button}>
                  
                    <Text style={styles.Logintext}>SIGNUP</Text>
                  </TouchableOpacity>
              </View>
              <View style={styles.end}>
                <Text style={styles.endtext}>Already have an account?</Text>
                <TouchableOpacity
                  style={styles.bottombtn}
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  <Text style={styles.btntext}>LOGIN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  };
  
  export default SignUp;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    top: {
      width:'100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    image: {
      
      flex: 3,
      justifyContent: 'flex-end',
      alignItems:'center'
    },
    img: {
      height:scale(80),
      width: scale(185)
    },
    text: {
      color: '#111820',
      fontFamily: 'Oxygen',
      fontSize: responsiveFontSize(3),
      fontWeight: 'bold',
    },
    line: {
      width: responsiveWidth(33),
      height: 0,
      borderColor: '#F6CD5B',
      borderBottomWidth: responsiveHeight(0.3),
      marginLeft: '25%',
    },
    mid: {
      marginTop: responsiveHeight(2),
      alignItems: 'center',
      justifyContent: 'center',
    },
    email: {
      width: responsiveWidth(90),
      height:responsiveHeight(10),
      marginHorizontal: 20,
      backgroundColor: '#F7F7F7',
      
      borderRadius: 12,
    },
    password: {
      marginTop: 20,
      width: responsiveWidth(90),
      height:responsiveHeight(10),
      marginHorizontal: 20,
      backgroundColor: '#F7F7F7',
      borderRadius: 12,
    },
    eye: {
      height: scale(9),
      width: scale(12)
    },
    input: {
      
      borderWidth: 0,
      marginLeft: 13,
      color: '#222222',
      fontFamily: 'Roboto',
      fontSize: responsiveFontSize(1.9),
      fontWeight: 'normal',
    },
    remrow: {
      width: '100%',
      marginTop: responsiveHeight(2),
      paddingHorizontal :responsiveWidth(3),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    toggleimg: {
      height:scale(7),
      width: scale(7),
      borderRadius: 100,
      backgroundColor: '#F6CD5B',
    },
    toggleview: {
      marginLeft: 20,
      flexDirection: 'row',
    },
    toggletext: {
      fontFamily: 'Roboto',
      fontSize: responsiveFontSize(1.5),
      color: '#000000',
      marginLeft: responsiveWidth(1.5),
    },
    forget: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: responsiveFontSize(1.6),
      color: '#111820',
    },
    fieldtitle: {
      marginLeft: 15,
      marginTop: 8,
      color: '#444444',
      fontFamily: 'Roboto',
      fontSize: responsiveFontSize(1.5),
      fontWeight: 'bold',
    },
    end: {alignItems: 'center', marginBottom:'5%'},
    endtext: {
      
      color: '#222222',
      fontFamily: 'Roboto',
      fontSize: responsiveFontSize(2),
    },
    btntext: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: responsiveFontSize(2),
      color: '#222222',
    },
    bottombtn: {
      width: responsiveWidth(75),
      height: responsiveHeight(8),
      backgroundColor: '#EEEEEE',
      borderRadius: 50,
      alignItems: 'center',
      marginTop: 10,
      justifyContent: 'center',
    },
    button: {
      width: responsiveWidth(75),
      height: responsiveHeight(8),
      backgroundColor: '#363333',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
      borderColor: '#B7B7B780',
      marginTop: 9,
    },
    Logintext: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: responsiveFontSize(2),
      color: '#FFFFFF',
    },
    check: {
      width: scale(15),
      height: scale(16),
    },
  });