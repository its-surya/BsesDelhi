import { ActivityIndicator, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Accordion from 'react-native-collapsible/Accordion';
import { Button, TextInput } from 'react-native-paper';
import { colors } from '../../assets/styles/commonColors';
import commonStyles, { LabelWithAsterisk } from '../../assets/styles/commonStyles';
//For Language
import { useTranslation } from 'react-i18next';
import { API_ENDPOINTS, BASE_RESPONSE } from '../api/ApiConfig';
import { apiWithHeaders } from '../api/API_Instance';

interface OfficersList {
    title: string
    list: Officer[]
}

interface Officer {
    id: number;
    company: string;
    name: string;
    designation: string;
    department: string;
    contact_number: string;
    email: string;
    portal_nodal_officer: number;
}

interface sendResponse {
    ID: number
}

const ContactUsScreen = () => {

    // useEffect(() => {
    //     getOfficers()
    // }, [])

    const [isLoading, setIsLoading] = useState(true)

    const [modalVisible, setModalVisible] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [message, setMessage] = useState("")

    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [subjectError, setSubjectError] = useState(false)
    const [mobileNumberError, setMobileNumberError] = useState(false)
    const [messageError, setMessageError] = useState(false)

    const { t } = useTranslation()

    const [sendResponseData, setSendResponseData] = useState<BASE_RESPONSE<sendResponse[]>>()


    const sendQueryAPI = async () => {
        try {
            const response = await apiWithHeaders(API_ENDPOINTS.sendQuery, {
                // "name": "Anurag Dubey",
                // "email": "anurag12@ahasolar.in",
                // "subject": "I want to raise an query",
                // "mobile": "9893654192",
                // "message": "This is an test!",
                // //"ipaddress": "127.0.0.1",
                // "device": "mobile"
                "name": name,
                "email": email,
                "subject": subject,
                "mobile": mobileNumber,
                "message": message,
                //"ipaddress": "127.0.0.1",
                "device": "mobile"
            })
            if (response.data.success) {
                setSendResponseData(response.data)
                console.log(response.data)
                setModalVisible(true)
            } else {
                console.log("API request unsuccessful:", response.data.message);
            }
        } catch (error) {
            console.log("Error fetching installers:", error)
        }
    }



    const handelSend = async () => {
        if (validateAllFields()) {
            await sendQueryAPI()
            clearAllFields()
        }
    }

    const validateAllFields = () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!name.trim()) {
            setNameError(true)
            return
        }
        if (!email.trim()) {
            setEmailError(true)
            return
        } else {
            if (!emailRegex.test(email)) {
                setEmailError(true)
                return
            }
        }
        if (!subject.trim()) {
            setSubjectError(true)
            return
        }
        if (!mobileNumber.trim()) {
            setMobileNumberError(true)
            return
        }
        if (!message.trim()) {
            setMessageError(true)
            return
        }
        return true
    }

    const clearAllFields = () => {
        setName("")
        setEmail("")
        setSubject("")
        setMobileNumber("")
        setMessage("")
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* {isLoading ? (
                <ActivityIndicator size="large" color={colors.primary} style={commonStyles.loader} />
            ) : ( */}

            <ScrollView
                style={commonStyles.Container}
                contentContainerStyle={{ flexGrow: 1 }}
            >

                {/* <Accordion
                        sections={officersData?.data || []}
                        activeSections={activeSections}
                        renderHeader={renderHeader}
                        renderContent={renderContent}
                        onChange={setActiveSections}
                    /> */}


                <View style={styles.FormContainer}>

                    <Text style={styles.FormHeader}>
                        <Text style={{ fontWeight: 'bold' }}>{t("Write")} </Text>
                        {t("ContactUsDescription")}
                    </Text>

                    <TextInput
                        mode='outlined'
                        style={commonStyles.TextInputs}
                        label={<LabelWithAsterisk text={t("Name")} />}
                        //inputMode='numeric'
                        error={nameError}
                        value={name}
                        maxLength={100}
                        theme={{ colors: { primary: colors.textInputBackground } }}
                        onChangeText={text => {
                            setName(text)
                            setNameError(false)
                        }}
                    />

                    {nameError && (
                        <Text style={commonStyles.ErrorText}>{t("nameError")}</Text>
                    )}

                    <TextInput
                        mode='outlined'
                        style={commonStyles.TextInputs}
                        label={<LabelWithAsterisk text={t("Email")} />}
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

                    <TextInput
                        mode='outlined'
                        style={commonStyles.TextInputs}
                        label={<LabelWithAsterisk text={t("Subject")} />}
                        //inputMode='numeric'
                        error={subjectError}
                        value={subject}
                        maxLength={100}
                        theme={{ colors: { primary: colors.textInputBackground } }}
                        onChangeText={text => {
                            setSubject(text)
                            setSubjectError(false)
                        }}
                    />

                    {subjectError && (
                        <Text style={commonStyles.ErrorText}>{t("subjectError")}</Text>
                    )}

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

                    <TextInput
                        mode='outlined'
                        style={commonStyles.TextInputs}
                        label={<LabelWithAsterisk text={t("Message")} />}
                        //inputMode='numeric'
                        error={messageError}
                        value={message}
                        multiline
                        numberOfLines={4}
                        maxLength={100}
                        theme={{ colors: { primary: colors.textInputBackground } }}
                        onChangeText={text => {
                            setMessage(text)
                            setMessageError(false)
                        }}
                    />

                    {messageError && (
                        <Text style={commonStyles.ErrorText}>{t("subjectError")}</Text>
                    )}

                    <Button
                        style={commonStyles.PrimaryButton}
                        mode='contained'
                        onPress={() => handelSend()}
                    >{t("Send")}
                    </Button>

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
                                <Text style={commonStyles.ModalTitle}>Query Sent Successfully</Text>
                                <Button
                                    mode='contained'
                                    style={commonStyles.PrimaryButton}
                                    onPress={() => setModalVisible(false)}
                                >OK
                                </Button>
                            </View>
                        </View>
                    </Modal>


                </View>

            </ScrollView>
            {/* )} */}

        </SafeAreaView>
    );
}

export default ContactUsScreen

const styles = StyleSheet.create({
    officerContainer: {
        backgroundColor: 'white',
        elevation: 3,
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        //For IOS 
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowRadius: 2,
    },
    officerRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    OfficerLabel: {
        width: 100,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        color: colors.BlackText
    },
    OfficerValue: {
        flex: 1,
        fontSize: 14,
        textAlign: 'left',
        color: colors.BlackText
    },
    FormContainer: {
        backgroundColor: colors.background,
        borderRadius: 8
    },
    FormHeader: {
        fontSize: 24,
        margin: 16,
        color: colors.BlackText
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
});
