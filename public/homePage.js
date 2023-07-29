const out = new LogoutButton();

out.action = () => {
  ApiConnector.logout(callback);
};

function callback(data) {
  if (data.success) {
    location.reload();
  }
}

ApiConnector.current(currentUser);

function currentUser(data) {
  if (data.success === true) {
    ProfileWidget.showProfile(data.data);
  }
}

const obj = new RatesBoard();

function askCours() {
  ApiConnector.getStocks(currentCours);
}

function currentCours(data) {
  if (data.success === true) {
    obj.clearTable();
    obj.fillTable(data.data);
  }
}
askCours();
setInterval(askCours, 1000 * 60);

const money = new MoneyManager();

money.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, recharge);
};

function recharge(p) {
  if (p.success === true) {
    money.setMessage(true, "Баланс пополнен");
  } else {
    money.setMessage(false, p.error);
  }
  ProfileWidget.showProfile(p.data);
}

money.conversionMoneyCallback = conversionMoneyCallback;

function conversionMoneyCallback(data) {
  ApiConnector.convertMoney(data, askConversion);
}

function askConversion(doc) {
  if (doc.success === true) {
    money.setMessage(true, "Конвертация прошла успешно");
  } else {
    money.setMessage(false, doc.error);
  }
  ProfileWidget.showProfile(doc.data);
}

money.sendMoneyCallback = sendMoney;

function sendMoney(data) {
  ApiConnector.transferMoney(data, transfer);
}

function transfer(one) {
  if (one.success === true) {
    money.setMessage(true, "Перевод выполнен успешно");
  } else {
    money.setMessage(false, one.error);
  }
  ProfileWidget.showProfile(one.data);
}

const favorite = new FavoritesWidget();

ApiConnector.getFavorites(fav);

function fav(data) {
  if (data.success === true) {
    favorite.clearTable();
    favorite.fillTable(data.data);
    money.updateUsersList(data.data);
  }
}

favorite.addUserCallback = addUser;

function addUser(user) {
  ApiConnector.addUserToFavorites(user, add);
}

function add(n) {
  if (n.success === true) {
    favorite.clearTable();
    favorite.fillTable(n.data);
    money.updateUsersList(n.data);
    money.setMessage(true, "Пользователь добавлен");
  } else {
    money.setMessage(false, n.error);
  }
}

favorite.removeUserCallback = remove;

function remove(removeUser) {
  ApiConnector.removeUserFromFavorites(removeUser, remover);
}

function remover(r) {
  if (r.success === true) {
    favorite.clearTable();
    favorite.fillTable(r.data);
    money.updateUsersList(r.data);
    money.setMessage(true, "Пользователь удален");
  } else {
    money.setMessage(false, r.error);
  }
}
