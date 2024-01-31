//Imports style sheet
import './Loading.css';

//Exports Loading component that plays an idle animation while a user waits
export default function Loading() {
    return (
        <div className='Loading'>
            <h1>Loading</h1>
            <div className='dots'>
                <div className='dot first'></div>
                <div className='dot second'></div>
            </div>
        </div>
    );
};
