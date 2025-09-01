import { useEffect } from "react"

export default function NaverMap({ lat, lon, title }) {
    useEffect(() => {
        const id = 'naver-map-sdk';

        const init = () => {
            const mapDiv = document.getElementById('map');
            if (!mapDiv || !window.naver?.maps) return;

            const { maps } = window.naver;

            const map = new maps.Map(mapDiv, {
                center: new maps.LatLng(lat, lon),
                zoom: 18,
                scrollWheel: true,
            });

            const marker = new maps.Marker({
                position: new maps.LatLng(lat, lon),
                map,
                title,
            });

            const infoWindow = new maps.InfoWindow({
                content: `<div style="padding:6px 10px; font-size:13px;">${title}</div>`,
            });

            maps.Event.addListener(marker, 'mouseover', () => {
                infoWindow.open(map, marker);
            });

            maps.Event.addListener(marker, 'mouseout', () => {
                infoWindow.close();
            });
        };

        if (document.getElementById(id)) {
            init();
            return;
        }

        const s = document.createElement('script');
            s.id = id;
            s.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKey=9jpp281j0m`;
            s.async = true;
            s.onload = init;
            document.head.appendChild(s);
        }, [lat, lon, title]);

    return <div id="map" style={{ height: 500, width: "100%", borderRadius: 12 }} />;
}
