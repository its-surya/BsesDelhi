import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';

//Use it like this <HTMLViewer htmlContent = {source}>
//Where source is some HTML Text

const HTMLViewer: React.FC<{ htmlContent: string }> = ({ htmlContent }) => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
        textZoom={250}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default HTMLViewer
