import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [savingListName, setSavingListName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchData = async (code) => {
    try {
      const response = await axios.get(`/api/lists/httpdog/${code}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Handle specific server error
      } else {
        console.error(
          `Unexpected error fetching data for code ${code}:`,
          error
        );
      }
      return null;
    }
  };

  const handleSearch = async () => {
    setError("");
    setLoading(true);
    setHasSearched(true);

    const query = searchTerm.replace("x", "\\d"); // For regex matching
    const codes = [];

    for (let i = 100; i <= 999; i++) {
      const code = i.toString();
      if (code.match(new RegExp(`^${query}`))) {
        codes.push(code);
      }
    }

    if (codes.length === 0) {
      setError("Please enter a code between 100 and 999");
      setResults([]);
      setLoading(false);
      return;
    }

    try {
      const results = await Promise.all(codes.map(fetchData));

      const responseCodes = results
        .map((data, index) => ({
          code: codes[index],
          data,
        }))
        .filter((item) => item.data !== null)
        .map((item) => ({
          code: item.code,
          imageUrl: item.data.image.jpg,
          title: item.data.title,
          statusCode: item.data.status_code,
        }));

      setResults(responseCodes);

      if (responseCodes.length === 0) {
        setError("No results found");
      }
    } catch (error) {
      setError("Error fetching search results");
    } finally {
      setLoading(false);
    }
  };
  const handleSaveList = async () => {
    if (!savingListName) {
      setError("Please provide a name for the list");
      return;
    }

    try {
      const response = await axios.post("/api/lists/new", {
        name: savingListName,
        items: results,
      });
      console.log("Save response:", response.data);
      setSavingListName("");
      setResults([]);
      setError("List Saved Succesfully");
    } catch (error) {
      console.error(
        "Error saving list:",
        error.response ? error.response.data : error.message
      );

      const errorMessage = error.response?.data?.errorMessage || error.message;
      if (errorMessage === "Authentication required.") {
        setError("Please sign up or log in first to save your own lists.");
      } else {
        setError("Error saving list");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Search and Save Response Codes
        </h2>
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by response code..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            onClick={handleSearch}
            className="w-full mt-2 bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Search
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && (
          <div className="flex justify-center items-center my-4">
            <div className="w-6 h-6 border-4 border-gray-200 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}
        <div className="mb-6">
          <input
            type="text"
            value={savingListName}
            onChange={(e) => setSavingListName(e.target.value)}
            placeholder="Name your list"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            onClick={handleSaveList}
            className="w-full mt-2 bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Save List
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {results.map((code) => (
            <div
              key={code.code}
              className="flex flex-col items-center bg-gray-200 p-6 rounded-lg shadow-md max-w-xs w-full sm:max-w-xs  lg:max-w-sm"
            >
              <Link
                to={`/lists/${code.code}`}
                target="blank"
                className="w-full text-center"
              >
                <img
                  src={code.imageUrl}
                  alt={code.title}
                  className="w-full object-contain rounded-md mb-4"
                />
                <h2 className="text-lg font-bold ml-2 text-gray-600">
                  {code.statusCode}
                </h2>
                <h3 className="text-lg font-bold ml-2 mb-2">{code.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Search;
