"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, check);

  function check(data) {
    if (!data.success) {
      return userForm.setLoginErrorMessage(data.error);
    } else {
      location.reload();
    }
  }
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, newUser);

  function newUser(data) {
    if (!data.success) {
      return userForm.setRegisterErrorMessage(data.error);
    } else {
      location.reload();
    }
  }
};
