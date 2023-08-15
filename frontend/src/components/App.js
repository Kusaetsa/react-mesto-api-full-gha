import React from "react";
import Header from './Header';
import Main from './Main';
import ImagePopup from "./ImagePopup";
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext'; 
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from "./ProtectedRoute";
import * as Auth from '../utils/Auth';

function App() {

    const [cards, setCards] = React.useState([]); //стейт карточек
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false); //стейт попапа профиля
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false); //стейт попапа новой карточки
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false); //стейт аватара
    const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''}); //стейт активной карточки
    const [currentUser, setCurrentUser] = React.useState({}); //стейт пользователя
    const [isLoggedIn, setLoggedIn] = React.useState(false); //стейт авторизации
    const [isInfoTooltipsOpen, setInfoTooltipsOpen] = React.useState(false); //стейт сообщения о регистрации
    const [userEmail, setUserEmail] = React.useState(null); //почта авторизированного пользователя
    const [registerStatus, setRegisterStatus] = React.useState(null); //стейт регистрации
    const [isLoading, setIsLoading] = React.useState(false); //стейт обработки запросов
    const navigate = useNavigate(); 

    //получение данных о пользователе//
    React.useEffect(() => {
        api.getUserInfoFromServer()
        .then(data => {
            setCurrentUser({
                _id: data._id,
                name: data.name,
                about: data.about,
                avatar: data.avatar,
            })
        })
        .catch((err) => {
            console.log(`Ошибка загрузки данных пользователя: ${err}`)
        });
    }, [userEmail]);

    //получение карточек при загрузке//
    React.useEffect(() => {
        api.getInitialCardsFromServer()
        .then(data => {
            setCards(data.map((item) => ({
                _id: item._id,
                src: item.link,
                title: item.name,
                likes: item.likes,
                owner: item.owner,
            })));
        })
        .catch((err) => {
            console.log(`Ошибка загрузки карточек с сервера: ${err}`)
        });
    }, [userEmail]);

    //открыть попап профиля//
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    //открыть попап новой карточки//
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    //открыть попап аватара//
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    //открыть картинку//
    function handleCardClick(card) {
        setSelectedCard(card);
    } 

    //закрытие попапов//
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setInfoTooltipsOpen(false);
        setSelectedCard({name: '', link: ''});
    }

    //закрыть на ESC//
    function handleEscClose(e) {
        if (e.key === 'Escape') {
            closeAllPopups();
        }
    }

    //закрыть по оверлею//    
    function handleOverlayClose(e) {
        if (e.target.classList.contains('popup_opened')) {
        closeAllPopups();
        }
    }

    //поставновка/снятие лайка//
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => 
            state.map(c => 
            c._id === card._id ? { ...c, likes: newCard.likes } : c));
        })
        .catch((err) => {
            console.log(`Ошибка постановки/снятия лайка: ${err}`)
        });
    }

    //удаление карточек пользователя//
    function handleCardDelete(card) {
        api.deleteMyCard(card._id)
        .then(
            setCards((state) => 
                state.filter((c) => {
                return c._id !== card._id
            }))
        )
        .catch((err) => {
            console.log(`Ошибка удаления карточки: ${err}`)
        });
    }

    //обновление данных пользователя//
    function handleUpdateUser(currentUser) {
        setIsLoading(true);
        api.setUserInfoOnServer(currentUser)
        .then((data => {
            setCurrentUser({
                _id: data._id,
                name: data.name,
                about: data.about,
                avatar: data.avatar,
            })   
            closeAllPopups();
        }))
        .catch((err) => {
            console.log(`Ошибка в форме обновления данных пользователя: ${err}`)
        })
        .finally (() => {
            setIsLoading(false);
        });
    }

    //обновление аватара//
    function handleUpdateAvatar(userData) {
        setIsLoading(true);
        api.editAvatarImage(userData)
        .then((data => {
            setCurrentUser({
                _id: data._id,
                name: data.name,
                about: data.about,
                avatar: data.avatar,
            })
            closeAllPopups();
        }))
        .catch((err) => {
            console.log(`Ошибка в форме обновления аватара: ${err}`)
        })
        .finally (() => {
            setIsLoading(false);
        });
    }

    //добавление карточки//
    function handleAddPlaceSubmit(newCard) {
        setIsLoading(true);
        api.addNewCardOnServer(newCard)
        .then((res) => {
            newCard.title = res.name;
            newCard.src = res.link;
            newCard.owner = res.owner;
            newCard._id = res._id;
            newCard.likes = res.likes;
            setCards([newCard, ...cards]); 
            closeAllPopups();
        })
        .catch((err) => {
            console.log(`Ошибка в форме добавления новой карточки: ${err}`)
        })
        .finally (() => {
            setIsLoading(false);
        });
    }

    //проверка токена для автоматического входа//
    const checkToken = () => {
        const jwt = localStorage.getItem("jwt");
        Auth.getContent(jwt)
        .then((data) => {
            if(!data) { 
                return;
            } 
            setUserEmail(data.email);
            setLoggedIn(true);
            navigate("/");
        })
        .catch((err) => {
            setLoggedIn(false);
            setUserEmail(null);
            console.log(`Ошибка токена: ${err}`)
        });
    }
    React.useEffect(() => {
        checkToken();
    }, []);

    //получить статус от компонента регистрации//
    function handleRegisterStatus(status) {
        setRegisterStatus(status);       
    }
    
    //открыть сообщение о регистрации//
    function handleInfoTooltipClick() {
        setInfoTooltipsOpen(true);
    }

    //обновление email//
    function handleEmail(email) {
        setUserEmail(email);
    }
    

  return (
    <div className="root">
        <Header
        userEmail={userEmail}
        setUserEmail={() => setUserEmail(null)}
        />
        <CurrentUserContext.Provider value={currentUser}>
        <Routes>
            <Route path="/sign-up" element={<Register 
                onTooltip = {handleInfoTooltipClick}
                onRegisterStatus = {handleRegisterStatus}
            />} />
            <Route path="/sign-in" element={<Login 
            handleLogin={() => setLoggedIn(true)}
            onUserEmail={handleEmail}
            />} />
            <Route 
                path="/" 
                element={<ProtectedRouteElement
                    element={Main}
                    isLoggedIn={isLoggedIn}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick} 
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards} />} 
            />
        </Routes>
        
        <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}
            onCloseByEsc={handleEscClose}
            onCloseByOverlay={handleOverlayClose}
            isLoading={isLoading}
        /> 
        <AddPlacePopup
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onAddPlace={handleAddPlaceSubmit}
            onCloseByEsc={handleEscClose}
            onCloseByOverlay={handleOverlayClose}
            isLoading={isLoading}
        />            
        <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}
            onCloseByEsc={handleEscClose}
            onCloseByOverlay={handleOverlayClose}
            isLoading={isLoading}
        /> 
        <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
            onCloseByEsc={handleEscClose}
            onCloseByOverlay={handleOverlayClose}
        />
        <InfoTooltip 
            isOpen={isInfoTooltipsOpen} 
            onClose={closeAllPopups}
            onCloseByEsc={handleEscClose}
            onCloseByOverlay={handleOverlayClose}
            registerStatus={registerStatus}
        />
        </CurrentUserContext.Provider>

</div>  
  );
}

export default App;
