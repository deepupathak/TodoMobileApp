/*--------------------------  Code for Sending feedback mail -----------------------------*/


if (Meteor.isServer) {
 	Meteor.startup(function () {
		process.env.MAIL_URL = 'smtp://postmaster%40sandbox0e70e89fe219401784c3e642cd055831.mailgun.org:bde5d2f113453278d916036426a4bedf@smtp.mailgun.org:587';
 	});
}