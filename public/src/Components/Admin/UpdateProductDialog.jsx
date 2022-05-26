import React from "react";
import "../../Styles/edit-card-modal-styles.css";
import { Dialog } from "@mui/material";

import {
  updateProduct,
  uploadImg,
} from '../../apiCalls/productController'

export default function UpdateProductDialog(props) {

  const [product, setProduct] = React.useState({
    _id: props.product._id,
    name: props.product.name,
    description: props.product.description,
    category: props.product.category,
    price: props.product.price,
  })
  const [file, setFile] = React.useState()

  const handleChange = (e) => {
    setProduct({...product, [e.target.id]: e.target.value})
  }
  
  const onFileChange = (event) => {
    // Update the state
    setFile(event.target.files[0])
  }
  
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
    >
        <div className="card-box mt-5 d-flex flex-column justify-items-center align-content-center admin-edit-card">
          <div className="card-thumbnail">
            <img src={props.product.img.path} className="img-fluid edit-image" alt="" />
            Change Photo:
            <input
              className="ms-2 me-2 chooseFile"
              type="file"
              name="file"
              id="file"
              onChange={onFileChange}
            />
            <button onClick={() => uploadImg(file, props.product)}>
              Upload!
            </button>
          </div>
          <form>
            <div class="form-group">
              <label className="mt-3 mb-2 text-danger inputDish" for="DishTitle">
                Name
              </label>
              <input
                class="form-control"
                id="name"
                placeholder="Name dynamically placed here"
                onChange={handleChange}
              />
            </div>

            <div class="form-group">
              <label className="mt-2 mb-2 text-danger" for="DishDesc">
                Description
              </label>
              <input
                class="form-control"
                id="description"
                placeholder="Description dynamically placed here"
                onChange={handleChange}
              />
            </div>

            <div class="form-group">
              <label className="mt-2 mb-2 text-danger" for="Ingredients">
                Category
              </label>
              <input
                class="form-control category"
                id="category"
                placeholder="Category dynamically placed here"
                onChange={handleChange}
              />
            </div>

            <div class="form-group">
              <label className="mt-2 mb-2 text-danger" for="Price">
                Price
              </label>
              <input
                class="form-control"
                id="price"
                placeholder="Price dynamically placed here"
                onChange={handleChange}
              />
            </div>
          </form>
          <button
            className="mt-4 btn btn-danger"
            onClick={() => {
              updateProduct(product).then(() => props.update())
              props.onClose()
            }}
          >
            Save to update your menu
          </button>

          <p
            className="modalClose me-4 mt-4"
            onClick={props.onClose}
          >
            X CLOSE
          </p>
        </div>
    </Dialog>
  );
}
