import React from 'react';
import classes from './Modal.module.css';

const Modal = (props) => {
    return (
        <>
            <div className={classes.backdrop} onClick={props.onClick}>
                <dialog className={`d-flex flex-column justify-content-center align-items-center ${classes.modal}`}>
                    <div className="lead w-100 mb-4">{props.content}</div>
                    <button className="btn btn-warning" onClick={props.onClick}>
                        OK
                    </button>
                </dialog>
            </div>
        </>
    );
};

export default Modal;
