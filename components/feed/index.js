import { useEffect, useState } from "react";
import {Post} from "./Post";

export function Feed({loggedUser, loggedUser}){
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        console.log("carregar Feed")
    },[loggedUser])

    return (
        <div className="feedContainer desktop30pct">
            {postList.map(postData => (
                <Post loggedUser={loggedUser} {...postData}  key={postData.id}/>
            ))}
        </div>
    )
}