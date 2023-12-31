import { useState } from "react";
import Avatar from "../Avatar";

export default function SectionToComment({loggedUser, commentPost}){
     const [commentRows, setCommentRows] = useState(1)
     const [comment, setComment] = useState('');

     const onTypeComment = (e) => {
        const inputValue = e.target.value;
        setComment(inputValue);
        setCommentRows(inputValue.length > 0 ? 2 : 1)
     }

     const onTypeAnyKey = (e) => {
        if(e.key == 'Enter'){
            onPressEnter()
        }
     }

     const onPressEnter = () => {
        if(comment.trim().length === 0 || !commentPost) return;

        commentPost(comment);
     }



    return (
        <div className="containerSectionToComment">
            <Avatar src={loggedUser.avatar} />
            <textarea value={comment} rows={commentRows} onKeyDown={onTypeAnyKey} onChange={onTypeComment} placeholder="Adicione um comentário..." />
            <button onClick={() => commentPost(comment)} type="button" className="submitComment desktop">Publicar</button>
        </div>
    )
}



