import React from 'react';
import {motion} from "framer-motion";
import {FaWindowClose} from "react-icons/fa";

const Popup = ({setPopup}) => {
    const handlePopupClose = () => {
        setPopup(false);
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: -1000 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 1000 }}
            transition={{ duration: 1 }}
            className="h-screen w-screen bg-white/5 backdrop-blur-lg absolute bottom-0 left-0 z-50">
            <div className="h-1/2 max-sm:h-2/3 w-1/2 max-sm:w-5/6 rounded-xl absolute top-1/2 left-1/2
                            transform -translate-x-1/2 -translate-y-1/2 relative bg-white/60
                             text-xl max-sm:text-lg p-2">
                <button
                    className="absolute top-2 right-2 flex justify-center items-center"
                    onClick={handlePopupClose}>
                    <FaWindowClose className="text-3xl text-red-500"/>
                </button>
                <div className="w-full h-full flex flex-col justify-center items-center text-center">
                <h1 className="mb-4 text-2xl max-sm:text-xl">Cette application a été développée avec</h1>
                    <h3 className="text-blue-500">API: <a href="https://opendata.bordeaux-metropole.fr/explore/dataset/previsions_pont_chaban/information/" target="_blank">Opendata bordeaux-métropole</a></h3>
                    <div className="mt-6 flex items-center gap-10 max-sm:gap-6">
                        <div className="flex flex-col items-center gap-1">
                            <picture>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/1280px-Nextjs-logo.svg.png"
                                    alt="react" className="h-20 w-28 max-sm:h-16 max-sm:w-24"/>
                            </picture>
                            <h4 className="text-lg max-sm:text-base">NextJS</h4>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                               <picture>
                                <img
                                    src="https://seeklogo.com/images/R/react-query-logo-1340EA4CE9-seeklogo.com.png"
                                    alt="react" className="h-20 w-24 max-sm:h-16 max-sm:w-20"/>
                            </picture>
                            <h3 className="text-lg max-sm:text-base">React Query</h3>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                                 <picture>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1024px-Tailwind_CSS_Logo.svg.png"
                                    alt="react" className="h-20 w-24 max-sm:h-16 max-sm:w-20"/>
                            </picture>
                            <h4 className="text-lg max-sm:text-base">Tailwind CSS</h4>
                        </div>
                    </div>
                    <h3 className="mt-10 ">Vous trouverez toutes mes réalisations sur mon &nbsp;
                        <a href="https://juliendussart.fr/" target="_blank" className="text-blue-500 underline decoration-solid decoration-blue-500">Portfolio</a>
                    </h3>
                </div>
            </div>
        </motion.div>
    );
};

export default Popup;
