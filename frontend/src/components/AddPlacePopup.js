import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, setValues } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.cardName,
      link: values.cardUrl,
    })
  }

  React.useEffect(() => {
    setValues({
      cardName: '',
      cardUrl: ''
    })
  }, [isOpen]);

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="Новое место" btnTitle={isLoading ? 'Создание...' : 'Создать'} name="add-card">
      <fieldset className="edit-form__fieldset">
        <label className="edit-form__label">
          <input className="edit-form__item edit-form__item_el_card-name" onChange={handleChange} value={values.cardName || ''} id="card-name-input" type="text" name="cardName" placeholder="Название" required />
          <span className="edit-form__input-error card-name-input-error"></span>
        </label>
        <label className="edit-form__label">
          <input className="edit-form__item edit-form__item_el_card-src" onChange={handleChange} value={values.cardUrl || ''} id="card-src-input" type="url" name="cardUrl" placeholder="Ссылка на картинку" required />
          <span className="edit-form__input-error card-src-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;