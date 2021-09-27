import * as React from 'react';
import { Tab, Box } from '@mui/material/';
import Typography from '@mui/material/Typography';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import LineChart from './graphs/LineChart';
import PieGraph from './graphs/PieChart';
import BarGraph from './graphs/BarChart';
import Header from './Header';
import { BarChart, PieChart, ShowChart } from '@mui/icons-material';


class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "1",
            categoryData: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, newValue) {
        this.setState({
            value: newValue
        })
        console.log(this.state.value)
    }

    render() {
        return (
            <>
            <Header />
                <TabContext value={this.state.value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingTop: '80px', minHeight: '0px' }}> 
                        <TabList onChange={this.handleChange} aria-label="basic tabs example" centered>
                            <Tab icon={<ShowChart />} label="Line Graph" value={"1"} />
                            <Tab icon={<PieChart />} label="Pie Chart" value={"2"} />
                            <Tab icon={<BarChart />} label="Bar Graph" value={"3"} />
                        </TabList>
                    </Box>
                               
                    <TabPanel value={"1"}>
                        <LineChart />
                    </TabPanel>
                    <TabPanel value={"2"}>
                        <PieGraph />
                    </TabPanel>
                    <TabPanel value={"3"}>
                        <BarGraph />
                    </TabPanel>
                </TabContext>
            </>
        );
    }
}

export default Stats;