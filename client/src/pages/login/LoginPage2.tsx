import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import './LoginPage2.css';
import { Link } from 'react-router-dom';
import { SIGNUP, RESET_PASSWORD } from '../../constants/routes';
import { signInWithGoogle, auth } from '../../firebase/firebase.utils';

interface ILoginFormProps extends FormComponentProps {}
interface IValuesForm {
  email: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC<ILoginFormProps> = (props: ILoginFormProps) => {
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    props.form.validateFields(async (err: any, values: IValuesForm) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { email, password } = values;

        try {
          await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error(err);
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <div style={{ padding: 24 }} className='login-form-container'>
      <Form onSubmit={handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]
          })(
            <Input
              prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='email'
              placeholder='Email'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='Password'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <Link className='login-form-forgot' to={RESET_PASSWORD}>
            Forgot password
          </Link>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
          <Button
            type='default'
            className='login-form-button'
            onClick={signInWithGoogle}
          >
            Log in with Google
            <Icon type='google' />
          </Button>
          Or <Link to={SIGNUP}>register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default WrappedLoginForm;
