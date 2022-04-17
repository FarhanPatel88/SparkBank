import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import classes from './Bank.module.css';
import Customers from './Customers';
import History from './History';
import Modal from './Modal';

const Bank = React.forwardRef((props, ref) => {
    var content = null;
    const [names, setNames] = useState([]);
    const [balance, setBalance] = useState(0);
    const [receiverBalance, setReceiverBalance] = useState(0);
    const [usersArray, setUsersArray] = useState([]);
    const [formContent, setFormContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const senderRef = useRef(null);
    const receiverRef = useRef(null);
    const amountRef = useRef(null);

    useEffect(() => {
        let temporaryNames = [];
        fetch('https://spark-bank-api.herokuapp.com/users/getUsers', {
            method: 'GET',
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((users) => {
                setUsersArray(users.users.copyWithin(users.users.length, 0));

                users.users.forEach((element) => {
                    temporaryNames.push(
                        <option key={element._id} value={element._id}>
                            {element.name}
                        </option>
                    );
                });
                setNames(temporaryNames);
                setBalance(findBalance(senderRef.current.value));
                setReceiverBalance(findBalance(receiverRef.current.value));
            })
            .catch((err) => console.error(err));
    }, [props.serviceRequest]);

    const findBalance = (id) => {
        if (id) {
            return usersArray.find((element) => element._id === id).balance;
        }
        return 0;
    };

    if (props.serviceRequest === null) {
        return (
            <div ref={senderRef}>
                <div ref={receiverRef}></div>
            </div>
        );
    }

    if (props.serviceRequest === 'payment') {
        const nameChangeHandler = (event) => {
            let newbalance = findBalance(event.target.value);
            setBalance(newbalance);
        };

        const receiverNameChangeHandler = (event) => {
            let newbalance = findBalance(event.target.value);
            setReceiverBalance(newbalance);
        };

        const formSubmitHandler = (event) => {
            event.preventDefault();
            let user = {
                from: senderRef.current.value,
                to: receiverRef.current.value,
                amount: amountRef.current.value,
            };

            if (user.amount < 0) {
                setFormContent('Amount cannot be negative');
                setShowModal(true);
                amountRef.current.value = '';
            } else if (user.amount > balance) {
                setFormContent("Amount exceeds sender's balance");
                setShowModal(true);
                amountRef.current.value = '';
            } else {
                fetch('https://spark-bank-api.herokuapp.com/users/addTransaction', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                    mode: 'cors',
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((response) => {
                        if (response.error) {
                            setFormContent(response.error);
                        } else {
                            let newarray = usersArray.copyWithin(usersArray.length, 0);
                            let index = null;
                            newarray.find((element, i) => {
                                index = i;
                                return element._id === senderRef.current.value;
                            });
                            newarray[index] = response.userFrom;
                            newarray.find((element, i) => {
                                index = i;
                                return element._id === receiverRef.current.value;
                            });
                            newarray[index] = response.userTo;
                            setUsersArray(newarray);
                            setBalance(response.userFrom.balance);
                            setReceiverBalance(response.userTo.balance);
                            amountRef.current.value = '';
                            setFormContent('Payment was successful');
                        }
                        setShowModal(true);
                    });
            }
        };

        content = (
            <form ref={ref} className={`d-flex justify-content-center align-items-center w-100 flex-wrap`} onSubmit={formSubmitHandler}>
                <div className={`p-3 px-5 border border-warning rounded bg-white w-25 m-2`}>
                    <label htmlFor="sender" className={`w-100 mb-3 ${classes.label}`}>
                        Sender:
                    </label>
                    <select
                        name="sender"
                        id="sender"
                        className={`p-2 w-100 border border-warning rounded bg-warning mb-3`}
                        onChange={nameChangeHandler}
                        ref={senderRef}
                    >
                        {names}
                    </select>
                    <p className={`lead`}>Balance: {balance}$</p>
                </div>
                <div className={classes.divider}></div>
                <div className={`p-3 px-5 border border-warning rounded bg-white m-2 ${classes.amount}`}>
                    <label htmlFor="amount" className={`w-100 mb-3 ${classes.label}`}>
                        Amount:
                    </label>
                    <input
                        type="number"
                        name="amount"
                        id="amount"
                        className={`p-2 w-100 border border-warning rounded bg-warning mb-3`}
                        placeholder="Type an amount"
                        ref={amountRef}
                    />
                </div>
                <div className={classes.divider}></div>
                <div className={`p-3 px-5 border border-warning rounded bg-white w-25 m-2`}>
                    <label htmlFor="receiver" className={`w-100 mb-3 ${classes.label}`}>
                        Receiver:
                    </label>
                    <select
                        name="receiver"
                        id="receiver"
                        className={`p-2 w-100 border border-warning rounded bg-warning mb-3`}
                        onChange={receiverNameChangeHandler}
                        ref={receiverRef}
                    >
                        {names}
                    </select>
                    <p className={`lead`}>Balance: {receiverBalance}$</p>
                </div>
                <button className={`bg-white p-3 px-5 m-5 ${classes.button}`}>Pay</button>
            </form>
        );
    }

    if (props.serviceRequest === 'history') {
        content = (
            <History ref={ref}>
                <div ref={senderRef} className="d-none"></div>
                <div ref={receiverRef} className={`h2 w-100 text-center mb-5 fw-light`}>
                    This is your Transaction History
                </div>
            </History>
        );
    }

    if (props.serviceRequest === 'customers') {
        content = (
            <Customers ref={ref}>
                <div ref={senderRef} className="d-none"></div>
                <div ref={receiverRef} className={`h2 w-100 text-center mb-5 fw-light`}>
                    Meet our loyal customers!
                </div>
            </Customers>
        );
    }

    const closeModalHandler = (event) => {
        setShowModal(false);
    };

    return (
        <main id="bank" className={`d-flex justify-content-startt align-items-center flex-column w-100 ${classes.bank}`}>
            <header className={`h-25 w-100 text-center p-5`}>
                <h3 className={`display-4 p-2 border-top border-bottom d-inline-block border-secondary text-black`}>Bank Portal</h3>
            </header>
            {showModal && <Modal content={formContent} onClick={closeModalHandler}></Modal>}
            <div className={`w-100 d-flex justify-content-center align-items-center mb-5`}>{content}</div>
        </main>
    );
});

export default Bank;
