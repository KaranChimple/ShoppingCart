import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, SafeAreaView, FlatList, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { SCREEN_NAMES } from '../../constants';
import { updateCart } from '../actions/updateCart';
import { Loader } from './Loader';


export const CartListPage = ({changeScreen = () => {}}) => {
    const dispatch = useDispatch();
    const data = useSelector(({cart}) => cart.cartList);
    const isLoading = useSelector(({cart}) => cart.loading);
    const error = useSelector(({cart}) => cart.error);

    const updateCartItems = (type = '', item = {}) => {
        switch(type) {
            case 'ADD': {
                dispatch(updateCart(item, "ADD"));
                break;
            }
            case 'SUBTRACT': {
                dispatch(updateCart(item, "SUBTRACT"));
                break;
            }
        }
    }
    
    const renderItem = ({item}) => {
        return (
            <View style={{borderWidth: 1, borderRadius: 8, padding: 8, flexDirection: 'row'}}>
                <Image source={{uri: item.img}} style={{height: 100, width: 80}} resizeMode="contain" />
                <View style={{width: '70%', height: '100%'}}>
                    <Text style={{fontSize: 12}}>{item.name}</Text>
                    <Text style={{fontSize: 12}}>${item.price}</Text>
                    <Text style={{fontSize: 12}}>No Of Items: {item.count}</Text>
                    <Text style={{fontSize: 12}}>Total: ${(item.price)*(item.count)}</Text>
                    <View style={{borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 60}}>
                        <TouchableOpacity onPress={() => updateCartItems('SUBTRACT', item)} style={{ marginRight: 8}}>
                            <Icon name="minus" size={16} />
                        </TouchableOpacity>
                        <Text>{item.count}</Text>
                        <TouchableOpacity onPress={() => updateCartItems('ADD', item)} style={{ marginLeft: 8}}>
                            <Icon name="plus" size={16} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    if(isLoading) {
        return (
            <Loader />
        )
    }

    let myTotal = 0;
    data.forEach(item => {
        myTotal = myTotal + (item.price * item.count);
    })
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                <TouchableOpacity onPress={() => changeScreen(SCREEN_NAMES.LIST)}>
                    <Icon name="arrow-left" style={{marginRight: 8}} size={25} />
                </TouchableOpacity>
                <Text>My Cart</Text>
            </View>
            <FlatList
              data={data}  
              renderItem={renderItem}
              ItemSeparatorComponent={ () => <View style={{margin: 16}} />}
            />

            <Text>Total: ${myTotal.toFixed(2)}</Text>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      width: '100%',
      padding: 10
    },
  });
