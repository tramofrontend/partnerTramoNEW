// ----------------------------------------------------------------------

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  };
};

export type AuthUserType = null | Record<string, any>;

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
};

// ----------------------------------------------------------------------

export type JWTContextType = {
  method: 'jwt';
  isAuthenticated: boolean;
  location: boolean | null;
  isInitialized: boolean;
  user: AuthUserType;
  UpdateUserDetail: (val: any) => Promise<void>;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle?: () => void;
  loginWithGithub?: () => void;
  loginWithTwitter?: () => void;
  initialize?: () => void;
};
