import React, { useState } from 'react';
import FormInput from '../../components/form-input/FormInput';
import { signInWithGoogle } from '../../firebase/firebase.utils';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <FormInput name='email' type='email' onChange={handleInputEmail} label='email' value={email} required/>
        <button type='submit'>Login</button>
        <button onClick={signInWithGoogle}>Login with Google</button>
      </form>
    </div>
  );
};

export default LoginPage;
