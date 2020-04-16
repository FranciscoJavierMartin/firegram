import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import './SignUpPage2.css';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

interface ISignUpFormProps extends FormComponentProps {}
interface IValuesForm {
  username: string;
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC<ISignUpFormProps> = (props: ISignUpFormProps) => {
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    props.form.validateFields(async (err: any, values: IValuesForm) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { email, password, displayName, username } = values;

        try {
          const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
          );

          createUserProfileDocument(user, {
            displayName: displayName,
            username: username
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error(err);
      }
    });
  };

  const compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const { getFieldDecorator } = props.form;

  return (
    <div style={{ padding: 24 }} className='login-form-container'>
      <Form onSubmit={handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Username'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('displayName', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Display name'
            />
          )}
        </Form.Item>
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
            <Input.Password
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='Password'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirmPassword', {
            rules: [
              { required: true, message: 'Please input your Password!' },
              {
                validator: compareToFirstPassword
              }
            ]
          })(
            <Input.Password
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='Confirm password'
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedSignUpForm = Form.create({ name: 'normal_signup' })(SignUpForm);

export default WrappedSignUpForm;
