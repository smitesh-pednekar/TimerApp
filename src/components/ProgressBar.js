import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress, color = '#2196F3' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View 
          style={[
            styles.fill, 
            { width: `${progress}%`, backgroundColor: color }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  background: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});

export default ProgressBar;
