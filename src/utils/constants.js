const btnEdit = document.querySelector('.profile__edit-btn')
const btnAddElement = document.querySelector('.profile__add-btn')
const popupEdit = document.getElementById('popup-edit')
const popupAdd = document.getElementById('popup-add')
const formEdit = document.forms['profile-form']
const formAdd = document.forms['card-form']
const formAvatar = document.forms['avatar-form']
const btnSaveProfile = formEdit.querySelector('.popup__save-btn')
const btnSaveNewCard = formAdd.querySelector('.popup__save-btn')
const profileNameText = document.querySelector('.profile__name')
const profileDescriptionText = document.querySelector('.profile__description')
const profileNameInputField = document.getElementById('profile-name')
const profileDescriptionInputField = document.getElementById('profile-description')

const popupAvatar = document.getElementById('popup-avatar')
const formAvatarEdit = popupAvatar.querySelector('.popup__form')
const btnEditAvatar = document.querySelector('.profile__avatar-edit-btn')

export {btnEdit, btnAddElement, popupEdit, popupAdd, formEdit, formAdd, formAvatar, btnSaveProfile}
export {btnSaveNewCard, profileNameText, profileDescriptionText, profileNameInputField, profileDescriptionInputField}
export {popupAvatar, formAvatarEdit, btnEditAvatar}