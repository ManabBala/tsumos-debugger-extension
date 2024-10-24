import React, { useEffect, useState } from 'react';

function Overview({ selectedEvent }) {
  const [sessionId, setSessionId] = useState(null);
  const [sessionNumber, setSessionNumber] = useState(null);

  const setSessionInfo = () => {
    const userProperties = selectedEvent.user_property || [];
    const sessionIdProperty = userProperties.find(prop => prop.name === 'ga_session_id(_sid)');
    setSessionId(sessionIdProperty.int_value);

    const sessionNumberProperty = userProperties.find(prop => prop.name === 'ga_session_number(_sno)');
    setSessionNumber(sessionNumberProperty?.int_value || 'null');
  };

  useEffect(() => {
    if (!selectedEvent) return;
    setSessionInfo();
  });

  return (
    <div className="rounded-md border border-gray-300">
      <div className="rounded-t-md bg-violet-100 px-3 py-2">Overview</div>
      {selectedEvent && (
        <div className="flex flex-wrap text-sm">
          <div className="flex w-full justify-between border border-gray-400 px-4 py-2 md:w-1/2">
            <div>Session Id</div>
            <div className="text-gray-400">{sessionId}</div>
          </div>
          <div className="flex w-full justify-between border border-gray-400 px-4 py-2 md:w-1/2">
            <div>Session Number</div>
            <div className="text-gray-400">{sessionNumber}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Overview;
