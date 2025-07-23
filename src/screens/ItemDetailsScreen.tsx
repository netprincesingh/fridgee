import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const ItemDetailScreen = ({ route }) => {
    const { item } = route.params;

    function calculateRemainingDays(expiryDateInput) {
        // Create a Date object for the current moment.
        const now = new Date();
        let expiryDate;

        // Manually parse the date if it is in "DD-MM-YYYY" format.
        if (typeof expiryDateInput === 'string' && /^\d{2}-\d{2}-\d{4}$/.test(expiryDateInput)) {
            const parts = expiryDateInput.split('-');
            // Note: The month is 0-based in the JavaScript Date constructor (0 for Jan, 1 for Feb, etc.)
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            expiryDate = new Date(year, month, day);
        } else {
            // For other string formats (like ISO YYYY-MM-DD) or Date objects, use the default constructor.
            expiryDate = new Date(expiryDateInput);
        }


        // Check if the provided expiry date is valid. If not, return null.
        if (isNaN(expiryDate.getTime())) {
            console.error("Invalid date provided:", expiryDateInput);
            return null;
        }

        // To ensure we are only comparing dates (and not times),
        // we reset the time part of both dates to midnight.
        now.setHours(0, 0, 0, 0);
        expiryDate.setHours(0, 0, 0, 0);


        // If the expiry date is before or on the current date, it has expired.
        if (expiryDate <= now) {
            return 0;
        }

        // Calculate the difference in milliseconds between the two dates.
        const timeDifference = expiryDate.getTime() - now.getTime();

        // Convert the millisecond difference into the number of full days.
        // 1000ms * 60s * 60min * 24hr = milliseconds in a day.
        const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return daysRemaining;
    }

    const remainingDays = calculateRemainingDays(item.expiry);

    if (!item) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>No item data available.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerBox}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.detail}>Expiry Date: {item.expiry}</Text>
                <Text>Price: ₹{item.price}</Text>
                <Text >Note: {item.note}</Text>
                <Text>Expire in days: {remainingDays}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    containerBox: {
        backgroundColor: "#eaffe8",
        height: 400,
        margin: 30,
        padding: 40,
        borderRadius: 10,

    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,


    },
    detail: {

    }
});

export default ItemDetailScreen;