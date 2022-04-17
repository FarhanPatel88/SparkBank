import React, { useState } from 'react';
import { useEffect } from 'react';
import classes from './History.module.css';

const History = React.forwardRef((props, ref) => {
    const [content, setContent] = useState([]);

    useEffect(() => {
        let tempContent = [];
        fetch('https://spark-bank-api.herokuapp.com/users/getTransactions')
            .then((response) => response.json())
            .then((response) => {
                response.transactions.forEach((transaction, index) => {
                    tempContent.push(
                        <tr key={transaction._id} className={classes.tr}>
                            <td>{index + 1}</td>
                            <td>{transaction.transactionId}</td>
                            <td>{transaction.transactionFromUser}</td>
                            <td>{transaction.transactionAmount}$</td>
                            <td>{transaction.transactionToUser}</td>
                            <td>{transaction.transactionDate.toLocaleString()}</td>
                        </tr>
                    );
                });
                setContent(tempContent);
            });
    }, []);

    return (
        <>
            <div className={`d-flex w-100 p-3 pt-0 flex-column justify-content-center align-items-center m-2`}>
                {props.children}
                <table ref={ref} className={`table table-hover w-100 text-center ${classes.table}`}>
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Transaction Id</th>
                            <th>Transaction From</th>
                            <th>Transaction Amount</th>
                            <th>Transaction To</th>
                            <th>Transaction Date</th>
                        </tr>
                    </thead>
                    <tbody className={`${classes.tbody}`}>{content}</tbody>
                </table>
            </div>
        </>
    );
});

export default History;
