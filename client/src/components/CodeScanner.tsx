import { useRef, useState } from "react";
import { Button } from "@mantine/core";
import Scanner from "./Scanner";
import axios from "axios";

//Largely lifted from Quagga2's example page.

const CodeScanner = ({
  setIsNewItem,
  setLastScan,
}: {
  setIsNewItem: React.Dispatch<boolean>;
  setLastScan: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef(null);
  const onScan = (result: string) => {
    axios.get(`/product/${result}`).then((res) => {
        console.log(res.data.payload);
      if (res.data.payload) {
        setIsNewItem(false);
      } else {
        setIsNewItem(true);
      }
      setLastScan(result);
    });
  };

  return (
    <>
      <Button
        variant="outline"
        fullWidth
        mt="xl"
        onClick={() => setScanning(!scanning)}
      >
        {scanning ? "Stop" : "Start"}
      </Button>
      <div ref={scannerRef} style={{ position: "relative" }}>
        <canvas
          className="drawingBuffer"
          style={{
            position: "absolute",
            top: "0px",
          }}
          width="320"
          height="240"
        />
        {scanning ? (
          <Scanner
            scannerRef={scannerRef}
            onDetected={(result) => onScan(result)}
          />
        ) : null}
      </div>
    </>
  );
};

export default CodeScanner;
