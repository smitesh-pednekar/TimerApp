import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { loadTimers, saveTimers, loadHistory, saveHistory } from '../utils/storage';

const TimerContext = createContext();

const initialState = {
  timers: [],
  history: [],
  intervals: {},
};

function timerReducer(state, action) {
  switch (action.type) {
    case 'LOAD_TIMERS':
      return { ...state, timers: action.payload };
    
    case 'LOAD_HISTORY':
      return { ...state, history: action.payload };
    
    case 'ADD_TIMER':
      return { ...state, timers: [...state.timers, action.payload] };
    
    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id ? { ...timer, ...action.payload } : timer
        ),
      };
    
    case 'DELETE_TIMER':
      return {
        ...state,
        timers: state.timers.filter(timer => timer.id !== action.payload),
      };
    
    case 'ADD_TO_HISTORY':
      return { ...state, history: [action.payload, ...state.history] };
    
    case 'SET_INTERVAL':
      return {
        ...state,
        intervals: { ...state.intervals, [action.payload.id]: action.payload.interval },
      };
    
    case 'CLEAR_INTERVAL':
      return {
        ...state,
        intervals: { ...state.intervals, [action.payload]: null },
      };
    
    default:
      return state;
  }
}

export function TimerProvider({ children }) {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    saveTimers(state.timers);
  }, [state.timers]);

  useEffect(() => {
    saveHistory(state.history);
  }, [state.history]);

  const loadInitialData = async () => {
    try {
      const timers = await loadTimers();
      const history = await loadHistory();
      dispatch({ type: 'LOAD_TIMERS', payload: timers });
      dispatch({ type: 'LOAD_HISTORY', payload: history });
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const addTimer = (timer) => {
    const newTimer = {
      ...timer,
      id: Date.now().toString(),
      remainingTime: timer.duration,
      status: 'stopped',
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TIMER', payload: newTimer });
  };

  const updateTimer = (id, updates) => {
    dispatch({ type: 'UPDATE_TIMER', payload: { id, ...updates } });
  };

  const deleteTimer = (id) => {
    if (state.intervals[id]) {
      clearInterval(state.intervals[id]);
      dispatch({ type: 'CLEAR_INTERVAL', payload: id });
    }
    dispatch({ type: 'DELETE_TIMER', payload: id });
  };

  const startTimer = (id) => {
    const timer = state.timers.find(t => t.id === id);
    if (!timer || timer.status === 'running') return;

    updateTimer(id, { status: 'running' });

    const interval = setInterval(() => {
      const currentTimer = state.timers.find(t => t.id === id);
      if (!currentTimer) return;

      if (currentTimer.remainingTime <= 1) {
        completeTimer(id);
      } else {
        const newRemainingTime = currentTimer.remainingTime - 1;
        updateTimer(id, { remainingTime: newRemainingTime });

        // Check for halfway alert
        if (currentTimer.halfwayAlert && 
            newRemainingTime === Math.floor(currentTimer.duration / 2)) {
          // Trigger halfway alert (you can add notification logic here)
          console.log(`Halfway alert for ${currentTimer.name}`);
        }
      }
    }, 1000);

    dispatch({ type: 'SET_INTERVAL', payload: { id, interval } });
  };

  const pauseTimer = (id) => {
    if (state.intervals[id]) {
      clearInterval(state.intervals[id]);
      dispatch({ type: 'CLEAR_INTERVAL', payload: id });
    }
    updateTimer(id, { status: 'paused' });
  };

  const resetTimer = (id) => {
    if (state.intervals[id]) {
      clearInterval(state.intervals[id]);
      dispatch({ type: 'CLEAR_INTERVAL', payload: id });
    }
    const timer = state.timers.find(t => t.id === id);
    updateTimer(id, { 
      remainingTime: timer.duration, 
      status: 'stopped' 
    });
  };

  const completeTimer = (id) => {
    if (state.intervals[id]) {
      clearInterval(state.intervals[id]);
      dispatch({ type: 'CLEAR_INTERVAL', payload: id });
    }
    
    const timer = state.timers.find(t => t.id === id);
    updateTimer(id, { status: 'completed', remainingTime: 0 });
    
    // Add to history
    const historyEntry = {
      id: Date.now().toString(),
      name: timer.name,
      category: timer.category,
      duration: timer.duration,
      completedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TO_HISTORY', payload: historyEntry });
  };

  const bulkAction = (category, action) => {
    const categoryTimers = state.timers.filter(t => t.category === category);
    categoryTimers.forEach(timer => {
      switch (action) {
        case 'start':
          startTimer(timer.id);
          break;
        case 'pause':
          pauseTimer(timer.id);
          break;
        case 'reset':
          resetTimer(timer.id);
          break;
      }
    });
  };

  const value = {
    timers: state.timers,
    history: state.history,
    addTimer,
    updateTimer,
    deleteTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    bulkAction,
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
}

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
