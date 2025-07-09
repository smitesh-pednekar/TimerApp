import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTimer } from '../context/TimerContext';
import TimerItem from './TimerItem';

const CategorySection = ({ category, timers }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { bulkAction } = useTimer();

  const handleBulkAction = (action) => {
    bulkAction(category, action);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.headerLeft}>
          <Icon 
            name={isExpanded ? 'expand-less' : 'expand-more'} 
            size={24} 
            color="#333" 
          />
          <Text style={styles.categoryTitle}>{category}</Text>
          <Text style={styles.count}>({timers.length})</Text>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <>
          <View style={styles.bulkActions}>
            <TouchableOpacity 
              style={[styles.bulkButton, styles.startButton]} 
              onPress={() => handleBulkAction('start')}
            >
              <Icon name="play-arrow" size={16} color="white" />
              <Text style={styles.bulkButtonText}>Start All</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.bulkButton, styles.pauseButton]} 
              onPress={() => handleBulkAction('pause')}
            >
              <Icon name="pause" size={16} color="white" />
              <Text style={styles.bulkButtonText}>Pause All</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.bulkButton, styles.resetButton]} 
              onPress={() => handleBulkAction('reset')}
            >
              <Icon name="refresh" size={16} color="white" />
              <Text style={styles.bulkButtonText}>Reset All</Text>
            </TouchableOpacity>
          </View>

          {timers.map(timer => (
            <TimerItem key={timer.id} timer={timer} />
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  header: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 5,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  count: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  bulkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 2,
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#FF9800',
  },
  resetButton: {
    backgroundColor: '#757575',
  },
  bulkButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 12,
  },
});

export default CategorySection;
