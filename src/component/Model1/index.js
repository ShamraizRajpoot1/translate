import React from 'react';
import { StyleSheet, Text, View, Modal, FlatList } from 'react-native';

const Model = ({ isVisible, historyData, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>History</Text>
          <FlatList
            data={historyData}
            renderItem={({ item }) => (
              <Text style={styles.historyItem}>{item}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Text style={styles.closeButton} onPress={onClose}>Close</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    color: 'blue',
  },
});

export default Model;
