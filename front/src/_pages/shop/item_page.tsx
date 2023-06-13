import React, { FC, useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { renameFieldObject, renameFieldObjectArray } from "../../_utils";
import { ProductsType, ProductType } from "../../_types/services/product.type";
import ErrorPage from "../error_page";
import { BackToPrevious, DefaultContainer, DefaultTitle } from "../../_components";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import { Product } from "./main_page";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";
import cn from "classnames";

interface ItemPageProps {
}

const ShopItemPage: FC<ItemPageProps> = ({}) => {
  const { store } = useContext(StoreContext);
  const { authStore, userStore } = store
  const { id: productId } = useParams();
  const { t } = useTranslation()
  const [product, setProduct] = useState({} as ProductType);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [qty, setQty] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState([] as ProductsType)
  const { pathname } = useLocation()

  const fetchProduct = async () => {
    setIsLoading(true)
    try {

      await ProductService.getProduct(productId as string)
        .then(res => {
          const resData = res.data
          renameFieldObject(resData, '_id', 'id');
          setProduct(resData)
          fetchRelatedProducts(resData)
        })
        .catch(err => {
          console.log(`Something went wrong: ${err}`)
          setIsError(true)
        });

    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRelatedProducts = async (productData: ProductType) => {
    try {

      await ProductService.getProducts({
        condition: {
          status: 'active',
          type: productData.type,
          brand: productData.brand
        }
      })
        .then(res => {
          const resData = res.data
          renameFieldObjectArray(resData, '_id', 'id');
          const filteredProducts = resData.filter(item => item.id !== productId)
          setRelatedProducts(filteredProducts)
        });

    } catch (e: any) {
      console.log(e)
    }
  }

  const checkQuantity = (e: any) => {
    if (e.target.value > product.quantity) {
      alert(`${t('shop.maximum_products')}: ${product.quantity}`)
    } else {
      setQty(e.target.value)
    }
  }

  const addToCart = () => {
    alert('Added to cart!')
  }

  useEffect(() => {
    fetchProduct()
  }, [pathname])

  return !isError ? (
    <div className="product_page">
      <BackToPrevious to='/shop' className=""/>
      <DefaultContainer className="card_product" isLoading={isLoading}>
        <div className="product_image">
          <img className="image" src={product.image} alt="..."/>
        </div>
        <div className="product_content">
          <div className="product_context">
            <div className="product_title">
              {product.name}
            </div>
            <div className={cn("product_price text", { cut_price: authStore.isAuth && userStore.user.discount !== 0 })}>
              {product.price} MDL
            </div>
            {authStore.isAuth && userStore.user.discount !== 0 ? (
              <div className="product_price text">
                {(((100 - userStore.user.discount) * product.price) / 100).toFixed(0)} {'(-' + userStore.user.discount + '%)'} MDL
              </div>
            ) : <></>}
            <div className="product_description text">
              {product.description}
            </div>
          </div>
          <div className="features_container">
            <div className="product_features">
              <div className="id feature">
                <span className="field text">ID: </span>
                <span className="value text">{product.id}</span>
              </div>
              <div className="qty feature">
                <span className="field text">{t('shop.modal.stock')}: </span>
                <span className="value text">{product.quantity}</span>
              </div>
              <div className="type feature">
                <span className="field text">{t('shop.modal.type')}: </span>
                <span className="value text">{product.type}</span>
              </div>
              <div className="brand feature">
                <span className="field text">{t('shop.modal.brand')}: </span>
                <span className="value text">{product.brand}</span>
              </div>
            </div>
            <div className="payment_features">
              <input className="qty_input" type="number" name="quantity"
                     placeholder={t('shop.modal.quantity') as string} value={qty} onChange={checkQuantity}/>
              <button className="button_buy" onClick={addToCart}>{t('shop.add_to_cart')}</button>
            </div>
          </div>
        </div>
      </DefaultContainer>

      <div className="filter_title text">{t('shop.shop_item.related')}</div>
      <div className="related_products_container product_container">
        {!!relatedProducts.length ? relatedProducts.slice(0, 4).map(product => (
          <Product key={product.id + uuid()} data={product}/>
        )) : (
          <div className="text">
            {t('errors.not-found-product')}
          </div>
        )}
      </div>
    </div>
  ) : <ErrorPage/>;
};

export default observer(ShopItemPage);