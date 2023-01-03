import { useState } from "react";
import IOrder from "../../types/IOrder";
import OrdersTable from "./ordersTable";

const Order = () => {
  const [displayOrderPopUp, setDisplayOrderPopUp] = useState<boolean>(false);
  const [orderPopUp, setOrderPopUp] = useState<IOrder | undefined>();

  return (
    <div>
      <OrdersTable
        orderPopUp={orderPopUp}
        setOrderPopUp={setOrderPopUp}
        displayOrderPopUp={displayOrderPopUp}
        setDisplayOrderPopUp={setDisplayOrderPopUp}
      />
    </div>
  );
};

export default Order;
