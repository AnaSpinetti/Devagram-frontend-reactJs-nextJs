import Avatar from "../Avatar";

export default function SearchResult({name, avatar, email, onClick, id}){
    return (
        <div className="searchResult" onClick={() => onClick(id)}>
            <Avatar src={avatar} />
            <div className="userInfos">
                <strong>{name}</strong>
                <span>{email}</span>
            </div>
        </div>
    )
}