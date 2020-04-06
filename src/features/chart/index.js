import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export function Chart(props) {
    const { google } = window;
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    return (
        <div id="chart"></div>
    );
}

function drawChart(counties) {
    const custom_data = [
        {
            name: 'jefferson parish',
            "4/1/2020": 2000,
            "4/2/2020": 3000,
            "4/3/2020": 4000,
        },
        {
            name: 'orleans parish',
            "4/1/2020": 2500,
            "4/2/2020": 3500,
            "4/3/2020": 4500,
        }
    ];
    const arrayDataTable = [];

    // get county names
    const county_names = custom_data.map(x => x.name);
    arrayDataTable.push([ 'Dates', ...county_names ]);

    // get dates
    const first_county = custom_data[0];
    const dates = [];
    for (const property in first_county) {
        if (property !== 'name') {
            dates.push(property);
        }
    }

    for (const date of dates) {
        const date_row = [date];
        for (const county of custom_data) {
            const d = county[date];
            date_row.push(d);
        }
        arrayDataTable.push(date_row);
    }

    console.log(arrayDataTable);

    // Create the data table.
    var data = window.google.visualization.arrayToDataTable(arrayDataTable);

    // Set chart options
    var options = {title: 'Number of confirmed cases', width:600, 
    legend: { position: 'bottom' }};

    // Instantiate and draw our chart, passing in some options.
    var chart = new window.google.visualization.LineChart(document.getElementById('chart'));
    chart.draw(data, options);
  }