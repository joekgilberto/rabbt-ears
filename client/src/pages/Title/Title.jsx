//Imports style sheet
import './Title.css';

//Imports Menu and Carousel components
import Menu from '../../components/Menu/Menu';
import Carousel from '../../components/Carousel/Carousel';

//Exports Title page with Menu and Carousel components
export default function Title() {

    return (
        <main className='Title'>
            <Menu />
            <Carousel />
        </main>
    );
};
