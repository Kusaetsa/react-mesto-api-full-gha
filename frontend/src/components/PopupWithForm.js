import React from "react";

function PopupWithForm ({ title, name, isOpen, onClose, children, buttonText, onSubmit, onCloseByEsc, onCloseByOverlay }) {

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
        <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onCloseByOverlay}>   
        <div className="popup__container">
            <h2 className="popup__title">{title}</h2>
            <button className="popup__close-icon" type="button" name="button-close" onClick={onClose} />
            <form className="popup__form" onSubmit={onSubmit} name={name} method="post" noValidate>
                {children}
                <button type="submit" className="popup__button" name="button-submit">{buttonText}</button>
            </form>
        </div>
    </section>
    )
}

export default PopupWithForm;