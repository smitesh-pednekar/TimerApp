import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMERS_KEY = '@timers';
const HISTORY_KEY = '@history';

export const saveTimers = async (timers) => {
  try {
    await AsyncStorage.setItem(TIMERS_KEY, JSON.stringify(timers));
  } catch (error) {
    console.error('Error saving timers:', error);
  }
};

export const loadTimers = async () => {
  try {
    const timers = await AsyncStorage.getItem(TIMERS_KEY);
    return timers ? JSON.parse(timers) : [];
  } catch (error) {
    console.error('Error loading timers:', error);
    return [];
  }
};

export const saveHistory = async (history) => {
  try {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving history:', error);
  }
};

export const loadHistory = async () => {
  try {
    const history = await AsyncStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
};
