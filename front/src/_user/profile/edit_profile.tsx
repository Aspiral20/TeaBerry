import React, { FC, useContext, useEffect, useState } from 'react';
import { StoreContext } from "../../index";
import { useTranslation } from "react-i18next";
import { SiteInput } from "../../_components";
import { observer } from "mobx-react-lite";
import { ArrayCommonDataType, CommonDataType } from "../../_types";
import { enumUserData } from "../../_constants";
import cn from "classnames";
import ArrayContainStrictDataFields from "../../_utils/array_contain_strict_data_fields";
import regexStringNumber from "../../_utils/regex_string_number";
import getObjectFromTwoArrays from "../../_utils/get_object_from_two_arrays";


interface EditProfileProps {
}

type DataType = Array<CommonDataType & { edit: boolean }>
const initChangedData = [{}] as ArrayCommonDataType

const enumDataFields = ['id', 'field', 'value']

const EditProfile: FC<EditProfileProps> = () => {
  const { t } = useTranslation()
  const { store } = useContext(StoreContext)
  const { userStore } = store
  const [data, setData] = useState([] as DataType);
  const [changedData, setChangedData] = useState(initChangedData)
  const [editData, setEditData] = useState<boolean>(false);

  const changedDataWithoutFirst = changedData.filter((item, i) => i !== 0)
  const wasEdited = changedDataWithoutFirst.every(changedItem => data.every(dataItem => dataItem.value !== changedItem.value))

  console.log(data)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    switch (e.target.name) {
      case 'phone':
        const regexNumber = regexStringNumber(e.target.value)
        setData(prev => prev.map(item => item.field === e.target.name ? { ...item, value: regexNumber } : item))

        break;
      default:
        setData(prev => prev.map(item => item.field === e.target.name ? { ...item, value: e.target.value } : item))
    }
  }

  const toggleEdit = () => {
    setData(prev => prev.map(item => item.edit ? { ...item, edit: false } : item))
    setEditData(prev => !prev)
  }

  const resetData = () => {
    setData(userStore.userList.map(item => ({ ...item, edit: false })))
    setChangedData(initChangedData)
  }

  const editOnClick = (e: any) => {
    setData(prev => prev.map(item => item.field === e.target.id ? { ...item, edit: !item.edit } : item));
  }

  const setDataStore = () => {
    userStore.userStoreSetData()
    setData(userStore.userList.map(item => ({ ...item, edit: false })))
  }

  const checkDataChanges = (data: DataType) => userStore.userList.forEach(storeItem =>
    data.forEach(localeItem => {
        const newDataElement = { id: localeItem.id, field: localeItem.field, value: localeItem.value }

        const checkIfExistNewElem = changedData.filter(item => item.field === localeItem.field)
        const firstCheck = checkIfExistNewElem && checkIfExistNewElem[0]

        if (storeItem.field === localeItem.field) {
          if (storeItem.value !== localeItem.value) {

            if (firstCheck) {
              setChangedData(prev => prev.map(item => item.field === firstCheck.field ? newDataElement : item))
            } else {
              setChangedData(prev => [...prev, newDataElement])
            }
          } else {
            const changeDifferentElem = changedData.filter(item => item.field === localeItem.field && item.value === item.value)[0]
            const existChangedElem = changeDifferentElem && changeDifferentElem

            if (existChangedElem) {
              const foundElemIntoData = data.filter(item => item.field === existChangedElem.field)[0]
              const firstElemFoundData = foundElemIntoData && foundElemIntoData
              setChangedData(prev => prev.filter(item => item.field !== firstElemFoundData.field))
            }
          }
        }
      }
    )
  )

  useEffect(() => {
    checkDataChanges(data)
  }, [data])

  useEffect(() => {
    if (!userStore.isLoading) {
      setDataStore()
    }
  }, [])

  const fetchUserData = (e: any) => {
    e.preventDefault()
    const changedDataFinal: ArrayCommonDataType = ArrayContainStrictDataFields(changedData, enumDataFields)
    const keys = changedDataFinal.map(item => item.field)
    const values = changedDataFinal.map(item => item.value)
    const dataToReq = getObjectFromTwoArrays(keys, values)

    userStore.updateUser(
      userStore.user.id,
      dataToReq,
      {
        success: t('success.success-changes'),
        error: t('errors.something-went-wrong')
      }
    )

    userStore.fetchUser()
    if (!userStore.isLoading) {
      setDataStore()
    }
  }

  return (
    <div className="user_edit_profile_container">
      <div className="edit_data_buttons">
        <button className="edit_button" onClick={toggleEdit}>Edit</button>
        <button className="reset_button" onClick={resetData}>Reset</button>
      </div>
      <h2 className="user_profile title">Edit Profile</h2>
      <div className="user_edit">
        {data && data.map(({ id, field, value, edit }) => field !== 'email' && enumUserData.includes(field) && (
          <div key={id} className="edit_item text">
            {t(`auth_data.${field}`)}:
            <SiteInput
              onChange={handleChange}
              data={{ value, type: 'text', name: field, edit }}
              editOnClick={editOnClick}
              showEditIcon={editData}
            />
          </div>
        ))}
      </div>
      <div className="save_button">
        <button
          className={cn("auth_button button", { is_disabled: wasEdited })}
          disabled={wasEdited}
          onClick={fetchUserData}
        >
          {t('actions.save_changes')}
        </button>
      </div>
    </div>
  );
};

export default observer(EditProfile);