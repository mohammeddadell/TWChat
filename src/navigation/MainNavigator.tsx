import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DashboardNavigation from './DashboardNavigation';
import AuthNavigation from './AuthNavigation';
import {useAuth} from '../context/AuthContext';

const AppNavigator = () => {
  const {isAuthenticated} = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <DashboardNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigator;
