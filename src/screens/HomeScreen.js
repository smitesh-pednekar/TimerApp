import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Animated,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useTimer } from '../context/TimerContext';
import { groupTimersByCategory } from '../utils/timerUtils';
import CategorySection from '../components/CategorySection';
import CompletionModal from '../components/CompletionModal';
import { COLORS, SIZES, SHADOWS, globalStyles } from '../styles/globalStyles';

const HomeScreen = ({ navigation }) => {
  const { timers } = useTimer();
  const [completedTimer, setCompletedTimer] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const justCompleted = timers.find(timer => 
      timer.status === 'completed' && timer.remainingTime === 0
    );
    
    if (justCompleted && (!completedTimer || completedTimer.id !== justCompleted.id)) {
      setCompletedTimer(justCompleted);
      setShowCompletionModal(true);
    }
  }, [timers]);

  const groupedTimers = groupTimersByCategory(timers);
  const totalTimers = timers.length;
  const runningTimers = timers.filter(t => t.status === 'running').length;
  const completedTimers = timers.filter(t => t.status === 'completed').length;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleCloseModal = () => {
    setShowCompletionModal(false);
    setCompletedTimer(null);
  };

  const StatsCard = ({ icon, title, value, color }) => (
    <View style={[styles.statsCard, { borderLeftColor: color }]}>
      <Icon name={icon} size={24} color={color} />
      <View style={styles.statsContent}>
        <Text style={styles.statsValue}>{value}</Text>
        <Text style={styles.statsTitle}>{title}</Text>
      </View>
    </View>
  );

  return (
    <View style={globalStyles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryLight]}
        style={styles.header}
      >
        <Animated.View style={[styles.headerContent, { opacity: fadeAnim }]}>
          <Text style={styles.headerTitle}>Timer Hub</Text>
          <Text style={styles.headerSubtitle}>Manage your time efficiently</Text>
        </Animated.View>
      </LinearGradient>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <StatsCard
          icon="timer"
          title="Total Timers"
          value={totalTimers}
          color={COLORS.primary}
        />
        <StatsCard
          icon="play-circle-filled"
          title="Running"
          value={runningTimers}
          color={COLORS.running}
        />
        <StatsCard
          icon="check-circle"
          title="Completed"
          value={completedTimers}
          color={COLORS.completed}
        />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {Object.keys(groupedTimers).length === 0 ? (
          <Animated.View style={[styles.emptyState, { opacity: fadeAnim }]}>
            <LinearGradient
              colors={[COLORS.surface, COLORS.surfaceLight]}
              style={styles.emptyCard}
            >
              <Icon name="timer" size={80} color={COLORS.textMuted} />
              <Text style={styles.emptyTitle}>No timers yet</Text>
              <Text style={styles.emptySubtext}>
                Create your first timer to get started with time management
              </Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation.navigate('AddTimer')}
              >
                <Icon name="add" size={20} color={COLORS.textWhite} />
                <Text style={styles.emptyButtonText}>Create Timer</Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        ) : (
          Object.entries(groupedTimers).map(([category, categoryTimers]) => (
            <CategorySection
              key={category}
              category={category}
              timers={categoryTimers}
            />
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTimer')}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[COLORS.secondary, COLORS.danger]}
          style={styles.fabGradient}
        >
          <Icon name="add" size={28} color={COLORS.textWhite} />
        </LinearGradient>
      </TouchableOpacity>

      <CompletionModal
        visible={showCompletionModal}
        timerName={completedTimer?.name || ''}
        onClose={handleCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: SIZES.lg,
    paddingBottom: SIZES.xl,
    paddingHorizontal: SIZES.lg,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: SIZES.fontHero,
    fontWeight: '800',
    color: COLORS.textWhite,
    marginBottom: SIZES.xs,
  },
  headerSubtitle: {
    fontSize: SIZES.fontMd,
    color: COLORS.textWhite,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.lg,
    justifyContent: 'space-between',
  },
  statsCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.md,
    marginHorizontal: SIZES.xs,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    ...SHADOWS.light,
  },
  statsContent: {
    marginLeft: SIZES.sm,
  },
  statsValue: {
    fontSize: SIZES.fontLg,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statsTitle: {
    fontSize: SIZES.fontXs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    padding: SIZES.lg,
    justifyContent: 'center',
  },
  emptyCard: {
    alignItems: 'center',
    padding: SIZES.xxl,
    borderRadius: SIZES.radiusLg,
    ...SHADOWS.medium,
  },
  emptyTitle: {
    fontSize: SIZES.fontXl,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: SIZES.lg,
    marginBottom: SIZES.sm,
  },
  emptySubtext: {
    fontSize: SIZES.fontMd,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SIZES.xl,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radiusMd,
    ...SHADOWS.light,
  },
  emptyButtonText: {
    color: COLORS.textWhite,
    fontWeight: '600',
    marginLeft: SIZES.xs,
  },
  fab: {
    position: 'absolute',
    width: 64,
    height: 64,
    right: SIZES.lg,
    bottom: SIZES.lg,
    borderRadius: 32,
    ...SHADOWS.heavy,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
