import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../Auth/FormElements/Input";
import Button from "../Auth/FormElements/Button";
import ErrorModal from "../Auth/UIElements/ErrorModal";
import LoadingSpinner from "../Auth/UIElements/LoadingSpinner";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../Auth/user/validators";
import ImageUpload from "../Auth/FormElements/ImageUpload";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../context/auth";
import "./form.css";

const Form = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      product: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isvalid:false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("product", formState.inputs.product.value);
      formData.append("price", formState.inputs.products.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places`, "POST", formData,{
        Authorization: 'Bearer '+auth.token
      });
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="header">List Your Items <b>HERE</b></div>
        <Input
          id="product"
          element="input"
          type="text"
          label="Product Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="price"
          element="input"
          type="text"
          label="Price"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label=" Product Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD ITEM
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Form;
