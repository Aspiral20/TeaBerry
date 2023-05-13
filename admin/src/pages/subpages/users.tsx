import React, { FC, useEffect, useState } from 'react';
import { CardContent, HelpRightModal, PageContainer, SiteInput, TitlePage, ValidateButton } from "../../_components";
import { v4 as uuid } from 'uuid'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { UsersService } from "../../models/services";
import { renameFiledObjectArray } from "../../_utils";
import { SearchFieldType, SiteInputsObjectType, UsersType } from "../../_types/data";
import { dataGridStyles, USERS_LIMIT, UserTypeFields } from "../../constants";
import getObjectFromTwoArrays from "../../_utils/get_object_from_two_arrays";
import { clickToggleListArr, handleChangeArr, listItemOnClickArr } from "../../hooks";

const userFields: Array<GridColDef> = [
  { field: 'id', headerName: 'ID', width: 120 },
  {
    field: 'image',
    headerName: 'IMAGE',
    width: 100,
    renderCell: (params) => (
      <img className="image_product" src={params.value} alt="..."/>
    ),
  },
  {
    field: 'full_name',
    headerName: 'FULL NAME',
    width: 140,
  },
  { field: 'country', headerName: 'COUNTRY', width: 140 },
  { field: 'city', headerName: 'CITY', width: 140 },
  {
    field: 'address',
    headerName: 'ADDRESS',
    width: 140,
  },
  {
    field: 'email',
    headerName: 'E-MAIL',
    width: 170,
  },
  {
    field: 'phone',
    headerName: 'PHONE',
    sortable: false,
    width: 120,
  },
  {
    field: 'role',
    headerName: 'ROLE',
    width: 120,
  }
]

const initSearchUsers = [
  {
    id: uuid(),
    value: '',
    name: 'regex',
    type: 'text',
    placeholder: 'Regex',
    required: true
  },
  {
    id: uuid(),
    value: '',
    name: 'field',
    type: 'text',
    placeholder: 'Field',
    required: true,
    list: Object.values(UserTypeFields),
    isOpenList: false
  }
] as SiteInputsObjectType

interface SearchUsersModalProps {
  toggleSearchUser: boolean
  setToggleSearchUser: React.Dispatch<React.SetStateAction<boolean>>
  setUsersData: React.Dispatch<React.SetStateAction<UsersType>>
}

const SearchUsersModal: FC<SearchUsersModalProps> = ({
  toggleSearchUser,
  setToggleSearchUser,
  setUsersData,
}) => {
  const [searchUsers, setSearchUsers] = useState(initSearchUsers);

  const submitSearchUsers = () => {
    try {
      const resData = getObjectFromTwoArrays(
        searchUsers.map(item => item.name),
        searchUsers.map(item => item.value),
      ) as SearchFieldType

      const promise = UsersService.searchUsers(resData);
      promise.then(res => {
        const resData = res.data
        renameFiledObjectArray(resData, '_id', 'id')
        setUsersData(resData)
      })
    } catch (e: any) {
      console.log(e)
    }
  }

  return (
    <HelpRightModal isActive={toggleSearchUser} toggleMenu={setToggleSearchUser}>
      <div className="add_product_modal_title title">
        Search User
      </div>

      <div className="inputs_container">
        {searchUsers.map(({ id, ...rest }) => (
          <SiteInput
            key={id}
            onChange={handleChangeArr(setSearchUsers)}
            data={{ id, ...rest }}
            listItemOnClickArr={listItemOnClickArr(setSearchUsers)}
            toggleList={clickToggleListArr(setSearchUsers)}
          />
        ))}
      </div>

      <ValidateButton
        data={[...searchUsers.map(item => item.value)]}
        className="submit_button action_button"
        onClick={() => {
          setToggleSearchUser(false)
          submitSearchUsers()
        }}>
        Submit
      </ValidateButton>
    </HelpRightModal>
  )
}

interface UsersProps {
}

const chapterData = [
  { id: uuid(), to: '/', name: 'Home' },
  { id: uuid(), to: '/commerce', name: 'Commerce' },
  { id: uuid(), to: '/commerce/catalog', name: 'Catalog' },
]

const Users: FC<UsersProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersData] = useState([] as UsersType);
  const [toggleSearchUser, setToggleSearchUser] = useState(false);

  const fetchUsers = () => {
    try {
      setIsLoading(true)
      const promise = UsersService.getUsers();

      promise.then(res => {
        const resData = res.data
        renameFiledObjectArray(resData, '_id', 'id')
        setUsersData(resData)
      })
    } catch (e: any) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const leftContentButtons = [
    { value: 'Refresh', onClick: fetchUsers },
  ]

  const rightContentButtons = [
    { value: 'Search', onClick: () => setToggleSearchUser(true) },
  ]

  return (
    <PageContainer className="users">

      <SearchUsersModal
        toggleSearchUser={toggleSearchUser}
        setToggleSearchUser={setToggleSearchUser}
        setUsersData={setUsersData}
      />

      <TitlePage
        title="Users"
        data={chapterData}
        className="users_title"
        classNames={{
          titleChapter: 'users_title',
          descriptionChapter: 'users_path'
        }}
      />

      <CardContent className="products_content">
        <div className="card_content__header">
          <div className="left-content">
            {leftContentButtons.map(({ value, onClick }) => (
              <button className="action_button" onClick={onClick}>
                {value}
              </button>
            ))}
          </div>

          <div className="right-content">
            {rightContentButtons.map(({ value, onClick }) => (
              <button className="action_button" onClick={onClick}>
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="products_table">
          <DataGrid
            loading={isLoading}
            rows={usersData}
            columns={userFields}
            pageSizeOptions={[USERS_LIMIT]}
            initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
            checkboxSelection
            sx={dataGridStyles}
          />
        </div>
      </CardContent>
    </PageContainer>
  );
};

export default Users;