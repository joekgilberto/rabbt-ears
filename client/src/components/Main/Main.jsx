//Imports style sheet
import './Main.css';

//Imports Header and Footer components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

//Exports Main function that takes in a child prop and returns said component topped with a Header along with a Footer at the bottom
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
