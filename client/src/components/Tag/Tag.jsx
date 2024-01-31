//Imports style sheet
import './Tag.css';

//Exports tag with text prop
export default function Tag({text}) {
    return (<p className='Tag'>{text}</p>);
};
