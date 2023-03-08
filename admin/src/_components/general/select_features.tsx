import React, { FC } from 'react';
import { SelectFeaturesContextType } from "../../_types/components";
import { useDispatch, useSelector } from "react-redux";
import { ReducersTypes } from "../../_types/store";
import cn from "classnames";

interface SelectFeaturesProps {
  className?: string
  context: SelectFeaturesContextType
  setContext: React.Dispatch<React.SetStateAction<SelectFeaturesContextType>>
}

const SelectFeatures: FC<SelectFeaturesProps> = ({
  className = '',
  context,
  setContext
}) => {
  const dispatch = useDispatch()
  const selectFeature = useSelector<ReducersTypes, boolean>(prev => prev.Toggles.select_feature)

  const setContextData = (data: SelectFeaturesContextType, id: string) => ({
    ...data,
    current: data.data.filter(item => item.id === id)[0]
  })

  return (
    <div className={cn("select_features " + className)}>
      <div className="current_feature text"
           onClick={() => dispatch({ type: 'toggles/toggle', field: 'select_feature' })}>
        {context.current.value}
      </div>
      <div className={cn("change_feature text", { active: selectFeature })}>
        {context.data.map(({ id, value }) => (
          <div key={id} id={id} className={cn("feature_item text", { active: context.current.value === value })}
               onClick={() => {
                 setContext(prev => setContextData(prev, id))
               }}>
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectFeatures;