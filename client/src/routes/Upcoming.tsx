import { useState, useEffect } from "react";
import axios from "axios";
// import { TableSort } from "../components/Table";
import { ProductTable } from "../components/ProductTable";

const Upcoming = () => {
  interface RowData {
    _id: string;
    name: string;
    upc: string;
    exp: string;
    image: string;
  }
  const [tableData, setTableData] = useState<RowData[]>([]);
  let placeholder = [
    { _id: '1',name: "Apple", upc: "125783234434", exp: "12-30-22", image: "cloudinary" },
    { _id: '2',name: "Berry", upc: "457832344321", exp: "12-04-22", image: "cloudinary2" },
    { _id: '3',name: "Carrot", upc: "123457832344", exp: "12-06-22", image: "cloudinary3" },
    { _id: '4',name: "Drumstick", upc: "578323441234", exp: "12-03-22", image: "cloudinary4" }
  ];

   useEffect(() => {getAllProducts()},[])

  const getAllProducts = async () => {
    await axios.get("/product/all").then((res) => {
      setTableData(res.data.payload);
    });
  };

  return (
    <>
      {tableData[0] ? <ProductTable data={tableData}  />: "Loading"} 
    </>
  );
};

export default Upcoming;
