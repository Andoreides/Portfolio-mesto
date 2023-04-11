import { Card } from "./cardItem";

function Main({onEditAvatar, onAddplace, onEditProfile, user, placeNew, handleLikeClick, handlePopupZoom, onCardClick, onEditImagePopUp, onDeleteCard }) {
  const handleEditAvatarClick = (event) => {
    onEditAvatar(true)
   

  };
  const handleEditProfileClick = (event) => {
    onEditProfile(true)
  }
  // const handleEditImagePopup = (e) => {
  //   onEditImagePopUp(true)
  // }


  const handleAddPlaceClick = (event) => {
    onAddplace(true);
  };
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__button-zone">
          <button
            className="profile__swap"
            type="button"
            onClick={handleEditAvatarClick}
          ></button>
          <img className="profile__avatar" src={user.avatar}/>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{user.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            id="popup__open"
            onClick={handleEditProfileClick}
          ></button>
          <p className="profile__subtitle">{user.descr}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={handleAddPlaceClick}></button>
      </section>

      <section className="elements">
        {
          placeNew.length > 0 && placeNew.map(item => <Card key={item.id} {...item} userId={user._id} handleLikeClick={handleLikeClick} handlePopupZoom={handlePopupZoom} onCardClick={onCardClick} onDeleteCard={onDeleteCard} />)
        }
        
      </section>
    </main>
  );
}

export default Main;

/**

[
  {
  title: '',
  link: '',
  liked: false
},
{
  title: '',
  link: '',
  liked: false
}
]
 * 
 * 
 * 
 */