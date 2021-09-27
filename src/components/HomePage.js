import React, { Component } from 'react';
import Header from './Header';
import Add from './Add';
import DeleteData from './Delete';
import EditData from './Edit'
import './HomePage.css';
import { Chip, Divider, Typography, Container, Paper, Stack, Pagination } from '@mui/material';
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
            open: false,
            total: 0,
            page: 1
        }
        this.updateState = this.updateState.bind(this);
        this.handlePage = this.handlePage.bind(this);        
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
                    result: data.result,
                    total: data.total
                })
                console.log(data)
            })
    }

    handlePage (pageNo) {
        let token = localStorage.getItem('token')
        fetch(`https://expense.spacenditure.com/api/expense?page=${pageNo}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    result: data.result,
                    total: data.total,
                    page: pageNo
                })
                console.log(data)
            })
        }

    updateState(newData) {
        this.setState({
            result: newData
        })
    }


    render() {
        return (
            <div>
                <Header />
                    <Container maxWidth="800px" style={{ paddingTop: '65px' }}>
                    {this.state.result.map(i =>
                        <div className="row" key={i._id}>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                {i.type === 'Expense' ? 
                                <><Paper variant="outlined" sx={{ border: "1px solid #db1d24", color: "#db1d24" }}> 
                                    <Typography variant="h6" gutterBottom style={{ width: '5vw', marginLeft: '2vw' }} component="div">{new Date(i.date).getDate()}</Typography>
                                    <Typography variant="h6" gutterBottom style={{ width: '5vw', marginLeft: '2vw' }}>{Months[new Date(i.date).getMonth()]}</Typography>
                                </Paper></> :
                                <><Paper variant="outlined" sx={{ border: "1px solid #2b8a3e", color: "#2b8a3e" }}>
                                    <Typography variant="h6" gutterBottom style={{ width: '5vw', marginLeft: '2vw' }} component="div">{new Date(i.date).getDate()}</Typography>
                                    <Typography variant="h6" gutterBottom style={{ width: '5vw', marginLeft: '2vw' }}>{Months[new Date(i.date).getMonth()]}</Typography>
                                </Paper></>
                                }
                                <Divider orientation="vertical" color="success" flexItem />
                                <div style={{ marginLeft: '3vw' }}>
                                    {i.type === 'Expense' ?
                                        <Chip size="small" label={i.amount} icon={<MonetizationOn />} color="error" /> :
                                        <Chip size="small" label={i.amount} icon={<MonetizationOn />} color="success" />}
                                    <Chip sx={{ mx: 2 }} size="small" icon={<AccessTime />} label={new Date(i.date).getHours() + ":" + new Date(i.date).getMinutes()} variant="outlined" />
                                    <Typography variant="subtitle1" style={{ marginTop: '2vh' }} gutterBottom component="div">{i.category}</Typography>
                                    <Typography variant="body2" gutterBottom>{i.note}</Typography>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1.5em', alignSelf: 'center' }}>
                                <EditData id={i._id} result={this.state.result} updateState={this.updateState} />
                                <DeleteData result={this.state.result} id={i._id} updateState={this.updateState} />
                            </div>
                        </div>
                )}
                </Container>

                <Add result={this.state.result} updateState={this.updateState} />
                <Stack spacing={2} position="fixed" bottom="2vh" left="35vw">
                    <Pagination count={Math.ceil(this.state.total / 10)} page={this.state.page} variant="outlined" color="primary" onChange={(_, page) => this.handlePage(page)} />
                </Stack>

            </div>
        )
    }
}

export default HomePage;