import React, {useEffect} from "react";
import { updateCategory } from "../apiCalls/productController";
import AdminCard from "../Components/Admin/AdminCard";
import AdminOrder from "../Components/Admin/AdminOrder";
import CreateProductDialog from "../Components/Admin/CreateProductDialog";
import Dashboard from "../Components/Admin/Dashboard";
import AcceptedOrder from "../Components/Orders/AcceptedOrder";
import ReadyOrder from "../Components/Orders/ReadyOrder";
import "../Styles/admin-orders-styles.css";

export default function AdminMain(props) {
  const [createProductDialog, setCreateProductDialog] = React.useState(false);
  const [updateCategoryInput, setUpdateCategoryInput] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState();

  const handleCreateProductDialog = () => {
    setCreateProductDialog(!createProductDialog);
  };

  const handleUpdateCategoryInput = () => {
    setUpdateCategoryInput(!updateCategoryInput);
  };
  
  const handleChange = (e) => {
    setNewCategory(e.target.value)
  }

  // console.log(props.order)

  if (props.selected === 'products') {
    if (props.products) {
      return (
        <div>
          <CreateProductDialog
            open={createProductDialog}
            onClose={handleCreateProductDialog}
            product={props.product}
            update={props.update}
          />
          {props.products.map((category) => (
            <div>
              <h2 id="sideorders" className=" cardMenuHeader mt-4 mb-4 ms-4">
                {category.category}
              </h2>
              {updateCategoryInput
              ?
                <div>
                  <input onChange={handleChange}></input>
                  <a
                    onClick={
                      () => updateCategory(category.category, newCategory).then(() => {
                        props.update()
                        handleUpdateCategoryInput()
                      })
                    }
                    class="btn btn-info ms-3 btn-sm"
                  >Confirm</a>
                </div>
              : null
              }
              <a
                onClick={handleUpdateCategoryInput}
                class="btn btn-info ms-3 btn-sm"
              >Update category</a>
              <div className="container ">
                <div className="row">
                  {category.products.map((prod) => (
                    <AdminCard product={prod} update={props.update} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      return 'loading'
    }
  }

  if (props.selected === 'orders') {
    return (
      <div class="admin-orders row mt-2">
        <div class="orders-in column">
          <p className="order-status mt-3 ms-4">orders in</p>
          <p className="order-statussub ms-4  mb-2">
            Accept or Decline orders below...
          </p>
          {props.ordersIn.map(order => (
            <div class="card mb-3 ms-3 me-3">
              <div class="card-body">
                <AdminOrder order={order} update={props.update} />
              </div>
            </div>
          ))}
        </div>
        <div class="accepted-orders column">
          <p className="order-status mt-3 ms-4">orders accepted</p>
          <p className="order-statussub ms-4  mb-2">
            Prepare orders below
          </p>
          {props.acceptedOrders.map(order => (
            <div class="card mb-3 ms-3 me-3">
              <div class="card-body">
                <AcceptedOrder order={order} update={props.update} />
              </div>
            </div>
          ))}
        </div>
        <div class="completed-orders column">
          <p className="order-status mt-3 ms-4">orders completed</p>
          <p className="order-statussub ms-4  mb-2">
            Orders waiting for collection / delivery below...
          </p>
          {props.completedOrders.map(order => (
            <div class="card mb-3 ms-3 me-3">
              <div class="card-body">
                <ReadyOrder order={order} update={props.update} />
              </div>
            </div>
          ))}
        </div>
      </div>
      // <div class="admin-orders row mt-2">
      //   {props.orders.map((order) =>
      //     order.accepted &&
      //     !order.ready &&
      //     !order.completed &&
      //     order.status != "refunded" ? (
      //       // orders in preparation || middle column
      //       <div class="accepted-orders col-sm-4 column">
      //         Complete orders below<br/>
      //         {order.status}<br/><br/>
      //         <AcceptedOrder order={order} update={props.update} />
      //       </div>
      //     ) : order.ready &&
      //       !order.completed &&
      //       order.status != "refunded" ? (
      //       // orders ready to be collected or delivered || last column
      //       <div class="orders-in col-sm-4 column">
      //         Orders ready to be collected<br/>
      //         {order.status}<br/><br/>
      //         <ReadyOrder order={order} update={props.update} />
      //       </div>
      //     ) : // orders in - paid or pay at pick up || first column
      //     !order.completed &&
      //       order.payment_intent.status == "succeeded" &&
      //       order.status != "refunded" ? (
      //         <div class="completed-orders col-sm-4 column">
      //           Accept orders below<br/>
      //           {order.status}<br/><br/>
      //           <AdminOrder order={order} update={props.update} />
      //         </div>
      //     ) : null
      //   )}
      // </div>
    )
  }

  if (props.selected === 'dashboard') {
    return (
      <div class="admin-orders row mt-2">
        {props.orders.map((order) =>
          order.accepted && order.ready && order.completed ? (
            <Dashboard order={order} update={props.update} />
          ) : null
        )}
      </div>
    )
  }   
}