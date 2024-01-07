import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import arrowIcon from "@/public/images/arrowIcon.svg";
import imgLogout from "@/public/images/logoutIcon.svg";

import ActionsHeader from "@/components/actionsHeader";
import Button from '../Button';
import Avatar from '../Avatar';
import UserService from '@/services/UserService';

const userService = new UserService();

export default function HeaderProfile({user, isInPersonalProfile=false}) {
    const [isFollowingUser, setIsFollowingUser] = useState(false);
    const [followersCounter,  setFollowersCounter] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if(!user){
            return;
        }
        setIsFollowingUser(user.followThisUser)
        setFollowersCounter(user.followers)
    }, [user])

    const getFollowButtonText = () => {
        if(isInPersonalProfile){
            return "Editar Perfil"
        }

        if(isFollowingUser){
            return "Deixar de seguir"
        }
        return "Seguir"
    }

    const getButtonColor = () => {
        if(isFollowingUser){
            return "outline"
        }
        return "primary"
    }

    const manipulateClickProfileButton = async() => {
        if(isInPersonalProfile){
            return router.push('/profile/edit')
        }else
        try {
            await userService.toggleFollow(user._id)
            setFollowersCounter(
                isFollowingUser == true
                ? (followersCounter - 1)
                : (followersCounter + 1 )
            )
            setIsFollowingUser(!isFollowingUser)
        } catch (e) {
            console.log(e)
            alert("Erro ao seguir/desseguir usuário " + (e?.response?.data.error || ''))
        }
    }


    const onClickItemLeft = () => {
        router.back();
    }

    const logout = () => {
        userService.logout();
        router.replace('/')
    }

    const getRightElementProfileHeader = () => {
        if(isInPersonalProfile){
            return(
                <Image src={imgLogout} alt="Ícone deslogar" onClick={logout} width={25} height={25} />
            )
        }

        return null
    }

  return (
    <div className='headerProfile desktop30pct'>
        <ActionsHeader onClickItemLeft={onClickItemLeft} title={user.name} iconBack={isInPersonalProfile ? null : arrowIcon} rightElement={
            getRightElementProfileHeader()
        } />
    
        <hr className='borderProfileHeader'/>

        <div className='statusProfile'>
            <Avatar  src={user.avatar} />
            <div className='infosProfile'>
                <div className='statusContainer'>
                    <div className='status'>
                        <strong>{user.posts}</strong>
                        <span>Publicações</span>
                    </div>

                    <div className='status'>
                        <strong>{followersCounter}</strong>
                        <span>Seguidores</span>
                    </div>

                    <div className='status'>
                        <strong>{user.following}</strong>
                        <span>Seguindo</span>
                    </div>
                </div>

                <Button text={getFollowButtonText()} color={getButtonColor()} onClickBtn={manipulateClickProfileButton}/>
            </div>
        </div>
    </div>
  )
}
