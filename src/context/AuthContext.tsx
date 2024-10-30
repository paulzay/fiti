// src/context/AuthContext.jsx
import { createContext, useReducer, useEffect } from 'react';
import { AUTH_ACTIONS } from './actions';
import { deleteCookie, setCookie } from '@/utils/methods';

// Create context
export const AuthContext = createContext({
  isAuthenticated: false,
  // user: null,
  token: null,
  loading: false,
  login: async (email: string, password: string) => { },
  logout: () => { },
  updateUser: (userData: any) => { }
});

// Initial state
const initialState = {
  isAuthenticated: false,
  // user: null,
  token: localStorage.getItem('token') || null
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        // user: action.payload.user,
        token: action.payload.token
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        // user: null,
        token: null
      };
    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    default:
      return state;
  }
};

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Handle auth state persistence
  useEffect(() => {
    if (state.token) {
      setCookie('auth', state.token, 1);
      localStorage.setItem('token', state.token);
    } else {
      localStorage.removeItem('token');
      deleteCookie('auth');
    }
  }, [state.token]);

  // Auth actions
  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:8000/api/v1/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),

    })

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    dispatch({
      type: AUTH_ACTIONS.LOGIN,
      payload: {
        // user: data.user,
        token: data.token
      }
    });

    // Redirect if response is ok
    window.location.href = '/dashboard';

    return data;
  };

  const logout = () => {
    deleteCookie('auth');
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  const updateUser = (userData) => {
    dispatch({
      type: AUTH_ACTIONS.UPDATE_USER,
      payload: userData
    });
  };

  const value = {
    ...state,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
