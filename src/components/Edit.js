import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button, Tooltip, Fab } from '@mui/material';
import { Edit } from '@mui/icons-material';

class EditData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }

        this.handleOpenEditDialog = this.handleOpenEditDialog.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpenEditDialog() {
        this.setState({
            open: true
        })
    }
    handleClose () {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <>
                <Tooltip title="Edit" placement="top">
                    <Fab color="primary" size="small" aria-label="Edit" onClick={this.handleOpenEditDialog}>
                        <Edit />
                    </Fab>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <DialogTitle>
                        Do you really want to Edit this record?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This actions can't be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Disagree</Button>
                        <Button onClick={this.handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

export default EditData;