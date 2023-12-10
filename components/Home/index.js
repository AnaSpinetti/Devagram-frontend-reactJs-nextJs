import Authorizated from "../hoc/Authorizated"

function Home(){
    return(
        <h1>teste</h1>
    )
}

export default Authorizated(Home) 