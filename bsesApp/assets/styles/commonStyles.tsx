import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { colors } from './commonColors'
import React from 'react';

export const LabelWithAsterisk: React.FC<{ text: string }> = ({ text }) => {
    return (
        <Text style={{ backgroundColor: 'white' }}>
            {text}
            <Text style={{ color: 'red' }}> *</Text>
        </Text>
    )
}

export const rupees = "Rs."

const commonStyles = StyleSheet.create({
    Container: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 8,
        backgroundColor: colors.background
    },
    Card: {
        margin: 10,
        backgroundColor: colors.background,
        borderRadius: 8,
        elevation: 3,
        paddingVertical: 10,
        paddingHorizontal: 10,
        //For IOS
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowRadius: 2,
    },
    PrimaryButton: {
        margin: 20,
        backgroundColor: colors.buttonBackground
    },
    RowButtons: {
        flex: 1,
        backgroundColor: colors.buttonBackground,
        marginHorizontal: 4,
    },
    TextInputs: {
        margin: 10,
        backgroundColor: colors.background
    },
    HeaderText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.BlackText
    },
    IconsTitleText: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 4,
        color: colors.BlackText
    },
    DescriptionText: {
        fontSize: 14,
        color: colors.BlackText
    },
    ErrorText : {
        fontSize : 12,
        color : colors.error,
        marginStart : 10
    },
    NameHeaderText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.BlackText,
        textAlign: 'center'
    },
    Icon: {
        height: 50,
        width: 50,
    },
    IconBackground: {
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 5,
        // For IOS
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowRadius: 2,
    },
    TopBarIcon: {
        height: 35,
        width: 35,
        padding: 8,
        margin: 15
    },
    //Not in Use Just Reference
    Shadow: {
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowRadius: 2,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
      ModalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: Dimensions.get('window').width - 40, // Adjust width as needed
        maxHeight: Dimensions.get('window').height / 2, // Limiting height
        justifyContent: 'center',
        alignItems: 'center',
      },
      ModalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color : colors.DarkGrey
      },
})

export default commonStyles