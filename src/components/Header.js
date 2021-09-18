import React, { Component } from 'react';
import { Button } from '@mui/material';

const headerContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    color: 'white',
    padding: '0.5% 1%'
}

class Header extends Component {
    render () {
        return (
            <div style={headerContainer}>
                <p>Expense Manager</p>
                <div>
                <Button style={{ border: '1px solid white', color: 'white' }}>Logout</Button>
                </div>
            </div>
        )

    }
}

export default Header;