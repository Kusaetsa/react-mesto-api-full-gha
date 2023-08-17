import React from "react"; 
import { useNavigate } from 'react-router-dom';
import * as Auth from '../utils/Auth';

function Login ( {handleLogin, onUserEmail, onTooltip} ) {

    //рефы инпутов//
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const navigate = useNavigate(); 

    //отправка запроса на авторизацию пользователя//
    function handleSubmit(e) {
        e.preventDefault();
        handleLogin();
        Auth.authorize({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })
        .then((data) => {
            onUserEmail(emailRef.current.value);
            localStorage.setItem("jwt", data.token);
            navigate("/");
        })
        .catch((err) => {
            onTooltip();
            console.log(`Ошибка авторизации: ${err}`)
        });  
    }

    return(
        <section className="register">
            <div className="register__container">
                <h2 className="register__title">Вход</h2>   
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
                    <button type="submit" onClick={handleSubmit} className="register__button" name="button-submit">Войти</button>
                </form>
            </div>
        </section>


    )
}

export default Login;