import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import InstallersScreen from './screens/InstallersScreen';
import TrackApplicationScreen from './screens/TrackApplicationScreen';
import CalculateSavingsScreen from './screens/CalculateSavingsScreen';
import HomeScreen from './screens/HomeScreen';
import CalculateSavingsResultScreen from './screens/CalculateSavingsResultScreen';
import TrackApplicationResultScreen from './screens/TrackApplicationResultScreen';
import { colors } from '../assets/styles/commonColors';
import { Dimensions, Image, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ContactUsScreen from './screens/ContactUsScreen';
import KnowAboutSolar from './screens/KnowAboutSolar';
import commonStyles from '../assets/styles/commonStyles';
import Orientation from 'react-native-orientation-locker'
import ImportantDocumentScreen from './screens/ImportantDocumentScreen';
import { LanguageProvider } from './context/AppContext';
//For Language
import { useTranslation } from 'react-i18next';
import { useLanguage } from './context/AppContext';
import { Button } from 'react-native-paper';

//To Implement this install these packages
//npm install @react-navigation/native
//npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view


const Stack = createStackNavigator()

const App = () => {

  StatusBar.setBackgroundColor(colors.primary)

  const { t } = useTranslation()
  const { changeLanguage } = useLanguage()

  const handleChangeLanguage = async (lng: string) => {
    changeLanguage(lng);
    setModalVisible(false)
  }

  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    Orientation.lockToPortrait()
  }, [])

  return (
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: t("Home"),
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerTintColor: 'white',
            headerRight: () => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => setModalVisible(true)}
                >
                  <Image
                    source={require('../assets/icons/ic_language.png')}
                    style={commonStyles.TopBarIcon}
                    tintColor={'white'}
                  />
                </TouchableOpacity>
              )
            }
          }}
        >
        </Stack.Screen>

        <Stack.Screen
          name="InstallersScreen"
          component={InstallersScreen}
          options={{
            title: t("Installers"),
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerTintColor: 'white'
          }}
        >
        </Stack.Screen>

        <Stack.Screen
          name="TrackApplicationScreen"
          component={TrackApplicationScreen}
          options={{
            title: t("TrackApplication"),
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerTintColor: 'white'
          }}
        >
        </Stack.Screen>

        <Stack.Screen
          name="CalculateSavingScreen"
          component={CalculateSavingsScreen}
          options={{
            title: t("CalculateSavingsScreen"),
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerTintColor: 'white'
          }}
        >
        </Stack.Screen>

        <Stack.Screen
          name="CalculateSavingResultScreen"
          component={CalculateSavingsResultScreen}
          options={{
            title: t("Estimate"),
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerTintColor: 'white'
          }}
        >
        </Stack.Screen>

        <Stack.Screen
          name="TrackApplicationResultScreen"
          component={TrackApplicationResultScreen}
          options={{
            title: t("Application Status"),
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerTintColor: 'white'
          }}
        >
        </Stack.Screen>

        <Stack.Screen
          name="ContactUsScreen"
          component={ContactUsScreen}
          options={{
            title: t("ContactUs"),
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerTintColor: 'white'
          }}
        >
        </Stack.Screen>

        <Stack.Screen
          name="KnowAboutSolar"
          component={KnowAboutSolar}
          options={{
            title: t("RoofTopSolar"),
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerTintColor: 'white'
          }}
        >
        </Stack.Screen>

        {/* <Stack.Screen
          name="ImportantDocuments"
          component={ImportantDocumentScreen}
          options={{
            title: t("ImportantDocumentsScreen"),
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerTintColor: 'white'
          }}
        >
        </Stack.Screen> */}

      </Stack.Navigator>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={commonStyles.ModalContainer}>
          <View style={commonStyles.ModalContent}>
            <Text style={commonStyles.ModalTitle}>Select Language</Text>
            <Button
              mode='text'
              textColor={colors.buttonBackground}
              onPress={() => handleChangeLanguage('en')}
            >English
            </Button>
            <Button 
            mode='text'
            textColor={colors.buttonBackground}
            onPress={() => handleChangeLanguage('hin')} 
            >हिंदी
            </Button>
            <Button 
            mode='text'
            textColor='red'
            onPress={() => setModalVisible(false)} 
            >Close
            </Button>
          </View>
        </View>
      </Modal>

    </NavigationContainer >
  )
}

export default () => (
  <LanguageProvider>
    <App />
  </LanguageProvider>
)
