export const environment = {
  apiUrl: 'https://localhost:5001/api',
  authApiUrl: 'https://localhost:7058',
  endpoints: {
    staff: '/Staff',
    login: '/Auth/Login/loginDto',
    registerNewPatientUser: '/users/createPatient',
    totalRecordsStaff: '/totalRecords',
    patient: '/Patient',
    operationTypes: '/OperationTypes',
    specialization: '/Specializations',
    rooms: '/SurgeryRoom',
    operationRequest: '/OperationRequest',
    operationRequestFilterByStatus: "/OperationRequest/list/?status=Picked",
    planning: "/Appointment/planning",
    appointment: "/Appointment",
  },
};
