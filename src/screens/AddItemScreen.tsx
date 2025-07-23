import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    Pressable,
    Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/store/slices/itemsSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';


const AddItemScreen = ({ navigation }) => {

    const [itemName, setItemName] = useState("");
    const [expiryDate, setExpirydate] = useState('');
    const [note,setNote] = useState("");
    const [price,setPrice] =useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();


    const formatDate = (date: Date) => {

        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowPicker(false);
        if (selectedDate) {
            setExpirydate(formatDate(selectedDate));
        }
    }

    const handleAddItem = () => {
        if (!itemName.trim() || !expiryDate.trim()) {
            Alert.alert('Error', 'Pleae fill out both fields 🙁');
            return;

        }
        const newItem = {
            id: Date.now().toString(),
            name: itemName,
            expiry: expiryDate,
            note: note,
            price: price,
        }

        dispatch(addItem(newItem));
        Alert.alert('Success', 'Item added! 😁');

        setItemName('');
        setExpirydate('');
        Keyboard.dismiss();
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Add New Item</Text>

                <TextInput
                    placeholder="Item Name"
                    value={itemName}
                    onChangeText={setItemName}
                    style={styles.input}
                    placeholderTextColor = "#aaa"
                />

                <Pressable onPress={() => setShowPicker(true)} style={styles.inputWithIcon}>
                    <Text style={[styles.dateText, !expiryDate && { color: '#aaa' }]} >
                        {expiryDate || 'Expiry Date (DD-MM-YYYY)'}
                    </Text>
                    <MaterialCommunityIcons name="calendar-month" size={24} color="#555" />

                </Pressable>

                {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        onChange={onDateChange}
                    />
                )}

                <TextInput 
                    placeholder="Price"
                    value ={price}
                    onChangeText={setPrice}
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                />
                
                <TextInput 
                    placeholder="Note"
                    value={note}
                    onChangeText={setNote}
                    style={styles.inputNote}
                    placeholderTextColor="#aaa"
                    multiline
                    scrollEnabled
                />


                <TouchableOpacity style={styles.button} onPress={handleAddItem}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>



            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',

    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 24,
        textAlign: 'center',

    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        

    },
    inputNote:{
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
    },
    dateText: {
        fontSize: 14,
        
    },
    button: {
        height: 50,
        backgroundColor: 'green',
        borderRadius: 8,
        padding: 15,




    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 600,


    },
    inputWithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,

    }
})
export default AddItemScreen;