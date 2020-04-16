import React, { useState } from 'react';
import FormInput from '../../components/form-input/FormInput';
import { signInWithGoogle, auth } from '../../firebase/firebase.utils';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  }

  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    console.log('Entra');
    try{
      await auth.signInWithEmailAndPassword(email, password);
    } catch(err){
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <FormInput name='email' type='email' onChange={handleInputEmail} label='email' value={email} required/>
        <FormInput name='password' type='password' onChange={handleInputPassword} label='Password' value={password} required/>
        <button type='submit'>Login</button>
        <button onClick={signInWithGoogle}>Login with Google</button>
      </form>
    </div>
  );
};

export default LoginPage;
