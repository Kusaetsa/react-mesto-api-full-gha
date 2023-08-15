import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext'; 

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = ( 
        `element__like ${isLiked && 'element__like_active'}` 
      );

    function handleClick() {
        props.onCardClick(props.card);
      }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    } 
   
    return (
        <article className="element">
        <div style={{ backgroundImage: `url(${props.card.src})` }} className="element__image" onClick={handleClick}> </div>
        {isOwn && <button className="element__delete-button" onClick={handleDeleteClick} type="button" name="delete-button"/>} 
    
        <div className="element__description">
            <h2 className="element__title">{props.card.title}</h2>
            <div className="element__like-container">
                <button className={cardLikeButtonClassName} type="button" name="like-button" onClick={handleLikeClick} />
                <p className="element__like-counter"></p>
            </div>
        </div>
    </article>
    )
}

export default Card;