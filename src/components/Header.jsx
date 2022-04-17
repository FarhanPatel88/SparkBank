import React from 'react';
import classes from './Header.module.css';
// import { Link } from 'react-router-dom';

const Header = (props) => {
    const scrollToService = () => {
        props.scrollTo();
    };

    return (
        <>
            <section className={` ${classes.mainHeader}`}>
                <div className={`${classes.blurred} d-flex justify-content-center align-items-center flex-column`}>
                    <header className={`w-100 h-25 d-flex justify-content-center align-items-center display-1`}>
                        <div className={`p-3 px-5 border-top border-bottom`}>
                            <span className={`text-warning`}>Spark</span> <span className={`text-white`}>Bank</span>
                        </div>
                    </header>
                    <article className={`h-75 w-100 d-flex justify-content-center align-items-center`}>
                        <div className={`w-50 d-flex justify-content-center align-items-center flex-column`}>
                            <h3 className={`mb-5 display-5 text-warning`}>Take a look at our Services</h3>
                            {/* <Link to="#services"> */}
                            <button className={classes.exploreMoreButton} onClick={scrollToService}>
                                Explore More
                            </button>
                            {/* </Link> */}
                        </div>
                        <div className={`border h-50`}></div>
                        <div className={`w-50 d-flex justify-content-center align-items-start flex-column ps-5`}>
                            <h2 className={`mb-5 display-5 text-white`}>Notable Features</h2>
                            <ul className="p-5">
                                <li className={classes.feature}>Instant Money Transfer</li>
                                <li className={classes.feature}>View All Customers</li>
                                <li className={classes.feature}>View Transaction History</li>
                            </ul>
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
};

export default Header;
