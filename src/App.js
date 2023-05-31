import "./styles.css";

import AppBar from "@mui/material/AppBar";
import { Toolbar, Drawer, Avatar, Alert } from "@mui/material";
import { IconButton, Typography, Grid, Badge, Button } from "@mui/material";
import { Card, CardMedia, CardContent, CardActions } from "@mui/material";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar
} from "@mui/material";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ListIcon from "@mui/icons-material/List";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import HighlightOff from "@mui/icons-material/HighlightOff";

import { useState } from "react";

import data from "./AppData";

export default function App() {
  const [productData, setProductData] = useState(data.productData);
  const [cartContent, setCartContent] = useState(data.cartData);
  const [isCartVisible, setIsCartVisible] = useState(false);

  function onCategoryClick(categoryId) {
    if (categoryId === 0) {
      setProductData(data.productData);
      return;
    }

    const newProductData = data.productData.filter(
      (item) => item.category.indexOf(categoryId) > -1
    );

    setProductData(newProductData);
  }

  function onCategoryAllClick() {
    setProductData(data.productData);
  }

  function onSizeChange(event) {
    const selectedValues = Array.from(event.target.selectedOptions, (option) =>
      parseInt(option.value, 0)
    );

    const newProductData = data.productData.filter((item) =>
      item.size.some((s) => selectedValues.indexOf(s) > -1)
    );

    setProductData(newProductData);
  }

  function onBrandChange(event) {
    const selectedValues = Array.from(event.target.selectedOptions, (option) =>
      parseInt(option.value, 0)
    );

    const newProductData = data.productData.filter(
      (item) => selectedValues.indexOf(item.brand) > -1
    );

    setProductData(newProductData);
  }

  function onColorChange(event) {
    const selectedValues = Array.from(event.target.selectedOptions, (option) =>
      parseInt(option.value, 0)
    );

    const newProductData = data.productData.filter((item) =>
      item.color.some((s) => selectedValues.indexOf(s) > -1)
    );

    setProductData(newProductData);
  }

  function onIsFreeShippingChange(event) {
    let isFreeShippingFormValue = parseInt(event.target.value, 2);

    if (isFreeShippingFormValue === -1) {
      setProductData(data.productData);
      return;
    }

    let isFreeShipping = isFreeShippingFormValue === 1 ? true : false;

    const newProductData = data.productData.filter(
      (item, index) => item.isFreeShipping === isFreeShipping
    );
    setProductData(newProductData);
  }

  function onRemoveAllChange() {
    setCartContent({
      ...cartContent,
      totalPrice: 0,
      totalQuantity: 0,
      items: []
    });
  }

  function onAddToCartClick(productId) {
    let cartContentItems = cartContent.items.map((item) => {
      if (item.productId === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    let totalPrice = 0;
    let totalQuantity = 0;

    cartContentItems.forEach((item) => {
      totalPrice = totalPrice + item.price * item.quantity;
      totalQuantity = totalQuantity + item.quantity;
    });

    setCartContent({
      ...cartContent,
      items: cartContentItems,
      totalPrice: totalPrice,
      totalQuantity: totalQuantity
    });
  }

  function onSubtractToCartClick(productId) {
    let cartContentItems = cartContent.items.map((item) => {
      if (item.productId === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    let totalPrice = 0;
    let totalQuantity = 0;

    cartContentItems.forEach((item) => {
      totalPrice = totalPrice + item.price * item.quantity;
      totalQuantity = totalQuantity + item.quantity;
    });

    setCartContent({
      ...cartContent,
      items: cartContentItems,
      totalPrice: totalPrice,
      totalQuantity: totalQuantity
    });
  }

  function onRemoveToCartClick(productId) {
    const newCartItems = cartContent.items.filter(
      (item) => item.productId !== productId
    );

    let totalPrice = 0;
    let totalQuantity = 0;

    newCartItems.forEach((item) => {
      totalPrice = totalPrice + item.price * item.quantity;
      totalQuantity = totalQuantity + item.quantity;
    });

    setCartContent({
      ...cartContent,
      items: newCartItems,
      totalPrice: totalPrice,
      totalQuantity: totalQuantity
    });
  }

  function onAdd2ToCartClick(productId, price) {
    let newCartItems = [];

    if (
      cartContent.items.length > 0 &&
      cartContent.items.findIndex(
        (product) => product.productId === productId
      ) > -1
    ) {
      newCartItems = cartContent.items.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      newCartItems = cartContent.items;
      newCartItems.push({ productId: productId, price: price, quantity: 1 });
    }

    let totalPrice = 0;
    let totalQuantity = 0;

    newCartItems.forEach((item) => {
      totalPrice = totalPrice + item.price * item.quantity;
      totalQuantity = totalQuantity + item.quantity;
    });

    setCartContent({
      ...cartContent,
      items: newCartItems,
      totalPrice: totalPrice,
      totalQuantity: totalQuantity
    });
  }

  function getProductById(productId) {
    var product = data.productData.filter((item) => item.id === productId);

    return product[0];
  }

  return (
    <div className="App">
      <AppBar position="fixed">
        <Toolbar>
          <CurrencyExchangeIcon className="app-logo" />
          <Typography variant="h6" component="div">
            E-veikals
          </Typography>
          <IconButton
            color="inherit"
            sx={{ marginLeft: "auto" }}
            onClick={setIsCartVisible}
          >
            <Badge badgeContent={cartContent.totalQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="empty-row" />
      <div className="app-layout">
        <div>
          <div>
            <div className="list-header">Sadaļas</div>
            <List>
              {data.categoryData &&
                data.categoryData.length > 0 &&
                data.categoryData.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      button
                      onClick={() => onCategoryClick(item.id)}
                    >
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  );
                })}
            </List>
          </div>
          {/*<div>
            <select multiple onChange={onSizeChange}>
              {data.sizeData &&
                data.sizeData.length > 0 &&
                data.sizeData.map((item, index) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <select multiple onChange={onBrandChange}>
              {data.brandData &&
                data.brandData.length > 0 &&
                data.brandData.map((item, index) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <select multiple onChange={onColorChange}>
              {data.colorData &&
                data.colorData.length > 0 &&
                data.colorData.map((item, index) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>*/}
          <div onChange={onIsFreeShippingChange}>
            <span>Is free shipping</span>
            <input type="radio" value="1" name="freeShipping" /> Yes
            <input type="radio" value="0" name="freeShipping" /> No
            <input type="radio" value="-1" name="freeShipping" /> Both
          </div>
        </div>
        <div>
          <div className="product-length">
            Atrasti {productData.length} produkti
          </div>
          <Grid container spacing={4}>
            {productData &&
              productData.length > 0 &&
              productData.map((item, index) => {
                return (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="200"
                        title={item.name}
                        image={item.image}
                      />
                      <CardContent>
                        <div className="product-item-name">{item.name}</div>
                        <div className="product-item-price">
                          {item.price.toFixed(2)} €
                        </div>
                        <div className="product-item-description">
                          {item.description}
                        </div>
                      </CardContent>
                      <CardActions className="card-actions-content">
                        <Button
                          onClick={() => onAdd2ToCartClick(item.id, item.price)}
                          className="button-style-text"
                          variant="outlined"
                          startIcon={<AddShoppingCartIcon />}
                        >
                          Pievienot grozam
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </div>
      </div>
      <Drawer
        open={isCartVisible}
        onClose={() => setIsCartVisible(false)}
        anchor="right"
        PaperProps={{ sx: { width: "500px", backgroundColor: "#B7CADB" } }}
      >
        <div className="drawer-content">
          <div className="drawer-badge-content">
            <div className="drawer-badge-title">Iepirkuma grozs</div>
            <Badge badgeContent={cartContent.totalQuantity} color="error">
              <ShoppingCartIcon
                className="drawer-shopping-cart"
                color="primary"
              />
            </Badge>
          </div>
          {cartContent.totalQuantity === 0 && (
            <div className="drawer-nodata-content">
              <span>Pievienojat vismaz vienu produktu grozam :)</span>
            </div>
          )}
          {cartContent.totalQuantity > 0 && (
            <>
              <List>
                {cartContent &&
                  cartContent.items &&
                  cartContent.items.length > 0 &&
                  cartContent.items.map((item, index) => {
                    var product = getProductById(item.productId);
                    return (
                      <Card className="drawer-cart-item">
                        <ListItem
                          key={index}
                          secondaryAction={
                            <div>
                              <IconButton
                                edge="end"
                                title="Palielināt skaitu"
                                onClick={() => onAddToCartClick(item.productId)}
                              >
                                <AddCircleOutline />
                              </IconButton>
                              <IconButton
                                edge="end"
                                title="Samazināt skaitu"
                                onClick={() =>
                                  onSubtractToCartClick(item.productId)
                                }
                              >
                                <RemoveCircleOutline />
                              </IconButton>
                              <IconButton
                                edge="end"
                                title="Noņemt produktu"
                                onClick={() =>
                                  onRemoveToCartClick(item.productId)
                                }
                              >
                                <HighlightOff />
                              </IconButton>
                            </div>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <img
                                src={product.image}
                                alt="produkts"
                                height="40"
                                width="40"
                              />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              product.name +
                              " [" +
                              item.price.toFixed(2) +
                              " €]"
                            }
                            secondary={"Daudzums: " + item.quantity}
                          />
                        </ListItem>
                      </Card>
                    );
                  })}
              </List>
              <div>
                <div>
                  <Alert variant="outlined" severity="info">
                    <div>Kopējā cena: {cartContent.totalPrice}</div>
                    <div>Kopējais skaits: {cartContent.totalQuantity}</div>
                    <Button>pasutit</Button>
                    <Button onClick={onRemoveAllChange}>notirit</Button>
                  </Alert>
                </div>
              </div>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
}
