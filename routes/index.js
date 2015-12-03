var express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/auth');
var ctrl = require('../controllers/main');

/* GET home page. */
router.get('/', authCtrl.root.get);

/**AUTH ROUTES
 *	a login route using `passport.authenticate`
 *	a register route **not using passport**
 *
 */
router.route('/login').
  get(authCtrl.deny).
  post(authCtrl.login.post).
  all(authCtrl.login.all);

router.route('/logout').
	all(authCtrl.logout.all);

router.route('/changePassword').
	get(authCtrl.deny).
	patch(authCtrl.changePassword.patch);

router.route('/signup').
	get(authCtrl.deny).
	post(authCtrl.signup.post);

router.route('/items').
  get(ctrl.showList).
  post(ctrl.createItem).
  patch(ctrl.updateItem);

router.route('/items/:id').
  delete(ctrl.destroyItem);

router.route('/users/:id').
  delete(ctrl.destroyItem);

module.exports = router;
