import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import UploadImage from "@/components/UploadImage";
import ActionsHeader from "@/components/actionsHeader";
import Authorizated from "@/components/hoc/Authorizated";
import cleanIcon from "@/public/images/cleanIcon.svg";
import avatarImg from "@/public/images/avatarImg.svg"
import UserService from "@/services/UserService";
import { validateName } from "@/utils/validators";

const userService = new UserService();

function EditProfile({loggedUser}){
    const router = useRouter();
    const [avatar, setAvatar] = useState();
    const [name, setName] = useState('');
    const [inputAvatar, setinputAvatar] = useState();

    useEffect(() => {
        if(!loggedUser){
            return
        }

        setName(loggedUser.name)
        setAvatar({
            preview: loggedUser.avatar
        })
    }, [])

    const updateProfile = async () => {
        try {
            if(!validateName(name)){
                alert("O nome precisa de pelo menos 2 caracteres")
                return
            }

            const body = new FormData();
            body.append('name', name)

            
            if(avatar.file){
                body.append('file', avatar.file);
            }

            await userService.updateProfile(body);
            localStorage.setItem('name', name);
            localStorage.setItem('avatar', avatar.preview);

            router.push('/profile/main')
        } catch (e) {
            alert("Erro ao editar perfil " + e?.response?.data.error || '')
        }
    }

    const onCancelEdit = () => {
        router.push('/profile/main');
    }

    const openFileSelector = () => {
        inputAvatar?.click()
    }

    const clearName = () => {
        setName('');
    }

    return(
        <div className="editProfile desktop30pct">
            <div className="pageEditProfileContent">
                <ActionsHeader title={"Editar Perfil"} onClickItemLeft={onCancelEdit} textLeft={'Cancelar'} rightElement={'Concluir'} onClickItemRight={updateProfile} />


                <hr className='line'/>
                <div className="editionAvatar">
                    <UploadImage imagePreviewClassname="avatar" setImage={setAvatar} setRef={setinputAvatar} imagePreview={avatar?.preview || avatarImg.src}/>
                    <span onClick={openFileSelector}>Alterar foto do perfil</span>
                </div>
                <hr className='line'/>

                <div className="editionName">
                    <label>Nome: </label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    <Image src={cleanIcon} width={16} height={16} onClick={clearName}  alt="limpar nome"/>
                    
                </div>
                    <hr className='line'/>
            </div>
        </div>
        
    )
}

export default Authorizated(EditProfile);