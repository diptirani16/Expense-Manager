import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import auth from './Auth';

import { withRouter } from 'react-router-dom'

const containerStyle = {
    width: '20%',
    backgroundColor: '#eae2e2',
    padding: '5%',
    position: 'absolute',
    left: '32%',
    top: '25%',
}

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword =this.handlePassword.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
    }

    handleUsername (event) {
        this.setState({
            username: event.target.value,
        })
    }
    
    handlePassword (event) {
        this.setState({
            password: event.target.value
        })
    }

    handleSubmit (event) {
        event.preventDefault();

        const { username, password } = this.state;

        fetch('https://expense.spacenditure.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${username}:${password}`)           
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.access_token) {
                localStorage.setItem('token', data.access_token);
                auth.login(() => {
                    this.props.history.push('/home');
                })
                
                console.log('token', data);
            } else throw new Error(data.detail)
        })
    }
    

    render() {
        return ( 
            <div style={containerStyle}>
                <form onSubmit={this.handleSubmit}>
                    <Stack spacing={2} direction="column">
                        <TextField id="outlined-basic" placeholder="Username" size="small" variant="outlined" onChange={this.handleUsername} value={this.state.username}/>
                        <TextField id="outlined-basic" type="password" placeholder="Password" size="small" variant="outlined" onChange={this.handlePassword} value={this.state.password}/>
                        <Button type="submit" variant="contained">Login</Button>
                    </Stack>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginPage);