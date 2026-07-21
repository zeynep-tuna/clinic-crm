# Dashboard Mock Data

This document describes the mock data used in the Dashboard page during frontend development.

## Dashboard Cards

- Total Patients
- Today's Appointments
- Active Doctors
- Pending Payments

## Recent Patients

Contains the last 5 registered patients.

Fields:

- id
- name
- phone
- registeredDate

## Today's Appointments

Contains today's appointment list.

Fields:

- id
- patient
- doctor
- department
- time
- status

## Payment Summary

Contains payment statistics.

Fields:

- paid
- pending
- overdue

These mock data will be replaced with real API responses after backend integration.