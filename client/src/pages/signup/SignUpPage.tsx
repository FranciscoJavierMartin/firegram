import React, { useState } from 'react';
import FormInput from '../../components/form-input/FormInput';
import { auth } from '../../firebase/firebase.utils';

interface IUserInputState {
  email: string;
  password: string;
}

const SignUpPage: React.FC = () => {
  const [userInput, setUserInput] = useState<IUserInputState>({
    email: '',
    password: '',
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try{
      await auth.createUserWithEmailAndPassword(userInput.email, userInput.password);

    } catch(err){
      console.error(err);
    }

  }

  return <div>
    <h1>Sign up</h1>
    <form onSubmit={handleSubmit}>
      <FormInput type='email' name='email' value={userInput.email} onChange={handleInput} label='Email'/>
      <FormInput type='password' name='password' value={userInput.password} onChange={handleInput} label='Password'/>
      <button type='submit'>Sign up</button>
    </form>
  </div>
}

export default SignUpPage;