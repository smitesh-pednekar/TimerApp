import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTimer } from '../context/TimerContext';
import { formatTime } from '../utils/timerUtils';

const HistoryScreen = () => {
  const { history } = useTimer();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const exportHistory = () => {
    // This would implement JSON export functionality
    Alert.alert('Export', 'Export functionality would be implemented here');
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyName}>{item.name}</Text>
        <Text style={styles.historyCategory}>{item.category}</Text>
      </View>
      <View style={styles.historyDetails}>
        <Text style={styles.historyDuration}>
          Duration: {formatTime(item.duration)}
        </Text>
        <Text style={styles.historyDate}>
          Completed: {formatDate(item.completedAt)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {history.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="history" size={80} color="#E0E0E0" />
          <Text style={styles.emptyText}>No completed timers yet</Text>
          <Text style={styles.emptySubtext}>
            Complete some timers to see your history here
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {history.length} completed timer{history.length !== 1 ? 's' : ''}
            </Text>
            <TouchableOpacity style={styles.exportButton} onPress={exportHistory}>
              <Icon name="file-download" size={20} color="#2196F3" />
              <Text style={styles.exportText}>Export</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={history}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    color: '#666',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exportText: {
    color: '#2196F3',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  historyItem: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  historyCategory: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  historyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyDuration: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  historyDate: {
    fontSize: 12,
    color: '#666',
  },
});

export default HistoryScreen;
