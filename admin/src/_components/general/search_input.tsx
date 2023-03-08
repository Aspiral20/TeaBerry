import React, { FC } from 'react';
import { SearchIcon } from "../icons";

interface SearchInputProps {
}

const SearchInput: FC<SearchInputProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <div className="search_input_container">
      <input className="search_input text" type="text" {...props}/>
      <SearchIcon className="search_svg svg"/>
    </div>
  );
};

export default SearchInput;