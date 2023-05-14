export default class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector) {
    this._profileName = profileNameSelector
    this._profileDescription = profileDescriptionSelector
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
}
