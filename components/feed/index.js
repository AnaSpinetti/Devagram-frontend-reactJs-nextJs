import { useEffect, useState } from "react";
import {Post} from "./Post";

export function Feed({loggedUser}){
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        console.log("carregar Feed")
    },[loggedUser])

    return (
        <div className="feedContainer">
            {postList.map(postData => (
                <Post {...postData}  key={postData.id}/>
            ))}
        </div>
    )
}