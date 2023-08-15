import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext'; 

function EditProfilePopup( {isOpen, onClose, onCloseByEsc, onCloseByOverlay, onUpdateUser, isLoading} ) {

    const currentUser = React.useContext(CurrentUserContext);

    //управляемые компоненты имени и карточки//
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    //очистка полей при открытии формы//
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]); 

    //передача данных из инпутов//
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name,
          about: description,
        });
    } 

    return(
        <PopupWithForm 
            title='Редактировать профиль'
            name='edit-form'
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
                        id="name-input" 
                        onChange={handleNameChange} 
                        value={name || ''} 
                        type="text" 
                        className="popup__item popup__item_el_name" 
                        name="name" 
                        placeholder="Имя" 
                        required 
                        minLength="2" 
                        maxLength="40" 
                    />
                    <span className="name-input-error popup__item-error" />
                </div>
                <div className="popup__form-section">
                    <input 
                        id="about-input" 
                        onChange={handleDescriptionChange} 
                        value={description || ''} 
                        type="text" 
                        className="popup__item popup__item_el_about" 
                        name="about" 
                        placeholder="О себе" 
                        required 
                        minLength="2" 
                        maxLength="200"
                    />
                    <span className="about-input-error popup__item-error" /> 
                </div>
            </div>     
        </PopupWithForm>
    )
}

export default EditProfilePopup;
