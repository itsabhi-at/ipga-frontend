import React, { useState } from "react";
import { FaAngleDown, FaAngleRight, FaMinus, FaPlus } from "react-icons/fa";

const AccordionItem = ({
  index,
  title,
  content,
  selected,
  onSelectAll,
  onSelectItem,
  isOpen,
  onToggleAccordion,
  id,
}) => {
  const handleTitleCheckboxChange = () => {
    onSelectAll(title, id);
  };

  const handleContentCheckboxChange = (itemId) => {
    onSelectItem(title, itemId, id);
  };

  return (
    <div
      className={`accordion-item ${
        isOpen ? "bg-white" : "bg-white"
      } p-4 pl-0 transition-all border-b mb-2 `}
    >
      <div
        className={`accordion-header ${
          isOpen ? "" : ""
        } py-2 flex items-center justify-between`}
      >
        <div className="flex w-full gap-0">
          {/* <input
            type="checkbox"
            checked={selected.all}
            onChange={handleTitleCheckboxChange}
            className="mr-4"
          /> */}
          <button
            onClick={() => onToggleAccordion(index)}
            className="accordion-title text-[15px] text-[#333] font-medium w-full text-left"
          >
            {title}
          </button>
        </div>
        {isOpen ? (
          <div
            onClick={() => onToggleAccordion(index)}
            className=" cursor-pointer text-[11px] bg-[#3461FF] p-[4px] text-white rounded-full"
          >
            <FaMinus />
          </div>
        ) : (
          <div
            onClick={() => onToggleAccordion(index)}
            className=" cursor-pointer text-[11px] bg-[#3461FF] p-[4px] text-white rounded-full"
          >
            <FaPlus />
          </div>
        )}
      </div>
      {isOpen && (
        <div className="accordion-content my-4 text-[14px] text-gray-600">
          {content.map((item) => (
            <div key={item.id} className="mt-2">
              {/* <input
                type="checkbox"
                checked={selected.items.includes(item.id)}
                onChange={() => handleContentCheckboxChange(item.id)}
                className="mr-4"
              /> */}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Accordion = ({ items, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const handleSelectAll = (title, id) => {
    const selectedItemIndex = selectedItems.findIndex(
      (item) => item.title === title
    );
    let updatedSelectedItems = [...selectedItems];

    if (selectedItemIndex !== -1) {
      updatedSelectedItems.splice(selectedItemIndex, 1);
    } else {
      updatedSelectedItems.push({
        title,
        id,
        all: true,
        items: items
          .find((item) => item.title === title)
          .content.map((item) => item.id),
      });
    }

    setSelectedItems(updatedSelectedItems);
    onSelectionChange(updatedSelectedItems);
  };

  const handleSelectItem = (title, itemId, id) => {
    const selectedItem = selectedItems.find((item) => item.title === title);
    let updatedSelectedItems = [...selectedItems];
    const content = items.find((item) => item.title === title).content;
    if (selectedItem) {
      if (selectedItem.items.includes(itemId)) {
        selectedItem.items = selectedItem.items.filter((id) => id !== itemId);
      } else {
        selectedItem.items.push(itemId);
      }
      selectedItem.all = selectedItem.items.length === content.length;

      if (selectedItem.items.length === 0) {
        // Remove the item from selectedItems if it becomes empty
        updatedSelectedItems = updatedSelectedItems.filter(
          (item) => item.title !== title
        );
      }
    } else {
      updatedSelectedItems.push({
        title,
        id,
        all: false,
        items: [itemId],
      });
    }

    setSelectedItems(updatedSelectedItems);
    onSelectionChange(updatedSelectedItems);
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion transition-all">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          index={index}
          title={item.title}
          id={item.id}
          content={item.content}
          selected={
            selectedItems.find((selected) => selected.title === item.title) || {
              all: false,
              items: [],
            }
          }
          onSelectAll={handleSelectAll}
          onSelectItem={handleSelectItem}
          isOpen={openIndex === index}
          onToggleAccordion={toggleAccordion}
        />
      ))}
    </div>
  );
};

export default Accordion;
