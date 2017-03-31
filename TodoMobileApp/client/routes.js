FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('signin');
  }
});

FlowRouter.route('/signup', {
  action: function() {
    BlazeLayout.render('signup');
  }
});

FlowRouter.route('/home', {
  action: function() {
    BlazeLayout.render('home');
  }
});

FlowRouter.route('/forgotPassword', {
  action: function() {
    BlazeLayout.render('forgotPassword');
  }
});

FlowRouter.route('/changePassword', {
  action: function() {
    BlazeLayout.render('recoverPassword');
  }
});

FlowRouter.route('/resetPassword', {
	name: 'resetPassword',
  action: function() {
    BlazeLayout.render('resetPassword');
  }
});