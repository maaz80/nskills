import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ items, selectedItem, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between nav-bgcolor/50 border border-gray-600 px-5 py-4 text-sm font-semibold transition-all duration-300 shadow-lg cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="text-blue-400">{selectedItem.icon}</div>
          <span className="text-white">{selectedItem.name}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            open ? "rotate-180 text-blue-400" : "rotate-0 text-gray-400"
          }`}
        />
      </button>

      {/* Collapsible Dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col border border-gray-600 border-t-0 bg-primary shadow-xl">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelect(item);
                setOpen(false);
              }}
              className={`w-full text-sm text-left px-5 py-4 flex items-center gap-3 hover:nav-bgcolor transition-all duration-300 ${
                item.id === selectedItem.id
                  ? "nav-bgcolor border-l-4 border-white"
                  : ""
              }`}
            >
              <div className="text-blue-400">{item.icon}</div>
              <span className="font-medium text-white">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
