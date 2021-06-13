import React , {Fragment} from 'react'
import reactDOM from 'react-dom'
import classes from './Modal.module.css'

const Backdrop = props => {
    return (
        <div className={classes.backdrop} onClick={props.onClose}/> 
    )    
}

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    ) 
}


const overlaySection = document.getElementById('overlay')

const Modal = props => {
    return(
        <Fragment>
            {reactDOM.createPortal(<Backdrop onClose={props.onClose}/>, overlaySection)}
            {reactDOM.createPortal(<ModalOverlay children={props.children}/>, overlaySection)}
        </Fragment>
    )
}

export default Modal