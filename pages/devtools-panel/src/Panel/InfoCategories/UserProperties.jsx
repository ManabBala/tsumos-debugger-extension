import React, { useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';

function UserProperties({ selectedEvent }) {
  const [CategoryHidden, setCategoryHidden] = useState(false);

  return (
    <div>
      <button
        onClick={() => setCategoryHidden(!CategoryHidden)}
        className="flex w-full gap-2 rounded-md bg-gray-300 px-2 py-4">
        {CategoryHidden ? <FaCaretRight size={24} /> : <FaCaretDown size={24} />}
        User Properties
      </button>
      {!CategoryHidden && (
        <div className="max-h-96 overflow-auto">
          <table className="w-full">
            <tbody>
              {selectedEvent &&
                selectedEvent.user_property.map(prop => (
                  <tr key={prop.name} className="border border-gray-300">
                    <td>{prop.name}</td>
                    <td className="text-gray-400">{prop.string_value || prop.int_value}</td>
                    <td className="flex justify-center">
                      <div className="text-sx w-fit rounded-md border border-gray-300 bg-gray-200 px-2 text-sm text-gray-400 shadow-md">
                        {typeof (prop.string_value || prop.int_value)}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserProperties;
