# Bucketlist Builder

This is a full stack application called Bucketlist Builder. It is designed in a way so that you can pick a city and a location and add it to your bucket list.

The Bucketlist Builder allows users to Create, Read, Update, and Delete locations and activities.

## Catalog of Routes (paths and methods)
router.route('/login').
  get(authCtrl.deny).
  post(authCtrl.login.post);

router.route('/logout').
  all(authCtrl.logout.all);

router.route('/changePassword').
  get(authCtrl.deny).
  patch(authCtrl.changePassword.patch);

router.route('/signup').
  get(authCtrl.deny).
  post(authCtrl.signup.post);

## Link to deployed back-end
(http://ancient-scrubland-6716.herokuapp.com)
## Link to front-end
(http://bucketlisters.github.io/bucketlisters_front_end)
## Link to front-end
(https://github.com/BucketListers/bucketlisters_front_end)
