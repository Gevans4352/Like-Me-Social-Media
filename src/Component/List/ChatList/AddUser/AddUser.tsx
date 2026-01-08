import "./AddUser.scss";
import image from "../../../../assets/User.svg"
const AddUser = () =>{
    return(
        <div className="addUser">
            <form>
                <input type="search" placeholder="Username" name="username"  />
                <button>Search</button>
            </form>
            <div className="user">
                <div className="detail">
                    <img src={image} alt="default user" />
                </div>
                <span>User</span>
            </div>
        </div>
    )
}

export default AddUser;