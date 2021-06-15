import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from './header';
import { useDispatch, useSelector } from "react-redux";
import {getProductStore } from '../reducer/storeReducer';
import { getAllStore } from '../src/API/Api'

const CuaHang = () => {
    const navigation = useNavigation();
    // const [store, setStore] = useState()
    const [idStore, setIdStore] = useState()
    // useEffect(() => {
    //     const getApiStore = async () => {
    //         const result = await getStore()
    //         setStore(result.data)
    //     }
    //     getApiStore()
    // }, [])
    const dispatch = useDispatch();
    const productStore = useSelector((store) => store.storeReducer.productsStore);
    useEffect(() => {
        dispatch(getProductStore());
      }, [])
    const [modalVisible, setModalVisible] = useState(false);
    const renderItem = ({ item }) => (
        <View>
            <TouchableOpacity style={{ width: '95%', height: 130, backgroundColor: 'white', margin: 5, alignSelf: 'center', borderBottomColor: 'silver', borderBottomWidth: 0.4, borderRadius: 8, flexDirection: 'row' }} onPress={() => { setModalVisible(true), setIdStore(item.id) }}>
                <Image
                    source={{ uri: item.image_1 }}
                    style={{
                        width: 100,
                        height: 100,
                        marginLeft: 15,
                        borderRadius: 8,
                        alignSelf: 'center'
                    }}
                />
                <View style={{ justifyContent: 'space-evenly', marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: '#5e5e5e', fontSize: 12, marginTop: 10 }}>THE COFFEE HOUSE</Text>
                    <Text style={{ width: 220, fontSize: 16 }}>{item.address.full_address}</Text>
                    <Text style={{ marginBottom: 10 }}>
                        Cách đây
                <Text> {item.latitude / 5}km</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
    const [Txt, onChangeText] = useState(null);
    return (
        <View>
            <Header />
            <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', height: 70, borderBottomWidth: 0.2, borderBottomColor: 'silver', marginTop: -10 }}>
                <View style={{ width: '70%', height: 45, flexDirection: 'row', alignItems: 'center', backgroundColor: 'silver', borderRadius: 10, marginLeft: 10, borderBottomWidth: 0.3, borderBottomColor: 'grey' }}>
                    <AntDesign name={'search1'} size={20} color={'grey'} style={{ marginLeft: 20 }} />
                    <TextInput
                        style={{
                            width: '70%',
                            backgroundColor: 'silver',
                            fontSize: 18,
                            marginLeft: 10
                        }}
                        onChangeText={onChangeText}
                        value={Txt}
                        placeholder="Nhập tên đườn..."
                    />
                </View>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}} onPress={() => navigation.navigate('Map')}>
                    <Image
                        source={require('../src/Icon/map.png')}
                        style={{
                            width: 30,
                            height: 30,
                            marginLeft: 8
                        }}
                    />
                    <Text style={{ fontWeight: 'bold', marginRight: 8 }}>BẢN ĐỒ</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                ListHeaderComponent={() =>
                    <View style={{ width: '95%', height: 40, backgroundColor: 'silver', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', borderRadius: 10, marginTop: 15, marginBottom: 5 }}>
                        <MaterialCommunityIcons name={'history'} size={20} color={'#2e2e2e'} style={{ marginLeft: 15 }} />
                        <Text style={{ marginLeft: 5, color: '#2e2e2e' }}>CÁC CỬA HÀNG KHÁC</Text>
                    </View>
                }
                data={productStore}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={item => item.id?.toString()}
                style={{
                    height: 545,
                }}
            />
            <Modal visible={modalVisible} animationType={'slide'}>
                <View>
                    <ScrollView style={{ position: 'absolute', height: 750, width: '100%' }} showsVerticalScrollIndicator={false}>
                        {
                            productStore?.map((item, index) => {
                                if (item.id == idStore)
                                    return (
                                        <View key={index}>
                                            <View style={{ width: '100%', height: 350 }}>
                                                <Image
                                                    source={{ uri: item.image_1 }}
                                                    style={{
                                                        width: '100%',
                                                        height: 350,
                                                    }}
                                                />

                                            </View>
                                            < View style={{ width: '100%', height: 'auto', borderWidth: 1, borderColor: '#f2f2f2', justifyContent: 'center' }}>
                                                <Text style={[styles.txt, { marginTop: 20 }]}>THE COFFEE HOUSE</Text>
                                                <Text style={{ fontSize: 21, marginLeft: 10, fontWeight: 'bold', width: '95%' }}>{item.street}</Text>
                                                <Text style={[styles.txt, { marginBottom: 20 }]}>Giờ mở cửa: <Text style={styles.txt}>{item.opening_time} - <Text style={styles.txt}>{item.closing_time}</Text></Text></Text>
                                            </ View>
                                            <View style={{ width: '100%', height: 'auto', }}>
                                                <TouchableOpacity activeOpacity={false} style={styles.itemmodal}>
                                                    <Image
                                                        source={require('../src/Icon/route.png')}
                                                        style={{
                                                            width: 27,
                                                            height: 27,
                                                            margin: 25,
                                                        }}
                                                    />
                                                    <Text style={styles.txtItem}>{item.address.full_address}</Text>
                                                </TouchableOpacity>
                                                <View style={styles.line} />
                                                <TouchableOpacity activeOpacity={false} style={styles.itemmodal}>
                                                    <FontAwesome name={'star'} size={25} color={'grey'} style={{ margin: 25 }} />
                                                    <Text style={styles.txtItem}>Thêm vào danh sách yêu thích</Text>
                                                </TouchableOpacity>
                                                <View style={styles.line} />
                                                <TouchableOpacity activeOpacity={false} style={styles.itemmodal}>
                                                    <AntDesign name={'upload'} size={25} color={'grey'} style={{ margin: 25 }} />
                                                    <Text style={styles.txtItem}>Chia sẻ địa chỉ</Text>
                                                </TouchableOpacity>
                                                <View style={styles.line} />
                                                <TouchableOpacity activeOpacity={false} style={styles.itemmodal}>
                                                    <FontAwesome name={'phone'} size={25} color={'grey'} style={{ margin: 25 }} />
                                                    <Text style={styles.txtItem}>{item.phone}</Text>
                                                </TouchableOpacity>
                                                <View style={styles.line} />
                                            </View>
                                            <View style={{ width: '100%', height: 260 }}>
                                                <Image
                                                    source={require('../src/Image/Map.png')}
                                                    style={{
                                                        width: '95%',
                                                        height: 200,
                                                        alignSelf: 'center',
                                                        marginVertical: 30,
                                                        borderRadius: 10,
                                                    }}
                                                />
                                            </View>
                                            <TouchableOpacity style={{ height: 'auto', width: '100%', alignItems: 'center', borderRadius: 10, marginBottom: 40 }} onPress={() => navigation.navigate('DatMon')}>
                                                <LinearGradient colors={['#5e5e5e', '#fe8f01', '#5e5e5e']} style={{ height: 70, width: '95%', justifyContent: 'center', alignItems: 'center', borderRadius: 7 }} start={{ x: -0.5, y: 0 }} end={{ x: 2, y: 0 }} >
                                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Đặt hàng Pickup</Text>
                                                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>tại cửa hàng này</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </View>
                                    )
                            })
                        }
                    </ScrollView>
                    <View
                        style={{
                            width: 40,
                            height: 2,
                            backgroundColor: 'silver',
                            borderRadius: 100,
                            alignSelf: 'center',
                            marginTop: 10
                        }}
                    />
                    <TouchableOpacity onPress={() => setModalVisible(false)} >
                        <AntDesign name={'closecircle'} size={25} color={'grey'} style={{ alignSelf: 'flex-end', marginRight: 10 }} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default CuaHang

const styles = StyleSheet.create({
    txt:
    {
        color: '#5e5e5e',
        fontSize: 14,
        marginLeft: 10
    },
    itemmodal: {
        flexDirection: 'row',
    },
    txtItem: {
        marginVertical: 20,
        fontSize: 15,
        color: '#5e5e5e',
        alignSelf: 'center',
        width: '75%'
    },
    line: {
        alignSelf: 'flex-end',
        width: '85%',
        height: 1,
        backgroundColor: '#f2f2f2'
    },
})
