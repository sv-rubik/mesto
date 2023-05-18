const btnEdit = document.querySelector('.profile__edit-btn')
const btnAddElement = document.querySelector('.profile__add-btn')
const popupEdit = document.getElementById('popup-edit')
const popupAdd = document.getElementById('popup-add')
const formEdit = document.forms['profile-form']
const formAdd = document.forms['card-form']
const btnSaveProfile = formEdit.querySelector('.popup__save-btn')
const btnSaveNewCard = formAdd.querySelector('.popup__save-btn')
const profileNameText = document.querySelector('.profile__name')
const profileDescriptionText = document.querySelector('.profile__description')
const profileNameInputField = document.getElementById('profile-name')
const profileDescriptionInputField = document.getElementById('profile-description')

export {btnEdit, btnAddElement, popupEdit, popupAdd, formEdit, formAdd, btnSaveProfile}
export {btnSaveNewCard, profileNameText, profileDescriptionText, profileNameInputField, profileDescriptionInputField}