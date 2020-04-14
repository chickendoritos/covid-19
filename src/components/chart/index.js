import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

export function Chart(props) {
    const { google } = window;
    const { name, data } = props;
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(() => drawChart(data, name));
    return (
        <div id={`chart_${name}`} style={{width: '100%', height: '500px'}}></div>
    );
}

function drawChart(cases, name) {
    const arrayDataTable = [];

    // get county names
    const county_names = cases.map(x => `${x['County Name']}, ${x.State}`);
    arrayDataTable.push([ 'Dates', ...county_names ]);

    const date_regex = RegExp(/^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})$/);
    const first_county = cases[0];
    let d = new Date();
    d.setDate(d.getDate() - 14);

    // Loop through properties of a county
    for (const property in first_county) {
        // If property of county is a date
        if (date_regex.test(property)) {
            const prop_date = new Date(property);
            // If property is a date that is greater than 14 days ago
            if (prop_date >= d) {
                // Set date format be Mar 01
                const new_prop_name = moment(prop_date).format('MMM DD');

                // Put formatted date as first in the date row
                const date_row = [new_prop_name];

                // Get number of confirmed cases from other counties
                for (const c of cases) {
                    date_row.push(Number(c[property]));
                }

                // Push to data table
                arrayDataTable.push(date_row);
            }
        }
    }

    // Create the data table.
    var data = window.google.visualization.arrayToDataTable(arrayDataTable);

    const chart_element = document.getElementById(`chart_${name}`);
    const app_element = document.getElementById(`app`);
    console.log("app_element",app_element.offsetWidth);

    // Set chart options
    var options = { title: 'Number of confirmed cases',// height: 1000, width: 1700,
    legend: { position: 'bottom' }};

    // Instantiate and draw our chart, passing in some options.
    
    var chart = new window.google.visualization.LineChart(chart_element);
    chart.draw(data, options);
}