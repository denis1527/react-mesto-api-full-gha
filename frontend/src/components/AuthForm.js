function AuthForm({ name, title, btnTitle, handleSubmit, email, setEmail, password, setPassword, }) {
  return (
    <>
      <h3 className="auth__title">{title}</h3>
      <form className="auth__form" name={name} onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <label className="auth__label">
          <input className="auth__item" id="email" type="email" name="email" value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Email" required />
          </label>
          <label className="auth__label">
            <input className="auth__item" id="password" type="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder="Пароль" required/>
          </label>
        </fieldset>
        <button className="auth__submit" type="submit">{btnTitle}</button>
      </form>
    </>
  )
}

export default AuthForm;
