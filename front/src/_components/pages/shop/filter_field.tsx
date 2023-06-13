import React, { FC } from 'react';

interface FilterFieldProps {
  title?: string | React.ReactNode
}

const FilterField: FC<FilterFieldProps> = ({
  title,
}) => {
  return (
    <div className="filter_field">
      <div className="title">
        {title}
      </div>
    </div>
  );
};

export default FilterField;