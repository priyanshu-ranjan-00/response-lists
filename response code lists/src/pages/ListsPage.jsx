import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Lists = () => {
  const [lists, setLists] = useState([]);
  const [filteredLists, setFilteredLists] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch lists from the server
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get("/api/lists/all");
        setLists(response.data);
        setFilteredLists(response.data);
      } catch (error) {
        console.error("Error fetching lists:", error);
        setError("Error fetching lists");
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, []);

  // Handle deletion of the list
  const handleDelete = async (listName) => {
    if (
      window.confirm(`Are you sure you want to delete the list: ${listName}?`)
    ) {
      try {
        await axios.delete(`/api/lists/${listName}`);
        setLists(lists.filter((list) => list.name !== listName));
        setFilteredLists(
          filteredLists.filter((list) => list.name !== listName)
        );
      } catch (error) {
        console.error("Error deleting list:", error);
        setError("Error deleting list");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 text-center">
          Saved Lists
        </h2>

        {loading && (
          <div className="flex justify-center items-center my-4">
            <div className="w-6 h-6 border-4 border-gray-200 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {filteredLists.length === 0 ? (
          <p className="text-center">No lists found.</p>
        ) : (
          <div className="flex flex-col items-center gap-6">
            {filteredLists.map((list) => (
              <div
                key={list.name}
                className="flex flex-col bg-gray-200 p-4 rounded-lg shadow-md w-full sm:w-4/5 md:w-3/4 lg:w-1/2"
              >
                <h3 className="text-lg font-bold mb-2 text-center">
                  {list.name}
                </h3>
                <button
                  onClick={() => handleDelete(list.name)}
                  className="mt-2 mb-4 bg-red-600 text-white p-2 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                >
                  Delete
                </button>
                <div className="flex flex-wrap justify-center gap-4">
                  {list.items.map((item, index) => (
                    <Link
                      key={index}
                      to={`/lists/${item.statusCode}`}
                      target="_blank"
                      className="flex flex-col bg-white p-2 rounded-lg shadow-sm border border-gray-300 w-full sm:w-48"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full object-contain rounded-md mb-4"
                      />
                      <span className="font-semibold text-center">
                        {item.title}
                      </span>
                      <span className="text-center">{item.statusCode}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Lists;
