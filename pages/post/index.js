import { useState } from "react";
import { useRouter } from "next/router";
import UploadImage from "@/components/UploadImage";
import ActionsHeader from "@/components/actionsHeader";
import Authorizated from "@/components/hoc/Authorizated";

import postImg from '@/public/images/postImg.svg'
import arrowBack from '@/public/images/arrowIcon.svg'
import Button from "@/components/Button";
import FeedService from "@/services/FeedService";

const feedService = new FeedService();

function Post(){
    const [image, setImage] = useState();
    const [inputImage, setInputImage] = useState();
    const [currentStep, setCurrentStep] = useState(1);
    const [description, setDescription] = useState('');
    const router = useRouter();

    const isOnStepOne = () => currentStep === 1;

    const getRightElement = () => {
        if(isOnStepOne() && image){
            return 'Avançar'
        }

        return 'Compartilhar'
    }

    const getLeftElement = () => {
        if(!image){
            return ''
        }

        if(isOnStepOne()){
            return 'Cancelar'
        }

        return ''
    }

    const onClickLeftAction = () => {
        if(isOnStepOne()){
            inputImage.value=null
            setImage(null)
            return
        }

        setCurrentStep(1)
    }

    const onClickRightAction = () => {
        if(isOnStepOne()){
            setCurrentStep(2);
            return
        }

        sendPost()
    }

    const sendPost = async () => {
        try {
            if(!image?.file){
                alert("É obrigatório o envio de uma imagem")
                return
            }

            const bodyPost = new FormData();
            bodyPost.append("description", description);
            bodyPost.append("file", image.file);

            await feedService.sendPost(bodyPost)
            router.push('/')
            
        } catch (e) {
            alert("Não foi possível públicar " + e?.response?.data.error || '')
        }
    }

    return(
        <div className="pagePost desktop30pct">
            <ActionsHeader iconBack={isOnStepOne() ? null : arrowBack} title={'Nova Publicação'} textLeft={getLeftElement()} rightElement={getRightElement()} onClickItemLeft={onClickLeftAction} onClickItemRight={onClickRightAction} />

            <hr className="line" />

            <div className="pagePostContent">
                {isOnStepOne() ? (
                    <div className="firstStep">
                    <UploadImage imagePreview={image?.preview || postImg.src} setImage={setImage} imagePreviewClassname={!image ? 'previewImagePost' : 'previewSelectedImage'} setRef={setInputImage}  />
                
                    <span className="desktop textDragAndDrop">Arraste sua foto aqui</span>

                    <Button text={'Selecionar uma imagem'} onClickBtn={() => inputImage.click()} />
                </div>
                ) : (
                    <>
                    <div className="secondStep">
                        <UploadImage imagePreview={image?.preview} setImage={setImage} />
                        <textarea rows={3} value={description} placeholder="Escreva uma legenda..." onChange={e => setDescription(e.target.value)} />
                    </div>
                        <hr className="line" />
                        </>
                )}

            </div>
        </div>
    )
}
export default Authorizated(Post)