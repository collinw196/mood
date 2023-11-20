import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import './home.styles.scss'

// Mock data for initial subscriptions
const initialSubscriptions = [
    { id: '1', service: 'Netflix', cost: '9.99' },
    { id: '2', service: 'Amazon Prime Video', cost: '12.99' },
    // Add more initial subscriptions as needed
  ];

const HomePage = () => {
    // State variables
    const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
    const [newService, setNewService] = useState('');
    const [newCost, setNewCost] = useState('');

    // Function to add a new subscription
    const addSubscription = () => {
    // Validate input
    if (!newService || !newCost) {
        alert('Please enter both service and cost.');
        return;
    }

    // Create a new subscription object
    const newSubscription = {
        id: (subscriptions.length + 1).toString(),
        service: newService,
        cost: newCost,
    };

    // Update subscriptions state
    setSubscriptions([...subscriptions, newSubscription]);

    // Clear input fields
    setNewService('');
    setNewCost('');
    };

    // Function to delete a subscription
    const deleteSubscription = (id) => {
    // Filter out the subscription with the given id
    const updatedSubscriptions = subscriptions.filter(sub => sub.id !== id);

    // Update subscriptions state
    setSubscriptions(updatedSubscriptions);
    };

    // Render each subscription item in the FlatList
    const renderSubscriptionItem = ({ item }) => (
    <View class='subscriptionItem'>
        <Text>{item.service}</Text>
        <Text>${item.cost}/month</Text>
        <Button
        title="Delete"
        onPress={() => deleteSubscription(item.id)}
        />
    </View>
    );

    return (
    <View class='container'>
        <Text class='header'>Subscription Manager</Text>

        {/* Input fields for adding a new subscription */}
        <View class='inputContainer'>
        <TextInput
            placeholder="Service"
            value={newService}
            onChangeText={(text) => setNewService(text)}
            class='input'
        />
        <TextInput
            placeholder="Cost"
            value={newCost}
            onChangeText={(text) => setNewCost(text)}
            class='input'
            keyboardType="numeric"
        />
        <Button title="Add Subscription" onPress={addSubscription} />
        </View>

        {/* List of existing subscriptions */}
        <FlatList
        data={subscriptions}
        renderItem={renderSubscriptionItem}
        keyExtractor={(item) => item.id}
        />
    </View>
    );
}

export default HomePage;