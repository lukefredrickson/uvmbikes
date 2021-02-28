import React from "react"

const Hero = ( { title, subtitle }) => {
  return (
    <div>
      {title ? <h1>{title}</h1> : ''}
      {subtitle ? <h6>{subtitle}</h6> : ''}
    </div>
  );
}

export default Hero