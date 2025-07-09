import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useTimer } from '../context/TimerContext';
import { formatTime, getProgressPercentage } from '../utils/timerUtils';
import { COLORS, SIZES, SHADOWS } from '../styles/globalStyles';

const { width } = Dimensions.get('window');

const TimerItem = ({ timer, index }) => {
  const { startTimer, pauseTimer, resetTimer, deleteTimer } = useTimer();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay: index * 100,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, []);

  useEffect(() => {
    // Progress animation
    const progress = getProgressPercentage(timer.remainingTime, timer.duration);
    Animated.timing(progressAnim, {
      toValue: progress / 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [timer.remainingTime, timer.duration]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Timer',
      `Are you sure you want to delete "${timer.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => {
            Animated.timing(scaleAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }).start(() => deleteTimer(timer.id));
          }
        },
      ]
    );
  };

  const getStatusConfig = () => {
    switch (timer.status) {
      case 'running':
        return {
          color: COLORS.running,
          icon: 'play-circle-filled',
          gradient: ['#48BB78', '#38A169'],
        };
      case 'paused':
        return {
          color: COLORS.paused,
          icon: 'pause-circle-filled',
          gradient: ['#ED8936', '#DD6B20'],
        };
      case 'completed':
        return {
          color: COLORS.completed,
          icon: 'check-circle',
          gradient: ['#9F7AEA', '#805AD5'],
        };
      default:
        return {
          color: COLORS.stopped,
          icon: 'radio-button-unchecked',
          gradient: ['#718096', '#4A5568'],
        };
    }
  };

  const statusConfig = getStatusConfig();
  const progress = getProgressPercentage(timer.remainingTime, timer.duration);

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <LinearGradient
        colors={['#FFFFFF', '#F7FAFC']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Icon 
              name={statusConfig.icon} 
              size={24} 
              color={statusConfig.color} 
            />
            <Text style={styles.name}>{timer.name}</Text>
          </View>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Icon name="delete-outline" size={20} color={COLORS.danger} />
          </TouchableOpacity>
        </View>

        {/* Time Display */}
        <View style={styles.timeSection}>
          <Text style={styles.timeText}>{formatTime(timer.remainingTime)}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusConfig.color }]}>
            <Text style={styles.statusText}>{timer.status.toUpperCase()}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            >
              <LinearGradient
                colors={statusConfig.gradient}
                style={styles.progressGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </Animated.View>
          </View>
          <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          {timer.status === 'running' ? (
            <TouchableOpacity
              style={[styles.controlButton, styles.pauseButton]}
              onPress={() => pauseTimer(timer.id)}
            >
              <Icon name="pause" size={20} color={COLORS.textWhite} />
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.controlButton, styles.startButton]}
              onPress={() => startTimer(timer.id)}
              disabled={timer.status === 'completed'}
            >
              <Icon name="play-arrow" size={20} color={COLORS.textWhite} />
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.controlButton, styles.resetButton]}
            onPress={() => resetTimer(timer.id)}
          >
            <Icon name="refresh" size={20} color={COLORS.textWhite} />
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.sm,
    marginHorizontal: SIZES.md,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  gradient: {
    padding: SIZES.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    fontSize: SIZES.fontLg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: SIZES.sm,
  },
  deleteButton: {
    padding: SIZES.xs,
    borderRadius: SIZES.radiusSm,
    backgroundColor: COLORS.surfaceLight,
  },
  timeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  timeText: {
    fontSize: SIZES.fontXxl,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  statusBadge: {
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusRound,
  },
  statusText: {
    fontSize: SIZES.fontXs,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  progressBackground: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radiusXs,
    overflow: 'hidden',
    marginRight: SIZES.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: SIZES.radiusXs,
  },
  progressGradient: {
    flex: 1,
    borderRadius: SIZES.radiusXs,
  },
  progressText: {
    fontSize: SIZES.fontSm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    minWidth: 40,
    textAlign: 'right',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusMd,
    minWidth: 100,
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  startButton: {
    backgroundColor: COLORS.running,
  },
  pauseButton: {
    backgroundColor: COLORS.paused,
  },
  resetButton: {
    backgroundColor: COLORS.stopped,
  },
  buttonText: {
    color: COLORS.textWhite,
    fontWeight: '600',
    marginLeft: SIZES.xs,
    fontSize: SIZES.fontSm,
  },
});

export default TimerItem;
