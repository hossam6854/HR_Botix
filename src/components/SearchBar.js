import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

export const SearchBar = ({ results, setResults }) => {
  const [input, setInput] = useState("");
  const [searchOption, setSearchOption] = useState("locally");

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((response) => response.json())
      .then((json) => {
        setResults(json);
        console.log(json);
      });
  }, []);

  const fetchData = (value) => {
    let url = "http://localhost:3000/jobs?title=" + value;
    if (searchOption === "globally") {
      url = `https://jobicy.com/api/v2/remote-jobs?count=5&tag=${value}`;
    }
  
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (searchOption === "globally" && input !== "") {
          let newResults = [];
          console.log(json.jobs)
          if(json.jobs === undefined || json.statusCode === 404) {
            return;
          }
          for(const job of json.jobs) {
            const mappedResults = {
              jobTitle: job.jobTitle,
              company: job.companyName,
              firstName: '', // Jobicy API does not provide a 'firstName' field
              createdAt: job.pubDate,
              jobType: job.jobType,
              url: job.url

            }
            newResults.push(mappedResults);
          }
          setResults(newResults);
          console.log(results);
        } else {
          setResults(json);
        }
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" onClick={() => fetchData(input)}/>
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="form-group1234">
          <select className="select-field" onChange={handleOptionChange}>
            <option className="hidden" selected disabled>
              Search
            </option>
            <option value="locally">locally</option>
            <option value="globally">globally</option>
          </select>
        </div>
    </div>
  );
};
