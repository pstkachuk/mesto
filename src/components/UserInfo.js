export class UserInfo {
  constructor({profileNameSelector, profileInfoSelector}) {
    this._name = document.querySelector(profileNameSelector);
    this._info = document.querySelector(profileInfoSelector);
  }

  getUserInfo() {
    const userData = {
      profileName: this._name.textContent,
      profileInfo: this._info.textContent
    }
    return userData;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._info.textContent = userData.info;
  }
}
