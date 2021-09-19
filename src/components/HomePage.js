import React, { Component } from 'react';
import Header from './Header';
import Add from './Add';
import DeleteData from './Delete';
import EditData from './Edit'
import './HomePage.css';
import { Chip, Divider, Fab, Tooltip, Typography, Container } from '@mui/material';
import { Edit } from '@mui/icons-material';

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
                                <div style={{ width: '6vw', marginLeft: '2vw', display: 'flex', alignSelf: 'center' }}>{new Date(i.date).getDate()}</div>
                                <Divider orientation="vertical" color="success" flexItem />
                                <div style={{ marginLeft: '3vw' }}>
                                    {i.type === 'Expense' ?
                                        <Chip label={i.amount} color="error" /> :
                                        <Chip label={i.amount} color="success" />}
                                    <Typography variant="subtitle1" style={{ marginTop: '2vh' }} gutterBottom component="div">{i.category}</Typography>
                                    <Typography variant="body2" gutterBottom>{i.note}</Typography>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1.5em', alignSelf: 'center' }}>
                                <EditData />
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