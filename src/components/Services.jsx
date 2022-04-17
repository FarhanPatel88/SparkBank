import React from 'react';
import classes from './Services.module.css';
import one from '../assets/1.jpg';
import two from '../assets/2.jpg';
import three from '../assets/3.jpg';
// import { Link } from 'react-router-dom';

const Services = React.forwardRef((props, ref) => {
    const sendRequest = (event) => {
        if (event.target.id === 'payment') {
            props.request(event.target.id);
        } else if (event.target.id === 'customers') {
            props.request(event.target.id);
        } else {
            props.request(event.target.id);
        }
        props.scrollTo();
    };

    return (
        <section className={`d-flex justify-content-center align-items-center flex-column w-100 ${classes.services}`} id="services" ref={ref}>
            <header className={`h-25 w-100 text-center p-5`}>
                <h3 className={`display-4 p-2 border-top border-bottom d-inline-block border-secondary text-black`}>Services</h3>
            </header>
            <article className={`h-75 w-100 d-flex justify-content-center align-items-center`}>
                <div className={`h-75 d-flex justify-content-start align-items-center flex-column ${classes.servicesCard}`}>
                    <figure className={`w-100 h-50`}>
                        <img src={one} alt="do transaction" className={`w-100 h-100`} />
                    </figure>
                    <article className="d-flex justify-content-center align-items-center p-5 flex-column">
                        <h4 className="mb-5">Pay hasslefree to anyone you want!</h4>
                        {/* <Link to="#bank"> */}
                        <button className="btn btn-warning" id="payment" onClick={sendRequest}>
                            Explore
                        </button>
                        {/* </Link> */}
                    </article>
                </div>
                <div className={`h-75 d-flex justify-content-start align-items-center flex-column ${classes.servicesCard}`}>
                    <figure className={`w-100 h-50`}>
                        <img src={two} alt="check customers" className={`w-100 h-100`} />
                    </figure>
                    <article className="d-flex justify-content-center align-items-center p-5 flex-column">
                        <h4 className="mb-5">Take a look at our loyal customers!</h4>
                        {/* <Link to="#bank"> */}
                        <button className="btn btn-warning" id="customers" onClick={sendRequest}>
                            Explore
                        </button>
                        {/* </Link> */}
                    </article>
                </div>
                <div className={`h-75 d-flex justify-content-start align-items-center flex-column ${classes.servicesCard}`}>
                    <figure className={`w-100 h-50`}>
                        <img src={three} alt="check history" className={`w-100 h-100`} />
                    </figure>
                    <article className="d-flex justify-content-center align-items-center p-5 flex-column">
                        <h4 className="mb-5">Check our transaction history so far!</h4>
                        {/* <Link to="#bank"> */}
                        <button className="btn btn-warning" id="history" onClick={sendRequest}>
                            Explore
                        </button>
                        {/* </Link> */}
                    </article>
                </div>
            </article>
        </section>
    );
});

export default Services;
