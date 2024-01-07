import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "../Avatar";
import SectionToComment from "./SectionToComment";

import likeImg from "../../public/images/likeInativo.svg";
import likedImg from "../../public/images/likeAtivo.svg";
import commentGray from "../../public/images/commentIcon.svg";
import commentActive from "../../public/images/commentAtivo.svg";
import FeedService from "@/services/FeedService";

const limitDescriptionLength = 90;

const feedService = new FeedService();

export default function Post({id, user, image, description, comments, loggedUser, likes}){
    const [postLikes, setPostLikes] = useState(likes)
    const [commentsPost, setCommentPost] = useState(comments);
    const [showSectionToComment, setShowSectionToComment] = useState(false);
    const [currentDescriptionLength, setCurrentDescriptionLength] = useState(limitDescriptionLength)

    const showFullDescription = () => {
        setCurrentDescriptionLength(Number.MAX_SAFE_INTEGER)
    }

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

    // Altera o ícone de comentar quando clicamos para exibir a seção de escrever comentário
    const getCommentIcon = () => {
        return showSectionToComment ? commentActive : commentGray
    }

    const getLikeIcon = () => {
        return postLikes.includes(loggedUser.id) ? likedImg : likeImg
    }

    const commentPost = async (newComment) => {
        try {            
            await feedService.commentpost(id, {comment: newComment});
            setShowSectionToComment(false);
            setCommentPost([...commentsPost, {
                name: loggedUser.name,
                comment: {
                    comment: newComment
                }
            }])
            
            return true
        } catch (e) {
            console.log(e)
            alert("Erro ao comentar! " + (e?.response?.data.error || ''))
            return false;
        }

    }

    const toggleLike = async () => {
        try {
            await feedService.toggleLike(id);

            const isLiked = postLikes.includes(loggedUser.id);
            if(isLiked){
                setPostLikes(postLikes.filter(idLiked => idLiked !== loggedUser.id))
            }else{
                setPostLikes([...postLikes, loggedUser.id]);
            }
        } catch (e) {
            console.log(e)
            alert('Não foi possível curtir/descurtir essa publicação ' + (e?.response?.data?.error || ''))
        }
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

            <div className='footerPost'>
                <div className="actions">
                    <Image src={getLikeIcon()} alt="Ícone curtir" width={20} height={20} onClick={() => toggleLike()} />
                    <Image src={getCommentIcon()} alt="Ícone comentar" width={20} height={20} onClick={() => setShowSectionToComment(!showSectionToComment)} />
                    <span className="likeCounter">
                        Curtido por <strong> {postLikes.length}</strong> pessoas
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
                    {commentsPost.map((c, i) => (
                        <div className="comment" key={i}> 
                            <strong className="userName">{c.name}</strong>
                            <p className="description">{c.comment.comment}</p>
                        </div>
                    ))}
                </div>

            </div>

            {showSectionToComment && 
                <SectionToComment commentPost={commentPost} loggedUser={loggedUser} />
            }
        </div>
    )
}