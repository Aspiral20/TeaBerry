import React, { FC } from 'react';

interface EditIconProps {
  forAllId?: string
}

const EditIcon: FC<React.SVGAttributes<SVGElement> & EditIconProps> = ({
  className = '',
  forAllId,
  ...rest
}) => {
  const {id} = rest

  return (
    <svg
      className={"edit_icon " + className}
      {...rest}
      id={id ? id : forAllId || ''}
      fill="none"
      height="50px"
      width="50px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id={forAllId || ''}
        d="M8.29289 3.70711L1 11V15H5L12.2929 7.70711L8.29289 3.70711Z"
        fill="#030708"
      />
      <path
        id={forAllId || ''}
        d="M9.70711 2.29289L13.7071 6.29289L15.1716 4.82843C15.702 4.29799 16 3.57857 16 2.82843C16 1.26633 14.7337 0 13.1716 0C12.4214 0 11.702 0.297995 11.1716 0.828428L9.70711 2.29289Z"
        fill="#030708"
      />
    </svg>
  );
};

export default EditIcon;