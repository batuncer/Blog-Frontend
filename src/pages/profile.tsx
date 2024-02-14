import React from "react";
import { useParams } from "react-router-dom";

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  return (
    <div>
      <h2>User Profile</h2>
      <p>profile for user with ID: {userId}</p>
    </div>
  );
};

export default Profile;
