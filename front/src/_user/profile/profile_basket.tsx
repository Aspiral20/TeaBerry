import React, { FC } from 'react';

interface ProfileBasketProps {}
const ProfileBasket: FC<ProfileBasketProps> = ({}) => {
  return (
    <div className="user_basket_container">
      <h2 className="user_profile title">Basket</h2>
    </div>
  );
};

export default ProfileBasket;