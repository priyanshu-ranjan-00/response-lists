import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";

const ListDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listData = await axios.get(`/api/lists/httpdog/${id}`);
        setData(listData.data);
      } catch (error) {
        console.error(
          "Error while fetching data from backend:",
          error.response
        );
        setError("Error fetching data as the HTTP code doesn't exist.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-6">
        {loading && (
          <div className="flex justify-center items-center my-4">
            <div className="w-6 h-6 border-4 border-gray-200 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}
        {error &&
        error === "Error fetching data as the HTTP code doesn't exist." ? (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto text-center">
            <p className="text-red-500 mb-4">
              As such HTTP code does not exist.
            </p>
            <img
              src="https://http.dog/404.jpg"
              alt="404 Not Found"
              className="w-full h-64 object-contain rounded-md mb-4"
            />
          </div>
        ) : (
          data && (
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
              <img
                src={data.image.avif || data.image.jpg}
                alt={data.title}
                className="w-full h-64 object-contain rounded-md mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-center">
                {data.status_code}
              </h2>
              <h3 className="text-xl font-semibold mb-4 text-center">
                {data.title}
              </h3>
              <Link
                to={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-center block"
              >
                {data.url}
              </Link>
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default ListDetail;
