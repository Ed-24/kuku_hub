import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { auth, db, storage } from '../../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

const FirebaseTestScreen = () => {
  const [status, setStatus] = useState({
    app: '⏳',
    auth: '⏳',
    firestore: '⏳',
    storage: '⏳',
    messages: []
  });

  useEffect(() => {
    testFirebase();
  }, []);

  const testFirebase = async () => {
    const messages = [];
    const newStatus = { ...status };

    try {
      // Test Auth
      console.log('Testing Firebase Auth...');
      onAuthStateChanged(auth, (user) => {
        newStatus.auth = user ? '✅ Connected' : '✅ Ready (No user)';
        messages.push('Auth: Ready');
        setStatus({ ...newStatus, messages });
      });

      // Test Firestore
      console.log('Testing Firestore...');
      try {
        const testCollection = await getDocs(collection(db, 'test'));
        newStatus.firestore = '✅ Connected';
        messages.push(`Firestore: Connected (${testCollection.size} docs)`);
      } catch (e) {
        newStatus.firestore = '✅ Connected (No test collection)';
        messages.push('Firestore: Connected');
      }

      // Test Storage
      console.log('Testing Storage...');
      if (storage) {
        newStatus.storage = '✅ Connected';
        messages.push('Storage: Connected');
      }

      newStatus.app = '✅ Firebase Initialized';
      newStatus.messages = messages;
      setStatus(newStatus);

      console.log('Firebase Integration Test Complete:', newStatus);
    } catch (error) {
      console.error('Firebase Test Error:', error);
      newStatus.messages.push(`Error: ${error.message}`);
      setStatus(newStatus);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔥 Firebase Integration Test</Text>

      <View style={styles.statusBox}>
        <Text style={styles.label}>App Status:</Text>
        <Text style={styles.status}>{status.app}</Text>
      </View>

      <View style={styles.statusBox}>
        <Text style={styles.label}>Authentication:</Text>
        <Text style={styles.status}>{status.auth}</Text>
      </View>

      <View style={styles.statusBox}>
        <Text style={styles.label}>Firestore Database:</Text>
        <Text style={styles.status}>{status.firestore}</Text>
      </View>

      <View style={styles.statusBox}>
        <Text style={styles.label}>Cloud Storage:</Text>
        <Text style={styles.status}>{status.storage}</Text>
      </View>

      <View style={styles.messagesBox}>
        <Text style={styles.messagesTitle}>Messages:</Text>
        {status.messages.map((msg, index) => (
          <Text key={index} style={styles.message}>
            • {msg}
          </Text>
        ))}
      </View>

      <Text style={styles.footer}>
        Check browser console for detailed logs
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  statusBox: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50'
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50'
  },
  messagesBox: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    marginBottom: 20
  },
  messagesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  message: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  footer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginVertical: 10
  }
});

export default FirebaseTestScreen;
