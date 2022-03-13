import { useEffect, useState, useRef } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import classes from './Login.module.scss';
import { login } from '../../store/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

const Login = props => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const initialRender = useRef(true);

    useEffect(() => {
        if (!initialRender.current) {
            if (userData.email) {
                navigate('/', { replace: true });
            } else if (userData.loginFailed) {
                message.destroy();
                message.error('Invalid Credentials');
            }
        } else {
            initialRender.current = false;
        }
    }, [userData])

    const loginFunc = async () => {
        dispatch(login({ email, password }));  
    }

    return (
        <div className={classes.cover}>
            <div className={classes.centerBlock}>
                <div className={classes.body}>
                    <h1>SIGN IN</h1>
                    <Form onFinish={loginFunc} layout="vertical">
                        <Form.Item label="" name="email"
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Please input your email!',
                                        },
                                    ]}>
                            <Input placeholder='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="" name="password"
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Please input your password!',
                                        },
                                    ]}>
                            <Input.Password placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                SIGN IN
                            </Button>
                        </Form.Item>
                        <Link to='/register'>Sign Up</Link>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;