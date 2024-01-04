import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Authorizated from "@/components/hoc/Authorizated";
import Feed from "@/components/feed";
import HeaderProfile from "@/components/headerProfile";


function Profile({loggedUser}){
    const [user, setUser] = useState({});
    const router = useRouter();


    useEffect(() => {
        const fetchData = async () => {
            try {
                setUser({
                    name: 'test'
                })
            } catch (error) {
                console.error(error);

            }
        }

        fetchData()
    },[router.query.id]);

    //className, textLeft = null, onClickItemLeft, title='teste'
    return (
        <div className="profilePage">
            <HeaderProfile loggedUser={loggedUser} user={user} />
            <Feed loggedUser={loggedUser}/>
        </div>
    )
}

export default Authorizated(Profile)