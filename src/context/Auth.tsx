import React, {createContext, useState, useContext, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

type AuthData = {
  _id: string,
  name: string,
  login: string,
  role: string,
  token: string,
}

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(authData: AuthData): Promise<void>;
  signOut(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
let signOut = async () => {} // perdoe-me pai pela gambiarra

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [authData, setAuthData] = useState<AuthData>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        const _authData: AuthData = JSON.parse(authDataSerialized);
        api.defaults.headers.Authorization = `Bearer ${_authData.token}`;
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (authData: AuthData) => {
    await AsyncStorage.setItem('@AuthData', JSON.stringify(authData));
    api.defaults.headers.Authorization = `Bearer ${authData.token}`;
    setAuthData(authData);
  };

  signOut = async () => {
    setAuthData(undefined);
    api.defaults.headers.Authorization = '';
    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export {AuthContext, AuthProvider, useAuth, signOut};