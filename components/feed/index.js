import { useEffect, useState } from "react";
import Post from "./Post";
import FeedService from "@/services/FeedService";

const feedService = new FeedService();

export default function Feed({loggedUser, userProfile}){
    const [postList, setPostList] = useState([]);
    
    useEffect(() => {
      const fetchData = async () => {
          setPostList([]);
          try {
            const { data } = await feedService.loadPosts(userProfile?._id);

            if(!data){
              return;
            }
      
            const formattedPosts = data.map((post) => ({
              id: post._id,
              user: {
                id: post.idUser,
                name: post?.user?.name || userProfile?.name,
                avatar: post.user.avatar || userProfile?.avatar,
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
      }, [loggedUser, userProfile]);
      
      if(!postList.length){
        return null;
      }

    return (
        <div className="feedContainer desktop30pct">
              {postList.map(postData => (
                  <Post key={postData.id} loggedUser={loggedUser} {...postData} />
                ))}
        </div>
    )
}