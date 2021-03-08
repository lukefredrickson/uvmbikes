import React from "react"

const Header = ({ headerInfo }) => {
  return (
    <header className={`bg-cogs bg-repeat bg-center
    ${
      headerInfo.backgroundcolor === 'yellow' ? 'bg-yellow-400' :
      headerInfo.backgroundcolor === 'green' ? 'bg-green-400' :
      headerInfo.backgroundcolor === 'blue' ? 'bg-blue-400' :
      headerInfo.backgroundcolor === 'purple' ? 'bg-purple-400' :
      headerInfo.backgroundcolor === 'red' ? 'bg-red-400' :
      headerInfo.backgroundcolor === 'pink' ? 'bg-pink-400' : ''
    }
    `}>
      <div className="flex flex-col justify-center max-w-7xl min-h-min mx-auto py-20 px-6 sm:px-10 md:px-16 lg:px-20">
        <h1 className="bg-gray-900 bg-repeat bg-center bg-texture text-gray-50 text-4xl sm:text-6xl min-w-sm max-w-md p-6 m-0 shadow-lg">
          {headerInfo.header}
        </h1>
        <h4 className="bg-gray-900 bg-repeat bg-center bg-texture text-gray-50 min-w-sm max-w-md p-6 shadow-lg font-sans font-normal">
          {headerInfo.subtitle}
        </h4>
      </div>
    </header>
  );
}

export default Header