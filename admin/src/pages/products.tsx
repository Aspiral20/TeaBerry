import React, { FC } from 'react';
import { Link } from "react-router-dom";
import { DescriptionChapter, TitleChapter } from "../_components";
import { v4 as uuid } from 'uuid'
import { STATUSES } from "../constants";
import SearchInput from "../_components/general/search_input";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const Space = () => (<>&nbsp;</>);

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

interface ProductsProps {
}

const Products: FC<ProductsProps> = ({}) => {

  // const [options, setOptions] = useState<SelectFeaturesContextType>(initOptions)


  return (
    <div className="products">
      <div className="title_container">
        <TitleChapter className="products_title">Products</TitleChapter>
        <DescriptionChapter className="products_path">
          <Link className="item_chapter" to='/'>Home</Link>
          <Space/>-<Space/>
          <Link className="item_chapter" to='/commerce'>Commerce</Link>
          <Space/>-<Space/>
          <Link className="item_chapter" to='/catalog'>Catalog</Link>
        </DescriptionChapter>
      </div>

      <div className="card_content products_content fon">
        <div className="card_content__header">
          <SearchInput placeholder="Search products"/>

          <div className="right-content">
            {/*<SelectFeatures className="" context={options} setContext={setOptions}/>*/}

            <button className="action_button">
              Add Product
            </button>
          </div>
        </div>
        {/*todo generate for all data table*/}
        <div className="products_table">
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={products}
              columns={fields}
              pageSizeOptions={[5]}
              // rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
          {/*<div className="products_fields">*/}
          {/*  {productsTableFields.map(field => (*/}
          {/*    <div key={uuid()} className="field_item">*/}
          {/*      {field}*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}
          {/*<div className="products_container">*/}
          {/*  {products.map(({id, product, qty, price,status }, i) => (*/}
          {/*    <div key={id} className="product">*/}
          {/*      <div className="nr">*/}
          {/*        {i+1}*/}
          {/*      </div>*/}
          {/*      <div className="product">*/}
          {/*        <div className="product_image">*/}
          {/*          {product.image}*/}
          {/*        </div>*/}
          {/*        <div className="product_name">*/}
          {/*          {product.value}*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*      <div className="id">*/}
          {/*        {id.slice(0, 8)}*/}
          {/*      </div>*/}
          {/*      <div className="qty">*/}
          {/*        {qty}*/}
          {/*      </div>*/}
          {/*      <div className="price">*/}
          {/*        {price}*/}
          {/*      </div>*/}
          {/*      <div className="price">*/}
          {/*        {status}*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default Products;