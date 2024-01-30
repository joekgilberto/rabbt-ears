import './ToggleTag.css';

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
