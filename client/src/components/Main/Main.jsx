import './Main.css';
import Header from '../Header/Header';

export default function Main({ page }) {
    return (
        <>
        <Header />
        <main>
            
            {page}
        </main>
        </>
    );
};
