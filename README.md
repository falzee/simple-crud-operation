# Simple Crud Operations
Still in development...
## Preveiw demo 
[Demo](https://falzee.github.io/simple-crud-operation/)
<p align="center">
  <img src="https://github.com/falzee/simple-crud-operation/blob/master/src/images/testing%20prtototype%20demo.gif" alt="animated" />
</p>

## Using Reqres Fake API
#### POST Login 
Request /api/login
```bash
  {
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
  }
```
Response == 200
```bash
  {
    "token": "QpwL5tke4Pnpja7X4"
  }
```
#### POST Register
Request /api/login
```bash
  {
    "email": "eve.holt@reqres.in",
    "password": "pistol"
  }
```
Response == 200
```bash
  {
    "id": 4,
    "token": "QpwL5tke4Pnpja7X4"
  }
```

## UX & UI Design
- [UX Researching](https://miro.com/app/board/uXjVPa1tA5E=/?share_link_id=449751157116)
- [UI Designing](https://www.figma.com/file/SfngNwfTRTIguyzhYF7BuV/Prototype-2-Log%2FReg%5BUI%5D)

## Bug
- [x] Warning error on crud (resolved)
- [ ] state not changing when login
- [ ] redux issues
- [ ] Sometimes succeess login message not working
