import React, { FC } from 'react';
import { useOutletContext } from "react-router-dom";
import { ArrayCommonDataType } from "../../_types";
import { useTranslation } from "react-i18next";

interface OutletContext {
  userInfo: ArrayCommonDataType
}

const enumUserData = ['full_name', 'country', 'city', 'address', 'phone', 'email']

const ProfileInfo: FC = ({}) => {
  const {t} = useTranslation()
  const { userInfo }: OutletContext = useOutletContext();

  return (
    <div className="user_info_container">
      <h2 className="title">Bio Graph</h2>
      <div className="user_info">
        {userInfo.map(({ id, field, value  }) => enumUserData.includes(field) && (
          <div className="info_item text">
            {t(`auth_data.${field}`)}: {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileInfo;