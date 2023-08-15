import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Auth from '../utils/Auth';


function Register ({ onTooltip, onRegisterStatus }) {

    //рефы инпутов//
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const navigate = useNavigate();

    function sendDataToParent(status) {
        onRegisterStatus(status); // Вызываем функцию обратного вызова и передаем данные
      }

    //отправка запроса на регистрацию пользователя//
    function handleSubmit(e) {
        e.preventDefault();
        Auth.register({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })
        .then((data) => {
            sendDataToParent(true);
            onTooltip();
        })
        .then((data) => {
            navigate("/sign-in");
        })
        .catch((err) => {
            sendDataToParent(false);
            onTooltip();
            console.log(`Ошибка регистрации: ${err}`)
        });  
    }

    return(
        <section className="register">
            <div className="register__container">
                <h2 className="register__title">Регистрация</h2>   
                <form className="register__form" method="post" noValidate>
                    <div className="register__inputs-container">
                        <input 
                            id="email-input" 
                            ref={emailRef} 
                            type="email" 
                            className="register__item" 
                            name="email" 
                            placeholder="Email" 
                            required 
                        />
                        <input 
                            id="password-input" 
                            ref={passwordRef} 
                            type="password" 
                            className="register__item" 
                            name="password" 
                            placeholder="Пароль" 
                        />
                    </div>     
                    <button onClick={handleSubmit} type="submit" className="register__button" name="button-submit">Зарегистрироваться</button>
                </form>
            </div>
            <div className="register__login-container">
                <p className="register__caption">Уже зарегистрированы? </p>
                <Link to="/sign-in" className="register__login"> Войти</Link>
            </div>
        </section>
        
    )
}

export default Register;