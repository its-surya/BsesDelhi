export const API_BASE_URL = 'https://api.guvnl.staging.ahasolar.co.in/api'

export const API_ENDPOINTS = {
  getInstallers: "/common/getInstallerList",
  getBillings : "/application/parameters",
  getDiscoms : "/master/discom-list",
  getOfficers : "/common/getNodalOfficerList",
  getCalculations : "/common/getCalculationDetails",
  getUpdatedCalculations : "/common/getUpdatedCapacity",
  getApplication : "/common/getApplicationByID",
  sendQuery : "/common/getContactUsDetails"
}

export interface BASE_RESPONSE<T> {
  success: boolean,
  statusCode: number,
  status: string,
  message: string,
  data: T | null
}