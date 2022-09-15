import React, { useState } from "react"
import { Link } from "gatsby"

const Banner = ({ largeText, smallText, buttonText, link, internalLink }) => {

    const [hidden, setHidden] = useState(false);
    const linkStyle = "flex items-center justify-center px-4 py-2 border bg-texture-white border-black shadow text-sm font-medium text-black bg-white hover:bg-indigo-50";

    return (
        <div className={`${hidden && "hidden"} bg-red-600 border-b-4 border-gray-900`}>
            <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between flex-wrap">
                    <div className="w-0 flex-1 flex items-center">
                        <span className="flex p-2 bg-red-800">
                            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                            </svg>
                        </span>
                        <p className="ml-3 font-medium text-white truncate my-0">
                            <span className="md:hidden">
                                {smallText}
                            </span>
                            <span className="hidden md:inline">
                                {largeText}
                            </span>
                        </p>
                    </div>
                    <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                        {internalLink ?
                            <Link to={internalLink} className={linkStyle}>
                                {buttonText}
                            </Link>
                            :
                            link &&
                            <a href={link} target="_blank" rel="noreferrer" className={linkStyle}>
                                {buttonText}
                            </a>
                        }
                    </div>
                    <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                        <button type="button" onClick={() => setHidden(true)}
                            className="-mr-1 flex p-2 hover:bg-red-500 focus:outline-none sm:-mr-2">
                            <span className="sr-only">Dismiss</span>
                            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Banner;