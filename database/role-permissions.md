# Role-Based Access Control (RBAC)

This document defines which modules each user role can access in the ClinicCRM system.

## User Roles

- Admin
- Doctor
- Secretary

## Permissions

| Module | Admin | Doctor | Secretary |
|---------|:-----:|:------:|:---------:|
| Dashboard | ✅ | ✅ | ✅ |
| Patients | ✅ | Own Patients | ✅ |
| Appointments | ✅ | Own Appointments | Create / Update |
| Doctors | Manage | View | View Schedule |
| Payments | Full Access | No Access | Update Status |
| Consent Forms | Manage | View | Upload / Track |
| Reports | ✅ | ❌ | ❌ |
| Settings | ✅ | ❌ | ❌ |