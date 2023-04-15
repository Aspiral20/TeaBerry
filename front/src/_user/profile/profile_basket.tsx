import React, { FC } from 'react';
import { DefaultTitle } from "../../_components";

interface ProfileBasketProps {}
const ProfileBasket: FC<ProfileBasketProps> = ({}) => {
  return (
    <div className="user_basket_container">
      <DefaultTitle>Basket</DefaultTitle>
    </div>
  );
};

export default ProfileBasket;