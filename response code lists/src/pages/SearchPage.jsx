import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [savingListName, setSavingListName] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    try {
      const query = searchTerm.replace("x", "\\d"); // For regex matching
      const responseCodes = [];
      for (let i = 100; i < 600; i++) {
        const code = i.toString();
        if (code.match(new RegExp(`^${query}`))) {
          console.log(`https://http.dog/${code}.jpg`);
          responseCodes.push({
            code,
            imageUrl: `https://http.dog/${code}.jpg`,
          });
        }
      }
      setResults(responseCodes);
    } catch (error) {
      setError("Error fetching search results");
    }
  };

  const handleSaveList = async () => {
    if (!savingListName) {
      setError("Please provide a name for the list");
      return;
    }
    try {
      // Save the list using the local state `results` which contains response codes and images
      // Implementation to save the list (e.g., storing in local storage, sending to backend)
      // Example:
      localStorage.setItem(savingListName, JSON.stringify(results));
      setSavingListName("");
      setResults([]);
      setError("");
    } catch (error) {
      setError("Error saving list");
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.length > 0 ? (
            results.map((code) => (
              <div
                key={code.code}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <img
                  src={code.imageUrl}
                  alt={code.code}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold mb-2">{code.code}</h3>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No results found</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
