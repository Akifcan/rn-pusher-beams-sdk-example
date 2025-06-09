/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  AppState,
} from 'react-native';
import {pusherBeams} from 'rn-pusher-beams-sdk';

function App(): React.JSX.Element {
  const API_KEY = '3b541fe7-57c0-4cd4-a196-ebb9a7497be4'
  const handleRegister = () => {
    console.log(pusherBeams.registerForRemoteNotifications());
  };

  const handleStart = () => {
    console.log(pusherBeams.start(API_KEY));
  };

  const handleInterest = () => {
    pusherBeams.addDeviceInterests('hello');
    pusherBeams.addDeviceInterests('demo1');
    pusherBeams.addDeviceInterests('demo2');
  };

  const handleGetInterests = () => {
    console.log(pusherBeams.getInterests());
  };

  const handleClearAllState = () => {
    console.log(pusherBeams.clearAllState());
  };

  const handleClearInterest = () => {
    console.log(pusherBeams.clearDeviceInterests());
  };

  const handleSetUserId = () => {
    const AUTH_URL = ''
    const BEARER_TOKEN = ''
    console.log(pusherBeams.setUserId('userid03', AUTH_URL, BEARER_TOKEN))
  }

  const handleStop = () => {
    console.log(pusherBeams.stop());
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      return;
    }
    pusherBeams.listenNotificationLogs();

    const subscribe = pusherBeams.onNotification(value => {
      if (AppState.currentState !== 'active') {
        return;
      }
      console.log(value)
      Alert.alert('message', JSON.stringify(value));
    });

    return () => {
      subscribe.remove();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        gap: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={handleStart}
        style={{width: '100%', backgroundColor: 'lightblue', padding: 10}}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>Start</Text>
      </TouchableOpacity>
      {Platform.OS === 'ios' && (
        <TouchableOpacity
          onPress={handleRegister}
          style={{width: '100%', backgroundColor: 'lightblue', padding: 10}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>Register</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={handleInterest}
        style={{width: '100%', backgroundColor: 'lightblue', padding: 10}}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>Add interest</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleGetInterests}
        style={{width: '100%', backgroundColor: 'lightblue', padding: 10}}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>Get interest</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSetUserId}
        style={{width: '100%', backgroundColor: 'lightblue', padding: 10}}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>Get interest</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleClearAllState}
        style={{width: '100%', backgroundColor: 'lightblue', padding: 10}}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>Clear All State</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleClearInterest}
        style={{width: '100%', backgroundColor: 'lightblue', padding: 10}}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>Clear interests</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleStop}
        style={{width: '100%', backgroundColor: 'lightblue', padding: 10}}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>Stop</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default App;
