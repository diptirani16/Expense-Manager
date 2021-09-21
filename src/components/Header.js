import React, { Component } from 'react';
import { Menu, MenuItem, Toolbar, AppBar, Typography, Box, IconButton, Dialog, List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { Home, BarChart, Logout } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 1,
            anchorEl: null
        }

        this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleProfileMenuOpen(event) {
        this.setState({
            anchorEl: event.currentTarget

        })
    }

    handleClose() {
        this.setState({
            anchorEl: null
        })
    }

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
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
                                <MenuItem onClick={this.handleClose}>
                                    <ListItemIcon>
                                        <Home fontsize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Home</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={this.handleClose}>
                                    <ListItemIcon>
                                        <BarChart fontsize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Stats</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={this.handleClose}>
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

export default Header;