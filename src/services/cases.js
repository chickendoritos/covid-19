import axios from 'axios';
import csv from 'csvtojson';

const confirmed_cases_url = 'https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv';

const load_cases = async () => {
    const response = await axios.get(confirmed_cases_url);
    return csv({ output: "json" })
      .fromString(response.data)
      .then((jsonObj)=> {
        return jsonObj;
      });
};

export { load_cases };