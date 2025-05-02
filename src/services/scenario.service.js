const axios = require('axios');
const fs = require('fs');
const { generateToken } = require('./jwt.service');
const { getTenantName, getScenarioUrl } = require('./tenant.service');

const get = async (scenarioFile, scenarioName) => {
  try{
    const tenantName = getTenantName();
    const scenarioUrl = getScenarioUrl(tenantName);
    const authToken = generateToken(tenantName);

    const res = await axios.get(scenarioUrl, {
      headers: {
        'Authorization': 'Bearer ' + authToken
      }
    });

    let scenarioData = res.data
    if(!!scenarioName) scenarioData = scenarioData.filter(sc => sc.name == scenarioName);
    const scenario = JSON.stringify(scenarioData);

    fs.writeFileSync(scenarioFile, scenario, {encoding: 'utf-8'});
  } catch (error) {
    const message = error.response?.data || error.message;
    console.error(message);
  }
}

const set = async (scenarioFile, scenarioName) => {
  try{
    const tenantName = getTenantName();
    const scenarioUrl = getScenarioUrl(tenantName);
    const authToken = generateToken(tenantName);

    const scenarioFileData = fs.readFileSync(scenarioFile, "utf-8");
    let scenarioData = JSON.parse(scenarioFileData)
    if(!!scenarioName) scenarioData = scenarioData.filter(sc => sc.name == scenarioName);

    const res = await axios.post(scenarioUrl, scenarioData, {
      headers: {
        'Authorization': 'Bearer ' + authToken
      }
    });

    console.log(res.status, res.data);
  } catch (error) {
    const message = error.response?.data || error.message;
    console.error(message);
  }
}

module.exports = {
  get, set
}