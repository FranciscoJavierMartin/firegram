import React, { useState } from 'react';
import FormInput from '../../components/form-input/FormInput';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

interface IUserInputState {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  username: string;
}

const SignUpPage: React.FC = () => {
  const [userInput, setUserInput] = useState<IUserInputState>({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    username: ''
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (userInput.confirmPassword === userInput.password) {
      try {
        const {user} =await auth.createUserWithEmailAndPassword(
          userInput.email,
          userInput.password
        );

        createUserProfileDocument(user, {
          displayName: userInput.displayName,
          username: userInput.username
        });
        
      } catch (err) {
        setErrorMessage(err.message);
      }
    } else {
      setErrorMessage('Passwords must be the same');
    }
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='username'
          value={userInput.username}
          onChange={handleInput}
          label='Username'
        />
        <FormInput
          type='text'
          name='displayName'
          value={userInput.displayName}
          onChange={handleInput}
          label='Display name'
        />
        <FormInput
          type='email'
          name='email'
          value={userInput.email}
          onChange={handleInput}
          label='Email'
        />
        <FormInput
          type='password'
          name='password'
          value={userInput.password}
          onChange={handleInput}
          label='Password'
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={userInput.confirmPassword}
          onChange={handleInput}
          label='Confirm password'
        />
        {errorMessage && <span>{errorMessage}</span>}
        <button type='submit'>Sign up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
