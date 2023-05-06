import React, { useState, useEffect } from "react";

function BusRoute({ visitedStops, stop, index }) {
    const [busColor, setBusColor] = useState('');
    useEffect(() => {
        const getRandomColor = () => {
            const letters = "0123456789ABCDEF";
            let color = "#";
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            console.log(color, "color");
            setBusColor(color);
        };

        getRandomColor();
    }, []);

    return (
        <React.Fragment key={index}>
            <div className="bus-route-stop">{stop}</div>
            {index !== visitedStops.length - 1 && (
                <div
                    className="bus-route-line"
                    style={{
                        backgroundColor: "indigo",
                    }}
                >
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 200" xmlSpace="preserve" fill="#000000"></svg>
                </div>
            )}
        </React.Fragment>
    );
}

export default BusRoute;