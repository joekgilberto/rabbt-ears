import './Main.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Main({ children }) {
    return (
        <>
        <Header />
        <main className='Main'>
            {children}
            <Footer />
        </main>

        </>
    );
};
