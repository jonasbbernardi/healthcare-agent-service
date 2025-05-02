const axios = require('axios');
const fs = require('fs');
const { generateToken } = require('./jwt.service');
const { getTenantName, getBackupUrl } = require('./tenant.service');

const get = async (backupFile) => {
  try{
    const tenantName = getTenantName();
    const backupUrl = getBackupUrl(tenantName);
    const authToken = generateToken(tenantName);

    const res = await axios.get(backupUrl, {
      headers: {
        'Authorization': 'Bearer ' + authToken
      }
    });

    const backup = res.data;
    fs.writeFileSync(backupFile, backup, {encoding: 'utf-8'});
  } catch (error) {
    const message = error.response?.data || error.message;
    console.error(message);
  }
}

const set = async (backupFile) => {
  try{
    const tenantName = getTenantName();
    const backupUrl = getBackupUrl(tenantName);
    const authToken = generateToken(tenantName);

    const backupData = fs.readFileSync(backupFile, "utf-8");

    const res = await axios.post(backupUrl, {
      hbs: backupData
    }, {
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

module.exports = { get, set }