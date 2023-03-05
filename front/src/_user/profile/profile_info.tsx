import React, { FC, useContext } from 'react';
import { ArrayCommonDataType } from "../../_types";
import { useTranslation } from "react-i18next";
import { StoreContext } from "../../index";
import { enumUserData } from "../../_constants";

interface OutletContext {
  userInfo: ArrayCommonDataType
}

const ProfileInfo: FC = ({}) => {
  const {t} = useTranslation()
  const { store } = useContext(StoreContext)
  const { userStore } = store

  return (
    <div className="user_info_container">
      <h2 className="title">Bio Graph</h2>
      <div className="user_info">
        {userStore.userList.map(({ id, field, value  }) => enumUserData.includes(field) && (
          <div key={id} className="info_item text">
            {t(`auth_data.${field}`)}: {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileInfo;