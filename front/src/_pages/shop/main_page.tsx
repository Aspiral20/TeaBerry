import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { DefaultTag, SvgButton, ContentBlockButton } from "../../_components/general";
import { CartIcon, DiscountIcon, HeartIcon, BalanceIcon } from "../../_components/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FilterIcon, SiteInput } from "../../_components";
import { v4 as uuid } from 'uuid';
import FilterModal from "./filter_modal";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";
import ProductService from "../../services/ProductService";
import { ProductsType, ProductType } from "../../_types/services/product.type";
import { useTranslation } from "react-i18next";
import { renameFieldObjectArray, ConditionalWrapper } from "../../_utils";
import cn from "classnames";
import ContentLoader from "../../_components/content_loader";

interface ShopProfileBarProps {
  setProducts: React.Dispatch<React.SetStateAction<ProductsType>>
  fetchProducts: () => Promise<void>
}

const ShopProfileBar: FC<ShopProfileBarProps> = ({
  setProducts,
  fetchProducts
}) => {
  const { store } = useContext(StoreContext);
  const { authStore, userStore } = store
  const [searchInput, setSearchInput] = useState({
    name: "search",
    value: "",
    type: "text",
    placeholder: "Search",
  });

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(prev => ({ ...prev, value: e.target.value }))
  }

  const submitSearch = async () => {
    await ProductService.searchProducts({
      regex: searchInput.value,
      field: 'name',
      sort: "status"
    }).then(res => setProducts(res.data))
  }

  useEffect(() => {
    if (searchInput.value !== '') {
      submitSearch()
    } else {
      fetchProducts()
    }
  }, [searchInput])

  return (
    <div className="shop_profile_bar">
      <div className="search_container">
        <SiteInput data={searchInput} onChange={handleChangeSearch}/>

        {authStore.isAuth ? (
          <Link to="/discount/5">
            <ContentBlockButton
              className="discount__button"
              icon={<DiscountIcon/>}
              data={[
                { id: uuid(), name: 'discount', description: `Discount: ${userStore.user.discount || 0}%` },
              ]}
              direction="left"
            />
          </Link>
        ) : <></>}
      </div>

      <div className="profile_features">
        <ContentBlockButton
          className="balance_container"
          icon={<BalanceIcon/>}
          data={[
            { id: uuid(), name: 'balance', description: '0 MDL' },
          ]}
          direction="right"
          onClick={() => alert('Buy a product!')}
        />
        <SvgButton className="features_icons" svgIcon={<HeartIcon/>} onClick={() => alert('Liked list clicked!')}/>
        <SvgButton className="features_icons" svgIcon={<CartIcon/>} onClick={() => alert('Cart list clicked!')}/>
      </div>
    </div>
  )
}

interface ShopTagsProps {
}

const initTags = [
  { id: uuid(), name: "tag1", iconUrl: '' },
  { id: uuid(), name: "tag2", iconUrl: '' },
  { id: uuid(), name: "tag2", iconUrl: '' },
  { id: uuid(), name: "tag2", iconUrl: '' },
  { id: uuid(), name: "tag2", iconUrl: '' },
  { id: uuid(), name: "tag2", iconUrl: '' },
  { id: uuid(), name: "tag2", iconUrl: '' },
  { id: uuid(), name: "tag2", iconUrl: '' },
]
const ShopTags: FC<ShopTagsProps> = ({}) => {
  const [tags, setTags] = useState(
    initTags.map(tag => ({ ...tag, isActive: false }))
  );

  return (
    <>
      <div className="shop_tags">
        {tags.map(({ id, isActive, ...rest }) => (
          <DefaultTag
            key={id}
            onClick={() => {
              setTags(prev => prev.map(item =>
                item.id === id ?
                  ({ ...item, isActive: !item.isActive }) :
                  item)
              )
            }}
            cnParams={{ active: isActive }}
            {...rest}
          />
        ))}
      </div>
    </>
  );
};


interface ProductProps {
  data: ProductType
  isDisabled?: boolean
}

export const Product: FC<ProductProps> = ({
  data,
  isDisabled
}) => {
  const {
    id,
    name,
    description,
    image,
    price,
    quantity,
    status
  } = data
  const { t } = useTranslation()
  const { store } = useContext(StoreContext);
  const { authStore, userStore } = store

  const addProductToCart = (e: any) => {
    e.preventDefault();

    alert('Product added!')
  }

  return (
    <ConditionalWrapper
      condition={!!isDisabled}
      wrapIsCond={children => (
        <div className={cn("product", { disabled: true })}>{children}</div>
      )}
      wrapNoCond={children => (
        <Link to={`/shop/${id}`} className={cn("product")}>{children}</Link>
      )}
    >
      <div className="image_container">
        <img className="image" src={image} alt="..."/>
      </div>
      <div className="content_container">
        <div className="text_container">
          <div className="name item_content text">
            {name}
          </div>
          <div className="stock item_content text">
            <span className="field text">{t('shop.modal.stock')}: </span>
            {quantity}
          </div>
          <div className="description item_content text">
            {description && description?.length > 10 ? description?.substring(0, 10) + '...' : description}
          </div>
        </div>
        <div className="buy_container">
          <div className={cn("price text", { cut_price: authStore.isAuth && userStore.user.discount !== 0 })}>
            {price} MDL
          </div>
          {authStore.isAuth && userStore.user.discount !== 0 ? (
            <div className="price text">
              {(((100 - userStore.user.discount) * price) / 100).toFixed(0)} {'(-' + userStore.user.discount + '%)'} MDL
            </div>
          ) : null}
          <button className="buy_button text" onClick={isDisabled ? () => null : addProductToCart}>
            {t('shop.product.buy')}
          </button>
        </div>
      </div>
    </ConditionalWrapper>
  );
};

interface ShopContentProps {
  products: ProductsType
  isLoading: boolean
}

const ShopContent: FC<ShopContentProps> = ({
  products,
  isLoading
}) => {

  return !isLoading ? (
    <div className="shop_content product_container">
      {products.map((product) => (
        <Product key={product.id + uuid()} data={product} isDisabled={product.status !== 'active'}/>
      ))}
    </div>
  ) : <ContentLoader/>
};

interface MainPageProps {
}

const ShopMainPage: FC<MainPageProps> = ({}) => {
  const { pathname } = useLocation()
  const { store } = useContext(StoreContext)
  const [products, setProducts] = useState([] as ProductsType);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      await ProductService.getProducts({ sort: "status" })
        .then(res => {
          const resData = res.data
          renameFieldObjectArray(resData, '_id', 'id');

          console.log(resData)
          setProducts(resData)
        })
        .catch(err => console.log(`Something went wrong: ${err}`));
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return pathname === '/shop' ? (
    <>
      <ShopProfileBar
        fetchProducts={fetchProducts}
        setProducts={setProducts}
      />
      {/*<ShopTags/>*/}
      <SvgButton
        className="filter_icon_button"
        svgIcon={<FilterIcon/>}
        onClick={() => store.constStore.setShopFilter({ isOpen: true })}
        isAnimated={true}
      />
      <FilterModal
        setProducts={setProducts}
        setIsLoading={setIsLoading}
      />
      <ShopContent
        products={products}
        isLoading={isLoading}
      />
    </>
  ) : (
    <Outlet/>
  );
};

export default observer(ShopMainPage);