import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup( {isOpen, onClose, onCloseByEsc, onCloseByOverlay, onAddPlace, isLoading } ) {

    //рефы инпутов//
    const placeRef = React.useRef();
    const linkRef = React.useRef();

    //передача данных из инпутов//
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: placeRef.current.value,
            link: linkRef.current.value,
        })
    }

    //очистка полей при открытии формы//
    React.useEffect(() => {
        placeRef.current.value='';
        linkRef.current.value='';
    }, [isOpen])

    return(
        <PopupWithForm 
            title='Новое место'
            name='add-card'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText={isLoading ? 'Сохранение...' : 'Создать'}
            onCloseByEsc={onCloseByEsc}
            onCloseByOverlay={onCloseByOverlay}
        >
            <div className="popup__input-container">
                <div className="popup__form-section">
                    <input 
                        id="place-input" 
                        ref={placeRef} 
                        type="text" 
                        className="popup__item popup__item_el_place" 
                        name="name" 
                        placeholder="Название" 
                        required  
                        minLength="2" 
                        maxLength="30" 
                    />
                    <span className="place-input-error popup__item-error" />
                </div> 
                <div className="popup__form-section">
                    <input 
                        id="link-input" 
                        ref={linkRef} 
                        type="url" 
                        className="popup__item popup__item_el_link" 
                        name="link" 
                        placeholder="Ссылка" 
                        required 
                    />
                    <span className="link-input-error popup__item-error" />
                </div> 
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;