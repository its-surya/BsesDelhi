import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Slider from '@react-native-community/slider'
import { Button, TextInput } from 'react-native-paper'
import { ScrollView } from 'react-native'
import { colors } from '../../assets/styles/commonColors'
import commonStyles, { rupees } from '../../assets/styles/commonStyles'
import { apiWithHeaders } from '../api/API_Instance'
import { API_ENDPOINTS } from '../api/ApiConfig'


interface CalculationData {
    id: number;
    payback: number;
    estimated_cost_subsidy: number;
    avg_gen: number;
    estimated_cost: number;
    cost: number;
    pv_capacity: number;
    maximum_capacity: number;
    min_capacity: number;
    state_subsidy: string;
    central_subsidy: string;
    totalSubsidy: string;
}

const CalculateSavingsResultScreen = ({ route }: { route: any }) => {


    const { calculationData } = route.params
    const [CalculationData, setCalculationData] = useState<CalculationData>(calculationData)
    //console.log(calculationData)

    const [sliderValue, setSliderValue] = useState(CalculationData.pv_capacity)
    const [KWvalue, setKWvalue] = useState(CalculationData.pv_capacity.toString())

    const [isLoading, setIsLoading] = useState(false)

    //console.log(sliderValue)

    const updatedCalculationAPI = async () => {
        try {
            const response = await apiWithHeaders(API_ENDPOINTS.getUpdatedCalculations, {
                "id": CalculationData.id,
                "pv_capacity": KWvalue
            })
            if (response.data.success) {
                //setCalculationData(response.data)
                setIsLoading(false)
                console.log(response.data)
                setCalculationData(response.data.data[0])
            } else {
                console.log("API request unsuccessful:", response.data.message);
            }
        } catch (error) {
            console.log("Error fetching installers:", error)
        }
    }

    const handelUpdate = () => {
        setIsLoading(true)
        updatedCalculationAPI()
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {isLoading ? (
                <ActivityIndicator size="large" color={colors.primary} style={commonStyles.loader} />
            ) : (
                <View style={commonStyles.Container}>

                    <ScrollView style={{ flex: 1 }}>

                        <Text style={commonStyles.HeaderText}>
                            {CalculationData.pv_capacity}kW Rooftop solar PV
                        </Text>

                        <View style={styles.CardRow}>

                            <View style={styles.modifiedCard}>
                                <View style={{ alignItems: 'center' }}>
                                    <Icon name='rupee' size={30} color={'green'} style={styles.CardIcon} />
                                </View>

                                <Text style={styles.CardSubText}>{rupees} {CalculationData.estimated_cost}</Text>

                                <View style={styles.CardTextView}>
                                    <Text style={styles.CardText}>Approx.{"\n"}System Cost</Text>
                                </View>

                            </View>

                            <View style={styles.modifiedCard}>

                                <View style={{ alignItems: 'center' }}>
                                    <Icon name='sun-o' size={30} color={'orange'} style={styles.CardIcon} />
                                </View>

                                <Text style={styles.CardSubText}>{CalculationData.avg_gen} kW/m</Text>

                                <View style={styles.CardTextView}>
                                    <Text style={styles.CardText}>Approx.{"\n"}Solar Generation</Text>
                                </View>

                            </View>

                        </View>

                        <View style={styles.CardRow}>

                            <View style={styles.modifiedCard}>
                                <View style={{ alignItems: 'center' }}>
                                    <Icon name='circle-o-notch' size={30} color={'black'} style={styles.CardIcon} />
                                </View>

                                <Text style={styles.CardSubText}>{CalculationData.payback} Years</Text>

                                <View style={styles.CardTextView}>
                                    <Text style={styles.CardText}>Estimated{"\n"}Payback</Text>
                                </View>

                            </View>

                            <View style={{ flex: 1, margin: 10 }}>
                                {/* Empty View */}
                            </View>

                        </View>

                        <Text style={[styles.DirectionsText, commonStyles.DescriptionText]}>

                            Solar Installation are sized in KW, customize solar PV capacity
                            by moving the green pointer

                        </Text>

                        <Slider
                            style={{ marginTop: 10 }}
                            value={sliderValue}
                            minimumValue={CalculationData.min_capacity}
                            maximumValue={CalculationData.maximum_capacity}
                            minimumTrackTintColor={colors.buttonBackground} // Change this to the color you desire for the minimum track
                            maximumTrackTintColor={colors.DarkGrey}
                            thumbTintColor={colors.buttonBackground}
                            step={1}
                            onValueChange={(value) => {
                                setSliderValue(value)
                                setKWvalue(value.toString())
                            }}
                        />

                        <Text style={[styles.DirectionsText, commonStyles.DescriptionText]}>
                            The PV system will cover about 100% of your electricity uses
                        </Text>

                        <View style={styles.UpdateRow}>

                            <TextInput
                                style={[styles.UpdateTextInput, commonStyles.TextInputs]}
                                mode='outlined'
                                label='Capacity (KW)'
                                value={KWvalue}
                                theme={{ colors: { primary: colors.textInputBackground } }}
                                onChangeText={(text) => setKWvalue(text)}
                            />

                            <Button
                                mode='contained'
                                style={styles.UpdateButton}
                                onPress={() => handelUpdate()}
                            >Update
                            </Button>
                        </View>

                        {/* Costing Details */}
                        <View style={{ marginTop: 10 }}>
                            <View style={styles.CostingView}>
                                <Text style={{ color: colors.BlackText }}>Cost</Text>
                                <Text style={{ color: colors.BlackText }}>{rupees} {CalculationData.cost}</Text>
                            </View>

                            <View style={{ borderWidth: 1, borderColor: 'lightgrey', marginVertical: 5 }}></View>

                            <View style={styles.CostingView}>
                                <Text style={{ color: colors.BlackText }}>State Subsidy</Text>
                                <Text style={{ color: colors.BlackText }}>{rupees} {CalculationData.state_subsidy}</Text>
                            </View>

                            <View style={{ borderWidth: 1, borderColor: 'lightgrey', marginVertical: 5 }}></View>

                            <View style={styles.CostingView}>
                                <Text style={{ color: colors.BlackText }}>Central Subsidy</Text>
                                <Text style={{ color: colors.BlackText }}>{rupees} {CalculationData.central_subsidy}</Text>
                            </View>

                            <View style={{ borderWidth: 1, borderColor: 'lightgrey', marginVertical: 5 }}></View>

                            <View style={styles.CostingView}>
                                <Text style={{ color: colors.BlackText }}>Cost with Subsidy</Text>
                                <Text style={{ color: colors.BlackText }}>{rupees} {CalculationData.estimated_cost_subsidy}</Text>
                            </View>
                        </View>


                        {/* <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='phone' size={20} color={'black'} />
                            <Text style={
                                { marginStart: 20, color: colors.BlackText }
                            }>
                                9999999999
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <Icon name='wechat' size={20} color={'black'} />
                            <Text style={{ marginStart: 15, color: colors.BlackText }}>-</Text>
                        </View>
                    </View> */}

                        <Text style={[styles.DirectionsText, commonStyles.DescriptionText, { marginTop: 25 }]}>
                            This lead is created and sent to all the empanelled installer unique no.
                            is SG4409 for further tracking.
                        </Text>


                        {/* <Button
                        style={commonStyles.PrimaryButton}
                        mode='contained'
                    >I want to Apply
                    </Button> */}


                        <Text style={[styles.DirectionsText, commonStyles.DescriptionText]}>
                            (You can apply through Empanelled installer, Nearest Discom Office
                            or Directly through the AHA Solar App)
                        </Text>


                    </ScrollView>

                </View>

            )}

        </SafeAreaView>
    )
}

export default CalculateSavingsResultScreen

const styles = StyleSheet.create({
    modifiedCard: {
        flex: 1,
        margin: 10,
        backgroundColor: colors.background,
        borderRadius: 8,
        elevation: 3,
        //For IOS
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowRadius: 2,
    },
    CardRow: {
        flexDirection: 'row',
        marginTop: 10
    },
    CardText: {
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 8,
        color: colors.BlackText
    },
    CardTextView: {
        backgroundColor: colors.LightGrey,
    },
    CardIcon: {
        margin: 10,
    },
    CardSubText: {
        margin: 8,
        fontSize: 16,
        textAlign: 'center',
        color: colors.BlackText
    },
    DirectionsText: {
        textAlign: 'center',
        marginTop: 8
    },
    UpdateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    UpdateTextInput: {
        width : "65%"
    },
    UpdateButton: {
        width : "30%",
        backgroundColor: colors.buttonBackground
    },
    ApplyButton: {
        backgroundColor: colors.buttonBackground
    },
    CostingView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})