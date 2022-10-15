import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {View, Text, ActivityIndicator, FlatList, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { getItemList } from '../actions/fetchList';
import { SCREEN_NAMES } from '../../constants';
import { updateCart } from '../actions/updateCart';
import { Loader } from './Loader';

export const ListingPage = ({changeScreen = () => {}}) => {
    const dispatch = useDispatch();
    const data = useSelector(({items}) => items.itemsList);
    const isLoading = useSelector(({items}) => items.loading);
    const error = useSelector(({items}) => items.error);
  
    useEffect(() => {
      dispatch(getItemList());
    }, []);

    const onAddToCartPress = (item) => {
        dispatch(updateCart(item, "ADD"));
        changeScreen(SCREEN_NAMES.CART);
    }

    const renderItem = ({item}) => {
        return (
            <View style={{borderWidth: 1, borderRadius: 8, padding: 8, flexDirection: 'row'}}>
                <Image source={{uri: item.img}} style={{height: 100, width: 80}} resizeMode="contain" />
                <View style={{width: '70%', height: '100%'}}>
                    <Text style={{fontSize: 12}}>{item.name}</Text>
                    <Text style={{fontSize: 12}}>${item.price}</Text>
                    <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                        <Button title="Add to cart" onPress={() => onAddToCartPress(item)} />
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
    return (
        <View style={styles.container}>
            <FlatList
            data={data || []}
            renderItem={renderItem}
            ItemSeparatorComponent={ () => <View style={{margin: 16}} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
    },
  });
