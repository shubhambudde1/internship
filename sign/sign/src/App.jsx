import { useState } from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import './App.css';

function App() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleToggleFormMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="App">
      {isLoginMode ? (
        <LoginPage onToggleFormMode={handleToggleFormMode} />
      ) : (
        <SignupPage onLoginClick={handleToggleFormMode} />
      )}
    </div>
  );
}

export default App;
