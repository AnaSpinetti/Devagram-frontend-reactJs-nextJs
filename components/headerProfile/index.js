import React from 'react';
import ActionsHeader from "@/components/actionsHeader";
import arrowIcon from "@/public/images/arrowIcon.svg";
import Avatar from '../Avatar';
import Button from '../Button';

export default function HeaderProfile({user}) {
  return (
    <div className='headerProfile desktop30pct'>
        <ActionsHeader title={user.name} iconBack={arrowIcon} />
    

        <div className='statusProfile'>
            <Avatar  src={user.avatar} />
            <div className='infosProfile'>
                <div className='statusContainer'>
                    <div className='status'>
                        <strong>15</strong>
                        <span>Publicações</span>
                    </div>

                    <div className='status'>
                        <strong>15</strong>
                        <span>Seguidores</span>
                    </div>

                    <div className='status'>
                        <strong>15</strong>
                        <span>Seguindo</span>
                    </div>
                </div>

                <Button text={'Seguir'} color='primary' />
            </div>
        </div>
    </div>
  )
}
