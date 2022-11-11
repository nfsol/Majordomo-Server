import { useRef,useState } from 'react';
import Scanner from './Scanner';

//Largely lifted from Quagga2's example page. 

const CodeScanner = ({lastScan,setLastScan}) => {
    const [scanning, setScanning] = useState(false);
    const scannerRef = useRef(null);

    return (
        <div>
            <button onClick={() => setScanning(!scanning) }>{scanning ? 'Stop' : 'Start'}</button>
            <div ref={scannerRef} style={{position: 'relative', border: '3px solid red'}}>
                <canvas className="drawingBuffer" style={{
                    position: 'absolute',
                    top: '0px',
                    // left: '0px',
                    // height: '100%',
                    // width: '100%',
                    border: '3px solid green',
                }} width="320" height="240" />
                {scanning ? <Scanner scannerRef={scannerRef} onDetected={(result) => setLastScan(result)} /> : null}
            </div>
            {/* <h2>{result}</h2> */}
        </div>
    );
};

export default CodeScanner;