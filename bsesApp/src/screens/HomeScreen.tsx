import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import ImageSlider from '../components/ImageSlider'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import commonStyles from '../../assets/styles/commonStyles'
//For Language
import { useTranslation } from 'react-i18next';


interface HomeScreenProps {
  navigation: any
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {

  const staticImages = [
    require('../../assets/images/Solar1.jpg'),
    require('../../assets/images/Solar2.jpg')
  ];

  const [images, setImages] = useState([])

  const { t } = useTranslation()

  return (
    <SafeAreaView style = {{flex :1}}>
      
      <ScrollView 
      style={commonStyles.Container}
      contentContainerStyle={styles.scrollViewContent}
      >

        <View style={styles.InnerView}>

          {/* For ImageSlider */}
          <View style={styles.ImageSlider}>
            <ImageSlider images={staticImages} />
          </View>

          {/* Track Application */}
          <Text style={commonStyles.HeaderText}>{t("TrackApplication")}</Text>
          <View style={styles.Section}>
            <View style={styles.IconsRow}>
              <TouchableOpacity
                style={styles.ClickableIcons}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("TrackApplicationScreen")}
              >
                <View style={commonStyles.IconBackground}>
                  <Image
                    source={require('../../assets/icons/ic_trackApplication.png')}
                    style={commonStyles.Icon}
                  />
                </View>
                <Text style={commonStyles.IconsTitleText}>{t("TrackApplicationIcon")}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Know About solar Rooftop */}
          <Text style={commonStyles.HeaderText}>{t("RoofTopSolar")}</Text>
          <View style={styles.Section}>
            <View style={styles.IconsRow}>
              <TouchableOpacity
                style={styles.ClickableIcons}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("CalculateSavingScreen")}
              >
                <View style={commonStyles.IconBackground}>
                  <Image
                    source={require('../../assets/icons/ic_solarCalculator.png')}
                    style={commonStyles.Icon}
                  />
                </View>
                <Text style={commonStyles.IconsTitleText}>{t("CalculateSavings")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.ClickableIcons}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("KnowAboutSolar")}
              >
                <View style={commonStyles.IconBackground}>
                  <Image
                    source={require('../../assets/icons/ic_knowAboutSolar.png')}
                    style={commonStyles.Icon}
                  />
                </View>
                <Text style={commonStyles.IconsTitleText}>{t("RoofTopSolarIcon")}</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={styles.ClickableIcons}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("ImportantDocuments")}
              >
                <View style={commonStyles.IconBackground}>
                  <Image
                    source={require('../../assets/icons/ic_importantDocument.png')}
                    style={commonStyles.Icon}
                  />
                </View>
                <Text style={commonStyles.IconsTitleText}>{t("ImportantDocuments")}</Text>
              </TouchableOpacity> */}

            </View>
            
          </View>

          {/* Contact */}
          <Text style={commonStyles.HeaderText}>{t("Contact")}</Text>
          <View style={styles.Section}>
            <View style={styles.IconsRow}>
              <TouchableOpacity
                style={styles.ClickableIcons}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("InstallersScreen")}
              >
                <View style={commonStyles.IconBackground}>
                  <Image
                    source={require('../../assets/icons/ic_Installer.png')}
                    style={commonStyles.Icon}
                  />
                </View>
                <Text style={commonStyles.IconsTitleText}>{t("Installers")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.ClickableIcons}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("ContactUsScreen")}
              >
                <View style={commonStyles.IconBackground}>
                  <Image
                    source={require('../../assets/icons/ic_contactUs.png')}
                    style={commonStyles.Icon}
                  />
                </View>
                <Text style={commonStyles.IconsTitleText}>{t("ContactUs")}</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  InnerView: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingBottom: 16, // Adjust as needed
  },
  ImageSlider: {
    flex: 1,
  },
  Section: {
    flex: 1,
    marginBottom: 8,
    justifyContent: 'center',
    alignContent: 'center',
  },
  IconsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  ClickableIcons: {
    alignItems: 'center',
    margin: 14
  },
})
