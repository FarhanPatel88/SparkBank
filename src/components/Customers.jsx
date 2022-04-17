import React, { useEffect } from 'react';
import { useState } from 'react';
import classes from './Customers.module.css';

const Customers = React.forwardRef((props, ref) => {
    const [content, setContent] = useState([]);
    // const [transactions, setTransactions] = useState({});
    const [transactionsContent, setTransactionsContent] = useState([]);
    const [showTransactions, setShowTransactions] = useState(false);
    let tempTransactions = {};

    useEffect(() => {
        let tempContent = [];
        fetch('https://spark-bank-api.herokuapp.com/users/getUsers')
            .then((response) => response.json())
            .then((response) => {
                response.users.forEach((user) => {
                    tempTransactions[user._id] = user.transactions;
                });
                // setTransactions(tempTransactions);
                console.log(tempTransactions);

                response.users.forEach((user, index) => {
                    tempContent.push(
                        <tr key={user._id} className={classes.tr}>
                            <td>{index + 1}</td>
                            <td>
                                <button className={`btn btn-link`} onClick={showTransactionsHanlder}>
                                    {user._id}
                                </button>
                            </td>
                            <td>{user.name} </td>
                            <td>{user.balance} </td>
                        </tr>
                    );
                });
                setContent(tempContent);
            });
    }, []);

    const showTransactionsHanlder = (event) => {
        setShowTransactions(true);
        let tempTransactions1 = [];
        tempTransactions[`${event.target.innerText}`].forEach((transaction, index) => {
            tempTransactions1.push(
                <tr key={transaction._id} className={classes.tr}>
                    <td>{index + 1}</td>
                    <td>{transaction.transactionId}</td>
                    <td>{transaction.transactionFrom} </td>
                    <td>{transaction.transactionAmount} </td>
                    <td>{transaction.transactionTo} </td>
                    <td>{transaction.transactionDate} </td>
                </tr>
            );
        });
        setTransactionsContent(tempTransactions1);
    };

    return (
        <>
            <div className={`d-flex w-100 p-3 pt-0 flex-column justify-content-center align-items-center m-2`}>
                {props.children}
                <table ref={ref} className={`table table-hover w-100 text-center ${classes.table}`}>
                    <thead className={`${classes.thead}`}>
                        <tr>
                            <th>Serial No.</th>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>User Balance</th>
                        </tr>
                    </thead>
                    <tbody className={`${classes.tbody}`}>{content}</tbody>
                </table>
                {showTransactions && (
                    <table className={`table table-hover w-100 text-center ${classes.table}`}>
                        <thead className={`${classes.thead}`}>
                            <tr>
                                <th>Serial No.</th>
                                <th>Transaction Id</th>
                                <th>Transaction From</th>
                                <th>Transaction Amount</th>
                                <th>Transaction To</th>
                                <th>Transaction Date</th>
                            </tr>
                        </thead>
                        <tbody className={`${classes.tbody}`}>{transactionsContent}</tbody>
                    </table>
                )}
            </div>
        </>
    );
});

export default Customers;
