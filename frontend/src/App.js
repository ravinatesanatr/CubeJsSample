import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import moment from "moment";
import numeral from "numeral";
import cubejs from "@cubejs-client/core";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Chart from "./Chart.js";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

const cubejsApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
  apiUrl: process.env.REACT_APP_API_URL
});
const numberFormatter = item => numeral(item).format("0,0");
const dateFormatter = item => moment(item).format("MMM YY");

const renderSingleValue = (resultSet, key) => (
  <h1 height={300}>{numberFormatter(resultSet.chartPivot()[0][key])}</h1>
);

class App extends Component {

        constructor(props) {
        super(props);
        this.state = { statusFilter: '3 Months',

            columnDefs: [
                {field: 'visitDate'},
                {field: 'source'},
                {field: 'storeId'},
                {field: 'sales1UserId'},
                {field: 'sales2UserId'},
                {field: 'dealUserCredit', filter: 'number', filterParams: {newRowsAction: 'keep'}},
                {field: 'visits', filter: 'number'},
                {field: 'eligibleOppEmail', filter: 'number'},
                {field: 'mobile', filter: 'number'},
                {field: 'proposalCount', filter: 'number'},
                {field: 'proposalRatio', filter: 'number'},
                {field: 'soldCount', filter: 'number'},
                {field: 'soldRatio', filter: 'number'},
                {field: 'deliveredCount', filter: 'number'},
                {field: 'deliveredRatio', filter: 'number'},
                {field: 'nonSoldTraffic', filter: 'number'}
            ]
        };
        this.agGridData()
    }


    changeFilter(filter) {
        this.setState({
            ...this.state,
            statusFilter: filter
        });
    }

    agGridData() {
        cubejsApi
            .load({
                measures: [],
                dimensions: ["Visits.source",
                    "Visits.visitDate",
                    "Visits.storeId",
                    "Visits.sales1UserId",
                    "Visits.sales2UserId",
                    "Visits.dealUserCredit",
                    "Visits.visits",
                    "Visits.eligibleOppEmail",
                    "Visits.mobile",
                    "Visits.proposalCount",
                    "Visits.proposalRatio",
                    "Visits.soldCount",
                    "Visits.soldRatio",
                    "Visits.deliveredCount",
                    "Visits.deliveredRatio",
                    "Visits.nonSoldTraffic",
                ],
                order: {
                    'Visits.visitDate': 'desc'
                },
                filters: [
                    {
                        member: "Visits.source",
                        operator: "equals",
                        values: ['Phone']
                    }
                ]
            })
            .then(resultSet => {
                console.log(resultSet);
                let data = [];
                resultSet.loadResponse.data.forEach((result) => {
                    data.push({
                        visitDate: result['Visits.visitDate'],
                        source: result['Visits.source'],
                        storeId: result['Visits.storeId'],
                        sales1UserId: result['Visits.sales1UserId'],
                        sales2UserId: result['Visits.sales2UserId'],
                        dealUserCredit: result['Visits.dealUserCredit'],
                        visits: result['Visits.visits'],
                        eligibleOppEmail: result['Visits.eligibleOppEmail'],
                        mobile: result['Visits.mobile'],
                        proposalCount: result['Visits.proposalCount'],
                        proposalRatio: result['Visits.proposalRatio'],
                        soldCount: result['Visits.soldCount'],
                        soldRatio: result['Visits.soldRatio'],
                        deliveredCount: result['Visits.deliveredCount'],
                        deliveredRatio: result['Visits.deliveredRatio'],
                        nonSoldTraffic: result['Visits.nonSoldTraffic']
                    });
                });
                this.setState({
                    ...this.state,
                    rowData: data
                });
            })
    }

    chartJsData = function() {
        cubejsApi
            .load({
                measures: ["Visits.count"],
                timeDimensions: [
                    {
                        dimension: "Visits.visitDate",
                        dateRange: ["2019-01-01", "2019-12-31"],
                        granularity: "month"
                    }
                ]
            })
            .then(resultSet => {

                let chart = am4core.create("chartdiv", am4charts.XYChart);

                chart.paddingRight = 20;

                let data = [];
                resultSet.loadResponse.data.forEach((result) => {
                    data.push({ date: result['Visits.visitDate.month'], name: "Visits", value: result['Visits.count']});
                });

                chart.data = data;

                let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
                dateAxis.renderer.grid.template.location = 0;

                let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.tooltip.disabled = true;
                valueAxis.renderer.minWidth = 35;

                let series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.dateX = "date";
                series.dataFields.valueY = "value";

                series.tooltipText = "{valueY.value}";
                chart.cursor = new am4charts.XYCursor();

                let scrollbarX = new am4charts.XYChartScrollbar();
                scrollbarX.series.push(series);
                chart.scrollbarX = scrollbarX;
            });
    };

    chartBarData = function(statusFilter) {
        const d = new Date();
        if (statusFilter === '1 Year') {
            d.setMonth(d.getMonth() - 15);
        } else if (statusFilter === '6 Months') {
            d.setMonth(d.getMonth() - 9);
        } else {
            d.setMonth(d.getMonth() - 6);
        }
        const statusFilterObj = {
            member: "Visits.visitDate",
            operator: "afterDate",
            values: [d.toISOString().slice(0,10)]
        };
        cubejsApi
            .load({
                measures: ["Visits.count"],
                dimensions: ["Visits.source"],
                filters: [statusFilterObj],
                order: {
                    'Visits.visitDate': 'desc'
                },
            })
            .then(resultSet => {

                let chart = am4core.create("chartBarDiv", am4charts.XYChart3D);
                let data = [];
                resultSet.loadResponse.data.forEach((result) => {
                    data.push({ source: result['Visits.source'], visits: result['Visits.count'], 'color': chart.colors.next()});
                });

                chart.data = data;

// Create axes
                let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "source";
                categoryAxis.renderer.inversed = true;

                chart.xAxes.push(new am4charts.ValueAxis());

// Create series
                let series = chart.series.push(new am4charts.ColumnSeries3D());
                series.dataFields.valueX = "visits";
                series.dataFields.categoryY = "source";
                series.name = "Visits";
                series.columns.template.propertyFields.fill = "color";
                series.columns.template.tooltipText = "{valueX}";
                series.columns.template.column3D.stroke = am4core.color("#fff");
                series.columns.template.column3D.strokeOpacity = 0.2;

            });
    };

    componentDidMount() {

    }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm="12">
            <Chart
                cubejsApi={cubejsApi}
                title="Total Visits"
                query={{ measures: ["Visits.count"] }}
                render={resultSet => renderSingleValue(resultSet, "Visits.count")}
            />
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col sm="12">
            <Chart
              cubejsApi={cubejsApi}
              title="Visits Over Time"
              query={{
                measures: ["Visits.count"],
                timeDimensions: [
                  {
                    dimension: "Visits.visitDate",
                    dateRange: ["2019-01-01", "2019-12-31"],
                    granularity: "month"
                  }
                ]
              }}
              render={resultSet => (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={resultSet.chartPivot()}>
                    <XAxis dataKey="category" tickFormatter={dateFormatter} />
                    <YAxis tickFormatter={numberFormatter} />
                    <Tooltip labelFormatter={dateFormatter} />
                    <Area
                      type="monotone"
                      dataKey="Visits.count"
                      name="Visits"
                      stroke="rgb(106, 110, 229)"
                      fill="rgba(106, 110, 229, .16)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            />
          </Col>
        </Row>
          <br/>
          <Row>
             <Col>
                 <div className="card">
                     <div className="card-body">
                         <h5 className="card-title">Visits Over Time</h5>
                         <p className="card-text">
                             <div id="chartdiv" style={{ width: "100%", height: "500px" }} onLoad={this.chartJsData()}></div>
                         </p>
                     </div>
                 </div>
             </Col>
          </Row>
          <br/>
          <Row>
              <Col>
                  <div className="card">
                      <div className="card-body">
                          <h5 className="card-title">Visits Over Time</h5>
                          <ButtonGroup style={{ padding: "24px 24px 0 24px" }} color="primary">
                              {["3 Months", "6 Months", "1 Year"].map(value => (
                                  <Button
                                      variant={value === this.state.statusFilter ? "contained" : ""}
                                      onClick={() => this.changeFilter(value)}>
                                      {value.toUpperCase()}
                                  </Button>
                              ))}
                          </ButtonGroup>
                          <p className="card-text">
                              <div id="chartBarDiv" style={{ width: "100%", height: "500px" }} onLoad={this.chartBarData(this.state.statusFilter)}></div>
                          </p>
                      </div>
                  </div>
              </Col>
          </Row>
          <br/>
          <Row>
              <Col>
                  <div className="card">
                      <div className="card-body">
                          <h5 className="card-title">Visits Over Time</h5>
                          <p className="card-text">
                              <div className="ag-theme-balham" style={ {height: '400px', width: '80%'} } >
                                  <AgGridReact
                                      columnDefs={this.state.columnDefs}
                                      rowData={this.state.rowData}>
                                  </AgGridReact>
                              </div>
                          </p>
                      </div>
                  </div>
              </Col>
          </Row>
      </Container>
    );
  }
}

export default App;

