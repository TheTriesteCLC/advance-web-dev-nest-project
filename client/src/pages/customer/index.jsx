import CustomerService from "../../services/Customer.service";
import { useEffect, useState } from "react";
const HomeCustomer = () => {
  const [customer, setCustomer] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await CustomerService.getAllCustomer();
      setCustomer(response.data);
    };
    fetchData();
    console.log("customer", customer );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-red-500"></div>
  );
};
export default HomeCustomer;
