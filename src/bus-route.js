import React, { useState, useEffect } from "react";

function BusRoute({ visitedStops, stop, index }) {
    return (
        <React.Fragment key={index}>
            <div className="bus-route-stop">{stop}</div>
            {index !== visitedStops.length - 1 && (
                <div
                    className="bus-route-line"
                    style={{
                        backgroundColor: "green",
                    }}
                >
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 200" xmlSpace="preserve" fill="#000000"></svg>
                </div>
            )}
        </React.Fragment>
    );
}

export default BusRoute;