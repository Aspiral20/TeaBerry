import React, { FC, useEffect, useState } from 'react';
import { CardContent, HelpRightModal, PageContainer, SiteInput, TitlePage, ValidateButton } from "../../_components";
import { v4 as uuid } from 'uuid'
import {
  dataGridStyles,
  PRODUCTS_BRANDS,
  PRODUCTS_LIMIT,
  PRODUCTS_STATUSES,
  PRODUCTS_TYPES,
  ProductTypeFields
} from "../../constants";
import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { ProductsService } from "../../models/services";
import getObjectFromTwoArrays from "../../_utils/get_object_from_two_arrays";
import { ProductsType, SearchFieldType, SiteInputsObjectType } from "../../_types/data";
import { renameFiledObjectArray } from "../../_utils";
import { clickToggleListArr, handleChangeArr, imageChangeArr, listItemOnClickArr } from "../../hooks";
import { Link } from "react-router-dom";

const productFields: Array<GridColDef> = [
  { field: 'id', headerName: 'ID', width: 120 },
  {
    field: 'image',
    headerName: 'IMAGE',
    width: 100,
    renderCell: (params) => {
      return (
        <Link className="link_image_product" to={`/commerce/catalog/product/${params.row.id}`}>
          <img className="image_product" src={params.value} alt="..."/>
        </Link>
      )
    },
  },
  {
    field: 'name',
    headerName: 'PRODUCT',
    width: 140,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.image || ''} ${params.row.name || ''}`,
  },
  {
    field: 'type',
    headerName: 'TYPE',
    width: 120
  },
  {
    field: 'brand',
    headerName: 'BRAND',
    width: 120
  },
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
    width: 150,
  },
  {
    field: 'translation_key',
    headerName: 'TRANSLATION KEY',
    width: 120,
  },
  {
    field: 'description',
    headerName: 'DESCRIPTION',
    width: 170,
  }
]

const initSearchProducts = [
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
    list: Object.values(ProductTypeFields),
    isOpenList: false
  }
] as SiteInputsObjectType

const initAddProductData = [
  { id: uuid(), value: '', name: 'name', type: 'text', placeholder: 'Name', required: true },
  {
    id: uuid(),
    value: Object.values(PRODUCTS_TYPES)[0],
    name: 'type',
    type: 'text',
    placeholder: 'Type',
    required: true,
    parentNameList: 'type',
    list: Object.values(PRODUCTS_TYPES),
    isOpenList: false
  },
  {
    id: uuid(),
    value: Object.values(PRODUCTS_BRANDS.tea)[0],
    name: 'brand',
    type: 'text',
    placeholder: 'Brand',
    required: true,
    parentNameList: 'brand',
    list: Object.values(PRODUCTS_BRANDS.tea),
    isOpenList: false
  },
  { id: uuid(), value: '', name: 'price', type: 'number', placeholder: 'Price', required: true },
  { id: uuid(), value: '', name: 'quantity', type: 'number', placeholder: 'Quantity', required: true },
  {
    id: uuid(),
    value: Object.values(PRODUCTS_STATUSES)[0],
    name: 'status',
    type: 'text',
    placeholder: 'Status',
    required: true,
    list: Object.values(PRODUCTS_STATUSES),
    isOpenList: false
  },
  { id: uuid(), value: '', name: 'translation_key', type: 'text', placeholder: 'Translation Key', required: true },
  {
    id: uuid(),
    value: '',
    name: 'image',
    type: 'file',
    accept: 'image/*',
    title: 'Image',
    file: true,
    required: true,
    maxSize: 75
  },
  {
    id: uuid(),
    value: '',
    name: 'description',
    type: 'text',
    placeholder: 'Description',
    required: true,
    textarea: true,
    rowsTextarea: 10
  },
] as SiteInputsObjectType

interface SearchProductsModalProps {
  toggleSearchProduct: boolean
  setToggleSearchProduct: React.Dispatch<React.SetStateAction<boolean>>
  setProductsData: React.Dispatch<React.SetStateAction<ProductsType>>
}

const SearchProductsModal: FC<SearchProductsModalProps> = ({
  toggleSearchProduct,
  setToggleSearchProduct,
  setProductsData,
}) => {
  const [searchProducts, setSearchProducts] = useState(initSearchProducts);

  const submitSearchProducts = () => {
    try {
      const resData = getObjectFromTwoArrays(
        searchProducts.map(item => item.name),
        searchProducts.map(item => item.value),
      ) as SearchFieldType

      const promise = ProductsService.searchProducts(resData);
      promise.then(res => {
        const resData = res.data
        renameFiledObjectArray(resData, '_id', 'id')
        setProductsData(resData)
      })
    } catch (e: any) {
      console.log(e)
    }
  }

  return (
    <HelpRightModal isActive={toggleSearchProduct} toggleMenu={setToggleSearchProduct}>
      <div className="add_product_modal_title title">
        Search Product
      </div>

      <div className="inputs_container">
        {searchProducts.map(({ id, ...rest }) => (
          <SiteInput
            key={id}
            onChange={handleChangeArr(setSearchProducts)}
            data={{ id, ...rest }}
            listItemOnClickArr={listItemOnClickArr(setSearchProducts)}
            toggleList={clickToggleListArr(setSearchProducts)}
          />
        ))}
      </div>

      <ValidateButton
        data={[...searchProducts.map(item => item.value)]}
        className="submit_button action_button"
        onClick={() => {
          setToggleSearchProduct(false)
          submitSearchProducts()
        }}>
        Submit
      </ValidateButton>
    </HelpRightModal>
  )
}

interface AddProductsModalProps {
  toggleAddProduct: boolean
  setToggleAddProduct: React.Dispatch<React.SetStateAction<boolean>>
}

const AddProductsModal: FC<AddProductsModalProps> = ({
  toggleAddProduct,
  setToggleAddProduct,
}) => {
  const [addProductData, setAddProductData] = useState(initAddProductData);
  const [getProductType, setGetProductType] = useState(Object.values(PRODUCTS_TYPES)[0]);

  const formSubmit = (e: any) => {
    try {
      e.preventDefault()

      const values = addProductData.map(item => item.value)
      const names = addProductData.map(item => item.name)
      const reqData = getObjectFromTwoArrays(names, values)

      ProductsService.addProduct(reqData)
        .then(() => setTimeout(() => alert('Successful added!'), 1500));
      setAddProductData(initAddProductData)
    } catch (e: any) {
      console.log(e)
    }
  }

  useEffect(() => {
    addProductData.forEach(item => item.name === 'type' ? setGetProductType(item.value) : null)
  }, [addProductData])

  useEffect(() => {
    setAddProductData(prev => prev.map(item => item.name === 'brand' ? ({
      ...item,
      list: PRODUCTS_BRANDS[getProductType] && Object.values(PRODUCTS_BRANDS[getProductType])
    }) : item))
  }, [getProductType])

  return (
    <HelpRightModal isActive={toggleAddProduct} toggleMenu={setToggleAddProduct}>
      <div className="add_product_modal_title title">
        Add Product
      </div>
      <form className="modal_form" onSubmit={formSubmit} encType="multipart/form-data">
        <div className="inputs_container">
          {addProductData.map(({ id, ...rest }) => (
            <SiteInput
              key={id}
              onChange={handleChangeArr(setAddProductData)}
              imageChangeArr={imageChangeArr(setAddProductData)}
              data={{ id, ...rest }}
              listItemOnClickArr={listItemOnClickArr(setAddProductData, (e) => {
                if (e.target.id.includes('type') || e.target.id.includes('brand')) {

                  if (e.target.id.includes('type') && getProductType !== e.target.innerHTML) {
                    setAddProductData(prev => prev.map(item => item.name === 'brand' ? ({
                      ...item,
                      value: PRODUCTS_BRANDS[e.target.innerHTML] && Object.values(PRODUCTS_BRANDS[e.target.innerHTML])[0]
                    }) : item))
                  }
                }
              })}
              toggleList={clickToggleListArr(setAddProductData)}
            />
          ))}
        </div>
        <ValidateButton
          data={[...addProductData.map(item => item.value)]}
          className="submit_button action_button"
          onClick={() => setToggleAddProduct(false)}>
          Submit
        </ValidateButton>
      </form>
    </HelpRightModal>
  )
}

const chapterData = [
  { id: uuid(), to: '/', name: 'Home' },
  { id: uuid(), to: '/commerce', name: 'Commerce' },
  { id: uuid(), to: '/commerce/catalog', name: 'Catalog' },
]

interface ProductsProps {
}

const Products: FC<ProductsProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState([] as ProductsType);
  const [toggleAddProduct, setToggleAddProduct] = useState(false);
  const [toggleSearchProduct, setToggleSearchProduct] = useState(false);
  const apiDataGridRef = useGridApiRef();

  const fetchProducts = () => {
    try {
      setIsLoading(true)
      const promise = ProductsService.getProducts();
      promise.then(res => {
        const resData = res.data
        renameFiledObjectArray(resData, '_id', 'id')
        setProductsData(resData)
      })
    } catch (e: any) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const removeProducts = () => {
    try {
      setIsLoading(true)
      const ProductsId = apiDataGridRef && apiDataGridRef.current.state.rowSelection || []

      ProductsService.removeProducts(ProductsId as Array<string>)
        .then((res) => {
          if (res.data.deletedCount > 0) {
            alert('Successful removed!')
          } else {
            alert('Error! You have to select product!')
          }
        });
    } catch (e: any) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  const leftContentButtons = [
    { id: uuid(), value: 'Remove Selected', onClick: removeProducts },
    { id: uuid(), value: 'Refresh', onClick: fetchProducts },
  ]

  const rightContentButtons = [
    { id: uuid(), value: 'Search', onClick: () => setToggleSearchProduct(true) },
    { id: uuid(), value: 'Add', onClick: () => setToggleAddProduct(true) },
  ]

  return (
    <PageContainer className="products">
      <AddProductsModal
        toggleAddProduct={toggleAddProduct}
        setToggleAddProduct={setToggleAddProduct}
      />
      <SearchProductsModal
        toggleSearchProduct={toggleSearchProduct}
        setToggleSearchProduct={setToggleSearchProduct}
        setProductsData={setProductsData}
      />
      <TitlePage
        title="Products"
        data={chapterData}
        className="products_title"
        classNames={{
          titleChapter: 'products_title',
          descriptionChapter: 'products_path'
        }}
      />
      <CardContent isLoading={isLoading} className="products_content">
        <div className="card_content__header">
          <div className="left-content">
            {leftContentButtons.map(({ id, value, onClick }) => (
              <button key={id} className="action_button" onClick={onClick}>
                {value}
              </button>
            ))}
          </div>

          <div className="right-content">
            {rightContentButtons.map(({ id, value, onClick }) => (
              <button key={id} className="action_button" onClick={onClick}>
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="products_table">
          <DataGrid
            loading={isLoading}
            rows={productsData}
            apiRef={apiDataGridRef}
            columns={productFields}
            pageSizeOptions={[PRODUCTS_LIMIT]}
            initialState={{ pagination: { paginationModel: { pageSize: PRODUCTS_LIMIT, page: 0 } } }}
            checkboxSelection
            sx={dataGridStyles}
          />
        </div>
      </CardContent>
    </PageContainer>
  );
};

export default Products;