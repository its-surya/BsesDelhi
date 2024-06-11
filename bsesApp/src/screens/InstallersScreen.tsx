import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '../../assets/styles/commonColors'
import commonStyles from '../../assets/styles/commonStyles'
import { apiWithHeaders } from '../api/API_Instance'
import { API_ENDPOINTS, BASE_RESPONSE } from '../api/ApiConfig'

interface InstallerData {
    list: Installer[]
}

interface Installer {
    id: number
    installer_name: string
    address: string | null
    city: string | null
    state: string | null
    email: string | null
    mobile: string
    scheme_name: string | null
    category_name: string | null
}

export default function InstallersScreen() {

    const [search, setSearch] = useState("")
    // If Direct object comes add [] like <BASE_RESPONSE<InstallerData[]>>
    const [installersData, setInstallersData] = useState<BASE_RESPONSE<InstallerData>>();
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        getInstallers();
    }, []);

    const getInstallers = async () => {
        try {
            const response = await apiWithHeaders(
                API_ENDPOINTS.getInstallers,
                { "deviceType": "mobile" }
            )
            if (response.data.success) {
                setInstallersData(response.data);
                setIsLoading(false)
            } else {
                console.log("API request unsuccessful:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching installers:", error);
        }
    }

    const filteredData = installersData?.data?.list.filter(item =>
        item.installer_name.toLowerCase().includes(search.toLowerCase())
    );

    const renderItem = ({ item }: { item: Installer }) => (
        <View style={styles.modifiedCard}>
            <View style={styles.cardTitle}>
                <Text style={commonStyles.HeaderText}>{item.installer_name}</Text>
            </View>
            <View style={{ padding: 8 }}>
                <Text style={{ color: colors.BlackText }}>
                    <Text style={{ fontWeight: 'bold' }}>Scheme Name : </Text>
                    {item.scheme_name}
                </Text>
                <Text style={{ marginTop: 4, color: colors.BlackText }}>
                    <Text style={{ fontWeight: 'bold' }}>Category : </Text>
                    {item.category_name}
                </Text>
            </View>
            <View style={{
                padding: 8,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline'
            }}>
                <Text style={{ flex: 4, color: colors.BlackText }}>{item.address}</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed email")}
                        style={{ flex: 1 }}>
                        <Icon name='email' size={21} color={'#F9b120'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed Call")}
                        style={{ flex: 1 }}>
                        <Icon name='phone-dial' size={21} color={'green'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: colors.background, flex: 1 }}>
                <TextInput
                    mode='outlined'
                    style={commonStyles.TextInputs}
                    label="Search"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    theme={{
                        roundness: 20,
                        colors: { primary: colors.textInputBackground }
                    }}
                />
                {isLoading ? (
                    <ActivityIndicator size="large" color={colors.primary} style={commonStyles.loader} />
                ) : (
                    <FlatList
                        data={filteredData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    modifiedCard: {
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
    cardTitle: {
        backgroundColor: colors.LightGrey,
        padding: 6,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
})
