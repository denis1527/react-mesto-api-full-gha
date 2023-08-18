import React from 'react';
import SuccessImg from '../images/success-icon.svg';
import FailedImg from '../images/failed-icon.svg';

function InfoTooltip({ isOpen, onClose, registerError }) {
  function handleOverlayClick(e) {
    if(e.currentTarget === e.target) {
      onClose();
    }
  }

  return (
    <div className={`tooltip ${isOpen ? 'tooltip_open' : ''}`} onClick={handleOverlayClick}>
      <div className="tooltip__container">
        <img className="tooltip__img" src={`${registerError ? FailedImg : SuccessImg}`} alt="Результат регистрации" />
        <p className="tooltip__text">
          {`${
            registerError ?
            'Что-то пошло не так! Попробуйте ещё раз.'
            :
            'Вы успешно зарегистрировались!'
          }`}
        </p>
        <button className="tooltip__close-btn" type="button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip
