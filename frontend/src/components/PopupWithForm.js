function PopupWithForm({ name, title, btnTitle, isOpen, onClose, children, onSubmit }) {
  function handleOverlayClick(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return (
    <section className={`popup popup-${name} ${isOpen ? 'popup_open' : ''}`} onClick={handleOverlayClick}>
      <div className="popup__container">
        <h3 className="popup__title">{title}</h3>
        <form className="edit-form" name={name} onSubmit={onSubmit}>
          {children}
          <button className="submit-btn" type="submit">{btnTitle}</button>
        </form>
        <button className="popup__close-btn" type="button" onClick={onClose}></button>
      </div>
    </section>
  )
}

export default PopupWithForm;