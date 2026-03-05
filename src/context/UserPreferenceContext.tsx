import {useContext, createContext, useState} from 'react';

export type UserPreferences = {
  responseStyle: 'concise' | 'detailed' | 'creative';
  codeLanguage: string;
  temperature: number;
  streamingEnabled: boolean;
  maxTokens: number;
  userName: string;
}

type UserPreferenceContextType = {
  preferences: UserPreferences;
  setPreferences: (prefs: UserPreferences) => void;
}

const defaultPreferences: UserPreferences = {
  responseStyle: 'detailed',
  codeLanguage: 'python',
  temperature: 0.7,
  streamingEnabled: true,
  maxTokens: 2000,
  userName: ''
};

const UserPreferenceContext = createContext<UserPreferenceContextType | null>(null);

export const UserPreferenceProvider = ({ children }: { children: React.ReactNode }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  return (
    <UserPreferenceContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </UserPreferenceContext.Provider>
  );    
};

export const usePreferences = () => {
  const context = useContext(UserPreferenceContext);
    if (!context) {
        throw new Error('usePreferences must be used within a UserPreferenceProvider');
    }
    return context; 
};

