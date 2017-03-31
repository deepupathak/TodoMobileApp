/*--------- Import statements --------*/

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './body.html';
import './task.js';

Template.home.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.home.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
       /*If hide completed is checked, filter tasks*/
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
     /*Otherwise, return all of the tasks*/
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});

Template.home.events({
  'submit .new-task'(event) {
    /*Prevent default browser form submit*/

    event.preventDefault();
 
    /*Get value from form element*/

    const target = event.target;
    const text = target.text.value;
 
    /*Insert a task into the collection*/

    Meteor.call('tasks.insert', text);
 
    /*Clear form*/
    
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
  'click .logout'(event){
    event.preventDefault();
    console.log("logout event")
    Meteor.logout();
    window.location.href="/";
  },
  'click .changePassword'(event){
    event.preventDefault();
    window.location.href="/changePassword";
  }
});

Template.signup.events({
  'submit .register'(event){
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const firstName = target.fname.value;
    const lastName = target.lname.value;
    const emailId = target.email.value;
    const password = target.password.value;
    const cpass = target.cpass.value;

    if(password == cpass){
      userData={
        email: emailId,
        password: password,
        profile: {
          fname : firstName,
          lname : lastName,
        }
      }
      Accounts.createUser(userData, function(err){
        if(err){
          console.log(err)
        }else{
          alert("Account created successfully");
          window.location.href="/";
        }
      });
    }else{
      alert("Password mismatch");
    }
  },
});

Template.signin.events({
  'submit .signin'(event){
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const emailId = target.email.value;
    const password = target.password.value;

    Meteor.loginWithPassword(emailId, password, function(err){
      if(err){
        alert("Incorrect Password");
      }else{
        FlowRouter.go('/home');
      }
    });
  },
});

Template.forgotPassword.events({
  'submit .recover-password'(event){
    event.preventDefault();
    const target = event.target;
    const emailId = target.email.value;

    Accounts.forgotPassword({email: emailId}, function(err){
      if (err){
        alert(err);
      }else{
        alert("Passwrd reset link sent successfully. Please check your given email.");
        document.getElementById("emailAddress").value = "";
      }
    });
  }
});

Template.recoverPassword.events({
  'submit .recover'(event){
    event.preventDefault();
    let target = event.target;
    let oldPassword = target.oldPassword.value;
    let newPassword = target.newPassword.value;
    let cpass = target.cpass.value;

    if(newPassword == cpass){
      Accounts.changePassword(oldPassword, newPassword, function(err){
        if(err){
          alert("Current password incorrect");
        }else{
          alert("Password changed successfully");
          document.getElementById("old").value = "";
          document.getElementById("new").value = "";
          document.getElementById("confirm").value = "";
        }
      })
    }else{
      alert("Password mismatch");
    }
  }
});

Template.resetPassword.events({
  'submit .reset'(event){
    event.preventDefault();
    let target = event.target;
    let newPassword = target.newPassword.value;

    Accounts.resetPassword(Session.get('resetPassToken'), newPassword, function (err) {
      if(err){
        alert(err);
      }else{
        alert("Password reset successfully");
        Session.set('resetPassToken', null);
      }
    });
  }
});