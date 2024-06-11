import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HTMLViewer from '../components/HtmlViewer'
import commonStyles from '../../assets/styles/commonStyles'
//For Language
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-paper';
import { colors } from '../../assets/styles/commonColors';

interface KnowAboutSolarProps { 
  navigation : any
}

const KnowAboutSolar = ({navigation} : KnowAboutSolarProps) => {

  const { t } = useTranslation()

  return (
    <SafeAreaView style={{ flex: 1 }} >

      <View style={commonStyles.Container}>

        <Text style={commonStyles.DescriptionText}>
          {t('KARS-para1')}{"\n"}
        </Text>

        <Text style={commonStyles.DescriptionText}>
          {t('KARS-para2')}{"\n"}
        </Text>

        <Text style={commonStyles.DescriptionText}>
          {t('KARS-para3')}{"\n"}
        </Text>

        <Button
          mode='contained'
          style={commonStyles.PrimaryButton}
          labelStyle={{ color: colors.whiteText }}
          onPress={() => navigation.navigate("CalculateSavingScreen")}
        >
          {t("CalculateSavingsScreen")}
        </Button>

        <Text style={[commonStyles.DescriptionText,{textAlign : 'justify'}]}>
          {t('KARS-para4')}{"\n"}
        </Text>

        <Text style={[commonStyles.DescriptionText,{textAlign : 'justify'}]}>
          {t('KARS-para5')}{"\n"}
        </Text>

      </View>

    </SafeAreaView>
  )
}

export default KnowAboutSolar

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 10
  }
})