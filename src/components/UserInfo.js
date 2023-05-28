export default class UserInfo {
  constructor({profileNameSelector, profileDescriptionSelector}) {
    this._profileName = document.querySelector(profileNameSelector)
    this._profileDescription = document.querySelector(profileDescriptionSelector)
    this._avatar = document.querySelector('.profile__avatar-image')
  }

  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      profileDescription: this._profileDescription.textContent
    }
  }

  setUserInfo({ profileName, profileDescription }) {
    this._profileName.textContent = profileName
    this._profileDescription.textContent = profileDescription
  }

  setUserAvatar(avatarLink) {
    this._avatar.src = avatarLink
  }
}
