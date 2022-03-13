import { useEffect, useState, useRef } from 'react';
import { Form, Input, Button, message, Checkbox } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import classes from '../login/Login.module.scss';
import { register } from '../../store/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [terms, setTerms] = useState(false);
    const navigate = useNavigate();
    const initialRender = useRef(true);

    const userAdded = useSelector(state => state.auth.userAdded);

    useEffect(() => {
        if (!initialRender.current) {
            if (userAdded.id) {
                message.success('Successfully registered! You can sign in now.');
                navigate('/login', { replace: true });
            } else {
                message.destroy();
                message.error(userAdded.message || 'Register Failed');
            }
        } else {
            initialRender.current = false;
        }
    }, [userAdded])

    const registerFunc = async () => {
        const emailRegexp = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (!emailRegexp.test(email)) {
            return message.error('Please provide valid email');
        }
        if (password.length < 8) {
            return message.error('Password should be at least 8 characters long');
        }
        if (password !== confirmPassword) {
            return message.error('Password should match');
        }
        if (!terms) {
            return message.error('Please check terms');
        }
        dispatch(register({ name, surname, email, password }));      
    }

    const backgroundImage = "sign_up.png";

    return (
        <div className={classes.cover} style={{'backgroundImage': `url(${backgroundImage})`}}>
            <div className={classes.centerBlock}>
                <div className={classes.body}>
                    <h1>SIGN UP</h1>
                    <Form onFinish={registerFunc} layout="vertical">
                        <Form.Item  name="name"
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Please input your name!',
                                        },
                                    ]}>
                            <Input placeholder='Name' name='name' value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Item>
                        <Form.Item  name="surname"
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Please input your surname!',
                                        },
                                    ]}>
                            <Input placeholder='Surname' name='surname' value={surname} onChange={(e) => setSurname(e.target.value)} />
                        </Form.Item>
                        <Form.Item  name="email"
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Please input your email!',
                                        },
                                    ]}>
                            <Input placeholder='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Item>
                        <Form.Item  name="password"
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Please input your password!',
                                        },
                                    ]}>
                            <Input.Password placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Item>
                        <Form.Item name="confirmPassword"
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Please input your confirm password!',
                                        },
                                    ]}>
                            <Input.Password placeholder='Confirm Password' name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox value={terms} onChange={() => setTerms(prevState => !prevState)}>
                                <span className={classes.terms}>I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong></span>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                SIGN UP
                            </Button>
                        </Form.Item>
                        <Link to='/login'>Sign In</Link>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register;