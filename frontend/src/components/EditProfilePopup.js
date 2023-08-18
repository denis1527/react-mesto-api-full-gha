import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, setValues} = useForm({});

  React.useEffect(() => {
    setValues({
      profileName: currentUser.name, 
      profileAbout: currentUser.about
    });
  }, [currentUser, isOpen]);
    
  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateUser({
      name: values.profileName,
      about: values.profileAbout,
    });
  }

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="Редактировать профиль" btnTitle={isLoading? 'Сохранение...' : 'Сохранить'} name="edit-profile">
      <fieldset className="edit-form__fieldset">
        <label className="edit-form__label">
          <input className="edit-form__item edit-form__item_el_name" id="profile-name-input" type="text" name="profileName" placeholder="Имя" value={values.profileName || ''} onChange={handleChange} required/>
          <span className="edit-form__input-error profile-name-input-error"></span>
        </label>
        <label className="edit-form__label">
          <input className="edit-form__item edit-form__item_el_job" id="profile-job-input" type="text" name="profileAbout" placeholder="О себе" value={values.profileAbout || ''} onChange={handleChange} required/>
          <span className="edit-form__input-error profile-job-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;