import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";

const Card = ({ supplier, openModal, handleDeleteClick }) => {
  return (
    <div key={supplier.id} className="group relative w-full sm:w-80 m-2">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-black shadow-2xl ">
        <div className="relative rounded-2xl bg-slate-100 p-6">
          <h3 className="text-xl font-medium normal-case tracking-wider text-blue-800">
            {supplier.name}
          </h3>

          <div className="relative">
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-black">
                {supplier.stockType}
              </span>
            </div>
            <p className="mt-2 text-md text-slate-700">
              <span className="font-semibold">Address:</span> {supplier.address}
            </p>
            <div className="mt-2">
              <p className="text-lg text-slate-700 font-semibold">Contact:</p>
              <div className="flex flex-col gap-2">
                {supplier?.contacts.map((contact, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-md text-slate-700 ml-[10px]">
                      {contact}
                    </span>
                    <a
                      href={`tel:${contact}`}
                      className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                    >
                      <FiPhoneCall />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <p className="text-md text-slate-700">
                <span className="font-semibold">Email:</span> {supplier.email}
              </p>
              <a
                href={`mailto:${supplier.email}`}
                className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              >
                <MdOutlineMailOutline />
              </a>
            </div>
          </div>

          <div className="flex mt-8">
            <div className="relative w-fit mr-3">
              <button
                onClick={() => {
                  handleDeleteClick(supplier.id);
                }}
                className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-red-700 to-[#E91E63] p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset] cursor-pointer"
              >
                <div className="relative rounded-xl bg-slate-950/50 px-4 py-3 transition-colors group-hover/btn:bg-transparent">
                  <span className="relative flex items-center justify-center gap-2 text-xl">
                    Delete
                  </span>
                </div>
              </button>
            </div>
            <div className="relative w-full">
              <button
                onClick={() => openModal(supplier)}
                className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#43de5d] to-[#4ae464] p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset] cursor-pointer"
              >
                <div className="relative rounded-xl bg-green px-4 py-3 transition-colors group-hover/btn:bg-transparent">
                  <span className="relative flex items-center justify-center gap-2 text-xl">
                    Edit
                    <svg
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    >
                      <path
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
