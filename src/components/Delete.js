import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button, Tooltip, Fab } from '@mui/material';
import { Delete } from '@mui/icons-material';

class DeleteData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            result: [],
            id: ''
        }

        this.handleOpenDeleteDialog = this.handleOpenDeleteDialog.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleOpenDeleteDialog() {
        this.setState({
            open: true
        })
    }
    handleClose () {
        this.setState({
            open: false
        })
    }

    handleDelete (id) {
        let token = localStorage.getItem('token');
        console.log(token);

        fetch(`https://expense.spacenditure.com/api/expense/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('successfull')
            this.setState({
                open: false
            })
            this.props.updateState(this.props.result.filter(r => r._id !== id))
        })

    }

    render() {
        return (
            <>
                <Tooltip title="Delete" placement="top">
                    <Fab style={{ marginLeft: '1em' }} size="small" aria-label="delete" onClick={this.handleOpenDeleteDialog}>
                        <Delete />
                    </Fab>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <DialogTitle>
                        Do you really want to delete this record?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This actions can't be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleDelete(this.props.id)} variant="contained" color="error" size="small">
                            DELETE
                        </Button>
                        <Button onClick={this.handleClose} color="inherit">CANCEL</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

export default DeleteData;