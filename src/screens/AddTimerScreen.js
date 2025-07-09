import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useTimer } from '../context/TimerContext';
import { COLORS, SIZES, SHADOWS, globalStyles } from '../styles/globalStyles';

const AddTimerScreen = ({ navigation }) => {
  const { addTimer } = useTimer();
  const [name, setName] = useState('');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('5');
  const [seconds, setSeconds] = useState('0');
  const [category, setCategory] = useState('');
  const [halfwayAlert, setHalfwayAlert] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, []);

  const predefinedCategories = [
    { name: 'Work', icon: 'work', color: COLORS.primary },
    { name: 'Study', icon: 'school', color: COLORS.success },
    { name: 'Exercise', icon: 'fitness-center', color: COLORS.warning },
    { name: 'Break', icon: 'coffee', color: COLORS.paused },
    { name: 'Cooking', icon: 'restaurant', color: COLORS.danger },
    { name: 'Meditation', icon: 'self-improvement', color: COLORS.completed },
  ];

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a timer name');
      return;
    }

    const totalSeconds = 
      parseInt(hours || '0') * 3600 + 
      parseInt(minutes || '0') * 60 + 
      parseInt(seconds || '0');

    if (totalSeconds <= 0) {
      Alert.alert('Error', 'Please enter a valid duration');
      return;
    }

    const timer = {
      name: name.trim(),
      duration: totalSeconds,
      category: category.trim() || 'General',
      halfwayAlert,
    };

    addTimer(timer);
    
    // Success animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.goBack();
    });
  };

  const TimeInput = ({ value, onChangeText, placeholder, label }) => (
    <View style={styles.timeInputContainer}>
      <Text style={styles.timeLabel}>{label}</Text>
      <TextInput
        style={[
          styles.timeInput,
          focusedInput === label && styles.timeInputFocused,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType="numeric"
        maxLength={2}
        onFocus={() => setFocusedInput(label)}
        onBlur={() => setFocusedInput(null)}
      />
    </View>
  );

  const CategoryButton = ({ item, isSelected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        isSelected && [styles.selectedCategory, { backgroundColor: item.color }],
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon 
        name={item.icon} 
        size={20} 
        color={isSelected ? COLORS.textWhite : item.color} 
      />
      <Text style={[
        styles.categoryButtonText,
        isSelected && styles.selectedCategoryText,
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={globalStyles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryLight]}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={COLORS.textWhite} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Timer</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Timer Name */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Timer Name</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'name' && styles.inputFocused,
              ]}
              value={name}
              onChangeText={setName}
              placeholder="Enter timer name"
              placeholderTextColor={COLORS.textMuted}
              maxLength={50}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Duration */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Duration</Text>
            <View style={styles.durationContainer}>
              <TimeInput
                value={hours}
                onChangeText={setHours}
                placeholder="0"
                label="Hours"
              />
              <TimeInput
                value={minutes}
                onChangeText={setMinutes}
                placeholder="0"
                label="Minutes"
              />
              <TimeInput
                value={seconds}
                onChangeText={setSeconds}
                placeholder="0"
                label="Seconds"
              />
            </View>
          </View>

          {/* Category */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'category' && styles.inputFocused,
              ]}
              value={category}
              onChangeText={setCategory}
              placeholder="Enter custom category (optional)"
              placeholderTextColor={COLORS.textMuted}
              maxLength={30}
              onFocus={() => setFocusedInput('category')}
              onBlur={() => setFocusedInput(null)}
            />
            
            <Text style={styles.subsectionTitle}>Quick Categories</Text>
            <View style={styles.categoryGrid}>
              {predefinedCategories.map((item) => (
                <CategoryButton
                  key={item.name}
                  item={item}
                  isSelected={category === item.name}
                  onPress={() => setCategory(item.name)}
                />
              ))}
            </View>
          </View>

          {/* Halfway Alert */}
          <View style={styles.section}>
            <View style={styles.switchContainer}>
              <View style={styles.switchContent}>
                <Icon name="notifications" size={24} color={COLORS.primary} />
                <View style={styles.switchText}>
                  <Text style={styles.switchTitle}>Halfway Alert</Text>
                  <Text style={styles.switchSubtitle}>
                    Get notified at 50% completion
                  </Text>
                </View>
              </View>
              <Switch
                value={halfwayAlert}
                onValueChange={setHalfwayAlert}
                trackColor={{ false: COLORS.textMuted, true: COLORS.primaryLight }}
                thumbColor={halfwayAlert ? COLORS.primary : COLORS.surface}
              />
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[COLORS.success, COLORS.primary]}
            style={styles.saveButtonGradient}
          >
            <Icon name="check" size={24} color={COLORS.textWhite} />
            <Text style={styles.saveButtonText}>Create Timer</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.lg,
    paddingTop: SIZES.xl,
  },
  backButton: {
    padding: SIZES.xs,
  },
  headerTitle: {
    flex: 1,
    fontSize: SIZES.fontXl,
    fontWeight: '600',
    color: COLORS.textWhite,
    textAlign: 'center',
  },
  placeholder: {
    width: 32,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: SIZES.radiusXl,
    borderTopRightRadius: SIZES.radiusXl,
    marginTop: -SIZES.lg,
    paddingTop: SIZES.lg,
  },
  section: {
    marginBottom: SIZES.xl,
    paddingHorizontal: SIZES.lg,
  },
  sectionTitle: {
    fontSize: SIZES.fontLg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SIZES.md,
  },
  subsectionTitle: {
    fontSize: SIZES.fontMd,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: SIZES.lg,
    marginBottom: SIZES.sm,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusMd,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.md,
    fontSize: SIZES.fontMd,
    color: COLORS.textPrimary,
    borderWidth: 2,
    borderColor: COLORS.surfaceLight,
    ...SHADOWS.light,
  },
  inputFocused: {
    borderColor: COLORS.primary,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInputContainer: {
    flex: 1,
    marginHorizontal: SIZES.xs,
  },
  timeLabel: {
    fontSize: SIZES.fontSm,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
    textAlign: 'center',
  },
  timeInput: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusMd,
    paddingVertical: SIZES.md,
    fontSize: SIZES.fontLg,
    color: COLORS.textPrimary,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: COLORS.surfaceLight,
    fontWeight: '600',
    ...SHADOWS.light,
  },
  timeInputFocused: {
    borderColor: COLORS.primary,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SIZES.sm,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusMd,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    margin: SIZES.xs,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
    ...SHADOWS.light,
  },
  selectedCategory: {
    borderColor: 'transparent',
  },
  categoryButtonText: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontSm,
    fontWeight: '500',
    marginLeft: SIZES.xs,
  },
  selectedCategoryText: {
    color: COLORS.textWhite,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.md,
    ...SHADOWS.light,
  },
  switchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  switchText: {
    marginLeft: SIZES.md,
    flex: 1,
  },
  switchTitle: {
    fontSize: SIZES.fontMd,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  switchSubtitle: {
    fontSize: SIZES.fontSm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  saveButton: {
    margin: SIZES.lg,
    borderRadius: SIZES.radiusMd,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.md,
  },
  saveButtonText: {
    color: COLORS.textWhite,
    fontSize: SIZES.fontLg,
    fontWeight: '600',
    marginLeft: SIZES.sm,
  },
});

export default AddTimerScreen;
