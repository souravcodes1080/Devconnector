import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // we'll use axios directly
import { BASE_API_URL } from "../../../API_CONFIG";

function FollowersItem({ follower }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${BASE_API_URL}/api/users/${follower.user}`
        );
        setUser(res.data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [follower.user]);

  if (loading || !user) return <div>Loading...</div>;

  return (
    <Link
      to={`/profile/${user._id}`}
      className="flex items-center mt-2 transition-all duration-200 rounded-full hover:bg-gray-100 gap-x-2"
    >
      <img
        src={user.avatar}
        className="w-12 h-12 rounded-full"
        alt="avatar"
      />
      <br />
      <h4 className="">{user.name}</h4>
    </Link>
  );
}

export default FollowersItem;
