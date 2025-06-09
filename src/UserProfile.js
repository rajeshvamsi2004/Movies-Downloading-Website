import UserData from "./UserData";

const UserProfile = () => {
    const userId = "8e83f2ad553c7bcc4715dea626464314f80b9680c05b0484d7d05d215891bf6dPS"; 

    return (
        <div>
            <h1>User Profile</h1>
            <UserData userId={userId} />
        </div>
    );
};

export default UserProfile;
