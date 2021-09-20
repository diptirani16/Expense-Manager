import React, { Component } from 'react';
import Header from './Header';
import Add from './Add';
import DeleteData from './Delete';
import EditData from './Edit'
import './HomePage.css';
import { Chip, Divider, Typography, Container, Paper } from '@mui/material';
import { AccessTime, MonetizationOn } from '@mui/icons-material';

const Months = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "June",
    6: "July",
    7: "Aug",
    8: "Sept",
    9: "Oct",
    10: "Nov",
    11: "Dec"
}

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            open: false
        }
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        console.log(token);

        fetch('https://expense.spacenditure.com/api/expense?page=1', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    result: data.result
                })
                console.log(this.state.result)
            })
    }

    updateState (newData) {
        this.setState({
            result: newData
        })
    }


    render() {
        return (
            <div>
                <Header />
                {this.state.result.map(i =>
                    <Container maxWidth="800px">
                        <div className="row" key={i._id}>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Paper variant="outlined" sx={{ backgroundColor: "#1c7ed6", color: "white"}}>
                                    <Typography variant="h6" gutterBottom style={{ width: '5vw', marginLeft: '2vw'}} component="div">{new Date(i.date).getDate()}</Typography>
                                    <Typography variant="h6" gutterBottom style={{ width: '5vw', marginLeft: '2vw'}}>{Months[new Date(i.date).getMonth()]}</Typography>
                                </Paper>
                                <Divider orientation="vertical" color="success" flexItem />
                                <div style={{ marginLeft: '3vw' }}>
                                    {i.type === 'Expense' ?
                                        <Chip size="small" label={i.amount} icon={<MonetizationOn />} color="error" /> :
                                        <Chip size="small" label={i.amount} icon={<MonetizationOn />} color="success" />}
                                        <Chip sx={{ mx: 2}} size="small" icon={<AccessTime />} label={new Date(i.date).getHours() + ":" + new Date(i.date).getMinutes()} variant="outlined" />
                                    <Typography variant="subtitle1" style={{ marginTop: '2vh' }} gutterBottom component="div">{i.category}</Typography>
                                    <Typography variant="body2" gutterBottom>{i.note}</Typography>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1.5em', alignSelf: 'center' }}>
                                <EditData id={i._id} result={this.state.result} updateState={this.updateState}/>
                                <DeleteData result={this.state.result} id={i._id} updateState={this.updateState} />    
                            </div>
                        </div>
                    </Container>
                )}

                <Add result={this.state.result} updateState={this.updateState}/>

            </div>
        )
    }
}

export default HomePage;