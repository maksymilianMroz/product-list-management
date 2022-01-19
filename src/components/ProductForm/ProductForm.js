import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendNewProductData,
  editProductData,
} from "../../store/products-actions";
import { productActions } from "../../store/products-slice";

const d = new Date();
const isoDate = d.toISOString();
var pattern = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);

const ProductsForm = () => {
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState(0);
  const [enteredName, setEnteredName] = useState("");
  const [isEnteredNameLengthValid, setIsEnteredNameLengthValid] =
    useState(true);
  const [enteredQuantity, setQuantity] = useState(0);
  const [currentDate, setCurrentDate] = useState();
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [isEnteredEmailValid, setIsEnteredEmailValid] = useState(true);

  const isEditing = useSelector((state) => state.products.isEditing);
  const editableProduct = useSelector(
    (state) => state.products.editableProduct
  );

  const nameInputChangeHanlder = (event) => {
    setEnteredName(event.target.value);
    setCurrentDate(isoDate);
  };

  const quantityInputChangeHanlder = (event) => {
    setQuantity(event.target.value);
    setCurrentDate(isoDate);
  };

  const descriptionInputChangeHanlder = (event) => {
    setEnteredDescription(event.target.value);
    setCurrentDate(isoDate);
  };

  const emailInputChangeHanlder = (event) => {
    setEnteredEmail(event.target.value);
    setCurrentDate(isoDate);
  };

  const closeModalHandler = (event) => {
    event.preventDefault();

    setEnteredName("");
    setQuantity(0);
    setEnteredDescription("");
    setEnteredEmail("");
    setIsEnteredNameLengthValid(true);
    setIsEnteredEmailValid(true);
    setCurrentDate("");
    setItemId("");

    dispatch(productActions.editProductOff());
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (enteredName.trim() === "") {
      setIsEnteredNameLengthValid(false);
      return;
    }

    if (enteredName.trim().length < 5) {
      setIsEnteredNameLengthValid(false);
      return;
    }

    if (typeof enteredEmail !== "undefined") {
      if (!pattern.test(enteredEmail)) {
        setIsEnteredEmailValid(false);
        return;
      }
    }

    setIsEnteredNameLengthValid(true);
    setIsEnteredEmailValid(true);

    setEnteredName("");
    setQuantity(0);
    setEnteredDescription("");
    setEnteredEmail("");
    setCurrentDate("");
    setItemId("");

    const newProduct = {
      name: enteredName,
      quantity: enteredQuantity,
      date: currentDate,
      description: enteredDescription,
      email: enteredEmail,
    };

    if (isEditing) {
      const editedProduct = {
        id: itemId,
        name: enteredName,
        quantity: enteredQuantity,
        date: currentDate,
        description: enteredDescription,
        email: enteredEmail,
      };
      dispatch(editProductData(editedProduct));

      setEnteredName("");
      setQuantity(0);
      setEnteredDescription("");
      setEnteredEmail("");
      setCurrentDate("");
      setItemId("");
      return;
    }

    dispatch(sendNewProductData(newProduct));
  };

  useEffect(() => {
    console.log(editableProduct);
    const { id, name, quantity, description, email } = editableProduct;

    setItemId(id);
    setEnteredName(name);
    setQuantity(quantity);
    setCurrentDate(isoDate);
    setEnteredDescription(description);
    setEnteredEmail(email);
  }, [editableProduct]);

  return (
    <form onSubmit={formSubmissionHandler} className="form-container">
      <div className="form-control">
        <div className="form-input">
          <label className="input-label" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            onChange={nameInputChangeHanlder}
            value={enteredName}
          />
          {!isEnteredNameLengthValid && (
            <p className="validation-info">
              The name must be at least 5 characters long
            </p>
          )}
        </div>
        <div className="form-input">
          <label className="input-label" htmlFor="name">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            onChange={quantityInputChangeHanlder}
            value={enteredQuantity}
          />
        </div>
        <div className="form-input">
          <label className="input-label" htmlFor="name">
            Description:
          </label>
          <input
            type="text"
            id="description"
            onChange={descriptionInputChangeHanlder}
            value={enteredDescription}
          />
        </div>
        <div className="form-input">
          <label className="input-label" htmlFor="name">
            Email:
          </label>
          <input
            type="text"
            id="email"
            onChange={emailInputChangeHanlder}
            value={enteredEmail}
          />
          {!isEnteredEmailValid && (
            <p className="validation-info">Enter a valid email address</p>
          )}
        </div>
      </div>
      <div className="form-actions">
        <button className="form-actions-btn">Submit</button>
        <button
          className="form-actions-cancel-btn"
          onClick={closeModalHandler}
          type="reset"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductsForm;
