import { useState } from 'react';
import { Box, TextField, Button, styled} from '@mui/material';

import { API } from '../service/api';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100, 
    margin: 'auto',
    display: 'flex',
    padding: ' 50px 0 0 '

});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button{
        margin-top: 20px;
    }
`
const LoginButton = styled(Button)`
    text-transform: none;
    height: 40px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0  rgb(0 0 0/ 20%)
`
const SignupButton = styled(Button)`
    text-transform: none;
    height: 40px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0  rgb(0 0 0/ 20%)
`
const signupInitialValues = {
    name: '',
    username: '',
    password: ''
}
const Login = () => {
    const imageurl =  'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState('signup')
    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

const onInputChange = (e) => {
    setSignup({...signup, [e.target.name]:e.target.value});
}


const signupUser = async () => {
    let response = await API.userSignup(signup);
}

    

    return(
        <Component>
            <Box>
                <Image src={imageurl} alt="login"/>
                {
                    account === 'login' ?
                <Wrapper>
                    <TextField variant="standard" label="Enter Username" name="username"/>
                    <TextField variant="standard" label="Enter Password" name="password"/>
                    <LoginButton variant="contained">Login</LoginButton>
                    
                    <SignupButton onClick={()=> toggleSignup()}>Create an account</SignupButton>
                </Wrapper>
                :
                <Wrapper>
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name="name" label="Enter Name"/>
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name="username" label="Enter Username"/>
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name="password"  label="Enter Password"/>
                    <SignupButton onClick={()=> signupUser()}variant="contained">Sign Up</SignupButton>
                    <p>Already have an account?</p>
                    <LoginButton onClick={() => toggleSignup()}>Login</LoginButton>
                    
                    
                </Wrapper>
}
            </Box>
        </Component>
    )
}

export default Login;