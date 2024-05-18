import React, {createContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

export const AuthContext = createContext();
const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

 

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            return userCredential.user;
          } catch (e) {
            console.log(e);
            throw e; 
          }
        },
        register: async (email, password, name) => {
          try {
            const response = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );
            const user = response.user;
            await user.updateProfile({displayName: name});
            return true;
          } catch (e) {
            console.log(e);
            Alert.alert(e.message);
            return false;
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;