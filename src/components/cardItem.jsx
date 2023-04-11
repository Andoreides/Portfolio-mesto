import { config } from './App';

export const Card = (props) => {
  const {link, name, likes, _id, userId, isLiked, handleLikeClick, onCardClick, owner, onDeleteCard} = props;
  
  // console.log('Card ', userId)
  // console.log('owner', owner?._id)
  
  return (
    <div className="elements__card">
      <img src={link} alt="наименование места" className="elements__image" onClick={(e)=>onCardClick(props)} />
      { (userId === owner?._id) &&
      <button
        type="button"
        aria-label="del"
        className="elements__button-delete"
        onClick={(e) => onDeleteCard(_id)}
      ></button>
    }

      <div className="elements__title-wrap">
        <h2 className="elements__title">{name}</h2>
        <button
          type="button"
          aria-label="like"
          // className={`elements__like`}
          className={isLiked ? 'elements__like active' : 'elements__like'}
          onClick={(e)=>handleLikeClick(_id, isLiked)}
          // className='elements__like'
        ></button>
        {likes && <span className="elements__indicator">{likes.length}</span>}
      </div>
    </div>
  );
};
