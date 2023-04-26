import React, { FC } from 'react';
import { Link } from "react-router-dom";
import { DescriptionChapter, HelpRightModal, JsxSpace, TitleChapter } from "../../_components";
import { v4 as uuid } from 'uuid'
import { STATUSES } from "../../constants";
import SearchInput from "../../_components/general/search_input";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useSelector } from "react-redux";
import { ReducersTypes } from "../../_types/store";
import MUIScrollbarStyles from "../../_utils/mui_scrollbar.styles";

// const initOptions = {
//   current: { id: uuid(), status: STATUSES.ALL, value: 'All' }, data: [
//     { id: uuid(), status: STATUSES.ALL, value: 'All' },
//     { id: uuid(), status: STATUSES.PUBLISHED, value: 'Published' },
//     { id: uuid(), status: STATUSES.SCHEDULED, value: 'Scheduled' },
//     { id: uuid(), status: STATUSES.INACTIVE, value: 'Inactive' },
//   ]
// }

const fields: Array<GridColDef> = [
  { field: 'nr', headerName: 'Nr.', width: 80 },
  {
    field: 'product',
    headerName: 'PRODUCT',
    width: 220,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.image || ''} ${params.row.product || ''}`,
  },
  { field: 'id', headerName: 'ID', width: 120 },
  {
    field: 'quantity',
    headerName: 'QTY',
    type: 'number',
    width: 90,
  },
  {
    field: 'price',
    headerName: 'PRICE',
    type: 'number',
    width: 170,
  },
  {
    field: 'status',
    headerName: 'STATUS',
    sortable: false,
    width: 170,
  },
  {
    field: 'actions',
    headerName: 'ACTIONS',
    sortable: false,
    width: 120,
  },
]

const products = [
  {
    nr: 1,
    id: uuid().slice(0, 8),
    image: 'img1',
    product: 'product1',
    quantity: 20,
    price: 100,
    status: STATUSES.INACTIVE
  },
  {
    nr: 2,
    id: uuid().slice(0, 8),
    image: 'img2',
    product: 'product2',
    quantity: 10,
    price: 120,
    status: STATUSES.SCHEDULED
  },
  {
    nr: 3,
    id: uuid().slice(0, 8),
    image: 'img3',
    product: 'product3',
    quantity: 15,
    price: 160,
    status: STATUSES.PUBLISHED
  },
  {
    nr: 4,
    id: uuid().slice(0, 8),
    image: 'img3',
    product: 'product3',
    quantity: 15,
    price: 160,
    status: STATUSES.PUBLISHED
  },
  {
    nr: 5,
    id: uuid().slice(0, 8),
    image: 'img3',
    product: 'product3',
    quantity: 15,
    price: 160,
    status: STATUSES.PUBLISHED
  },
  {
    nr: 6,
    id: uuid().slice(0, 8),
    image: 'img3',
    product: 'product3',
    quantity: 15,
    price: 160,
    status: STATUSES.PUBLISHED
  },
  {
    nr: 7,
    id: uuid().slice(0, 8),
    image: 'img3',
    product: 'product3',
    quantity: 15,
    price: 160,
    status: STATUSES.PUBLISHED
  },
  {
    nr: 8,
    id: uuid().slice(0, 8),
    image: 'img3',
    product: 'product3',
    quantity: 15,
    price: 160,
    status: STATUSES.PUBLISHED
  },
  {
    nr: 9,
    id: uuid().slice(0, 8),
    image: 'img3',
    product: 'product3',
    quantity: 15,
    price: 160,
    status: STATUSES.PUBLISHED
  },
  {
    nr: 10,
    id: uuid().slice(0, 8),
    image: 'img3',
    product: 'product3',
    quantity: 15,
    price: 160,
    status: STATUSES.PUBLISHED
  },
  {
    nr: 11,
    id: uuid().slice(0, 8),
    image: 'img3',
    product: 'product3',
    quantity: 15,
    price: 160,
    status: STATUSES.PUBLISHED
  },
]

//Todo modal add product
const AddProducts: FC = ({}) => {
  return (
    <HelpRightModal>
      1
    </HelpRightModal>
  )
}

interface ProductsProps {}
const Products: FC<ProductsProps> = ({}) => {
  const themeMode = useSelector<ReducersTypes>(reducer => reducer.SiteColorMode.mode)

  const dataGridStyles = {
    ['& .MuiDataGrid-cell:hover, & .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within,' +
    ' & .MuiDataGrid-columnHeader:hover, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within']: {
      outline: 'none'
    },
    '& .css-i4bv87-MuiSvgIcon-root': {
      fill: 'var(--theme-mode-text-color)'
    },
    '& .MuiDataGrid-columnHeader .MuiDataGrid-columnSeparator .MuiSvgIcon-root': {
      display: 'none'
    },
    '& .MuiDataGrid-columnHeader .MuiDataGrid-menuIcon .MuiButtonBase-root': {
      color: 'var(--theme-mode-text-color)'
    },
    '& .MuiDataGrid-columnHeader .MuiDataGrid-iconButtonContainer .MuiButtonBase-root': {
      color: 'var(--theme-mode-text-color)'
    },
    '& .MuiDataGrid-withBorderColor': {
      borderColor: 'rgba(var(--MUI-products-data-grid-border-color-opacity), .2)'
    },
    '& .MuiTablePagination-root .MuiTablePagination-displayedRows': {
      color: 'var(--theme-mode-text-color)'
    },
    //Scrollbar
    ...MUIScrollbarStyles(
      '& .MuiDataGrid-main .MuiDataGrid-virtualScroller',
      7,
      'var(--MUI-data-grid-track-color)',
      'block',
      'var(--MUI-data-grid-thumb-color)',
      30
    ),
    '& .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-cellContent': {
      fontSize: '14px',
    },
    borderColor: "rgba(var(--MUI-products-data-grid-border-color-opacity), .2)",
    color: "var(--theme-mode-text-color)",
    fontSize: '14px',
  }

  // const [options, setOptions] = useState<SelectFeaturesContextType>(initOptions)

  return (
    <div className="products">
      <div className="title_container">
        <TitleChapter className="products_title">Products</TitleChapter>
        <DescriptionChapter className="products_path">
          <Link className="item_chapter" to='/'>Home</Link>
          <JsxSpace/>-<JsxSpace/>
          <Link className="item_chapter" to='/commerce'>Commerce</Link>
          <JsxSpace/>-<JsxSpace/>
          <Link className="item_chapter" to='/catalog'>Catalog</Link>
        </DescriptionChapter>
      </div>
      <div className="card_content products_content fon">
        <div className="card_content__header">
          <SearchInput placeholder="Search products"/>
          <div className="right-content">
            <button className="action_button">
              Add Product
            </button>
          </div>
        </div>
        {/*todo connect data from api to table*/}
        <div className="products_table">
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={products}
              columns={fields}
              pageSizeOptions={[5]}
              initialState={{pagination: {paginationModel: {pageSize: 5, page: 0}}}}
              checkboxSelection
              sx={dataGridStyles}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;