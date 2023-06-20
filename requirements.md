# Readme

### Employee Schema

- id Required Unique employee identifier in the format ‘UIXXXXXXX’ where the X is replaced with alphanumeric
- name Required Name of the employee
- email_address Required Email address of the employee. Follows the typical email address format.
- phone_number Required Phone number of the employee. Starts with either 9 or 8 and have 8 digits.
- gender Required Gender of the employee (Male/Female)

### Cafe Schema

- id Required UUID
- name Required Name of the cafe
- description Required A short description of the cafe
- logo Optional to implement
- location Required Location of the cafe

### Others

- Which cafe an employee _belongs to_. Unique constraint
- Employee start date

### /get

- `/cafes?location=location`
  - name Name of the cafe
  - description A short description of the cafe
  - employees Number of the employees. integer
    logo (optional) Logo of the café. This will be used to display a logo image on the front-end.
    location Location of the cafe
  - id UUID
- `/employees?cafe=cafe`
  -id Unique employee identifier in the format ‘UIXXXXXXX’ where the X is replaced with alpha numeric - Name of the employee - Email address of the employee. - Phone number of the employee. - Number of days the employee worked It must be an integer and is derived from the current date minus the start
  date of the employee in the cafe - Café’s name that the employee is under [leave blank if not assigned yet]

### /post

- `/cafe`. Creates a new cafe
- `/employee`. Creates a new employee. _This should also create the relationship between an employee and a café._

### /put

- `/cafe`. Update cafe
- `/employee`. Update employee. _This should also update the relationship between an existing employee and a café._

### /delete

- `/cafe`. Delete cafe, remove all employees
- `/employee`. Delet employee

### Seed Data
