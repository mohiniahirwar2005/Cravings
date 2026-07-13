import React from "react";

const RestaurantOrders = () => {
  const orders = [
    {
      id: 1,
      customer: "Rahul",
      food: "Pizza",
      amount: 350,
      status: "Preparing",
    },
    {
      id: 2,
      customer: "Amit",
      food: "Burger",
      amount: 200,
      status: "Delivered",
    },
    {
      id: 3,
      customer: "Priya",
      food: "Biryani",
      amount: 280,
      status: "Pending",
    },
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Orders
      </h1>

      <table className="w-full bg-white rounded-xl overflow-hidden">

        <thead className="bg-orange-500 text-white">

          <tr>
            <th className="p-3">ID</th>
            <th>Customer</th>
            <th>Food</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {orders.map((item) => (

            <tr key={item.id} className="border-b text-center">

              <td className="p-3">{item.id}</td>
              <td>{item.customer}</td>
              <td>{item.food}</td>
              <td>₹{item.amount}</td>

              <td>

                <span
                  className={`px-3 py-1 rounded text-white
                  ${
                    item.status === "Delivered"
                      ? "bg-green-500"
                      : item.status === "Preparing"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {item.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default RestaurantOrders;

