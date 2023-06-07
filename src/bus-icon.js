import React, { useState, useEffect } from "react";

function BusIcon({ visitedStops, index, bus }) {
    const [busColor, setBusColor] = useState('');
    console.log(bus, 'the bus')
    useEffect(() => {
        if (bus && bus.color) {
            setBusColor(bus.color);
        }
    }, [bus]);

    return (
        <React.Fragment key={index}>
            {index !== 0 && index !== visitedStops.length - 1 && <div className="fake-bus-route-stop"></div>}
            {index !== visitedStops.length - 1 && (
                <div>
                    <div>
                        {bus && <div className="text-center me-3">{bus.busName}</div>}
                    </div>
                    <div className="svgja">
                        <div className="ms-3 col-6">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 200" width="100%" height="100%" xmlSpace="preserve" fill={busColor} >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <path style={{ fill: bus.color }} d="M41.562,130.891c-12.271,0-22.237,9.946-22.237,22.11c0,12.222,9.966,22.198,22.237,22.198c12.154,0,22.051-9.975,22.051-22.198C63.614,140.817,53.716,130.891,41.562,130.891z M41.562,166.747c-7.611,0-13.786-6.185-13.786-13.756c0-7.523,6.175-13.639,13.786-13.639c7.484,0,13.6,6.106,13.6,13.639C55.162,160.563,49.046,166.747,41.562,166.747z"></path>
                                <path style={{ fill: bus.color }} d="M41.504,145.106c-4.426,0-7.972,3.566-7.972,7.924c0,4.436,3.556,7.943,7.972,7.943c4.367,0,7.894-3.498,7.894-7.943C49.398,148.663,45.871,145.106,41.504,145.106z"></path>
                                <path style={{ fill: bus.color }} d="M249.081,81.376H0v73.266h18.856l-0.039-1.593c0-12.496,10.122-22.647,22.745-22.647c12.457,0,22.569,10.151,22.569,22.647l-0.039,1.602h105.361l-0.059-1.602c0-12.496,10.19-22.647,22.745-22.647c12.457,0,22.628,10.151,22.628,22.647l-0.107,1.602h43.507v-32.945L249.081,81.376z M27.845,87.55v29.408H6.917l0.059-29.447L27.845,87.55L27.845,87.55z M70.668,116.92H32.808V87.531l37.859,0.068V116.92z M113.539,116.929H75.66v-29.33l37.879,0.059V116.929z M156.401,148.643h-37859V87.648l37.859,0.166V148.643z M199.243,116.929h-37.879V87.717l37.879,0.098V116.929z M204.196,116.91L204.196,116.91V87.795l41.318,0.078l6.302,29.066L204.196,116.91z"></path>
                                <rect x="133.9" y="92.006" style={{ fill: bus.color }} width="5.989" height="52.495" />
                                <path style={{ fill: bus.color }} d="M192.521,132.474c-12.252,0-22.217,9.946-22.217,22.129c0,12.222,9.956,22.188,22.217,22.188c12.135,0,22.032-9.966,22.032-22.188C214.553,142.42,204.656,132.474,192.521,132.474z M192.482,168.311c-7.562,0-13.747-6.165-13.747-13.717c0-7.523,6.185-13.639,13.747-13.639c7.533,0,13.639,6.126,13.639,13.639C206.111,162.175,200.005,168.311,192.482,168.311z" />
                                <path style={{ fill: bus.color }} d="M192.482,146.699c-4.445,0-7.982,3.517-7.982,7.933s3.537,7.933,7.982,7.933c4.348,0,7.894-3.507,7.894-7.933C200.367,150.246,196.83,146.699,192.482,146.699z" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default BusIcon;