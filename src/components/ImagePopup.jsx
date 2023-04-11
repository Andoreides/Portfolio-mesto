


const ImagePopup = ({card, onClose }) => {
    // console.log('ImagePopup', card, onClose, card.name )
    // console.log('AAAAAAAA', card)
    return (
        <div className="popup popup_opened">
            <div className="popup__gallery">
                <img className="popup__image" alt={card?.name} src={card?.link} />
                <p className="popup__zoom-paragraph">{card?.name}</p>
                <button className="popup__close" id="popZoom__close" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;