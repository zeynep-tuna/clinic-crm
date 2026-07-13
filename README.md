# ClinicCRM

ClinicCRM is a web-based clinic management system developed for small and medium-sized healthcare clinics.

## Project Description

ClinicCRM is designed to help healthcare clinics manage patients, appointments, doctors and payment processes from a single platform.

The project is being developed as a full-stack web application using modern technologies.

---

## Technologies

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- ASP.NET Core Web API
- Entity Framework Core

### Database

- SQL Server

---

## Planned Features

- Patient Management
- Appointment Management
- Doctor Management
- Payment Tracking
- Consent Forms
- Dashboard
- Authentication & Authorization

---

## User Roles

The system supports three different user roles:

| Role | Responsibility |
|------|----------------|
| Admin | Full system management |
| Doctor | Manage own patients and appointments |
| Secretary | Patient registration, appointments and payment tracking |

---

## Main Modules

- Dashboard
- Patient Management
- Appointment Management
- Doctor Management
- Payment Tracking
- Digital Consent Forms

---

## Project Structure

```text
ClinicCRM
│
├── assets
├── backend
│
├── database
│   ├── doctor-fields.md
│   ├── payment-fields.md
│   ├── payment-methods.md
│   ├── payment-status.md
│   ├── consent-form-fields.md
│   ├── consent-form-status.md
│   ├── consent-form-types.md
│   ├── role-permissions.md
│   └── user-roles.md
│
├── docs
│   ├── mock-data
│   │   ├── doctors.json
│   │   ├── payments.json
│   │   └── consent-forms.json
│   │
│   ├── api-design.md
│   ├── appointment-plan.md
│   ├── dashboard-plan.md
│   ├── patient-list-plan.md
│   └── patient-model.md
│
├── frontend
│   ├── app
│   ├── components
│   ├── data
│   └── public
│
└── README.md
```

---

## Week 1 Goals

- Define the project scope.
- Create the project structure.
- Set up the Next.js project.
- Build the first reusable React components.
- Prepare the landing page.
- Create the GitHub repository.

---

## Completed in Week 1

- Project repository created.
- Next.js project initialized.
- Folder structure prepared.
- FeatureCard component created.
- Landing page feature data prepared.
- First reusable React component tested successfully.

---

## Designed Screens

- Landing Page
- Login Page
- Dashboard
- Patient List
- Patient Detail
- Add Patient
- Appointments
- Doctors

---

## Role-Based Access

The ClinicCRM system uses role-based authorization to control access to different modules.

| Module | Admin | Doctor | Secretary |
|--------|:-----:|:------:|:---------:|
| Dashboard | ✓ | ✓ | ✓ |
| Patients | ✓ | Own Patients | ✓ |
| Appointments | ✓ | Own Appointments | Create / Update |
| Doctors | Manage | View | View Schedule |
| Payments | Full Access | No Access | Update Status |
| Consent Forms | Manage | View | Upload / Track |
| Reports | ✓ | ✗ | ✗ |
| Settings | ✓ | ✗ | ✗ |

---

## Future Development

- Patient CRUD
- Appointment CRUD
- Doctor CRUD
- Dashboard
- Authentication (JWT)
- SQL Server Integration
- REST API Development
- Digital Consent Management
- Role-Based Authorization

---

## Documentation

The project currently includes technical documentation for:

### Doctor Module

- Doctor entity fields
- Doctor mock data

### Payment Module

- Payment entity fields
- Payment status definitions
- Payment method definitions
- Payment mock data

### Consent Forms Module

- Consent form entity fields
- Consent form status definitions
- Consent form type definitions
- Consent form mock data

### User Management

- User roles
- Role permissions

### General

- Project folder structure

Additional documentation will be added as the project progresses.