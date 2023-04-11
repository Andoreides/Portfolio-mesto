import {React, useEffect} from "react"

export const PopupWithForm = (props) => {
    const {id, popupTitle, idForm, inputId, onSubmit,  inputName, children, submitText, isOpen, onClose} = props
    
    // console.log('isOpen', isOpen)

    // const popupClose = (e) => {
    //     console.log('popupClose', props)
    //     onClose(false)
    //   }

    //   useEffect(()=>{
    //     console.log('useEffect',isOpen)
    //   },[isOpen])
    // console.log('props', props)
    // const onSubmit=  (event) => {
    //     event.preventDefault();
    // }
    
    return (
        <div id={id} className={`popup popup_type_${ inputName } ${isOpen ? 'popup_opened': ''}`}>
            <div className="popup__container">
                <h3 className="popup__title">{popupTitle}</h3>
                {/* {children} */}
                <form name={inputName} onSubmit={onSubmit} id={idForm} className='popup__form'>
                    {children}
                    <button type="submit" className="popup__button popup__button-submit">{submitText}</button>
                </form>
                <button className="popup__close" type="button" onClick={()=>onClose(false)}></button>
            </div>
        </div>
    )
}


