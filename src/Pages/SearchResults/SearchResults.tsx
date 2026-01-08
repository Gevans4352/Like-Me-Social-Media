import { useEffect } from "react";
import "./SearchResult.scss";

const SearchResult = ()=>{
     useEffect(() => {
    document.title = "Search Results";
  }, []);
    return(
        <>
        </>
    );
};

export default SearchResult;