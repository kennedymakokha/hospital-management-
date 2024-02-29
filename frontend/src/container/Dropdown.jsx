import { useState } from "react";

export default function DropdownComponent(props) {

  const [show, setShow] = useState(false)
  return (
    <div className="inline-flex bg-white  ">
      <div
        href="#"
        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-l-md"
      >
        {props.title}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="inline-flex items-center justify-center h-full px-2 text-gray-600 border-l border-gray-100 hover:text-gray-700 rounded-r-md hover:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div className={`absolute ${show ? "flex" : "hidden"} right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg`}>
          <div className="p-2">
            {props.items.map((item, i) => (
              <div key={i}
                onClick={item.fun}
                className={`block px-4 py-2 capitalize ${props.separator === true ? "pt-10 bg-red-400" : "mt-0"} text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700`}
              >
                {item.title}
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
