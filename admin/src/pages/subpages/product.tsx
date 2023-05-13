import React, { ChangeEvent, FC, Fragment, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {
  CardContent,
  CheckIcon,
  CircleMiniIconContainer,
  EditIcon,
  PageContainer,
  RefreshIcon,
  SiteInput,
  TitleChapter,
  TitlePage,
  ValidateButton
} from "../../_components";
import { v4 as uuid } from "uuid";
import { ProductsService } from "../../models/services";
import { ProductType, SiteInputObjectType, SiteInputsObjectType } from "../../_types/data";
import { equalObjects, renameFieldObject } from "../../_utils";
import {
  clickToggleListArr,
  clickToggleListObj,
  defaultImageChange,
  handleChangeArr,
  handleChangeObj,
  listItemOnClickArr,
  listItemOnClickObj
} from "../../hooks";
import { PRODUCTS_BRANDS, PRODUCTS_STATUSES, PRODUCTS_TYPES } from "../../constants";
import cn from "classnames";

const updateProductData = (e: ChangeEvent<HTMLInputElement>, setProduct: React.Dispatch<React.SetStateAction<ProductType>>) => {
  const value = e.target.value
  const type = e.target.type
  const targetName = e.target.name

  if (type === 'number') {
    const toNumber = parseInt(value)
    setProduct(prev => ({ ...prev, [targetName]: toNumber }))
  } else {
    setProduct(prev => ({ ...prev, [targetName]: value }))
  }
}

type ProductDefaultData = {
  data: {
    product: ProductType,
    setProduct: React.Dispatch<React.SetStateAction<ProductType>>
    dbProduct: ProductType
    setDbProduct: React.Dispatch<React.SetStateAction<ProductType>>
  },
  isLoading: boolean
}

const ProductImage: FC<ProductDefaultData> = ({
  isLoading,
  data,
}) => {
  const { product, dbProduct, setProduct } = data

  return (
    <CardContent
      isLoading={isLoading}
      className="product_image_container"
    >
      <TitleChapter className="margin_bottom product_image_title">
        Image
      </TitleChapter>
      <div className="image_container">
        <div className="product_image" style={{ backgroundImage: `url(${product.image})` }}>
          <CircleMiniIconContainer className="edit">
            <EditIcon className="menu_utils_svg menu_utils_svg_hover"/>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={defaultImageChange((reader) => {
                setProduct(prev => ({ ...prev, image: reader.result as string }))
              })}
              required
            />
          </CircleMiniIconContainer>
          <CircleMiniIconContainer
            className="check"
            cnProps={{
              refresh: product.image !== dbProduct.image
            }}
            onClick={product.image === dbProduct.image ? () => null : () => {
              setProduct(prev => ({ ...prev, image: dbProduct.image }))
            }}
          >
            {product.image === dbProduct.image ? (
              <CheckIcon className="edit_image green_icon"/>
            ) : (
              <RefreshIcon className="menu_utils_svg menu_utils_svg_hover"/>
            )}
          </CircleMiniIconContainer>
        </div>
      </div>
      <div className="image_description description">
        Set the product thumbnail image. Only *.ico, *.svg, *.png, *.jpg, *.jpeg image files are accepted. Max
        size 75kb.
      </div>
    </CardContent>
  )
}

const initInputStatusProduct = {
  id: uuid(),
  value: "",
  name: 'status',
  type: 'text',
  title: "Status",
  required: true,
  list: Object.values(PRODUCTS_STATUSES),
  isOpenList: false,
} as SiteInputObjectType

const ProductStatus: FC<ProductDefaultData> = ({
  isLoading,
  data,
}) => {

  const { product, setProduct } = data
  const productStatus = product && product.status
  const [inputStatusProduct, setInputStatusProduct] = useState(initInputStatusProduct)

  useEffect(() => {
    setInputStatusProduct({ ...initInputStatusProduct, value: productStatus })
  }, [productStatus])

  return (
    <CardContent
      isLoading={isLoading}
      className="product_status_container"
    >
      <TitleChapter className="margin_bottom product_status_title">
        Status
      </TitleChapter>

      <SiteInput
        data={inputStatusProduct}
        onChange={handleChangeObj(setInputStatusProduct)}
        listItemOnClickArr={listItemOnClickObj(setInputStatusProduct, (e) => setProduct(prev => ({
          ...prev,
          status: e.target.innerHTML
        })))}
        toggleList={clickToggleListObj(setInputStatusProduct)}
      />
    </CardContent>
  )
}

const initInputsDetailProduct = [
  {
    id: uuid(),
    value: '',
    name: 'type',
    type: 'text',
    title: "Type",
    required: true,
    parentNameList: 'type',
    list: Object.values(PRODUCTS_TYPES),
    isOpenList: false,
  },
  {
    id: uuid(),
    value: '',
    name: 'brand',
    type: 'text',
    title: "Brand",
    required: true,
    parentNameList: 'brand',
    list: [],
    isOpenList: false,
  }
] as SiteInputsObjectType

const ProductDetails: FC<ProductDefaultData> = ({
  isLoading,
  data,
}) => {
  const { product, setProduct } = data
  const [inputsDetailProduct, setInputsDetailProduct] = useState(initInputsDetailProduct)
  const productType = product && product.type
  const productBrand = product && product.brand

  useEffect(() => {
    setInputsDetailProduct(prev => prev.map(item => item.name === 'type' ? ({
      ...item,
      value: productType
    }) : item.name === 'brand' ? ({
      ...item,
      value: productBrand,
      list: PRODUCTS_BRANDS[productType] && Object.values(PRODUCTS_BRANDS[productType])
    }) : item))
  }, [productType, productBrand])

  return (
    <CardContent
      isLoading={isLoading}
      className="product_details_container"
    >
      <TitleChapter className="margin_bottom product_details_title">
        Product Details
      </TitleChapter>

      {inputsDetailProduct.map(item => (
        <SiteInput
          key={item.id}
          data={item}
          onChange={handleChangeArr(setInputsDetailProduct)}
          listItemOnClickArr={listItemOnClickArr(setInputsDetailProduct, (e) => {
            setProduct(prev => ({ ...prev, [item.name]: e.target.innerHTML }))

            if (e.target.id.includes('type') && product.type !== e.target.innerHTML) {
              setProduct(prev => ({
                ...prev,
                brand: PRODUCTS_BRANDS[e.target.innerHTML] && Object.values(PRODUCTS_BRANDS[e.target.innerHTML])[0]
              }))
            }
          })}
          toggleList={clickToggleListArr(setInputsDetailProduct)}
        />
      ))}
    </CardContent>
  )
}

const initGeneralBodyProduct = [
  {
    id: uuid(),
    value: '',
    name: 'name',
    type: 'text',
    title: 'Product Name',
    required: true
  },
  {
    id: uuid(),
    value: '',
    name: 'description',
    type: 'text',
    title: 'Description',
    required: false,
    textarea: true,
    rowsTextarea: 10
  }
] as SiteInputsObjectType

const initProductPricing = [
  {
    id: uuid(),
    value: '0',
    name: 'price',
    type: 'number',
    title: 'Price',
    required: true
  },
  {
    id: uuid(),
    value: '0',
    name: 'quantity',
    type: 'number',
    title: 'Quantity',
    required: true
  },
  {
    id: uuid(),
    value: '',
    name: 'total_price',
    type: 'text',
    title: 'Total Price',
    disabled: true
  },
] as SiteInputsObjectType

const GeneralBody: FC<ProductDefaultData> = ({
  data,
  isLoading
}) => {
  const { product, setProduct } = data
  const [generalBodyProduct, setGeneralBodyProduct] = useState(initGeneralBodyProduct)
  const [productPricing, setProductPricing] = useState(initProductPricing)
  const productName = product && product.name
  const productPrice = product && product.price
  const productDescription = product && product.description
  const productQuantity = product && product.quantity
  const productTotalPrice = product && product.price * product.quantity

  useEffect(() => {
    setGeneralBodyProduct(prev => prev.map(item => item.name === 'name' ? ({ ...item, value: productName }) : item))
  }, [productName])

  useEffect(() => {
    setGeneralBodyProduct(prev => prev.map(item => item.name === 'description' ? ({
      ...item,
      value: productDescription
    }) : item))
  }, [productDescription])

  useEffect(() => {
    setProductPricing(prev => prev.map(item => item.name === 'price' ? ({ ...item, value: productPrice }) : item))
  }, [productPrice])

  useEffect(() => {
    setProductPricing(prev => prev.map(item => item.name === 'quantity' ? ({ ...item, value: productQuantity }) : item))
  }, [productPrice])

  useEffect(() => {
    setProductPricing(prev => prev.map(item => item.name === 'total_price' ? ({
      ...item,
      value: productTotalPrice
    }) : item))
  }, [productTotalPrice])

  return (
    <div className={cn("product_element_container general_element_container")}>
      {/* General Container*/}
      <CardContent
        isLoading={isLoading}
        className="general_body_container"
      >
        <TitleChapter className="margin_bottom general_body_title">
          General
        </TitleChapter>

        {generalBodyProduct.map(item => (
          <SiteInput
            key={item.id}
            data={item}
            onChange={handleChangeArr(setGeneralBodyProduct, (e) => updateProductData(e, setProduct))}
          />
        ))}
      </CardContent>

      {/* Pricing Container */}
      <CardContent
        isLoading={isLoading}
        className="product_status_container"
      >
        <TitleChapter className="margin_bottom general_body_title">
          Pricing
        </TitleChapter>

        {productPricing.map(item => (
          <SiteInput
            key={item.id}
            data={item}
            onChange={handleChangeArr(setProductPricing, (e) => updateProductData(e, setProduct))}
          />
        ))}
      </CardContent>
    </div>
  )
}

const initAdvancedBodyProduct = [
  {
    id: uuid(),
    value: '',
    name: 'id',
    type: 'text',
    title: 'Identifier',
    disabled: true
  },
] as SiteInputsObjectType

const AdvancedBody: FC<ProductDefaultData> = ({
  data,
  isLoading
}) => {
  const { product, setProduct } = data
  const [advancedBodyProduct, setAdvancedBodyProduct] = useState(initAdvancedBodyProduct)
  const productId = product && product.id

  useEffect(() => {
    setAdvancedBodyProduct(prev => prev.map(item => item.name === 'id' ? ({ ...item, value: productId }) : item))
  }, [productId])

  return (
    <div className={cn("product_element_container advanced_element_container")}>
      <CardContent
        isLoading={isLoading}
        className="advanced_body_container"
      >
        <TitleChapter className="body_title advanced_body_title">
          Advanced
        </TitleChapter>

        {advancedBodyProduct.map(item => (
          <SiteInput
            key={item.id}
            data={item}
            onChange={handleChangeArr(setAdvancedBodyProduct, (e) => updateProductData(e, setProduct))}
          />
        ))}

      </CardContent>
    </div>
  )
}

const chapterData = [
  { id: uuid(), to: '/', name: 'Home' },
  { id: uuid(), to: '/commerce', name: 'Commerce' },
  { id: uuid(), to: '/commerce/catalog', name: 'Catalog' },
  { id: uuid(), to: '/commerce/catalog/products', name: 'Products' },
]

const initProductRightBody = [
  {
    id: uuid(),
    active: true,
    title: 'General',
    funcElement: (props: ProductDefaultData) => <GeneralBody data={props.data} isLoading={props.isLoading}/>
  },
  {
    id: uuid(),
    active: false,
    title: 'Advanced',
    funcElement: (props: ProductDefaultData) => <AdvancedBody data={props.data} isLoading={props.isLoading}/>
  },
]

interface ProductProps {
}

const Product: FC<ProductProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [dbProduct, setDbProduct] = useState({} as ProductType);
  const [product, setProduct] = useState({} as ProductType);
  const [productRightBody, setProductRightBody] = useState(initProductRightBody);

  const leftContent = [
    {
      id: uuid(),
      element: (props: ProductDefaultData) => (
        <ProductImage
          {...props}
        />
      )
    },
    {
      id: uuid(),
      element: (props: ProductDefaultData) => (
        <ProductStatus
          {...props}
        />
      )
    },
    {
      id: uuid(),
      element: (props: ProductDefaultData) => (
        <ProductDetails
          {...props}
        />
      )
    },
  ]

  const menuHandleClick = (e: any) => {
    setProductRightBody(prev => prev.map(item =>
      item.id === e.target.id ?
        ({ ...item, active: true }) :
        ({ ...item, active: false })
    ))
  }

  const resetProduct = () => {
    setProduct(dbProduct)
  }

  const fetchProduct = () => {
    try {
      setIsLoading(true)

      ProductsService.getProduct(id as string)
        .then((res) => {
          const resData = res.data
          renameFieldObject(resData, '_id', 'id')
          setDbProduct(resData)
          setProduct(resData)
        });
    } catch (e: any) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const updateProduct = () => {
    try {
      setIsLoading(true)

      ProductsService.updateProduct(id as string, product)
        .then(res => {
          if (res.status === 200) {
            alert('Product was updated!')
            fetchProduct();
          } else {
            alert('Something went wrong!')
            console.log(res)
          }
        });
    } catch (e: any) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [])

  return (
    <PageContainer className="product">
      <TitlePage
        title="Product"
        data={chapterData}
        className="product_title"
        classNames={{
          titleChapter: 'product_title',
          descriptionChapter: 'product_path'
        }}
      />
      <div className="product_container">
        <div className="left_content">
          {leftContent.map(item => (
            <Fragment key={item.id}>
              {item.element({
                isLoading: isLoading,
                data: {
                  product,
                  dbProduct,
                  setProduct,
                  setDbProduct
                }
              })}
            </Fragment>
          ))}
        </div>
        <div className="right_content">
          <div className="info_nav_menu">
            {productRightBody.map(({ id, title, active }) => (
              <Fragment key={id}>
                <div id={id} className={cn("item_nav text", { active: active })} onClick={menuHandleClick}>
                  {title}
                </div>
              </Fragment>
            ))}
          </div>
          <div className="info_body_menu">
            {productRightBody.map(({ id, active, funcElement }) => (
              <Fragment key={id}>
                {active && (
                  <>
                    {funcElement({
                      isLoading: isLoading,
                      data: {
                        product,
                        dbProduct,
                        setProduct,
                        setDbProduct
                      }
                    })}
                  </>
                )}
              </Fragment>
            ))}
          </div>
        </div>
        <div className="submit_container">
          <ValidateButton
            className="submit_button action_button"
            validateCondition={() => equalObjects(product, dbProduct)}
            onClick={() => resetProduct()}
          >
            Reset
          </ValidateButton>
          <ValidateButton
            className="submit_button action_button"
            validateCondition={() => equalObjects(product, dbProduct)}
            onClick={() => updateProduct()}
          >
            Save Changes
          </ValidateButton>
        </div>
      </div>
    </PageContainer>
  );
};

export default Product;