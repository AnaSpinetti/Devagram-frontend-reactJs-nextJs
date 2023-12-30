import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "../Avatar";
import SectionToComment from "./SectionToComment";

import likeImg from "../../public/images/likeInativo.svg";
import likedImg from "../../public/images/likeAtivo.svg";
import commentGray from "../../public/images/commentIcon.svg";

const limitDescriptionLength = 90;

export function Post({user, image, description, comments, loggedUser}){
    const [currentDescriptionLength, setCurrentDescriptionLength] = useState(limitDescriptionLength)
    const [showSectionToComment, setShowSectionToComment] = useState(false);

    const isDescriptionGreaterThanLimit = () => {
        return description.length > currentDescriptionLength;
    }

    const getDescription = () => {
        let message = description.substring(0, currentDescriptionLength)

        if(isDescriptionGreaterThanLimit()){
            message += "..."
        }

        return message;
    }

    const showFullDescription = () => {
        setCurrentDescriptionLength(Number.MAX_SAFE_INTEGER)
    }

    return(
        <div className="post">
            <Link href={`/profile/${user.id}`}>
                <section className="headerPost">
                    <Avatar src={user.avatar} />
                    <strong>{user.name}</strong>
                </section>
            </Link>

            <div className="postImage">
                <img src={image} alt="foto da postagem" />
            </div>
            <div classname='footerPost'>
                <div className="actions">
                    <Image src={likeImg} alt="Ícone curtir" width={20} height={20} onClick={() => console.log('curtir')} />
                    <Image src={commentGray} alt="Ícone comentar" width={20} height={20} onClick={setShowSectionToComment(!showSectionToComment)} />
                    <span className="likeCounter">
                        Curtido por <strong>{likes}</strong> pessoas
                    </span>
                </div>
                
                <div className="postDescription">
                    <strong className="userName">{user.name}</strong>
                    <p className="description">
                        {getDescription()}
                        {isDescriptionGreaterThanLimit() && (
                            <span className="showFullDescription" onClick={showFullDescription()}>mais</span>
                        )}
                    </p>
                </div>

                <div className="postComments">
                    {comments.maps(c, i => {
                        <div className="comment" key={i}> 
                            <strong className="userName">{c.name}</strong>
                            <p className="description">{c.comment}</p>
                        </div>
                    })}
                </div>

            </div>

            {showCommentSection && 
                <SectionToComment loggedUser={loggedUser} />
            }
        </div>
    )
}