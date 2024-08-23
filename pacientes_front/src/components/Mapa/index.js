import React, {useEffect} from "react";
import L, { MarkerCluster } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
    iconUrl: require("./location.svg").default,
    iconSize: new L.Point(40, 47)
});

const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
        html: `<span>${cluster.getChildCount()}</span>`,
        className: "custom-marker-cluster",
        iconSize: L.point(33, 33, true)
    });
};

function Mapa({pontos}) {
    useEffect(() => {
        console.log(pontos);
    }, [pontos]);
    return (
        <div>
            <MapContainer
                style={{ height: "calc(100vh - 100px)" }}
                center={[-13.038785, -51.575189]}
                zoom={4}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup chunkedLoading>
                    {pontos.map((address, index) => (
                        <Marker
                        icon={customIcon}
                                    key={index}
                                    position={[address[0], address[1]]}
                                    title={address[2]}
                ></Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
</div>
);
}

export default Mapa;
