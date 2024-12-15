import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { topMeels } from "./topMeels";
import { PopularCuisines } from "./PopularCuisines";
import SearchDishCard from "./SearchDishCard";
import { useDispatch, useSelector } from "react-redux";
import { searchMenuItem } from "../../component/State/Menu/Action";

const Search = () => {
  const dispatch = useDispatch();
  const { menu, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchMenu = (keyword) => {
    setSearchTerm(keyword);
    dispatch(searchMenuItem({ keyword, jwt: auth.jwt || jwt }));
  };
  
  return (
    <div className="px-5 lg:px-[18vw]">
      <div className="relative py-5">
        <SearchIcon className="absolute top-[2rem] left-2" />
        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearchMenu(e.target.value);
          }}
          className="p-2 py-3 pl-12 w-full bg-[#242B2E] rounded-sm outline-none"
          type="text"
          placeholder="search food..."
        />
      </div>
      <div>
        <h1 className="py-5 text-2xl font-semibold">Popular Cuisines</h1>
        <div className="flex flex-wrap ">
          {topMeels.slice(0, 9).map((item, index) => (
            <PopularCuisines 
              key={index}
              image={item.image} 
              title={item.title} 
              onClick={handleSearchMenu} 
            />
          ))}
        </div>
      </div>
      <div className=" mt-7">
        {menu.search.length > 0 ? (
          menu.search.map((item, index) => (
            <SearchDishCard key={index} item={item} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            No items found for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;