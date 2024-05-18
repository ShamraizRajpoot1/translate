import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const ResultScreen = ({ route }) => {
  const { query } = route.params;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: `https://www.google.com/search?q=${encodeURIComponent(query)}` }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default ResultScreen;
