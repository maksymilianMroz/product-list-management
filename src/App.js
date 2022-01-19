import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProductsData } from "./store/products-actions";

import ProductsTable from "./components/Products/ProductsTable";
import ProductsForm from "./components/ProductForm/ProductForm";

const App = () => {
  const dispatch = useDispatch();
  const areLoaded = useSelector((state) => state.products.areLoaded);
  const areReloading = useSelector((state) => state.products.areReloading);

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch, !areReloading]);

  return (
    <div className="App">
      <div className="table-container">{areLoaded && <ProductsTable />}</div>

      <ProductsForm />
    </div>
  );
};

export default App;
