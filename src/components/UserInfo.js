export class UserInfo {
  constructor({profileName, profileInfo}) {
    this._name = profileName;
    this._info = profileInfo;
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
