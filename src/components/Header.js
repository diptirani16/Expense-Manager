import React, { Component } from 'react';
import { Menu, MenuItem, Toolbar, AppBar, Typography, Box, IconButton, ListItemText, ListItemIcon } from '@mui/material';
import { Home, BarChart, Logout } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu';
import auth from './Auth';
import { withRouter } from 'react-router-dom';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 1,
            anchorEl: null
        }

        this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.handleStats = this.handleStats.bind(this);
    }

    handleProfileMenuOpen(event) {
        this.setState({
            anchorEl: event.currentTarget

        })
    }

    handleLogout() {
        auth.logout(() => {
            localStorage.removeItem('token')
            this.props.history.push('/');
        })

        this.setState({
            anchorEl: null
        })
    }

    handleHome() {
        auth.login(() => {
            this.props.history.push('/home');
        })

        this.setState({
            anchorEl: null
        })
    }

    handleStats() {
        auth.login(() => {
            this.props.history.push('/stats');
        })

        this.setState({
            anchorEl: null
        })
    }

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{ position: "fixed" }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }} >
                            Expense Manager
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton size="large" edge="end" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={this.handleProfileMenuOpen} color="inherit" >
                                <MenuIcon />
                            </IconButton>
                            <Menu id="menu-appbar" anchorEl={this.state.anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={Boolean(this.state.anchorEl)} onClose={this.handleClose} >
                                <MenuItem onClick={this.handleHome}>
                                    <ListItemIcon>
                                        <Home fontsize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Home</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={this.handleStats}>
                                    <ListItemIcon>
                                        <BarChart fontsize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Stats</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={this.handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontsize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Logout</ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        )

    }
}

export default withRouter(Header);