import { useState } from "react";
import useCartStore from "../Zustand/useCartStore.jsx";
import Card from "../Components/FoodCard";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const navigate = useNavigate();
  const {
    cart,
    addToCart,
    decreaseFromCart,
    removeFromCart,
    clearCart,
  } = useCartStore();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const [showCheckout, setShowCheckout] = useState(false);
  const [orderType, setOrderType] = useState(""); // 'here' | 'takeout'
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = () => {
    if (!customerName.trim()) {
      alert("Please enter customer name.");
      return;
    }

    if (orderType === "here" && !tableNumber.trim()) {
      alert("Please enter table number.");
      return;
    }

    if (orderType === "takeout" && !phoneNumber.trim()) {
      alert("Please enter phone number.");
      return;
    }

    alert(
      `Order placed!\n\nName: ${customerName}\n${
        orderType === "here" ? `Table: ${tableNumber}` : `Phone: ${phoneNumber}`
      }\nItems: ${totalItems}`
    );
    // Optionally clear cart and reset form
    clearCart();
    setCustomerName("");
    setPhoneNumber("");
    setTableNumber("");
    setOrderType("");
    setShowCheckout(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">🛒 Your Shopping Cart</h1>
      <p className="text-gray-600 mb-6">
        Manage the items you want to order.
      </p>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 mt-12">Your cart is empty.</div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items */}
          <div className="grid gap-3 grid-cols-1 md:grid-cols-3 place-items-center-safe">
          {cart.map((item) => (
                <Card
                 key={item.idCategory} {...item}
                  addToCart={() => addToCart(item)}
                  decreaseFromCart={() => decreaseFromCart(item.idCategory)}
                  removeFromCart={() => removeFromCart(item.idCategory)}
                  showControls
                />
            ))}
            </div>

          {/* Summary & Actions */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-6 border-t pt-6">
            <div className="flex  items-center gap-3">
              <p className="text-lg font-medium">🧾 Total Items: {totalItems}</p>
              <button
                onClick={clearCart}
                className="mt-2 px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => setShowCheckout(true)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Checkout
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Checkout Form */}
          {showCheckout && (
            <div className="mt-10 border rounded-lg p-6 bg-gray-50 shadow">
              <h2 className="text-xl font-semibold mb-4">🍽 How would you like to dine?</h2>
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setOrderType("here")}
                  className={`px-4 py-2 rounded ${
                    orderType === "here"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-blue-300"
                  }`}
                >
                  Eat Here
                </button>
                <button
                  onClick={() => setOrderType("takeout")}
                  className={`px-4 py-2 rounded ${
                    orderType === "takeout"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-blue-300"
                  }`}
                >
                  Take Out
                </button>
              </div>

              {orderType && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                  />

                  {orderType === "here" ? (
                    <input
                      type="text"
                      placeholder="Table Number"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full px-4 py-2 border rounded"
                    />
                  ) : (
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-2 border rounded"
                    />
                  )}

                  <button
                    onClick={handleSubmit}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  >
                    Submit Order
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
