"use client"
import React, { useState } from "react";
import axios from "axios";

export default function Page() {
  const [userName, setUserName] = useState("");
  const [followers, setFollowers] = useState([]);
  const [data, setData] = useState(null);
  
  const onChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const onClickHandler = async () => {
    setFollowers([]);
    try {
      const response = await fetch(`https://api.github.com/users/${userName}`);
      const userData = await response.json();
      setData(userData);
      console.log(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const onFollowerHandler = async () => {
    try {
      const response = await axios.get(data.followers_url);
      console.log("response", response.data);
      setFollowers(response.data);
    } catch (error) {
      console.error("Error fetching followers data:", error);
    }
  };
  const followersfollowershandler=async(e)=>{
    try {
      const response = await fetch(`https://api.github.com/users/${e}`);
      const userData = await response.json();
      setData(userData);
      console.log(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-black mb-8">
        GitHub User Details and Followers
      </h1>
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="mb-4">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-600">
              Enter GitHub Username
            </label>
            <input
              type="text"
              onChange={onChangeHandler}
              value={userName}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={onClickHandler}
          >
            Search
          </button>
        </div>
        {data && (
          <div className="bg-white p-4 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">GitHub User</h1>
            <div className="flex flex-col items-center">
              <img
                src={data.avatar_url}
                width={100}
                alt="User Avatar"
                className="mb-2 rounded-full"
              />
              <p className="text-gray-700">Bio: {data.bio}</p>
              <p className="text-gray-700">Followers: {data.followers}</p>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                onClick={onFollowerHandler}
              >
                Get Followers
              </button>
            </div>
          </div>
        )}
      </div>
      {followers.length > 0 && (
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-4">Followers of {userName}</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {followers.map((e) => (
              <div
                key={e.id}
                className="bg-white p-4 rounded-md shadow-md text-center"
              >
                <div className="text-gray-700">{e.id}</div>
                <img
                  src={e.avatar_url}
                  width={50}
                  alt=""
                  className="rounded-full mx-auto mb-2"
                />
                <div className="text-gray-700">{e.login}</div>
                <div className="text-gray-700">{e.type}</div>
                <button onClick={()=>{followersfollowershandler(e.login)}} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"> 
                Get Followers
              </button>
               </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
