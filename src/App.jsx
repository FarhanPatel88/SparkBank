import { useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Bank from './components/Bank';
import Footer from './components/Footer';
import Header from './components/Header';
import Services from './components/Services';

function App() {
    const [service, setService] = useState(null);
    const serviceRef = useRef(null);
    const bankRef = useRef(null);

    const parseRequest = (id) => {
        setService(id);
    };

    const scrollToService = () => {
        serviceRef.current.scrollIntoView();
    };

    const scrollToBank = () => {
        setTimeout(() => {
            bankRef.current.scrollIntoView();
        }, 100);
    };

    return (
        <Routes>
            <Route
                path="/"
                element={[
                    <Header scrollTo={scrollToService} key="header" />,
                    <Services request={parseRequest} scrollTo={scrollToBank} ref={serviceRef} key="services" />,
                    <Bank serviceRequest={service} ref={bankRef} key="bank" />,
                    <Footer></Footer>,
                ]}
            ></Route>
            {/* <Route path="services" element={[<Header />, <Services request={parseRequest} />]}></Route> */}
            {/* <Services request={parseRequest}></Services> */}
            {/* <Route path="bank" element={<Bank serviceRequest={service} />}></Route> */}
            {/* <Bank serviceRequest={service}></Bank> */}
        </Routes>
    );
}

export default App;
