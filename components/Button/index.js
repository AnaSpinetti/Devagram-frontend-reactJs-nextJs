export default function Button({type='button', text, color = 'primary', isDisabled = false, onClickBtn}){
    return(
        <button type={type} className={`btn ${color}`} disabled={isDisabled} onClick={onClickBtn}>
            {text}
        </button>
    )
}