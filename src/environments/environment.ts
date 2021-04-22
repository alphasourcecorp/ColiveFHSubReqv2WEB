// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  menuItemsJsonUrl: 'https://foodyhivestorage.blob.core.windows.net/assets/data/subscription-requests.json',
  subscriptionRequestServiceUrl: 'https://colivefoodyhivesubscriptionrequest-v2.azurewebsites.net/api/SubscriptionRequest/Create',
  loginUrl:"https://colivefoodyhivesubscriptionrequest-v2.azurewebsites.net/api/UserLogin/userlogin",
  addScheduleUrl:"https://colivefoodyhivesubscriptionrequest-v2.azurewebsites.net/api/Scheduling/addnewschedule",
  getScheduleUrl:"https://colivefoodyhivesubscriptionrequest-v2.azurewebsites.net/api/Scheduling/GetSchedulesByID",
  ScheduleListUrl:"https://colivefoodyhivesubscriptionrequest-v2.azurewebsites.net/api/Scheduling/GetSchedulesByID",
  DeleteScheduleUrl:"https://colivefoodyhivesubscriptionrequest-v2.azurewebsites.net/api/Scheduling/DeleteSchedule",
  RequestAdminListUrl:"https://colivefoodyhivesubscriptionrequest-v2.azurewebsites.net/api/SubscriptionRequest/GetAllRequestsListBy",
  EditScheduleUrl:"https://colivefoodyhivesubscriptionrequest-v2.azurewebsites.net/api/Scheduling/UpdateSchedule",
  updaterequestlistUrl:"https://colivefoodyhivesubscriptionrequest-v2.azurewebsites.net/api/SubscriptionRequest/UpdateRequest",
  DeleterequestlistUrl:"https://colivefoodyhivesubscriptionrequest-v2.azurewebsites.net/api/SubscriptionRequest/DeleteRequest",
  UpdateRequestStatusUrl:"https://colivefoodyhivesubscriptionrequest-v2.azurewebsites.net/api/SubscriptionRequest/UpdateRequestStatus",
  AddnewCompanyUrl:"https://colivefoodyhivesubscriptionrequest-v2.azurewebsites.net/api/CompanySignUp/RegisterNewCompany",
  GetallCompanyUrl:"https://colivefoodyhivesubscriptionrequest-v2.azurewebsites.net/api/CompanySignUp"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
