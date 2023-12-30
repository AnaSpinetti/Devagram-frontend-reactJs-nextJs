import Avatar from "../Avatar";

export function SectionToComment({loggedUser}){
    return (
        <div className="containerSectionToComment">
            <Avatar src={loggedUser.avatar} />
            <textarea rows={2} placeholder="Adicione um comentário..." />
        </div>
    )
}



