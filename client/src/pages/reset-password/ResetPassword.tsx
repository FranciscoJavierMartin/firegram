import React, { useState } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { auth } from '../../firebase/firebase.utils';
import './ResetPassword.css';

interface IResetPasswordProps extends FormComponentProps {}
interface IValuesForm {
  email: string;
}

const ResetPasswordForm: React.FC<IResetPasswordProps> = (
  props: IResetPasswordProps
) => {
  const [hasBeenSent, setHasBeenSent] = useState<boolean>(false);
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    props.form.validateFields(async (err: any, values: IValuesForm) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { email } = values;

        try {
          await auth.sendPasswordResetEmail(email);
          setHasBeenSent(true);
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
    <div>
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
                prefix={
                  <Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type='email'
                placeholder='Email'
              />
            )}
          </Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Reset password
          </Button>
        </Form>
      </div>
      {hasBeenSent && (
        <div>
          <h1>An email has been sent to you</h1>
          <span>Please check your inbox</span>
        </div>
      )}
    </div>
  );
};

const WrappedResetPasswordForm = Form.create({ name: 'reset_password' })(ResetPasswordForm);


export default WrappedResetPasswordForm;
