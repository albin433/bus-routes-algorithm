import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Tbody, Tr, Th, Td, TableContainer, Box } from "@chakra-ui/react";

function App() {
  const [busCount, setBusCount] = useState(null);
  const [busRoutes, setBusRoutes] = useState('');
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [error, setError] = useState(true);
  const [visitedStops, setVisitedStops] = useState([]);
  const [bus, setBus] = useState('');
  const [busColor, setBusColor] = useState('');
  const [busRoutesMatrix, setBusRoutesMatrix] = useState([]);
  /**
  * @param {number[][]} routes
  * @param {number} source
  * @param {number} target
  * @return {[number, number[]]}
  */
  var numBusesToDestination = function (routes, source, target) {
    if (source === target) {
      return [0, [source]];
    }

    const stopToRoutes = new Map();
    for (let i = 0; i < routes.length; i++) {
      for (const stop of routes[i]) {
        const routesForStop = stopToRoutes.get(stop) || [];
        routesForStop.push(i);
        stopToRoutes.set(stop, routesForStop);
      }
    }

    const visitedRoutes = new Set();
    const visitedStops = new Set([source]);
    const queue = [{ stop: source, path: [source], busCount: 0 }];

    while (queue.length > 0) {
      const { stop, path, busCount } = queue.shift();
      const routesForStop = stopToRoutes.get(stop);
      for (const route of routesForStop) {
        if (!visitedRoutes.has(route)) {
          visitedRoutes.add(route);
          for (const nextStop of routes[route]) {
            if (!visitedStops.has(nextStop)) {
              visitedStops.add(nextStop);
              const newPath = [...path, nextStop];
              if (nextStop === target) {
                return [busCount + 1, newPath];
              }
              queue.push({ stop: nextStop, path: newPath, busCount: busCount + 1 });
            }
          }
        }
      }
    }

    return [null, []];
  };

  const handleGenerateResponse = async (event) => {
    event.preventDefault();
    console.log(busRoutesMatrix, 'bus routes matrix')
    const [busCount, response] = await numBusesToDestination(busRoutesMatrix, Number(startPoint), Number(endPoint));
    console.log(response, 'response stops');
    setVisitedStops(response);
    setBusCount(busCount);
  }

  const handleAddBus = async (event) => {
    event.preventDefault();
    console.log(bus, 'handle add bus')
    const busLine = bus.split(',').map(Number);
    const newBusRoutesMatric = [...busRoutesMatrix];
    newBusRoutesMatric.push(busLine);
    setBusRoutesMatrix(newBusRoutesMatric);
    setBus('');
  }

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    // setBusColor(color);
    return color;
  };

  const busRoutesList = busRoutesMatrix.map((bus, index) => {
    const busStops = bus.map(stop => `${stop}`).join(' -> ');
    return (
      <Tr key={index}>
        <Td>Bus {index + 1}</Td>
        <Td>{busStops}</Td>
      </Tr>
    );
  });

  return (
    <div className="App">
      <div className='container'>
        <div className='text-center'>
          <h1 className='my-5 justify'>Bus Routes Algorithm</h1>
        </div>
        <form>
          <div className='row mt-3'>
            <div className='col-9'>
              <div className='col-12 justify-content-left'>
                <label>Bus routes:</label>
              </div>
              <div className='col-12'>
                <input type='text' id='busRoutes' className='form-control' placeholder='Bus routes (separated by ",")...' value={bus} onChange={(event) => setBus(event.target.value)}></input>
              </div>
            </div>
            <div className='col-3 mt-4'>
              <button id='generateButton' className='btn btn-success btn-block w-100 h-100' onClick={handleAddBus}>Add Bus</button>
            </div>
            {busRoutesList.length !== 0 &&
              <div className='row d-flex justify-content-center my-5'>
                <TableContainer w={1400} display="flex" alignItems="center">
                  <Table variant="striped" colorScheme="gray">
                    <Tr>
                      <Th>Bus</Th>
                      <Th>Stops</Th>
                    </Tr>
                    <Tbody>
                      {busRoutesList}
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>
            }
          </div>
          <div className='row mt-3'>
            <div className='col-6'>
              <label>Starting point:</label>
              <input type='number' id='startPoint' className='form-control' placeholder='Starting bus station...' value={startPoint} onChange={(event) => setStartPoint(event.target.value)}></input>
            </div>
            <div className='col-6'>
              <label>End point:</label>
              <input type='number' id='endPoint' className='form-control' placeholder='Target bus station...' value={endPoint} onChange={(event) => setEndPoint(event.target.value)}></input>
            </div>
          </div>
          <div className='row mt-5 justify-content-center'>
            <button id='generateButton' className='btn btn-success col-4' onClick={handleGenerateResponse}>Generate Response</button>
          </div>
        </form>
        {busCount && <div className='mt-5'>The least number of buses needed to arrive at the chosen destination is <strong><u>{busCount}</u></strong></div>}
        {
          visitedStops.length > 0 &&
          <div className="bus-route mb-5">
            {visitedStops.map((stop, index) => (
              <React.Fragment key={index}>
                <div className="bus-route-stop">{stop}</div>
                {index !== visitedStops.length - 1 && (
                  <div
                    className="bus-route-line"
                    style={{
                      backgroundColor: busColor,
                    }}
                  >
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 1000" xmlSpace="preserve" fill="#000000">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <g>
                            <g>
                              <g>
                                <path style={{ fill: busColor }} d="M41.562,130.891c-12.271,0-22.237,9.946-22.237,22.11c0,12.222,9.966,22.198,22.237,22.198c12.154,0,22.051-9.975,22.051-22.198C63.614,140.817,53.716,130.891,41.562,130.891z M41.562,166.747c-7.611,0-13.786-6.185-13.786-13.756c0-7.523,6.175-13.639,13.786-13.639c7.484,0,13.6,6.106,13.6,13.639C55.162,160.563,49.046,166.747,41.562,166.747z"></path>
                                <path style={{ fill: busColor }} d="M41.504,145.106c-4.426,0-7.972,3.566-7.972,7.924c0,4.436,3.556,7.943,7.972,7.943c4.367,0,7.894-3.498,7.894-7.943C49.398,148.663,45.871,145.106,41.504,145.106z"></path>
                                <path style={{ fill: busColor }} d="M249.081,81.376H0v73.266h18.856l-0.039-1.593c0-12.496,10.122-22.647,22.745-22.647c12.457,0,22.569,10.151,22.569,22.647l-0.039,1.602h105.361l-0.059-1.602c0-12.496,10.19-22.647,22.745-22.647c12.457,0,22.628,10.151,22.628,22.647l-0.107,1.602h43.507v-32.945L249.081,81.376z M27.845,87.55v29.408H6.917l0.059-29.447L27.845,87.55L27.845,87.55z M70.668,116.92H32.808V87.531l37.859,0.068V116.92z M113.539,116.929H75.66v-29.33l37.879,0.059V116.929z M156.401,148.643h-37859V87.648l37.859,0.166V148.643z M199.243,116.929h-37.879V87.717l37.879,0.098V116.929z M204.196,116.91L204.196,116.91V87.795l41.318,0.078l6.302,29.066L204.196,116.91z"></path>
                                <rect x="133.9" y="92.006" style={{ fill: busColor }} width="5.989" height="52.495" />
                                <path style={{ fill: busColor }} d="M192.521,132.474c-12.252,0-22.217,9.946-22.217,22.129c0,12.222,9.956,22.188,22.217,22.188c12.135,0,22.032-9.966,22.032-22.188C214.553,142.42,204.656,132.474,192.521,132.474z M192.482,168.311c-7.562,0-13.747-6.165-13.747-13.717c0-7.523,6.185-13.639,13.747-13.639c7.533,0,13.639,6.126,13.639,13.639C206.111,162.175,200.005,168.311,192.482,168.311z" />
                                <path style={{ fill: busColor }} d="M192.482,146.699c-4.445,0-7.982,3.517-7.982,7.933s3.537,7.933,7.982,7.933c4.348,0,7.894-3.507,7.894-7.933C200.367,150.246,196.83,146.699,192.482,146.699z" />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        }
      </div >
      {/* <Box bg='gray.200' p={4} mt={10}>
        This is the footer.
      </Box> */}
    </div >
  );
}

export default App;