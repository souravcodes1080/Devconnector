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
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "200px",
        border: "1px solid gray",
        padding: "20px 20px",
      }}
    >
      <img
        src={user.avatar}
        style={{ width: "80px", borderRadius: "100px" }}
        alt="avatar"
      />
      <br />
      <h4 className="mt-1">{user.name}</h4>
    </Link>
  );
}

export default FollowersItem;
