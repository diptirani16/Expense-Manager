import React, { Component } from 'react';
import Header from './Header';
import './HomePage.css'

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            result: []
        }
    }

    componentDidMount () {
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
            console.log(data)
        })
    }

    render () {
        return (
            <div>
                <Header />
                {this.state.result.map(i => 
                    <div className="row" key={i._id}>
                        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
                            <div style={{ width: '6vw', marginLeft: '2vw', display: 'flex', alignSelf: 'center'}}>{i.updatedAt}</div>
                            <div style={{ width: '0.3vw', backgroundColor: 'white'}}></div>
                            <div style={{ marginLeft: '3vw'}}>
                                { i.type === 'Expense' ? 
                                <p style= {{backgroundColor: 'green'}} className="amountStyle"><i className="fa fa-inr" style={{ marginRight: '0.5em'}} aria-hidden="true"></i>{i.amount}</p> : 
                                <p style={{backgroundColor: 'red'}} className="amountStyle"><i className="fa fa-inr" style={{ marginRight: '0.5em'}} aria-hidden="true"></i>{i.amount}</p> }
                                <p>{i.category}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1.5em', alignSelf: 'center'}}>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                            <i className="fa fa-trash" style={{ marginLeft: '1em'}} aria-hidden="true"></i>
                        </div>
                    </div>
                )}
                
                
            </div>
        )
    }
}

export default HomePage;