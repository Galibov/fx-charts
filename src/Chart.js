import React, { Component } from 'react'
import ApexChart from "react-apexcharts";
export class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                title: {
                    text: 'CandleStick Chart',
                    align: 'left'
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                    tooltip: {
                        enabled: true
                    }
                }
            },
            series: []
        }
        this.parseDataChart = this.parseDataChart.bind(this)

    }
    componentDidMount() {
        this.parseDataChart()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.idChart !== prevProps.idChart || this.state.series.length === prevState.series.length) {
            this.parseDataChart()
        }

    }
    parseDataChart = async () => {
        let series = [{
            data: []
        }]
        if (this.props.chartData.length === 0) return
        this.props.chartData.map((item) => {
            let dataObj = {
                x: 0,
                y: []
            }
            dataObj.x = new Date(item.date)
            dataObj.y.push(item.open, item.high, item.low, item.close)
            series[0].data.push(dataObj)
            return series
        });
        this.setState({
            series
        })
    }

    render() {
        return (
            <div >
                <ApexChart options={this.state.options} series={this.state.series} type="candlestick" height="450" />
            </div>
        )
    }
}

export default Chart
