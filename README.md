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

Updating user profile info, such as the "about".

![CN-deleteUser-insomnia](./src/assets/CN-deleteUser-insomnia.png)

Delete user is working. This might be for if a user closes their account, or if they're banned.

![MongoDB-users](./src/assets/MongoDB-users.png)

Users data appearing in MongoDB Compass.

#### Auth:

![authCtrl](./src/assets/authCtrl.png)

![authCtrl_refreshtoken](./src/assets/authCtrl_refreshtoken.png)

![Auth-routes](./src/assets/Auth-routes.png)

![CN-authlogintoken](./src/assets/CN-authlogintoken.png)

New token generated upon logging in.

![CN-logout-insomnia](./src/assets/CN-logout-insomnia.png)

#### Problems:

![problemModel](./src/assets/problemModel.png)

![problemCtrl](./src/assets/problemCtrl.png)

![Problems-routes](./src/assets/Problems-routes.png)

![CN-ProblemsFullnameTest1](./src/assets/CN-ProblemsFullnameTest1.png)

Problem posts including User fullname displayed as intended, and the Problem comments.

![CN-GetProblems-insomnia](./src/assets/CN-GetProblems-insomnia.png)

Problem posts including User fullname displayed, along with the comments added.

![CN-GetProblemComments](./src/assets/CN-GetProblemComments.png)

Getting problem comments

![CN-addProblem-insomnia](./src/assets/CN-addProblem-insomnia.png)

![CN-addingProblemComment](./src/assets/CN-addingProblemComment.png)

Adding problem comments

![CN-Getproblemswithcomments](./src/assets/CN-Getproblemswithcomments.png)

Getting problems with comments, including the just-added comment.

![CN-updateproblem-insomnia](./src/assets/CN-updateproblem-insomnia.png)

Problem post updated. I later put Urgent and Soon as UrgentOrSoon and like this in the Problem model: {type: String, enum: ['Urgent', 'Soon','N/A'], default: 'N/A'}, 

![CN-deleteProblem-insomnia](./src/assets/CN-deleteProblem-insomnia.png)

Problem post being deleted

![MongoDB-problems](./src/assets/MongoDB-problems.png)

Problems data appearing in MongoDB Compass. There is also a "problemcomments" schema but these are populated within the Problem post as intended.

#### Notices:

![noticeModel](./src/assets/noticeModel.png)

![NoticeCtrl](./src/assets/NoticeCtrl.png)

![Notices-routes](./src/assets/Notices-routes.png)

![CN-getOneNotice-insomnia](./src/assets/CN-getOneNotice-insomnia.png)

Getting one notice, including user fullname displayed.

![CN-getNotices-insomnia](./src/assets/CN-getNotices-insomnia.png)

![CN-GetNotices-insomnia2](./src/assets/CN-GetNotices-insomnia2.png)

![CN-UserFullnameTest](./src/assets/CN-UserFullnameTest.png)

Getting notices, including notice comments, and user fullname displayed as intended.

![CN-UserFullnameTest2](./src/assets/CN-UserFullnameTest2.png)

![CN-UserFullnameTest3](./src/assets/CN-UserFullnameTest3.png)

User fullname didn't show on this occasion when adding then getting a notice on Insomnia.

![CN-noticeAdded-test](./src/assets/CN-noticeAdded-test.png)

![CN-addCommentNoticesTest](./src/assets/CN-addCommentNoticesTest.png)

Adding a comment to a notice

![CN-updateNotice-insomnia2](./src/assets/CN-updateNotice-insomnia2.png)

Updating a notice

![CN-deleteNotice-insomnia](./src/assets/CN-deleteNotice-insomnia.png)

Notice being deleted

![MongoDB-notices](./src/assets/MongoDB-notices.png)

Notices data appearing in MongoDB Compass. There is also a "noticecomments" schema but these are populated within the Notice post as intended.

