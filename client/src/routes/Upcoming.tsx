import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Center, Text } from "@mantine/core";
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
  const [productCount, setProductCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const prevButton = (
    <Button
      variant="outline"
      mt="xl"
      onClick={() => {
        axios.get(`/product/table/${currentPage - 1}`).then((res) => {
          setProductCount(res.data.productCount);
          setTableData(res.data.payload);
          setCurrentPage(currentPage - 1);
        });
      }}
    >
      {currentPage}
    </Button>
  );
  const nextButton = (
    <Button
      variant="outline"
      mt="xl"
      onClick={() => {
        axios.get(`/product/table/${currentPage + 1}`).then((res) => {
          setProductCount(res.data.productCount);
          setTableData(res.data.payload);
          setCurrentPage(currentPage + 1);
        });
      }}
    >
      {currentPage + 2}
    </Button>
  );

  useEffect(() => {
    getFirstPage();
  }, []);

  const getFirstPage = async () => {
    await axios.get("/product/table/0").then((res) => {
      setProductCount(res.data.productCount);
      setTableData(res.data.payload);
    });
  };

  return (
    <>
      <h2>Total Products: {productCount}</h2>
      {tableData[0] ? <ProductTable data={tableData} /> : "Loading..."}
      <Center>
        {currentPage > 0 ? prevButton : ""}
        <Button variant="outline" disabled mt="xl">
          {currentPage + 1}
        </Button>
        {(currentPage + 1) * 20 < productCount ? nextButton : ""}
      </Center>
    </>
  );
};

export default Upcoming;
