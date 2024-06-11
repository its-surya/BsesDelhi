import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import commonStyles from '../../assets/styles/commonStyles'
import { colors } from '../../assets/styles/commonColors'
import { API_ENDPOINTS } from '../api/ApiConfig'
import { apiWithHeaders } from '../api/API_Instance'
//For Language
import { useTranslation } from 'react-i18next';

interface TrackApplicationScreenProps {
    navigation: any
}

// interface ApplicationData {
//     result: Result
// }

// interface Result {
//     stages: Stages[]
//     consumer_name: string
//     application_data: ApplicationInfo
//     last_comment: Comments
//     all_comments: Comments[]
// }

// interface Stages {
//     stage_no: number
//     stage_title: string
//     stage_flag: number
// }

// interface ApplicationInfo {
//     key: string
//     text: string
// }

// interface Comments {
//     created: string
// }

const TrackApplicationScreen = ({ navigation }: TrackApplicationScreenProps) => {

    const { t } = useTranslation()

    const [isLoading, setIsLoading] = useState(false)

    const [applicationNo, setApplicationNo] = useState("")
    const [consumerNo, setConsumerNo] = useState("")
    const [mobileNo, setMobileNo] = useState("")

    const [applicationNoError, setApplicationNoError] = useState(false)
    const [consumerNoError, setConsumerNoError] = useState(false)
    const [mobileNoError, setMobileNoError] = useState(false)

    // const [applicationData, setApplicationData] = useState<BASE_RESPONSE<ApplicationData>>()

    const TrackApplicationAPI = async () => {
        try {
            const response = await apiWithHeaders(API_ENDPOINTS.getApplication, {
                // "application_no": "GUJ/P2/19-20/RT/RES/10000001",
                // "consumer_no": "23432534534",
                // "consumer_mobile": "9157646320",
                // "deviceType": "mobile"
                "application_no": applicationNo,
                "consumer_no": consumerNo,
                "consumer_mobile": mobileNo,
                "deviceType": "mobile"
            })
            if (response.data.success) {
                //setApplicationData(response.data)
                setIsLoading(false)
                console.log(response.data)
                navigation.navigate("TrackApplicationResultScreen", { applicationData: response.data })
            } else {
                console.log("API request unsuccessful:", response.data.message);
            }
        } catch (error) {
            console.log("Error fetching installers:", error)
        }
    }

    const clearFields = () => {
        setApplicationNo("")
        setConsumerNo("")
        setMobileNo("")
    }

    const handelSearch = () => {
        if (validateAllFields()) {
            TrackApplicationAPI()
            setIsLoading(true)
        }
    }

    const validateAllFields = () => {
        if (!applicationNo.trim()) {
            setApplicationNoError(true)
            return
        }
        if (!consumerNo.trim()) {
            setConsumerNoError(true)
            return
        }
        if (!mobileNo.trim()) {
            setMobileNoError(true)
            return
        }
        return true
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {isLoading ? (
                <ActivityIndicator size="large" color={colors.primary} style={commonStyles.loader} />
            ) : (

                <ScrollView style={commonStyles.Container}>

                    <View style={commonStyles.Card}>

                        {/* Application Number */}
                        <TextInput
                            mode='outlined'
                            style={commonStyles.TextInputs}
                            label={t('ApplicationNumber')}
                            //inputMode='numeric'
                            error={applicationNoError}
                            value={applicationNo}
                            maxLength={100}
                            theme={{ colors: { primary: colors.textInputBackground } }}
                            onChangeText={text => {
                                setApplicationNo(text)
                                setApplicationNoError(false)
                            }}
                        />
                        {applicationNoError && (
                            <Text style={commonStyles.ErrorText}>{t("applicationNoError")}</Text>
                        )}

                        {/* Consumer Number */}
                        <TextInput
                            mode='outlined'
                            style={commonStyles.TextInputs}
                            label={t("ConsumerNumber")}
                            value={consumerNo}
                            inputMode='numeric'
                            error={consumerNoError}
                            maxLength={100}
                            theme={{ colors: { primary: colors.textInputBackground } }}
                            onChangeText={text => {
                                setConsumerNo(text)
                                setConsumerNoError(false)
                            }}
                        />

                        {consumerNoError && (
                            <Text style={commonStyles.ErrorText}>{t("consumerNoError")}</Text>
                        )}

                        {/* Mobile Number */}
                        <TextInput
                            mode='outlined'
                            style={commonStyles.TextInputs}
                            label={t("MobileNumber")}
                            inputMode='numeric'
                            error={mobileNoError}
                            value={mobileNo}
                            maxLength={10}
                            theme={{ colors: { primary: colors.textInputBackground } }}
                            onChangeText={text => {
                                setMobileNo(text)
                                setMobileNoError(false)
                            }}
                        />

                        {mobileNoError && (
                            <Text style={commonStyles.ErrorText}>{t("mobileNoError")}</Text>
                        )}

                        <View style={styles.buttonContainer}>
                            <Button
                                mode='contained'
                                style={[commonStyles.RowButtons,
                                { backgroundColor: 'white' },
                                { borderWidth: 1 },
                                { borderColor: 'black' }]}
                                labelStyle={{ color: colors.primary }}
                                onPress={clearFields}
                            >
                                {t("Clear")}
                            </Button>

                            <Button
                                mode='contained'
                                style={commonStyles.RowButtons}
                                labelStyle={{ color: colors.whiteText }}
                                onPress={() => handelSearch()}
                            >
                                {t("Search")}
                            </Button>
                        </View>

                        <Text style={[styles.AdditionalTextStyle, commonStyles.DescriptionText]}>
                            {t("TrackApplicationDescription")}
                        </Text>

                    </View>

                </ScrollView>
            )}

        </SafeAreaView>
    )
}

export default TrackApplicationScreen

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    AdditionalTextStyle: {
        marginTop: 15,
    }
})