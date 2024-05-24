import React, { useState, useEffect } from "react";

const DropdownSiel = ({ data }) => {
  const [zsmAvailable, setZsmAvailable] = useState(false);
  const [asmAvailable, setAsmAvailable] = useState(false);
  const [rmmAvailable, setRmmAvailable] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");

  useEffect(() => {
    if (data?.zsm && data?.zsm.length > 0) setZsmAvailable(true);
    if (data?.asm && data?.asm.length > 0) setAsmAvailable(true);
    if (data?.rmm && data?.rmm.length > 0) setRmmAvailable(true);
  }, [data]);

  const handleSelect = (event) => {
    setSelectedEmail(event.target.value);
  };

  return (
    <div>
      {zsmAvailable && (
        <div>
          <label>Select ZSM</label>
          <select onChange={handleSelect}>
            {data.zsm.map((person) => (
              <option key={person.id} value={person.email}>
                {person.email}
              </option>
            ))}
          </select>
        </div>
      )}
      {asmAvailable && (
        <div>
          <label>Select ASM</label>
          <select onChange={handleSelect}>
            {data.asm.map((person) => (
              <option key={person.id} value={person.email}>
                {person.email}
              </option>
            ))}
          </select>
        </div>
      )}
      {rmmAvailable && (
        <div>
          <label>Select RMM</label>
          <select onChange={handleSelect}>
            {data.rmm.map((person) => (
              <option key={person.id} value={person.email}>
                {person.email}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedEmail && <p>Selected Email: {selectedEmail}</p>}
    </div>
  );
};

export default DropdownSiel;
