import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { clearItems } from "../redux/store/slices/itemsSlice";
import { removeItem } from "../redux/store/slices/itemsSlice";
import { SafeAreaView } from 'react-native-safe-area-context';


const ListScreen = () => {
    const items = useSelector((state) => state.items.list);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [filter, setFilter] = useState<'red' | 'green' | 'blue'>('blue');


    const calculateDaysLeft = (expiry: string): number => {
        const [day, month, year] = expiry.split('-').map(Number);
        const expiryDate = new Date(year, month - 1, day);
        const today = new Date();
        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
        return diffDays;
    };

    const filteredItems = items.filter((item) => {
        const daysLeft = calculateDaysLeft(item.expiry);

        if (filter === 'red') return daysLeft <= 2;
        if (filter === 'green') return daysLeft > 2;
        return true;

    });

    const handleDelete = (id: string) => {
        Alert.alert("Confirm Delete", "Are you sure you want to delete this item?", [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => dispatch(removeItem(id)) }
        ]);
    }

   

    
    const renderItem = ({ item }) => {
    const remainingDays = calculateDaysLeft(item.expiry);
    
        return (
            <TouchableOpacity
                style={styles.itemCard}
                onPress={() => {
                    navigation.navigate('ItemDetails', { item })
                    //console.warn('ItemDetailsScreen received:', item);

                }}
            >
                <View>
                    <Text style={styles.itemName}>{item.name}</Text>
                    {(remainingDays < 1)?
                    (<Text style = {{color:'red'}}>Expired</Text>)
                    :
                    (<Text style={styles.itemExpiry}>Expire in days: {remainingDays}</Text>)
                    }
                    
                </View>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <MaterialCommunityIcons name="delete" size={24} color="red" />

                </TouchableOpacity>
            </TouchableOpacity>
        );
    }




    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.filterButtonRed}
                    onPress={() => setFilter('red')}
                >
                    {(filter === 'red') ?
                    ( <View style ={styles.filterButtonRedIn}></View>)
                    :
                    (<View></View>)

                    }
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.filterButtonBlue}
                    onPress={() => setFilter('blue')}
                >
                    {(filter === 'blue') ?
                    ( <View style ={styles.filterButtonBlueIn}></View>)
                    :
                    (<View></View>)

                    }
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.filterButtonGreen}
                    onPress={() => setFilter('green')}
                >
                    {(filter === 'green') ?
                    ( <View style ={styles.filterButtonGreenIn}></View>)
                    :
                    (<View></View>)

                    }

                </TouchableOpacity>

            </View>
            <View style= {styles.buttonRow}>
                <Text style={styles.infoText}>2 days</Text>
                <Text style={styles.infoText}>                   All</Text>
                <Text style={styles.infoText}>More than 2 days</Text>
            </View>

            {filteredItems.length === 0 ?
                (<View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No items to show</Text>
                </View>
                )
                :
                (
                    <FlatList
                        data={filteredItems}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                )
            }


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    itemCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#eaffe8',
        borderRadius: 10,
        //elevation: 1,

    },
    itemName: {
        fontSize: 18,
        fontWeight: 600,
    },
    itemExpiry: {
        fontSize: 14,
        color: "#555",

    },
    container: {
        flex: 1,
        padding: 16,
        marginBottom: 50,

    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    filterButtonRed:{
        width:40,
        height:40,
        borderRadius:20,
        borderColor:'red',
        borderWidth:5,
        padding:2.5,

    },
    filterButtonRedIn:{
        width:25,
        height:25,
        borderRadius:20,
        backgroundColor:'red',
        
    },
    filterButtonBlue:{
        width:40,
        height:40,
        borderRadius:20,
        borderColor:'blue',
        borderWidth:5,
        padding:2.5,
    },
    filterButtonBlueIn:{
        width:25,
        height:25,
        borderRadius:20,
        backgroundColor:'blue',
        
    },
    filterButtonGreen:{
        width:40,
        height:40,
        borderRadius:20,
        borderColor:'green',
        borderWidth:5,
        padding:2.5,
    },
    filterButtonGreenIn:{
        width:25,
        height:25,
        borderRadius:20,
        backgroundColor:'green',
        
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 26,
        color: '#999',
    },
    infoText:{
        fontSize:10,
    }

});

export default ListScreen;