import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ListDetail = () => {
//   const { id } = useParams();
//   const [list, setList] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchList = async () => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       if (!userInfo) {
//         navigate("/login");
//       } else {
//         try {
//           const { data } = await axios.get(`/api/lists/${id}`, {
//             headers: { Authorization: `Bearer ${userInfo.token}` },
//           });
//           setList(data);
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     };
//     fetchList();
//   }, [id, navigate]);

//   if (!list) {
//     return <div>Loading...</div>;
//   }

  return (
    <div>
      {/* <h2>{list.name}</h2>
      {list.imageLinks.map((link, index) => (
        <img
          key={index}
          src={link}
          alt={`Response code ${list.responseCodes[index]}`}
        />
      ))} */}
      List Detail Page
    </div>
  );
};

export default ListDetail;
