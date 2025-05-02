
const getTenantName = () => {
  return process.env.BOT_TENANT;
}

const getBaseUrl = () => {
  const region = process.env.BOT_REGION;
  return `https://${region}.healthbot.microsoft.com`;
}

const getBackupUrl = (tenantName) => {
  const base_url = getBaseUrl();
  return `${base_url}/api/account/${tenantName}/backup`;
}

module.exports = {
  getTenantName,
  getBackupUrl,
}