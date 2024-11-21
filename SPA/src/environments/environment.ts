export const environment = {
  apiUrl: 'https://localhost:5001/api',
  endpoints: {
    staff: '/Staff',
    totalRecordsStaff: '/totalRecords',
    operationTypes: '/OperationTypes',
    specialization: '/Specializations',
    rooms: '/SurgeryRoom',
    operationRequest: '/OperationRequest',
    operationRequestFilterByStatus: "/OperationRequest/list/?status=Picked",
    planning: "/Appointment/planning",
    appointment: "/Appointment",
  },
};
