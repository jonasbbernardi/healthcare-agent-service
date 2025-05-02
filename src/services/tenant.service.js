
const getTenantName = () => {
  return process.env.BOT_TENANT;
}

const getBaseUrl = (tenantName) => {
  const region = process.env.BOT_REGION;
  return `https://${region}.healthbot.microsoft.com/api/account/${tenantName}`;
}

const getBackupUrl = (tenantName) => {
  const base_url = getBaseUrl(tenantName);
  return `${base_url}/backup`;
}

const getScenarioUrl = (tenantName) => {
  const base_url = getBaseUrl(tenantName);
  return `${base_url}/scenarios`;
}

module.exports = {
  getTenantName,
  getBackupUrl,
  getScenarioUrl,
}