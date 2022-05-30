export class UserInfo {
  constructor({profileNameSelector, profileInfoSelector, profileAvatarSelector}) {
    this._name = document.querySelector(profileNameSelector);
    this._about = document.querySelector(profileInfoSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    const userData = {
      profileName: this._name.textContent,
      profileInfo: this._about.textContent
    }
    return userData;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
  }

  setUserAvatar(userData) {
    this._avatar.src = userData.avatar;
  }
}
