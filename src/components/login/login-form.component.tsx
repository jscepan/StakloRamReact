import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './login-form.component.module.scss';
import { AuthRequestModel } from '../../models/auth-request.model';
import { Button, Form, Input } from 'antd';

interface LoginFormPropsI {
  setLoginInfo: (data: AuthRequestModel) => void;
}

type FieldType = {
  username?: string;
  password?: string;
};

export const LoginForm: React.FC<LoginFormPropsI> = (props): JSX.Element => {
  const { t } = useTranslation();

  const validateData = (values: AuthRequestModel) => {
    props.setLoginInfo(values);
  };

  return (
    <Form className={classes.loginForm} onFinish={validateData}>
      <Form.Item<FieldType>
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder={t('username')} />
      </Form.Item>
      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder={t('password')} />
      </Form.Item>
      <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
        {t('login')}
      </Button>
    </Form>
  );
};
