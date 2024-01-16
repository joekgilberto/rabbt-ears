import './Main.css';
import Header from '../Header/Header';

export default function Main({ page }) {
    return (
        <main>
            <Header />
            {page}
        </main>
    );
};
