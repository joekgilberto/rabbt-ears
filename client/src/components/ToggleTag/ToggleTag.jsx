//Imports style sheet
import './ToggleTag.css';

//Exports ToggleTag component with an id of idx, content pulled from a tag object, a class chosen based on if the five limit on count has been reached, and a callback function to commit on clicking 
export default function ToggleTag({ idx, tag, count, cb }) {

    return (
        <button
            id={idx}
            className={`ToggleTag${tag.symbol === '+' && count >= 5 ? ' disable' : tag.symbol === '+' ? ' plus' : tag.symbol === '-' ? ' minus' : ''}`}
            value={tag.text}
            onClick={cb}>
            <span className='toggle-tag-symbol'>{tag.symbol} </span>
            {tag.text}
        </button>
    );
};
