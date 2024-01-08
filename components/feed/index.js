import { useEffect, useState } from "react";
import Post from "./Post";
import FeedService from "@/services/FeedService";
import UserService from "@/services/UserService";

const feedService = new FeedService();
const userService = new UserService();

export default function Feed({loggedUser, userProfile}){
    const [postList, setPostList] = useState([]);
    const [user, setUser] = useState({});
   
    useEffect(() => {
      setPostList([])
        const fetchData = async () => {
          setPostList([]);
          try {
            // RENDERIZANDO MEUS POSTS
            if(userProfile == loggedUser.id){
              const { data } = await feedService.loadPosts(loggedUser.id);
              if(!data){
                return;
              }

              const formattedPosts = data.map((post) => ({
                id: post._id,
                user: {
                  id: post.idUser,
                  name: post?.user?.name || userProfile?.name,
                  avatar: post?.user?.avatar || userProfile?.avatar,
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

              return
            }
            
            // RENDERIZANDO POST DO USUARIO QUE EU TO NO PERFIL
            if(userProfile !== loggedUser.id){
              const { data } = await feedService.loadPosts(userProfile);
              
              if(!data){
                return;
              }

              const formattedPosts = data.map((post) => ({
                id: post._id,
                user: {
                  id: post.idUser,
                  name: post?.user?.name,
                  avatar: post?.user?.avatar,
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

              return 
            }

            if(userProfile == undefined){
              const { data } = await feedService.loadPosts();
              
              if(!data){
                return;
              }

              const formattedPosts = data.map((post) => ({
                id: post._id,
                user: {
                  id: post.idUser,
                  name: post?.user?.name,
                  avatar: post?.user?.avatar,
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

              return 
            }



          } catch (error) {
            console.error("Erro ao carregar posts:", error);
          }
        };
      
        fetchData();
      }, [loggedUser, userProfile]);
      

      return (
        <div className="feedContainer desktop30pct">
              {postList.map(postData => (
                  <Post key={postData.id} user={user} loggedUser={loggedUser} {...postData} />
                ))}
        </div>
    )
}