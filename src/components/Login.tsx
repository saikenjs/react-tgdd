import { Button, Form, Input, message, Typography } from 'antd';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../recoil/atoms/UserAtom';

export function Login() {
  const setUser = useSetRecoilState(userAtom);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-[#F9D976] to-[#F39F86]">
      <Form
        className="p-10 space-y-5 bg-white rounded-xl drop-shadow-lg"
        layout="vertical"
        onFinish={({ username, password }) => {
          if (username === 'admin' && password === 'admin') {
            setUser({
              username,
              password,
              firstName: 'Super',
              lastName: 'Admin',
              role: 'ADMIN',
            });
            message.success('Login successfully!');
          } else {
            message.error('Login failed!');
          }
        }}
      >
        <Typography.Title className="text-center">
          Thegioididong.com
        </Typography.Title>

        <Form.Item label="Username" required name="username">
          <Input className="rounded-lg" />
        </Form.Item>

        <Form.Item label="Password" required name="password">
          <Input className="rounded-lg" />
        </Form.Item>

        <Button
          htmlType="submit"
          className="bg-gradient-to-bl from-[#FFCC2F] to-[#EF5734] border-none text-white w-full rounded-lg h-10 font-bold"
        >
          Login
        </Button>
      </Form>
    </div>
  );
}
