import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { Button, TextInput } from 'react-native-paper'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import commonStyles, { LabelWithAsterisk } from '../../assets/styles/commonStyles'
import { colors } from '../../assets/styles/commonColors'
import { API_ENDPOINTS, BASE_RESPONSE } from '../api/ApiConfig'
//For Language
import { useTranslation } from 'react-i18next';
import { apiWithHeaders } from '../api/API_Instance'


interface CalculateSavingsScreenProps {
  navigation: any
}

interface BillingData {
  list: apiData[]
}

interface DiscomData {
  count: number,
  list: apiData[]
}

//For selected Billing and Discom object 
interface apiData {
  id: number,
  name: string
}

// interface CalculationData {
//   id: number;
//   payback: number;
//   estimated_cost_subsidy: number;
//   avg_gen: number;
//   estimated_cost: number;
//   cost: number;
//   pv_capacity: number;
//   maximum_capacity: number;
//   min_capacity: number;
//   state_subsidy: string;
//   central_subsidy: string;
//   totalSubsidy: string;
// }

const CalculateSavingsScreen = ({ navigation }: CalculateSavingsScreenProps) => {

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getBilling()
    getDiscoms()
  }, [])

  const [selectedDiscom, setSelectedDiscom] = useState<apiData | null>(null)
  const [consumerNumber, setConsumerNumber] = useState("")
  const [rooftopArea, setRooftopArea] = useState("")
  const [billing, setBilling] = useState<apiData>()
  const [averageBill, setAverageBill] = useState("")
  const [averageUnitConsumed, setAverageUnitConsumed] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [email, setEmail] = useState("")

  const [consumerNumberError, setConsumerNumberError] = useState(false)
  const [rooftopAreaError, setRooftopAreaError] = useState(false)
  const [billingError, setBillingError] = useState(false)
  const [averageBillError, setAverageBillError] = useState(false)
  const [averageUnitConsumedError, setAverageUnitConsumedError] = useState(false)
  const [mobileNumberError, setMobileNumberError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const [isChecked, setIsChecked] = React.useState(false);

  const [billingOptions, setBillingOptions] = useState<BASE_RESPONSE<BillingData>>()
  const [discomOptions, setDiscomOptions] = useState<BASE_RESPONSE<DiscomData>>()
  //const [calculationData, setCalculationData] = useState<BASE_RESPONSE<CalculationData[]>>()

  const { t } = useTranslation()

  const getDiscoms = async () => {
    try {
      const response = await apiWithHeaders(API_ENDPOINTS.getDiscoms, {})
      if (response.data.success) {
        setDiscomOptions(response.data)
      } else {
        console.log("API request unsuccessful:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching installers:", error)
    }
  }

  const getBilling = async () => {
    try {
      const response = await apiWithHeaders(API_ENDPOINTS.getBillings, { "parameterId": 26 })
      if (response.data.success) {
        setBillingOptions(response.data)
      } else {
        console.log("API request unsuccessful:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching installers:", error)
    }
  }

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  }

  const calculationAPI = async () => {
    try {
      const response = await apiWithHeaders(API_ENDPOINTS.getCalculations, {
        // "discom_id": selectedDiscom?.id,
        // "billing_cycle": billing?.id,
        // "consumer_no": "78678578",
        // "area": "500",
        // "avg_monthly_bill": "1502",
        // "mobile": "8085223857",
        // "avg_consumption": 240,
        // "email": "test2@gmail.com"
        "discom_id": selectedDiscom?.id,
        "consumer_no": consumerNumber,
        "area": rooftopArea,
        "billing_cycle": billing?.id,
        "avg_monthly_bill": averageBill,
        "avg_consumption": averageUnitConsumed,
        "mobile": mobileNumber,
        "email": email
      })
      if (response.data.success) {
        //setCalculationData(response.data)
        setIsLoading(false)
        console.log(response.data)
        navigation.navigate("CalculateSavingResultScreen", { calculationData: response.data.data[0] })
      } else {
        console.log("API request unsuccessful:", response.data.message);
      }
    } catch (error) {
      console.log("Error fetching installers:", error)
    }
  }

  const validateAllFields = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!consumerNumber.trim()) {
      setConsumerNumberError(true)
      return
    }
    if (!rooftopArea.trim()) {
      setRooftopAreaError(true)
      return
    }
    if (!billing) {
      setBillingError(true)
      return
    }
    if (!averageBill.trim()) {
      setAverageBillError(true)
      return
    }
    if (!averageUnitConsumed.trim()) {
      setAverageUnitConsumedError(true)
      return
    }
    if (!mobileNumber.trim()) {
      setMobileNumberError(true)
      return
    }
    if (!email.trim()) {
      setEmailError(true)
      return
    } else {
      if(!emailRegex.test(email)){
        setEmailError(true)
        return
      }
    }
    return true
  }

  const handleSubmit = () => {
    if (validateAllFields()) {
      calculationAPI()
      setIsLoading(true)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} style={commonStyles.loader} />
      ) : (

        <View style={commonStyles.Container}>

          <ScrollView style={{ flex: 1 }}>

            <View style={commonStyles.Card}>

              <Dropdown
                //mode='modal'
                labelField="name"
                valueField="id"
                value={selectedDiscom ? selectedDiscom : " "}
                style={styles.Dropdown}
                placeholder={t('SelectDiscom')}
                itemTextStyle={{ color: 'black' }}
                selectedTextStyle={styles.DropdownText}
                placeholderStyle={styles.DropdownText}
                data={discomOptions?.data?.list || []}
                onChange={(item) => setSelectedDiscom(item)}
              />

              {selectedDiscom != null && (
                <>

                  {/* Consumer Number */}
                  < TextInput
                    mode='outlined'
                    style={commonStyles.TextInputs}
                    label={<LabelWithAsterisk text={t("ConsumerNumber")} />}
                    //inputMode='numeric'
                    error={consumerNumberError}
                    value={consumerNumber}
                    maxLength={100}
                    theme={{ colors: { primary: colors.textInputBackground } }}
                    onChangeText={text => {
                      setConsumerNumber(text)
                      setConsumerNumberError(false)
                    }}
                  />

                  {consumerNumberError && (
                    <Text style={commonStyles.ErrorText}>{t("consumerNoError")}</Text>
                  )}

                  {/* Rooftop Area */}
                  <TextInput
                    mode='outlined'
                    style={commonStyles.TextInputs}
                    label={<LabelWithAsterisk text={t("RooftopArea")} />}
                    inputMode='numeric'
                    error={rooftopAreaError}
                    value={rooftopArea}
                    maxLength={100}
                    theme={{ colors: { primary: colors.textInputBackground } }}
                    onChangeText={text => {
                      setRooftopArea(text)
                      setRooftopAreaError(false)
                    }}
                  />

                  {rooftopAreaError && (
                    <Text style={commonStyles.ErrorText}>{t("rooftopAreaError")}</Text>
                  )}

                  {/* Billing */}
                  <Dropdown
                    labelField="name"
                    valueField="id"
                    value={billing ? billing : " "}
                    style={styles.Dropdown}
                    placeholder={t('SelectBilling')}
                    itemTextStyle={{ color: 'black' }}
                    selectedTextStyle={styles.DropdownText}
                    placeholderStyle={styles.DropdownText}
                    data={billingOptions?.data?.list || []}
                    onChange={(item) => {
                      setBilling(item)
                      setBillingError(false)
                    }}
                  />

                  {billingError && (
                    <Text style={commonStyles.ErrorText}>{t("billingError")}</Text>
                  )}

                  {/* Average Bill */}
                  <TextInput
                    mode='outlined'
                    style={commonStyles.TextInputs}
                    label={<LabelWithAsterisk text={t("AverageBill")} />}
                    inputMode='numeric'
                    error={averageBillError}
                    value={averageBill}
                    maxLength={100}
                    theme={{ colors: { primary: colors.textInputBackground } }}
                    onChangeText={text => {
                      setAverageBill(text)
                      setAverageBillError(false)
                    }}
                  />

                  {averageBillError && (
                    <Text style={commonStyles.ErrorText}>{t("averageBillError")}</Text>
                  )}

                  {/* Average units Consumed */}
                  <TextInput
                    mode='outlined'
                    style={commonStyles.TextInputs}
                    label={<LabelWithAsterisk text={t("AverageUnitsConsumed")} />}
                    inputMode='numeric'
                    error={averageUnitConsumedError}
                    value={averageUnitConsumed}
                    maxLength={100}
                    theme={{ colors: { primary: colors.textInputBackground } }}
                    onChangeText={text => {
                      setAverageUnitConsumed(text)
                      setAverageUnitConsumedError(false)
                    }}
                  />

                  {averageUnitConsumedError && (
                    <Text style={commonStyles.ErrorText}>{t("averageUnitConsumedError")}</Text>
                  )}

                  {/* Mobile Number */}
                  <TextInput
                    mode='outlined'
                    style={commonStyles.TextInputs}
                    label={<LabelWithAsterisk text={t("MobileNumber")} />}
                    inputMode='numeric'
                    error={mobileNumberError}
                    value={mobileNumber}
                    maxLength={10}
                    theme={{ colors: { primary: colors.textInputBackground } }}
                    onChangeText={text => {
                      setMobileNumber(text)
                      setMobileNumberError(false)
                    }}
                  />

                  {mobileNumberError && (
                    <Text style={commonStyles.ErrorText}>{t("mobileNoError")}</Text>
                  )}

                  {/* Email */}
                  <TextInput
                    mode='outlined'
                    style={commonStyles.TextInputs}
                    label={t("Email")}
                    //inputMode='numeric'
                    error={emailError}
                    value={email}
                    maxLength={100}
                    theme={{ colors: { primary: colors.textInputBackground } }}
                    onChangeText={text => {
                      setEmail(text)
                      setEmailError(false)
                    }}
                  />

                  {emailError && (
                    <Text style={commonStyles.ErrorText}>{t("emailError")}</Text>
                  )}

                  <Button
                    mode='contained'
                    style={commonStyles.PrimaryButton}
                    labelStyle={{ color: colors.whiteText }}
                    onPress={() => handleSubmit()}
                  >
                    {t("Submit")}
                  </Button>

                  <View style={{ flexDirection: "row", alignItems: 'flex-start' }}>
                    <BouncyCheckbox
                      onPress={handleCheckboxToggle}
                    />
                    <Text style={commonStyles.DescriptionText}>{t("TandCs")}</Text>
                  </View>

                </>
              )}

            </View>

          </ScrollView>

        </View>
      )}

    </SafeAreaView>
  )
}

export default CalculateSavingsScreen

const styles = StyleSheet.create({
  Dropdown: {
    elevation: 4,
    backgroundColor: colors.background,
    borderRadius: 4,
    borderWidth: 1,
    padding: 4,
    margin: 10
  },
  DropdownText: {
    color: colors.BlackText,
    marginHorizontal: 10
  }
})