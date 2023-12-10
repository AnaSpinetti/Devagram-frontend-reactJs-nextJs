import { useEffect, useRef } from "react";

export default function UploadImage({className='', setImage, imagePreview, imagePreviewClassname='', setRef}){
    const inputRef = useRef(null);

    useEffect(() => {
        if(!setRef) return;

        setRef(inputRef?.current);

    }, [inputRef?.current]);

    const openFileSelector = () => {
        inputRef?.current?.click();
    }

    const onChangeImage = () => {
        if(!inputRef?.current?.files?.length) return

        const file = inputRef?.current?.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = () => {
            setImage({
                file,
                preview: fileReader.result
            })
        }
    }

    return(
        <div className={`uploadImageContainer ${className}`} onClick={openFileSelector}>
            {imagePreview && (
                <div className="imagePreviewContainer">
                    <img src={imagePreview} alt="Preview da imagem" className={imagePreviewClassname} />
                </div>
            )}
            <input ref={inputRef} type="file" className="hide" accept="image/*" onChange={onChangeImage} />
        </div>
    )
}