import React from "react";

function ImagePopup ({ card, onClose, onCloseByEsc, onCloseByOverlay }) {

    React.useEffect(() => {
        document.addEventListener('keydown', onCloseByEsc);
        return () => {
            document.removeEventListener('keydown', onCloseByEsc);
          };
        }, [card]);

    if (card.link === "") {
        return null; 
    }
        return (
            <section className="popup popup_image popup_opened" onClick={onCloseByOverlay}>
            <div className="popup__container popup__container_for-image">
                <img src={card.src} className="popup__image" alt={card.title} />
                <p className="popup__caption">{card.title}</p>
                <button className="popup__close-icon" type="button" name="close-image-popup" onClick={onClose} />
            </div>
        </section>
        )
}

export default ImagePopup;