import CodeScanner from "../components/CodeScanner";
import LastItems from "../components/LastItems";
import NewItemDrawer from "../components/NewItemDrawer";
import { useState } from "react";


const ItemInput = () => {
  const [lastScan,setLastScan] = useState<string | null>("");
  
  return (
    <>
      <CodeScanner lastScan={lastScan}setLastScan={setLastScan}/>
      <NewItemDrawer lastScan={lastScan}setLastScan={setLastScan}/>
      <LastItems />
    </>
  );
};

export default ItemInput;
