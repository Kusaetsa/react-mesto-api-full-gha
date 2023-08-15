import React from "react";
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext'; 
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Main ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {


    const currentUser = React.useContext(CurrentUserContext);
    console.log("карент юзер в мэйн =>", currentUser);


    return(
        <main className="main">
            <section className="profile">
                <div className="profile__info"> 
                    <div className="profile__image" style={{ backgroundImage: `url(${currentUser.avatar})` }}>   
                        <div className="profile__edit-avatar" onClick={onEditAvatar} />
                </div> 
                    <div className="profile__description"> 
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" name="edit-button" onClick={onEditProfile} />
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                </div> 
                <button className="profile__add-button" type="button" name="add-button" onClick={onAddPlace} />
            </section>

            <section className="elements">
                {
                cards.map((card) => (
                    <Card 
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                ))}
                <Outlet />
            </section>
            <Footer />
        </main>

    )
}

export default Main;

