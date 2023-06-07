import React, { useState } from 'react';
import './App.css';
import BusRoute from './bus-route';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import BusIcon from './bus-icon';
import TableBusIcon from './table-bus-icon';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaFlagCheckered } from 'react-icons/fa';

function App() {
  const [busCount, setBusCount] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [visitedStops, setVisitedStops] = useState([]);
  const [bus, setBus] = useState('');
  const [busList, setBusList] = useState([]);
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
    const [busCount, response] = await numBusesToDestination(busRoutesMatrix, Number(startPoint), Number(endPoint));
    setVisitedStops(response);
    setBusCount(busCount);
  }

  const handleAddBus = async (event) => {
    event.preventDefault();
    const busLine = bus.split(',').map(Number);
    const newBusRoutesMatric = [...busRoutesMatrix];
    newBusRoutesMatric.push(busLine);
    setBusRoutesMatrix(newBusRoutesMatric);
    const newBus = {
      busName: `Bus ${busList.length + 1}`,
      path: busLine,
      color: ['red', 'blue', 'violet', 'grey', 'orange', 'black'][busList.length % 6]
    };
    setBusList([...busList, newBus]);
    setBus('');
  };

  const busRoutesList = busRoutesMatrix.length > 0 ? (
    busRoutesMatrix.map((bus, index) => {
      const busStops = bus.map(stop => `${stop}`).join(' -> ');
      return (
        <Tr key={index}>
          <Td>Bus {index + 1}</Td>
          <Td>{busStops}</Td>
          <Td><TableBusIcon {...{ index }} /></Td>
        </Tr>
      );
    })
  ) : (
    <Tr>
      <Td colSpan="3" textAlign="center">No bus routes added yet</Td>
    </Tr>
  );

  const findBus = (visitedStops, busList, index) => {
    const currentStop = visitedStops[index];
    return busList.find(bus => {
      const nextStop = visitedStops[index + 1];
      return bus.path.includes(currentStop) && bus.path.includes(nextStop);
    });
  }

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
            <div className='col-3 mt-4 ms-auto'>
              <button id='generateButton' className='btn btn-success btn-block w-100 h-100' onClick={handleAddBus}>Add Bus</button>
            </div>
          </div>
          <div className='row d-flex justify-content-center my-5'>
            <TableContainer w={1400} display="flex" alignItems="center">
              <Table variant="striped" colorScheme="gray">
                <Tr>
                  <Th>Bus</Th>
                  <Th>Stops</Th>
                  <Th>Icon</Th>
                </Tr>
                <Tbody>
                  {busRoutesList}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
          <div className='row mt-3'>
            <div className='row col-9'>
              <div className='col-6'>
                <label>Current bus stop:</label>
                <input type='number' id='startPoint' className='form-control' placeholder='Starting bus station...' value={startPoint} onChange={(event) => setStartPoint(event.target.value)}></input>
              </div>
              <div className='col-6'>
                <label>Destination:</label>
                <input type='number' id='endPoint' className='form-control' placeholder='Target bus station...' value={endPoint} onChange={(event) => setEndPoint(event.target.value)}></input>
              </div>
            </div>
            <div className='col-3 mt-4 ms-auto'>
              <button id='generateButton' className='btn btn-success btn-block w-100 h-100' onClick={handleGenerateResponse}>Generate Response</button>
            </div>
          </div>
        </form>
        {busCount && <h5 className='mt-5'>The least number of buses needed to arrive at the chosen destination is <strong><u>{busCount}</u></strong></h5>}
        {
          visitedStops.length > 0 &&
          <div className="bus-route mt-5">
            <FaMapMarkerAlt size={52} color="red" className='p-0' />
            {visitedStops.map((stop, index) => (
              <BusIcon {...{ visitedStops, index, bus: findBus(visitedStops, busList, index) }} />
            ))}
            <FaFlagCheckered size={52} color="black" className='p-0' />
          </div>
        }
        {
          visitedStops.length > 0 &&
          <div className="bus-route mb-5">
            {visitedStops.map((stop, index) => (
              <BusRoute {...{ visitedStops, stop, index }} />
            ))}
          </div>
        }
      </div>
      {/* <Box bg='gray.200' p={4} mt={10}>
        This is the footer.
      </Box> */}
    </div >
  );
}

export default App;