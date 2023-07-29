"use strict";

// class UserForm {
//   loginFormCallback = (data) => {
//     const user = ApiConnector.login(loginFormCallback());

//     if (!user) {
//       return setLoginErrorMessage("Пользователь не найден");
//     } else {
//       location.reload();
//     }
//   };

//   registerFormCallback = (data) => {
//     const newUser = ApiConnector.register(data, () => console.log(123, data));

//     if (!newUser) {
//       return setRegisterErrorMessage("Пользователь уже существует");
//     } else {
//       registerFormCallback();
//     }
//   };
// }

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
