
function Button(props) {
    return (
        <div className="col-3 p-1 rounded-2">
            <button className={`${props.className} border-0 outline-none custom-btn p-3 w-100 rounded-2 bg-color-white fw-bold`}
                onClick={props.onClick}>
                {props.label}
            </button>
        </div>
    )
}

export default Button;