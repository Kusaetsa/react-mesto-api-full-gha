import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup( {isOpen, onClose, onCloseByEsc, onCloseByOverlay, onUpdateAvatar, isLoading} ) {

    //реф инпута//
    const avatarRef = React.useRef();

    //передача данных из инпута//
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
           avatar: avatarRef.current.value,
        })
    }

    //очистка инпута при открытии формы//
    React.useEffect(() => {
        avatarRef.current.value='';
    }, [isOpen])

    return(
        <PopupWithForm 
            title='Обновить аватар'
            name='edit-avatar'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onCloseByEsc={onCloseByEsc}
            onCloseByOverlay={onCloseByOverlay}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
        >
            <div className="popup__input-container">
                <div className="popup__form-section">
                    <input 
                        id="link-input" 
                        type="url" 
                        ref={avatarRef} 
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

export default EditAvatarPopup;