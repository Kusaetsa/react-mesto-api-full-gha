import React from "react";
import success from "../images/success.png";
import fail from "../images/fail.png";

function InfoTooltip ({ isOpen, onClose, onCloseByEsc, onCloseByOverlay, registerStatus }) {

    // закрыть на Esc//
    React.useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', onCloseByEsc);
        }
        return () => {
            document.removeEventListener('keydown', onCloseByEsc);
        };
        }, [isOpen, onCloseByEsc]);


    return(
        <section className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={onCloseByOverlay}>
        <div className="popup__container popup__container_for-message">
        
        {registerStatus === true ? (
            <>
                <img src={success} className = "popup__picture" alt="успешная регистрация" />
                <h2 className="popup__message">Вы успешно зарегистрировались!</h2>
            </> ) : (
            <>
                <img src={fail} className = "popup__picture" alt="проблемы с регистрацией" />
                <h2 className="popup__message">Что-то пошло не так! Попробуйте еще раз!</h2> 
            </>
                )
        }
        <button className="popup__close-icon" type="button" name="button-close" onClick={onClose} />
        </div>
    </section>
    )
}

export default InfoTooltip;