import React, { useEffect, useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import Items from './Items';

function EventParameters({ selectedEvent }) {
  const [CategoryHidden, setCategoryHidden] = useState(false);
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (!selectedEvent) return;
    const items = selectedEvent.event.param.find(prop => prop.name === 'items');
    if (items) {
      setItems(items);
    } else setItems(null);
  }, [selectedEvent]);

  return (
    <div>
      <button
        onClick={() => setCategoryHidden(!CategoryHidden)}
        className="flex w-full gap-2 rounded-md bg-gray-300 px-2 py-4">
        {CategoryHidden ? <FaCaretRight size={24} /> : <FaCaretDown size={24} />}
        Event Parameters
      </button>
      {!CategoryHidden && (
        <div className="max-h-96 overflow-auto">
          <table className="w-full">
            <tbody>
              {selectedEvent &&
                selectedEvent.event.param.map(prop => (
                  <tr key={prop.name} className="border border-gray-300">
                    <td>{prop.name}</td>
                    <td className="text-gray-400">{prop.string_value || prop.int_value}</td>
                    <td className="flex justify-center">
                      <div className="w-fit rounded-md border border-gray-300 bg-gray-200 px-2 text-sm text-gray-400 shadow-md">
                        {typeof (prop.string_value || prop.int_value)}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {items && (
        <div className="mt-1">
          <Items items={items} />
        </div>
      )}
    </div>
  );
}

export default EventParameters;
