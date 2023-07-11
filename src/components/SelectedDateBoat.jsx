import React, {Fragment} from 'react';
import {Listbox, Transition} from "@headlessui/react";
import { HiChevronUpDown} from "react-icons/hi2";
import { HiCheck } from "react-icons/hi";

const SelectedDateBoat = ({selectedDate, setSelectedDate, data}) => {
    return (
        <div>
            <Listbox value={selectedDate} onChange={setSelectedDate}>
                <div className="relative mt-1 w-72 z-50">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-300/90 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{selectedDate ? (selectedDate.charAt(0).toUpperCase() + selectedDate.toLowerCase().slice(1)) : "Trier par date"}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <HiChevronUpDown
                        className="h-5 w-5 text-black"
                        aria-hidden="true"
                    />            </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <Listbox.Option value="" className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? "bg-gray-200 text-green-500" : "text-black" }`}>
                                {({ selected }) => {
                                    return (
                                        <>
                            <span className={`block truncate ${selectedDate ? "font-medium" : "font-normal"}`}>
                                Toutes les dates
                            </span>
                                            {selected ? ( <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                <HiCheck className="h-5 w-5" aria-hidden="true"/>
                             </span>
                                            ) : null}
                                        </>
                                    );
                                }}
                            </Listbox.Option>
                            {data.find && data.map((date) => {
                                return new Date(date["fields"]["date_passage"]).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
                            }).filter((date, index, self) => {
                                return self.indexOf(date) === index;
                            }).map((date) => (
                                    <Listbox.Option
                                        key={date}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                    ? "bg-gray-200 text-green-600"
                                                    : "text-black"
                                            }`
                                        }
                                        value={date}
                                    >
                                        {({ selected }) => {
                                            return (
                                                <>
                            <span
                                className={`block truncate ${
                                    selectedDate ? "font-medium" : "font-normal"
                                }`}
                            >
                              {date.charAt(0).toUpperCase() + date.toLowerCase().slice(1)}
                            </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600 font-bold">
                    <HiCheck
                        className="h-5 w-5"
                        aria-hidden="true"
                    />
                              </span>
                                                    ) : null}
                                                </>
                                            );
                                        }}
                                    </Listbox.Option>
                                ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default SelectedDateBoat;
