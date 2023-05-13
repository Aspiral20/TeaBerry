import React, { FC } from 'react';
import { SearchIcon } from "../icons";

interface SearchInputProps {
  children?: React.ReactNode
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput: FC<SearchInputProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = ({
  children,
  onChange,
  ...props
}) => {
  return (
    <div className="search_input_container">
      <input className="search_input text" onChange={onChange} type="text" {...props}/>
      <SearchIcon className="search_svg svg"/>
      {children}
    </div>
  );
};

export default SearchInput;