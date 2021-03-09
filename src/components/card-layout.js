import React from 'react';
import Card from './card';
import parse from "html-react-parser"
import SimpleMap from "./simple-map"

const CardLayout = ({ cards, size }) => {
    const cardComponents = cards.cards.map(({ card, content, id }) => {
        console.log(card);
        const {
            externalLink,
            hasLink,
            header,
            internalLink,
            isInternalLink,
            map,
            useMap,
            backgroundcolor,
            textcolor,
        } = card;
        const image = {
            fluid: card?.image?.localFile?.childImageSharp?.gatsbyImageData,
            alt: '',
        }
        console.log(image);
        const bgColor = backgroundcolor === 'yellow' ? 'bg-yellow-400' :
                        backgroundcolor === 'green' ? 'bg-green-400' :
                        backgroundcolor === 'blue' ? 'bg-blue-400' :
                        backgroundcolor === 'purple' ? 'bg-purple-400' :
                        backgroundcolor === 'red' ? 'bg-red-400' :
                        backgroundcolor === 'pink' ? 'bg-pink-400' :
                        backgroundcolor === 'black' ? 'bg-gray-900' :
                        backgroundcolor === 'white' ? 'bg-white' : '';
        const textColor = textcolor === 'black' ? 'text-black' :
                            textcolor === 'white' ? 'text-white' : '';
        const bgTexture = backgroundcolor === 'black' ? 'bg-texture' : 'bg-texture-white';
        const mapProps = {
            center: {
                lat: parseFloat(map?.latitude),
                lng: parseFloat(map?.longitude),
            },
            zoom: parseInt(map?.zoom),
        }
        console.log(mapProps);
        const simpleMap = (
            <SimpleMap
                center={mapProps.center}
                zoom={mapProps.zoom}
            />
        )
        return (
            <Card
                key={id}
                header={header}
                body={parse(content)}
                image={image}
                map={simpleMap}
                bgColor={bgColor}
                textColor={textColor}
                bgTexture={bgTexture}
                size={size}
            />
        )
    });

    return (
        <div className="grid grid-flow-row justify-start  items-start justify-center md:grid-cols-2 md:-mx-2">
            {cardComponents}
        </div>
    );
}

export default CardLayout;