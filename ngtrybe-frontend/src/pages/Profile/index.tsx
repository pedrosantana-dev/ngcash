import userAuth from "../../context/AuthProvider/userAuth"

export const Profile = () => {
    const {username, logout} = userAuth();

    return (
        <div>
            <h2>Olá, {username}!</h2>
            <button onClick={logout}>Logout</button>
        </div>
    )
}