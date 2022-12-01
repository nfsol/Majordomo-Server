import { useState, useEffect } from "react";
import axios from "axios";
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

   useEffect(() => {getAllProducts()},[])

  const getAllProducts = async () => {
    await axios.get("/product/all").then((res) => {
      setTableData(res.data.payload);
    });
  };

  return (
    <>
      {tableData[0] ? <ProductTable data={tableData}  />: "Loading..."} 
    </>
  );
};

export default Upcoming;
