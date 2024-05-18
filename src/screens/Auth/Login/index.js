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
  import {AuthContext} from '../../../navigation/AuthProvider';
  import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from 'react-native-responsive-dimensions';
  import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const Login = ({navigation}) => {
    const passwordInputRef = useRef(null);
    const [isChecked, setIsChecked] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
    const [showView, setShowView] = useState(false);
    const [show2View, set2ShowView] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    useEffect(() => {
      const delay = 500;
      const timer = setTimeout(() => {
        setShowView(true);
      }, delay);
      return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
      const delay = 1000;
      const timer = setTimeout(() => {
        set2ShowView(true);
      }, delay);
      return () => clearTimeout(timer);
    }, []);
    const toggleCheckbox = () => {
      setIsChecked(prevChecked => !prevChecked);
    };
    const toggleShowPassword = () => {
      setShowPassword(prevShowPassword => !prevShowPassword);
    };
   
    const {login} = useContext(AuthContext);
    const Login = () => {
        if(email==='' || password==='')
        {
         Alert.alert('Please Check Your Email and Password')
         return
        }
       // setLoading(true);
        login(email, password)
          .then((user) => {
            console.log('User:', user);
            if (user) {
              return AsyncStorage.setItem('Token', user.uid)
                .then(() => {
                  console.log('Token set successfully');
                  navigation.navigate('AppStack');
                  setEmail('')
                  setPassword('')
                });
            } else {
              throw new Error('Login failed');
            }
          })
          .catch((error) => {
            console.error('Login error:', error.message);
            Alert.alert('Login Error', error.message);
          })
          .finally(() => {
            console.log('Login process completed');
           // setLoading(false);
          });  
    
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
  
            <View style={{flex: 2, justifyContent:'space-between'}}>
              <View style={styles.mid}>
                <View style={styles.email}>
                  <Text style={styles.fieldtitle}>Email</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={userEmail => setEmail(userEmail)}
                    placeholder="johndoe@email.com"
                    returnKeyType="next"
                    placeholderTextColor="#222222"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
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
  
               
  
                <TouchableOpacity onPress={Login} style={styles.button}>
                
                    <Text style={styles.Logintext}>LOG IN</Text>
                  </TouchableOpacity>
              </View>
              <View style={styles.end}>
                <Text style={styles.endtext}>Don't have an account?</Text>
                <TouchableOpacity
                  style={styles.bottombtn}
                  onPress={() => {
                    navigation.navigate('SignUp');
                  }}>
                  <Text style={styles.btntext}>CREATE AN ACCOUNT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  };
  
  export default Login;
  
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
      marginTop: responsiveHeight(4),
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
      marginRight: 20,
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
      marginTop: '5%',
      color: '#222222',
      fontFamily: 'Roboto',
      fontSize: responsiveFontSize(1.5),
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
      marginTop: 29,
    },
    Logintext: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: responsiveFontSize(2),
      color: '#FFFFFF',
    },
  });