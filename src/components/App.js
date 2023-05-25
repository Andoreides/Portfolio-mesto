import { React, useState, useEffect } from "react";
import "../index";
import { Card } from "./Card";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import { PopupWithForm } from "./PopupWithForm";
import { Api } from "../utils.js/Api";
import ImagePopup from "./ImagePopup";

export const config = {
  host: 'https://mesto.nomoreparties.co/v1/cohort-51',
  token: '6d0756f8-3d52-4cd2-ad40-ebde56088891'
}

const api = new Api (config.host, config.token) 


export const userDefault = {
  avatar: './',
  name: 'Жак-Ив Кусто',
  descr: 'Исследователь океана',
  _id: ''
}
export const placeDefault = {
  id: 0,
  name: '',
  link: '',
  likes: [],
  isLiked: false
}

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isOpenPopupZoom, setIsOpenPopupZoom] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [user, setUser] = useState(userDefault);
  const [inputNameProfile, setInputNameProfile] = useState('');
  const [inputJob, setInputJob] = useState('');
  const [avatar, setAvatar] = useState('');
  const [placeNew, setPlaceNew] = useState([placeDefault])
  const [placeTitle, setPlaceTitle] = useState('');
  const [placeLink, setPlaceLink] = useState('');

  console.log(placeNew);

  useEffect(()=>{
   const initCard = (user) =>{
     api.getIntialCards().then((data)=> {
       // console.log('getInitalCards', data)
       const newData = data.map((item)=>{
         const imLiked = item.likes.some((obj)=> obj._id === user._id)
         
         return {...item, isLiked: imLiked}
       })
      //  console.log('getInitalCards', newData, ' user._id ', user)
       setPlaceNew(newData)
     }).catch((error) => {
       console.log('getInitiallCards catch ', error)
     })
   }

    api.getUserInfo().then((data)=> {
      // console.log('getUserInfo ', data)
      initCard(data)
      setUser({avatar: data.avatar, name: data.name, descr: data.about, _id: data._id})
     }).catch((error)=> {
      console.error('getUserInfo catch ', error)
     })
     
    // api.createCard().then((data) => {
    //   setPlaceNew()
    // }).catch((error)=> {
    //   console.log('createCard',error )
    // })
  },[])

  
  
  // const [placeNew, setPlaceNew] = useState({img:'', title: ''});

  // useEffect(()=>{
  //   console.log('placeNew ', placeNew)
  // },[placeNew])


  const handleEditAvatarClick = (str) => {
    return (event)=>{
      event.preventDefault();
    if(str === 'avatar') {
      setUser({...user, avatar: avatar})
      // setEditAvatarPopupOpen(false)
      closeAllPopups(false);
      setAvatar('')
      api.saveAvatar({avatar: avatar})
      .then(data=> {
        // console.log('saveAvatar then ', data)
      })
      .catch(error=> {
        console.error('saveAvatar: ', error)
      })
    }
  }
  }
  // const handleChangeLike = () => {
    
  // }

  const handleEditProfileClick = (str) => {
    return (event)=>{
       event.preventDefault();
    if(str === 'profile'){
      setUser({ ...user, name: inputNameProfile,  descr: inputJob})
      // setEditProfilePopupOpen(false)
      closeAllPopups(false);
      api.createUserInfo({nameProf: inputNameProfile, ajob: inputJob})
      .then((data)=> {
        console.log('userInfor, :', data)
      })
      .catch((error) => {
        console.error('userInfo', error)
      })
        
     }
    }
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)

  }

  const handleAddPlaceClick = (str) => {
    return (event)=>{
      event.preventDefault();
    if(str === 'place') {
      // setAddPlacePopupOpen(false) 
      closeAllPopups();
      setPlaceLink('');
      setPlaceTitle('');
      
      api.createCard({name: placeTitle, link: placeLink})
      .then((data)=> {
        setPlaceNew(prev => [{...data, isLiked: false }, ...prev])
        
        console.log('CreateCard, :', data)
      })
      .catch((error)=> {
        console.log('CreateCard, :', error)
      })
     }
    }
  }
  
const handleLikeClick = (id, isLiked) => {
  if (!isLiked) {
    api.likePointer(id).then((data) => {
      setPlaceNew((prev)=> prev.map(item => item._id === id ? {...data, isLiked: true } : item ))
    })
  } else {
    api.deleteLike(id).then((data) => {
      setPlaceNew((prev) => prev.map(item => item._id === id ? {...data, isLiked: false } : item ))
    })
  }
  }

// const handlePopupZoom = (str) => {
//   console.log('123')

//   // setPlaceNew((prev) => prev.map(item))
// }
function handleCardClick(card) {
  setSelectedCard(card)
  setIsOpenPopupZoom(true)
}

const hadleDeleteCard =(id) => {
  api.deleteCard(id).then((data) =>{
    setPlaceNew((prev) => prev.filter(item => item._id !== id))
  })
}


  return (
    <div className="center">
      <Header />
      <Main
        onEditProfile={setEditProfilePopupOpen}
        onAddplace={setAddPlacePopupOpen}
        onEditAvatar={setEditAvatarPopupOpen}
        onEditImagePopUp={setIsOpenPopupZoom}
        user={user}
        placeNew = {placeNew}
        handleLikeClick={handleLikeClick}
        // handlePopupZoom={handlePopupZoom}
        onCardClick={handleCardClick}
        onDeleteCard={hadleDeleteCard}
      />
      
      <Footer />

      <PopupWithForm
        id="popupProfile"
        idForm="newForm"
        inputId="avatar-input"
        inputName="avatar"
        popupTitle="Редактировать&nbsp;профиль"
        onSubmit={handleEditProfileClick('profile')}
        submitText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={setEditProfilePopupOpen}
      >
        <input
              id="name-input"
              type="text"
              className="popup__input popup__input_name"
              placeholder="Имя"
              name="nameProf"
              required
              maxLength="40"
              minLength="2"
              value={inputNameProfile}
              onChange={(e)=> setInputNameProfile(e.target.value)}
            />
            <span className="popup__input-error name-input-error"></span>
            <input
              id="job-input"
              type="text"
              className="popup__input popup__input_type_job"
              placeholder="Род занятий"
              name="ajob"
              required
              maxLength="200"
              minLength="2"
              value={inputJob}
              onChange={(e)=> setInputJob(e.target.value)}
              
            />
            <span className="popup__input-error job-input-error"></span>
      </PopupWithForm>

      <PopupWithForm 
              id="popup__image"
              idForm="popup__form-img"
              inputId="avatar-input"
              inputName="avatar"
              popupTitle="Новое место"
              onSubmit={handleAddPlaceClick('place')}
              submitText="Сохранить"
              isOpen={isAddPlacePopupOpen}
              onClose={setAddPlacePopupOpen}
              
      >
      <input
              type="text"
              className="popup__input"
              placeholder="Название"
              name="name"
              id="cardName"
              required
              maxLength="30"
              minLength="2"
              value={placeTitle}
              onChange={(event)=> setPlaceTitle(event.target.value)}
            />
            <span className="popup__input-error cardName-error"></span>
            <input
              type="url"
              className="popup__input popup__input_type_job"
              placeholder="Ссылка на картинку"
              name="link"
              id="link-job"
              required
              value={placeLink}
              onChange={(event)=> setPlaceLink(event.target.value)}

            />
            <span className="popup__input-error link-job-error"></span>
      </PopupWithForm>

      {selectedCard && <ImagePopup onClose={()=>setSelectedCard(null)} card={selectedCard} onOpen={() => {}} />}


      <div className="popup popup_type_delete">
        <div className="popup__container">
          <button
            aria-label="close"
            type="button"
            className="popup__close"
          ></button>
          <h3 className="popup__title">Вы уверены?</h3>
          <form className="popup__form popup__form_place_sure" id="sureForm">
            <button
              type="submit"
              className="popup__button popup__button-submit popup__button-submit_type_sure"
            >
              Да
            </button>
          </form>
        </div>
      </div>

      {/* <div className="popup popup_type_avatar" id="popupavatar">
            <div className="popup__container">
                    <h3 className="popup__title">Обновить аватар</h3>
                    <form name="infoava" className="popup__form popup__form-avatar" id="newForm"  action="submit" noValidate>
                        <input id="avatar-input" type="url" className="popup__input popup__input_name" placeholder="Ссылка" name="avatar" required minLength="2" />
                        <span className="popup__input-error avatar-input-error"></span>
                        
                        <button className="popup__button" type="submit" id="avatarclosebtn" disabled>Сохранить</button>
                    </form>
                    <button className="popup__close" id="popup__closevatar" type="button" onClick={popupClose}></button>
            </div>
        </div> */}

      <PopupWithForm
        id="popupavatar"
        idForm="newForm"
        inputId="avatar-input"
        inputName="avatar"
        popupTitle="Обновить аватар"
        saveBtnID="avatarclosebtn"
        submitText="Сохранить"
        onSubmit={handleEditAvatarClick('avatar')}
        isOpen={isEditAvatarPopupOpen}
        onClose={setEditAvatarPopupOpen}
      >
        {/* <form name="infoava" className="popup__form popup__form-avatar" id="newForm"  action="submit" noValidate> */}
        <input
          id="avatar-input"
          type="url"
          className="popup__input popup__input_name"
          placeholder="Ссылка"
          name="avatar"
          required
          minLength="2"
          value={avatar}
          onChange={(e)=> setAvatar(e.target.value)}
        />
        <span className="popup__input-error avatar-input-error"></span>

        {/* <button className="popup__button" type="submit" id="avatarclosebtn" disabled>Сохранить</button> */}
        {/* </form> */}
      </PopupWithForm>

      <template id="card-template" className="card-template">
        <div className="elements__card">
          <img src="#" alt="наименование места" className="elements__image" />
          <button
            type="button"
            aria-label="del"
            className="elements__button-delete"
          ></button>
          
          <div className="elements__title-wrap">
            <h2 className="elements__title"></h2>
            <button
              type="button"
              aria-label="like"
              className="elements__like"
              
            ></button>
            <span className="elements__indicator"></span>
          </div>
        </div>
      </template>
    </div>
  );
}

export default App;
