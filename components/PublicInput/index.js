import Image from "next/image";

export default function PublicInput({image, typeValue, placeholderValue, valueInput, show = false, message, onChangeValue}){
    return( 
        <div className="publicInputContainer">
            <div className="publicInput">
                <Image src={image} alt="Imagem do campo" className="iconPublicInput" width={20} height={20} />
                <input type={typeValue} placeholder={placeholderValue} value={valueInput} onChange={onChangeValue} />
            </div>
            {message && <span>{message}</span>}
        </div>
    )
}