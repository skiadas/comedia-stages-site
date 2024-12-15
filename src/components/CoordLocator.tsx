import Map from "ol/Map.js"
import OSM from "ol/source/OSM.js"
import TileLayer from "ol/layer/Tile.js"
import View from "ol/View.js"
import { useEffect, useRef } from "react"
import { useGeographic as setGeographicCoordsSystem } from "ol/proj"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import { Circle, Fill, Icon, Stroke, Style, Text } from "ol/style"
import { Feature } from "ol"
import { Point } from "ol/geom"

interface Coords {
  lon: number
  lat: number
}

export interface CoordLocatorProps {
  coords: Coords | undefined
  onChange: (coords: Coords) => void
}
export function CoordLocator({
  coords: originalCoords,
  onChange,
}: CoordLocatorProps) {
  const currentCoordsRef = useRef({ lat: 0, lon: 0, ...originalCoords })
  const zoomLevel = useRef(14)
  const map = useRef<Map | null>(null)
  const mapCallback = (elem: HTMLDivElement) => {
    console.log("on callback")
    if (!map.current) {
      console.log("setting up")
      setGeographicCoordsSystem()
      map.current = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
      })
      map.current.on("moveend", function () {
        const newZoom = map.current!.getView().getZoom()
        if (typeof newZoom != "undefined" && zoomLevel.current != newZoom) {
          zoomLevel.current = newZoom
        }
      })
      map.current.on("click", function (ev) {
        console.log(ev)
        console.log(ev.coordinate)
        const [lon, lat] = ev.coordinate
        onChange({ lat, lon })
      })
      const [vectorLayer, iconFeature] = makeMarker()
      map.current.marker = iconFeature
      map.current.addLayer(vectorLayer)
    }
    map.current.setView(
      new View({
        center: [originalCoords?.lon || 0, originalCoords?.lat || 0],
        zoom: zoomLevel.current,
      })
    )
    map.current.marker
      .getGeometry()
      .setCoordinates([originalCoords?.lon || 0, originalCoords?.lat || 0])
  }

  return (
    <>
      <div
        id="map"
        style={{ width: "100%", height: "10em" }}
        ref={mapCallback}
      ></div>
    </>
  )
}

function makeMarker() {
  const iconFeature = new Feature({
    geometry: new Point([0, 0]),
  })

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: "data/world.png",
    }),
    text: new Text({
      text: "World\nText",
      font: "bold 30px Calibri,sans-serif",
      fill: new Fill({
        color: "black",
      }),
      stroke: new Stroke({
        color: "white",
        width: 2,
      }),
    }),
  })

  const pointStyle = new Style({
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: "black",
      }),
      stroke: new Stroke({
        color: "white",
        width: 2,
      }),
    }),
  })

  iconFeature.setStyle([pointStyle, iconStyle])

  const vectorSource = new VectorSource({
    features: [iconFeature],
  })

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  })
  return [vectorLayer, iconFeature]
}
