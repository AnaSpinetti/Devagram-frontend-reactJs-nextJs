import { useEffect, useState } from "react";
import Post from "./Post";
import FeedService from "@/services/FeedService";

const feedService = new FeedService();
export default function Feed({loggedUser}){
     
    const [postList, setPostList] = useState([]);

    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await feedService.loadPosts();
      
            const formattedPosts = data.map((post) => ({
              id: post._id,
              user: {
                id: post.idUser,
                name: post.user.name,
                avatar: post.user.avatar,
              },
              image: post.image,
              description: post.description,
              likes: post.likes,
              comments: post.comments.map((c) => ({
                name: c.name,
                comment: c.comment
              })),
            }));
      
            setPostList(formattedPosts);

          } catch (error) {
            console.error("Erro ao carregar posts:", error);
          }
        };
      
        fetchData();
      }, [loggedUser]);
      

    return (
        <div className="feedContainer desktop30pct">
            {postList.map(postData => (
                <Post key={postData.id} loggedUser={loggedUser} {...postData} />
            ))}
        </div>
    )
}