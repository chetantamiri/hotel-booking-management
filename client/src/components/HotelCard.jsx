import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets';

const HotelCard = ({ rooms, index }) => {

    return (

        <Link
            to={`/rooms/${rooms._id}`}
            onClick={() => scrollTo(0, 0)}
            key={rooms._id}
            className="group block"
        >


            <div className="relative overflow-hidden rounded-3xl">

                <img
                    src={rooms.images[0]}
                    alt=""
                    className="w-full h-72 object-cover rounded-3xl transition-all duration-500 group-hover:scale-110"
                />


                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />


                {index % 2 === 0 && (
                    <p className="absolute top-4 left-4 bg-white text-black text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
                        Best Seller
                    </p>
                )}


                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">

                    <img
                        src={assets.starIconFilled}
                        alt=""
                        className="w-4 h-4"
                    />

                    <span className="text-sm font-semibold text-gray-800">
                        4.5
                    </span>

                </div>

            </div>


            <div className="mt-4 px-1">


                <div className="flex items-start justify-between gap-3">

                    <div>

                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-black transition-all duration-300">
                            {rooms.hotel.name}
                        </h3>

                        <div className="flex items-center gap-2 mt-2 text-gray-500">

                            <img
                                src={assets.locationIcon}
                                alt=""
                                className="w-4 h-4 opacity-70"
                            />

                            <p className="text-sm">
                                {rooms.hotel.address}
                            </p>

                        </div>

                    </div>

                </div>


                <div className="flex items-center justify-between mt-5">

                    <div className="flex items-end gap-1">

                        <p className="text-2xl font-bold text-gray-900">
                            ${rooms.pricePerNight}
                        </p>

                        <p className="text-sm text-gray-500 mb-1">
                            / night
                        </p>

                    </div>

                    <button
                        className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg hover:scale-105 hover:bg-gray-900 transition-all duration-300"
                    >
                        Book Now
                    </button>

                </div>

            </div>

        </Link>

    );
};

export default HotelCard;