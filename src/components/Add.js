import React, { Component } from 'react';
import { Fab, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { FormControl, Box, MenuItem, InputLabel, Select } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AddIcon from '@mui/icons-material/Add';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            type: '',
            category: '',
            note: '',
            amount: null,
            date: new Date()
        }

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.addData = this.addData.bind(this);
        this.handleAmount = this.handleAmount.bind(this);
        this.handleNote = this.handleNote.bind(this);
    }

    handleClickOpen() {
        this.setState({
            open: true
        })
    }

    handleClose() {
        this.setState({
            open: false
        })
    }

    handleType(event) {
        this.setState({
            type: event.target.value
        })
    }

    handleCategory(event) {
        this.setState({
            category: event.target.value
        })
    }
    handleAmount(event) {
        this.setState({
            amount: event.target.value
        })
    }
    handleNote(event) {
        this.setState({
            note: event.target.value
        })
    }

    addData() {
        let token = localStorage.getItem('token')
        console.log(token);

        const { type, category, amount, note, date } = this.state;

        fetch('https://expense.spacenditure.com/api/expense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                'type': type,
                'category': category,
                'amount': amount,
                'note': note,
                'date': date
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    open: false,
                })
                if (data.amount) {
                    this.props.updateState([data, ...this.props.result])

                }
            })

    }

    render() {
        return (
            <>
                <Fab color="secondary" aria-label="Add" style={{ position: 'fixed', right: '15%', bottom: '15%' }} onClick={this.handleClickOpen}>
                    <AddIcon />
                </Fab>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Add</DialogTitle>
                    <DialogContent>
                        <Box sx={{ my: 1, minWidth: 120 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker renderInput={(props) => <TextField {...props} />} label="DateTimePicker"
                                    value={this.state.date} onChange={(newValue) => {
                                        this.setState({
                                            date: newValue
                                        })
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ my: 2, minWidth: 120 }}>
                            <FormControl size="small" fullWidth>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={this.state.type} label="Type" onChange={this.handleType} >
                                    <MenuItem value="Expense">Expense</MenuItem>
                                    <MenuItem value="Income">Income</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ my: 2, minWidth: 120 }}>
                            <FormControl size="small" fullWidth>
                                {this.state.type === 'Expense' ?
                                    <>
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={this.state.category} label="Category" onChange={this.handleCategory} >
                                            <MenuItem value="Education">Education</MenuItem>
                                            <MenuItem value="Housing & Household Supplies">Housing & Household Supplies</MenuItem>
                                            <MenuItem value="Food">Food</MenuItem>
                                            <MenuItem value="Rent & Loyality">Rent & Loyality</MenuItem>
                                            <MenuItem value="Transportation">Transportation</MenuItem>
                                            <MenuItem value="Recreation & Entertainment">Recreation & Entertainment</MenuItem>
                                            <MenuItem value="Health">Health</MenuItem>
                                            <MenuItem value="Beauty">Beauty</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </Select>
                                    </>
                                    :
                                    <>
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={this.state.category} label="Category" onChange={this.handleCategory} >
                                            <MenuItem value="Salary">Salary</MenuItem>
                                            <MenuItem value="Allowance">Allowance</MenuItem>
                                            <MenuItem value="Petty Cash">Petty Cash</MenuItem>
                                            <MenuItem value="Bonus">Bonus</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </Select>
                                    </>
                                }
                            </FormControl>
                        </Box>
                        <Box>
                            <TextField margin="dense" id="name" label="Amount" type="number" fullWidth variant="standard" size="small" onChange={this.handleAmount} value={this.state.amount} />
                            <TextField sx={{ my: 1 }} id="standard-textarea" label="Note" fullWidth placeholder="Placeholder" multiline variant="standard" onChange={this.handleNote} value={this.state.note} />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.addData} variant="contained" size="small">ADD</Button>
                        <Button onClick={this.handleClose} color="inherit">CANCEL</Button>
                    </DialogActions>
                </Dialog>

            </>
        )
    }
}

export default Add;
