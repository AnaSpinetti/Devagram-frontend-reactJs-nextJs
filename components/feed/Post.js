import Link from "next/link";
import Avatar from "../Avatar";

export function Post(user){
    return(
        <div className="post">
            <Link href={`/profile/${user.id}`}>
                <section className="headerPost">
                    <Avatar src={user.avatar} />
                    <strong>{user.name}</strong>
                </section>
            </Link>
        </div>
    )
}