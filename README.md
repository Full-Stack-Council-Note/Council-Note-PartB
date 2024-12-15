# CouncilNote Part B

## CouncilNote Frontend

![CN-home](./src/assets/CN-home.png)

![CN-home-dropdown](./src/assets/CN-home-dropdown.png)

![CN-Login-mobile](./src/assets/CN-Login-mobile.png)

![CN-problemForm-mobile1](./src/assets/CN-problemForm-mobile1.png)

![CN-problemForm-desktop2](./src/assets/CN-problemForm-desktop2.png)

![CN-noticeForm-mobile](./src/assets/CN-noticeForm-mobile.png)

## Testing Frontend

User account created successfully but undefined, and navigated to login page upon submit, as intended.

![CNregistertest-frontend](./src/assets/CNregistertest-frontend.png)

## Testing Backend

I mainly used Insomnia, Jest and MongoDB Compass to test the backend, checking if certain routes, functions and features were working.

#### Users:

![userModel](./src/assets/userModel.png)

![userModel2](./src/assets/userModel2.png)

![UserCtrl](./src/assets/UserCtrl.png)

![UserCtrl2](./src/assets/UserCtrl2.png)

![Users-routes](./src/assets/Users-routes.png)

![CN-SearchUsers-insomnia](./src/assets/CN-SearchUsers-insomnia.png)

![CN-searchUsers2](./src/assets/CN-searchUsers2.png)

![CN-searchUsers2](./src/assets/CN-searchUsers2.png)

![CN-UserUpdate-insomnia](./src/assets/CN-UserUpdate-insomnia.png)

![CN-deleteUser-insomnia](./src/assets/CN-deleteUser-insomnia.png)

![MongoDB-users](./src/assets/MongoDB-users.png)

#### Auth:

![authCtrl](./src/assets/authCtrl.png)

![authCtrl_refreshtoken](./src/assets/authCtrl_refreshtoken.png)

![Auth-routes](./src/assets/Auth-routes.png)

![CN-login-insomnia](./src/assets/CN-login-insomnia.png)

I later on renamed "access_token" as "token" in the AuthCtrl so it might match/work better in the frontend for the "token" in localStorage.setItem("token", response.data.token); for instance. 

![CN-logout-insomnia](./src/assets/CN-logout-insomnia.png)

#### Problems:

![problemModel](./src/assets/problemModel.png)

![problemCtrl](./src/assets/problemCtrl.png)

![Problems-routes](./src/assets/Problems-routes.png)

![CN-ProblemsFullnameTest1](./src/assets/CN-ProblemsFullnameTest1.png)

![CN-GetProblems-insomnia](./src/assets/CN-GetProblems-insomnia.png)

![CN-updateproblem-insomnia](./src/assets/CN-updateproblem-insomnia.png)

I late put Urgent and Soon as UrgentOrSoon and like this in the Problem model: {type: String, enum: ['Urgent', 'Soon','N/A'], default: 'N/A'}, 

![CN-deleteProblem-insomnia](./src/assets/CN-deleteProblem-insomnia.png)

![MongoDB-problems](./src/assets/MongoDB-problems.png)

#### Notices:

![noticeModel](./src/assets/noticeModel.png)

![NoticeCtrl](./src/assets/NoticeCtrl.png)

![Notices-routes](./src/assets/Notices-routes.png)

![CN-getOneNotice-insomnia](./src/assets/CN-getOneNotice-insomnia.png)

![CN-getNotices-insomnia](./src/assets/CN-getNotices-insomnia.png)

![CN-GetNotices-insomnia2](./src/assets/CN-GetNotices-insomnia2.png)

![CN-UserFullnameTest](./src/assets/CN-UserFullnameTest.png)

![CN-UserFullnameTest2](./src/assets/CN-UserFullnameTest2.png)

![CN-UserFullnameTest3](./src/assets/CN-UserFullnameTest3.png)

User fullname didn't show on this occasion when adding then getting a notice on Insomnia.

![CN-addCommentNoticesTest](./src/assets/CN-addCommentNoticesTest.png)

![CN-updateNotice-insomnia2](./src/assets/CN-updateNotice-insomnia2.png)

![CN-deleteNotice-insomnia](./src/assets/CN-deleteNotice-insomnia.png)

![MongoDB-notices](./src/assets/MongoDB-notices.png)

