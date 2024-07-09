import { createContext, useEffect, useReducer, useCallback, useState } from 'react';
// utils
import axios from '../utils/axios';
//
import { isValidToken, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from './types';
import { Api } from 'src/webservices';
import { fetchLocation } from 'src/utils/fetchLocation';
// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
  UPDATE_USER = 'UPDATE_USER',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.UPDATE_USER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type == Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type == Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type == Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.UPDATE_USER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type == Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      isInitialized: true,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [location, setLocation] = useState<boolean | null>(true);
  const initialize = useCallback(async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          let userAgent: any = navigator.userAgent;
          localStorage.setItem('userAgent', userAgent);
          localStorage.setItem(
            'deviceType',
            userAgent.match(/Android/i)
              ? 'android'
              : userAgent.match(/mac/i)
              ? 'macbook'
              : 'windows'
          );
          fetch('https://api.ipify.org?format=json')
            .then((response) => response?.json())
            .then((data) => {
              localStorage.setItem('ip', data?.ip);
            });
          localStorage.setItem('lat', position.coords.latitude);
          localStorage.setItem('long', position.coords.longitude);
          setLocation(true);
        },
        (error) => {
          setLocation(false);
        }
      );
    } else {
      setLocation(false);
      console.error('Geolocation is not supported by this browser.');
    }
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
      if (accessToken) {
        Api('agent/get_AgentDetail', 'GET', '', accessToken).then((resp: any) => {
          if (resp.status == 200) {
            if (resp.data.code == 200) {
              if (resp?.data?.data?.role == 'API_User') {
                dispatch({
                  type: Types.INITIAL,
                  payload: {
                    isAuthenticated: true,
                    user: resp.data.data,
                  },
                });
              } else {
                localStorage.removeItem('token');
                dispatch({
                  type: Types.LOGOUT,
                });
              }
            } else {
              localStorage.removeItem('token');
              dispatch({
                type: Types.LOGOUT,
              });
            }
          } else {
            localStorage.removeItem('token');
            dispatch({
              type: Types.LOGOUT,
            });
          }
        });
      } else {
        dispatch({
          type: Types.LOGOUT,
        });
      }
    } catch (error) {
      localStorage.removeItem('token');
      dispatch({
        type: Types.LOGOUT,
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = async (token: string, user: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('authentication', 'true');
    // setSession(token);
    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  };

  // REGISTER
  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    localStorage.setItem('token', accessToken);

    dispatch({
      type: Types.REGISTER,
      payload: {
        user,
      },
    });
  };

  //UPSATE USER
  const UpdateUserDetail = async (val: any) => {
    dispatch({
      type: Types.UPDATE_USER,
      payload: {
        user: { ...state.user, ...val },
      },
    });
  };
  // LOGOUT
  const logout = async () => {
    setSession(null);
    localStorage.removeItem('token');
    dispatch({
      type: Types.LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        location,
        login,
        loginWithGoogle: () => {},
        loginWithGithub: () => {},
        loginWithTwitter: () => {},
        logout,
        register,
        UpdateUserDetail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
