import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import commonStyles from '../../assets/styles/commonStyles'
import { Button } from 'react-native-paper'
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker'

export default function ImportantDocumentScreen() {

  const takeImage = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    })
  }

  const uploadDocument = async () => {
    try {
      const doc = await DocumentPicker.pick()
      console.log(doc)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style = {{flex : 1}}>

      <View style={commonStyles.Container}>

        <Button
          mode='contained'
          onPress={() => takeImage()}
          style={commonStyles.PrimaryButton}
        >Take Image
        </Button>

        <Button
          mode='contained'
          onPress={() => uploadDocument()}
          style={commonStyles.PrimaryButton}
        >Upload Document
        </Button>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

})