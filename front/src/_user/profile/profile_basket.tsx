import React, { FC } from 'react';
import { DefaultTitle } from "../../_components";
import { observer } from "mobx-react-lite";

interface ProfileBasketProps {}
const ProfileBasket: FC<ProfileBasketProps> = ({}) => {
  return (
    <div className="user_basket_container">
      <DefaultTitle>Basket</DefaultTitle>
    </div>
  );
};

export default observer(ProfileBasket);