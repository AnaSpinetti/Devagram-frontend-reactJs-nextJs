import Authorizated from "../hoc/Authorizated";
import Feed from "../feed";

function Home({loggedUser}){
    return(
        <Feed loggedUser={loggedUser} />
    )
}

export default Authorizated(Home) 