import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import moment from "moment";
import numeral from "numeral";
import cubejs from "@cubejs-client/core";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
am4core.useTheme(am4themes_animated);

const cubejsApi = cubejs('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY2hlbWEiOiJmdXN6cmV3cml0ZSIsImlhdCI6MTU4OTA3OTIxMiwiZXhwIjoxNTkxNjcxMjEyfQ.K_bGRJhw752hQxZqChrlJxmeADGnGdx-XdiWMudbmmM', {
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
            sourceFilter: "all",
            columnDefs: [
                {field: 'salesPerson'},
                {field: 'visits'},
                {field: 'dealUserCredit'},
                {field: 'eligibleOppEmail'},
                {field: 'appointmentsRatio'},
                {field: 'appointmentsCreated', filter: 'number', filterParams: {newRowsAction: 'keep'}},
                {field: 'day4Attempted', filter: 'number'},
                {field: 'day4NonSold', filter: 'number'},
                {field: 'day3Attempted', filter: 'number'},
                {field: 'day3NonSold', filter: 'number'},
                {field: 'mobile', filter: 'number'},
                {field: 'proposalCount', filter: 'number'},
                {field: 'soldCount', filter: 'number'},
                {field: 'soldRatio', filter: 'number'},
                {field: 'deliveredRatio', filter: 'number'},
                {field: 'deliveredCount', filter: 'number'},
                {field: 'nonSoldTraffic', filter: 'number'},
                {field: 'eligibleCall', filter: 'number'},
                {field: 'callAttempted', filter: 'number'},
                {field: 'callRatio', filter: 'number'},
                {field: 'eligibleText', filter: 'number'},
                {field: 'textRatio', filter: 'number'},
                {field: 'eligibleEmail', filter: 'number'},
                {field: 'emailAttempted', filter: 'number'},
                {field: 'emailRatio', filter: 'number'},
                {field: 'eligibleVideo', filter: 'number'},
                {field: 'videoSent', filter: 'number'},
                {field: 'videoRatio', filter: 'number'}
            ]
        };
        this.agGridData(this.state.statusFilter);
    }

    changeFilter(filter) {
        this.setState({
            ...this.state,
            statusFilter: filter
        });
        this.agGridData(filter);
    }

    handleChange(event, index, value) {
        //set selection to the value selected
        this.setState({ sourceFilter : value });
        const name = event.target.name;
        this.agGridData(name);
    }

    agGridData(filter) {
        var start = new Date().getTime();
        let statusFilterObj = null;
        console.log(filter);
        const d = new Date();
        const date = new Date();
        if (filter === '1 Year') {
            d.setFullYear(d.getFullYear() - 1);
        } else if (filter === '6 Months') {
            d.setMonth(d.getMonth() - 6);
        } else {
            d.setMonth(d.getMonth() - 3);
        }
        statusFilterObj = {
            member: "vo.source",
            operator: "equals",
            values: ['Phone']
        };
        console.log(statusFilterObj);

        cubejsApi
            .load({
                measures: [
                    "vo.visits",
                    "vo.dealUserCredit",
                    "vo.eligibleOppEmail",
                    "vo.appointmentsRatio",
                    "vo.appointmentsCreated",
                    "vo.day4Attempted",
                    "vo.day4NonSold",
                    "vo.day3Attempted",
                    "vo.day3NonSold",
                    "vo.mobile",
                    "vo.proposalCount",
                    "vo.soldCount",
                    "vo.soldRatio",
                    "vo.deliveredCount",
                    "vo.deliveredRatio",
                    "vo.nonSoldTraffic",
                    "vo.eligibleCall",
                    "vo.callAttempted",
                    "vo.callRatio",
                    "vo.eligibleText",
                    "vo.textAttempted",
                    "vo.textRatio",
                    "vo.eligibleEmail",
                    "vo.emailAttempted",
                    "vo.emailRatio",
                    "vo.eligibleVideo",
                    "vo.videoSent",
                    "vo.videoRatio",
                ],
                timeDimensions: [{"dimension":"vo.visitDate","dateRange": [d.toISOString().slice(0,10), date.toISOString().slice(0,10)] }],
                dimensions: ["vo.salesPerson"],
                filters: [statusFilterObj]
            })
            .then(resultSet => {
                var end = new Date().getTime();
                console.log('Performance', end - start);
                console.log('add', resultSet);
                let data = [];
                resultSet.loadResponse.data.forEach((result) => {
                    data.push({
                        salesPerson: result['vo.salesPerson'],
                        visits: result['vo.visits'],
                        dealUserCredit: result['vo.dealUserCredit'],
                        eligibleOppEmail: result['vo.eligibleOppEmail'],
                        appointmentsRatio: result['vo.appointmentsRatio'],
                        appointmentsCreated: result['vo.appointmentsCreated'],
                        day4Attempted: result['vo.day4Attempted'],
                        day4NonSold: result['vo.day4NonSold'],
                        day3Attempted: result['vo.day3Attempted'],
                        day3NonSold: result['vo.day3NonSold'],
                        mobile: result['vo.mobile'],
                        proposalCount: result['vo.proposalCount'],
                        soldCount: result['vo.soldCount'],
                        soldRatio: result['vo.soldRatio'],
                        deliveredCount: result['vo.deliveredCount'],
                        deliveredRatio: result['vo.deliveredRatio'],
                        nonSoldTraffic: result['vo.nonSoldTraffic'],
                        eligibleCall: result['vo.eligibleCall'],
                        callAttempted: result['vo.callAttempted'],
                        callRatio: result['vo.callRatio'],
                        eligibleText: result['vo.eligibleText'],
                        textAttempted: result['vo.textAttempted'],
                        textRatio: result['vo.textRatio'],
                        eligibleEmail: result['vo.eligibleEmail'],
                        emailAttempted: result['vo.emailAttempted'],
                        emailRatio: result['vo.emailRatio'],
                        eligibleVideo: result['vo.eligibleVideo'],
                        videoSent: result['vo.videoSent'],
                        videoRatio: result['vo.videoRatio']
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
            member: "VisitDelivered.visitDate",
            operator: "afterDate",
            values: [d.toISOString().slice(0,10)]
        };
        cubejsApi
            .load({
                measures: ["VisitDelivered.count"],
                dimensions: ["VisitDelivered.source"],
                filters: [statusFilterObj],
                order: {
                    'VisitDelivered.visitDate': 'desc'
                },
            })
            .then(resultSet => {

                let chart = am4core.create("chartBarDiv", am4charts.XYChart3D);
                let data = [];
                resultSet.loadResponse.data.forEach((result) => {
                    data.push({ source: result['VisitDelivered.source'], visits: result['VisitDelivered.count'], 'color': chart.colors.next()});
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
        {/*<Row>*/}
        {/*  <Col sm="12">*/}
        {/*    <Chart*/}
        {/*        cubejsApi={cubejsApi}*/}
        {/*        title="Total Visits"*/}
        {/*        query={{ measures: ["Visits.count"] }}*/}
        {/*        render={resultSet => renderSingleValue(resultSet, "Visits.count")}*/}
        {/*    />*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        {/*<br />*/}
        {/*<br />*/}
        {/*<Row>*/}
        {/*  <Col sm="12">*/}
        {/*    <Chart*/}
        {/*      cubejsApi={cubejsApi}*/}
        {/*      title="Visits Over Time"*/}
        {/*      query={{*/}
        {/*        measures: ["Visits.count"],*/}
        {/*        timeDimensions: [*/}
        {/*          {*/}
        {/*            dimension: "Visits.visitDate",*/}
        {/*            dateRange: ["2019-01-01", "2019-12-31"],*/}
        {/*            granularity: "month"*/}
        {/*          }*/}
        {/*        ]*/}
        {/*      }}*/}
        {/*      render={resultSet => (*/}
        {/*        <ResponsiveContainer width="100%" height={300}>*/}
        {/*          <AreaChart data={resultSet.chartPivot()}>*/}
        {/*            <XAxis dataKey="category" tickFormatter={dateFormatter} />*/}
        {/*            <YAxis tickFormatter={numberFormatter} />*/}
        {/*            <Tooltip labelFormatter={dateFormatter} />*/}
        {/*            <Area*/}
        {/*              type="monotone"*/}
        {/*              dataKey="Visits.count"*/}
        {/*              name="Visits"*/}
        {/*              stroke="rgb(106, 110, 229)"*/}
        {/*              fill="rgba(106, 110, 229, .16)"*/}
        {/*            />*/}
        {/*          </AreaChart>*/}
        {/*        </ResponsiveContainer>*/}
        {/*      )}*/}
        {/*    />*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        {/*  <br/>*/}
        {/*  <Row>*/}
        {/*     <Col>*/}
        {/*         <div className="card">*/}
        {/*             <div className="card-body">*/}
        {/*                 <h5 className="card-title">Visits Over Time</h5>*/}
        {/*                 <p className="card-text">*/}
        {/*                     <div id="chartdiv" style={{ width: "100%", height: "500px" }} onLoad={this.chartJsData()}></div>*/}
        {/*                 </p>*/}
        {/*             </div>*/}
        {/*         </div>*/}
        {/*     </Col>*/}
        {/*  </Row>*/}
        {/*  <br/>*/}
        {/*  <Row>*/}
        {/*      <Col>*/}
        {/*          <div className="card">*/}
        {/*              <div className="card-body">*/}
        {/*                  <h5 className="card-title">Visits Over Time</h5>*/}
        {/*                  <ButtonGroup style={{ padding: "24px 24px 0 24px" }} color="primary">*/}
        {/*                      {["3 Months", "6 Months", "1 Year"].map(value => (*/}
        {/*                          <Button*/}
        {/*                              variant={value === this.state.statusFilter ? "contained" : ""}*/}
        {/*                              onClick={() => this.changeFilter(value)}>*/}
        {/*                              {value.toUpperCase()}*/}
        {/*                          </Button>*/}
        {/*                      ))}*/}
        {/*                  </ButtonGroup>*/}
        {/*                  <p className="card-text">*/}
        {/*                      <div id="chartBarDiv" style={{ width: "100%", height: "500px" }} onLoad={this.chartBarData(this.state.statusFilter)}></div>*/}
        {/*                  </p>*/}
        {/*              </div>*/}
        {/*          </div>*/}
        {/*      </Col>*/}
        {/*  </Row>*/}
        {/*  <br/>*/}
          <Row>
              <Col>
                  <div className="card">
                      <div className="card-body">
                          <h5 className="card-title">Visits Over Time</h5>
                          <ButtonGroup style={{ padding: "24px 24px 0 24px" }} color="primary">*/}
                            {["3 Months", "6 Months", "1 Year"].map(value => (
                                <Button
                                    variant={value === this.state.statusFilter ? "contained" : ""}
                                    onClick={() => this.changeFilter(value)}>
                                    {value.toUpperCase()}
                                </Button>
                            ))}
                        </ButtonGroup>
                          <br/>
                          {/*<FormControl>*/}
                          {/*    <InputLabel htmlFor="age-native-helper">Source</InputLabel>*/}
                          {/*    <NativeSelect*/}
                          {/*        value={this.state.sourceFilter}*/}
                          {/*        onChange={this.handleChange}*/}
                          {/*    >*/}
                          {/*        <option aria-label="All" value="all" />*/}
                          {/*        <option value={'Phone'}>Phone</option>*/}
                          {/*        <option value={'Internet'}>Internet</option>*/}
                          {/*        <option value={'Chat'}>Chat</option>*/}
                          {/*        <option value={'Campaign'}>Campaign</option>*/}
                          {/*        <option value={'Showroom'}>Showroom</option>*/}
                          {/*    </NativeSelect>*/}
                          {/*    <FormHelperText>Select a source</FormHelperText>*/}
                          {/*</FormControl>*/}
                          <br/>
                          <p className="card-text">
                              <div className="ag-theme-balham" style={ {height: '600px', width: '100%'} }  >
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
          <br/>
          <br/>
      </Container>
    );
  }
}

export default App;

