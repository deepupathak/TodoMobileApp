Accounts.onResetPasswordLink(function (token, done) {
	Session.set('resetPassToken', token);
	FlowRouter.go('resetPassword');
});