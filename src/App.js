import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Chart from './Chart'

//CSS
import './App.css';
import 'react-tabs/style/react-tabs.css';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataMin: [],
      dataMin5: [],
      dataHour: [],
      dataWeek: [],
      urls: {
        min: 'https://www.fxempire.com/api/v1/en/markets/eur-usd/chart?time=MIN_1',
        min5: 'https://www.fxempire.com/api/v1/en/markets/eur-usd/chart?time=MIN_5',
        hour: 'https://www.fxempire.com/api/v1/en/markets/eur-usd/chart?time=HOUR_1',
        week: 'https://www.fxempire.com/api/v1/en/markets/eur-usd/chart?time=WEEK_1'
      }
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    try {
      let [dataMin, dataMin5, dataHour, dataWeek] = await Promise.all([
        fetch(this.state.urls.min).then(dataMin => dataMin.json()),
        fetch(this.state.urls.min5).then(dataMin5 => dataMin5.json()),
        fetch(this.state.urls.hour).then(dataHour => dataHour.json()),
        fetch(this.state.urls.week).then(dataWeek => dataWeek.json())
      ])
      this.setState(
        {
          dataMin,
          dataMin5,
          dataHour,
          dataWeek
        });

    }
    catch (err) {
      console.log(err);
    };
  }

  render() {
    return (
      <div className="App">
        <h1 className="Fxtitle">FX CHARTS</h1>
        <Tabs>
          <TabList>
            <Tab>1 Min</Tab>
            <Tab>5 Min</Tab>
            <Tab>1 Hour</Tab>
            <Tab>1 Week</Tab>
          </TabList>

          <TabPanel>
            <Chart idChart="min" chartData={this.state.dataMin} />
          </TabPanel>
          <TabPanel>
            <Chart idChart="min5" chartData={this.state.dataMin5} />
          </TabPanel>
          <TabPanel>
            <Chart idChart="hour" chartData={this.state.dataHour} />
          </TabPanel>
          <TabPanel>
            <Chart idChart="week" chartData={this.state.dataWeek} />
          </TabPanel>

        </Tabs>
      </div>
    );
  }
}

export default App;
