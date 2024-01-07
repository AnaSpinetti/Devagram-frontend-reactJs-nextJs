import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import UploadImage from "@/components/UploadImage";
import ActionsHeader from "@/components/actionsHeader";
import Authorizated from "@/components/hoc/Authorizated";
import cleanIcon from "@/public/images/cleanIcon.svg";
import avatarImg from "@/public/images/avatarImg.svg"

function EditProfile(){
    const router = useRouter();
    const [avatar, setAvatar] = useState();
    const [name, setName] = useState('');
    const [inputAvatar, setinputAvatar] = useState();

    const onCancelEdit = () => {
        router.push('/profile/main');
    }

    const openFileSelector = () => {
        console.log('clicou')
    }

    const clearName = () => {
        setName('');
    }

    return(
        <div className="editProfile desktop30pct">
            <div className="pageEditProfileContent">
                <ActionsHeader title={"Editar Perfil"} onClickItemLeft={onCancelEdit} textLeft={'Cancelar'} rightElement={'Concluir'} onClickItemRight={() => console.log('clicou')} />


                <hr className='line'/>
                <div className="editionAvatar">
                    <UploadImage className="avatar" setImage={setAvatar} setRef={setinputAvatar} imagePreview={avatar?.preview || avatarImg.src}/>
                    <span onClick={openFileSelector}>Alterar foto do perfil</span>
                </div>
                <hr className='line'/>

                <div className="editionName">
                    <label>Nome: </label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    <Image src={cleanIcon} width={16} height={16} onClick={clearName} />
                    
                </div>
                    <hr className='line'/>
            </div>
        </div>
        
    )
}

export default Authorizated(EditProfile);