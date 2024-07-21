import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

const Lists = () => {
  const [lists, setLists] = useState([]);
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     const fetchLists = async () => {
  //       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //       if (!userInfo) {
  //         navigate("/login");
  //       } else {
  //         try {
  //           const { data } = await axios.get("/api/lists", {
  //             headers: { Authorization: `Bearer ${userInfo.token}` },
  //           });
  //           setLists(data);
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       }
  //     };
  //     fetchLists();
  //   }, [navigate]);

  //   const handleDelete = async (id) => {
  //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //     try {
  //       await axios.delete(`/api/lists/${id}`, {
  //         headers: { Authorization: `Bearer ${userInfo.token}` },
  //       });
  //       setLists(lists.filter((list) => list._id !== id));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return (
    <div>
      <h2>Lists</h2>
      {/* {lists.map((list) => (
        <div key={list._id}>
          <h3>{list.name}</h3>
          <button onClick={() => navigate(`/lists/${list._id}`)}>View</button>
          <button onClick={() => handleDelete(list._id)}>Delete</button>
        </div>
      ))} */}
      lists page
    </div>
  );
};

export default Lists;
