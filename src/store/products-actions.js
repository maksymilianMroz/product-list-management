import { productActions } from "./products-slice";

export const fetchProductsData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "http://rweqkhiads.cdprojektred.com:3000/api/Products"
      );

      if (!response.ok) {
        throw new Error("Fetching went wrong");
      }

      const data = await response.json();

      return data;
    };

    try {
      const productsData = await fetchData();
      dispatch(
        productActions.getProducts({
          items: productsData || {},
        })
      );
    } catch (error) {
      throw new Error("Fetching went wrong " + error);
    }
  };
};

export const sendNewProductData = (product) => {
  return async (dispatch) => {
    const sendNewProduct = async () => {
      const response = await fetch(
        "http://rweqkhiads.cdprojektred.com:3000/api/Products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        }
      );

      if (!response.ok) {
        throw new Error("Sending went wrong");
      }
    };

    try {
      await sendNewProduct();
      dispatch(productActions.addProduct());
    } catch (error) {
      throw new Error("Sending went wrong " + error);
    }
  };
};

export const editProductData = (product) => {
  return async (dispatch) => {
    const editExistingProduct = async () => {
      const response = await fetch(
        "http://rweqkhiads.cdprojektred.com:3000/api/Products",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        }
      );

      if (!response.ok) {
        throw new Error("Editing went wrong");
      }
    };

    try {
      await editExistingProduct();
      dispatch(productActions.editProductOff());
    } catch (error) {
      throw new Error("Editing went wrong " + error);
    }
  };
};

export const removeProductsData = (ids, data) => {
  return async (dispatch) => {
    const deleteData = async () => {
      ids.forEach(async (item) => {
        await fetch(
          `http://rweqkhiads.cdprojektred.com:3000/api/Products/${item}`,
          {
            method: "DELETE",
          }
        );
      });
    };

    try {
      await deleteData();
      dispatch(productActions.removeProducts());
    } catch (error) {
      throw new Error("Deleting went wrong " + error);
    }
  };
};
