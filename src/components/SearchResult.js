import "./SearchResult.css";

export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${result.jobTitle} at ${result.company}!`)}
    >
      <h3>{result.jobTitle}</h3>
      {result.company && <p>Company: {result.company}</p>}
      {result.firstName && <p>Posted by: {result.firstName}</p>}
      {result.email && <p>Email: {result.email}</p>}
      {result.jobType && <p>Job Type: {result.jobType}</p>}
      {result.url && <p>Job Link: {result.url}</p>}

      <p>Posted on: {new Date(result.createdAt).toLocaleDateString()}</p>
    </div>
  );
};