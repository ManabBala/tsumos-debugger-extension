import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import Titlebar from './Titlebar';
import { useState } from 'react';
import Overview from './InfoCategories/Overview';
import EventParameters from './InfoCategories/EventParameters';
import UserProperties from './InfoCategories/UserProperties';

const sampleEventData = {
  protocol_version: 1,
  platform: 'android',
  gmp_version: 46000,
  uploading_gmp_version: 19056,
  dynamite_version: 55,
  config_version: 1679644809123456,
  gmp_app_id: '1:123456789:android:aaaaaaaaaa',
  app_id: 'com.my.app',
  app_version: '1.0.0',
  app_version_major: 100,
  firebase_instance_id: 'xx_xxxx_xx',
  dev_cert_hash: -12313123123,
  upload_timestamp_millis: 1681470819289,
  start_timestamp_millis: 1681468977430,
  end_timestamp_millis: 1681469192488,
  previous_bundle_start_timestamp_millis: 1681468790498,
  previous_bundle_end_timestamp_millis: 1681468884140,
  app_instance_id: 'f8s9fa09vsa4a4lk2983fsdf',
  resettable_device_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  limited_ad_tracking: false,
  os_version: 9,
  device_model: 'SM-J530F',
  user_default_language: 'fi-fi',
  time_zone_offset_minutes: 180,
  bundle_sequential_index: 31,
  service_upload: true,
  user_property: [
    {
      set_timestamp_millis: 1631520687985,
      name: 'first_open_time(_fot)',
      int_value: 1631523600000,
    },
    {
      set_timestamp_millis: 1631520687985,
      name: 'first_open_after_install(_fi)',
      int_value: 1,
    },
    {
      set_timestamp_millis: 1681468712345,
      name: 'ga_session_id(_sid)',
      int_value: 1681468788,
    },
  ],
  event: {
    name: 'user_engagement(_e)',
    timestamp_millis: 1681468977430,
    previous_timestamp_millis: 1681468884057,
    param: [
      {
        name: 'ga_event_origin(_o)',
        string_value: 'auto',
      },
      {
        name: 'engagement_time_msec(_et)',
        int_value: 90654,
      },
      {
        name: 'ga_screen_class(_sc)',
        string_value: 'MyViewController',
      },
      {
        name: 'ga_screen_id(_si)',
        int_value: -13918239812398124,
      },
    ],
  },
};

// timestamp to dateObj
const timestampToDate = (timestamp: string) => {
  const date = new Date(timestamp);

  // padding number two three digit
  const pad = (num: number) => (num < 100 ? '0' + num : num);

  const month = date.getMonth() + 1; // Months are zero-indexed
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ms = pad(date.getMilliseconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}:${ms}`;
};

const Panel = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'dark';

  const [initTime] = useState(Date.now());
  const [eventsArr, setEventsArr] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const appendEventArr = event => {
    // TODO: strong type check before appending
    const timeDif = event.event.timestamp_millis - initTime;
    if (timeDif < 0) {
      console.log('old event, time diff: ', timeDif);
      return;
    }

    event.id = event.event.timestamp_millis; // custom id from timestamp
    setEventsArr(prevEventArr => {
      // TODO: TEMP FIX for duplicate events as error in cancelation of "EventsOn"
      const result = prevEventArr.find(old_event => old_event.id === event.id);
      if (!result) return [...prevEventArr, event];
      else return prevEventArr;
    });
    setSelectedEvent(event);
    console.log(`Appending new event with id(${event.id}):`, event);
  };

  const clearEventArr = () => {
    setEventsArr([]);
    setSelectedEvent(null);
  };

  const appendSampleEvent = () => {
    const currentTimeStamp = Date.now();
    const sampleEventDataCopy = { ...sampleEventData };
    sampleEventDataCopy.event.timestamp_millis = currentTimeStamp;
    appendEventArr(sampleEventDataCopy);
  };

  return (
    <main className={`flex h-screen w-screen flex-col items-center`}>
      <section className="flex h-screen w-full flex-col px-2 py-10 xl:px-10">
        <div className="flex justify-center"></div>
        {/* menu bar */}
        <Titlebar clearEventArr={clearEventArr} appendSampleEvent={appendSampleEvent} />

        <div className="mt-[2px] flex gap-1 overflow-auto">
          {/* Left section */}
          <div className="w-1/2 overflow-auto">
            <table className="w-full">
              {/* column's name row */}
              <thead className="sticky top-0 bg-gray-50">
                <tr className="flex justify-between">
                  <td className="flex w-1/3 rounded-md border border-gray-400 bg-violet-100 p-2 text-start">
                    <button>All Events</button>
                  </td>
                  <td className="flex w-1/3 rounded-md border border-gray-400 bg-violet-100 p-2 text-start">
                    <button>Analytics tool</button>
                  </td>
                  <td className="flex w-1/3 rounded-md border border-gray-400 bg-violet-100 p-2 text-start">
                    <button>Date and Time</button>
                  </td>
                </tr>
              </thead>

              {/* events row */}
              {eventsArr.length > 0 && (
                <tbody className="overflow-auto border">
                  {eventsArr.map(event => (
                    <tr
                      key={event.id}
                      onClick={() => {
                        setSelectedEvent(event);
                      }}
                      className={`${event.id == selectedEvent.id ? 'bg-violet-200' : 'hover:bg-violet-100'} flex w-full cursor-pointer justify-between border border-gray-400 py-[2px]`}>
                      <td className="flex w-1/3 items-center justify-center overflow-hidden rounded-md bg-violet-300 py-[6px] text-center">
                        {event.event.name}
                      </td>
                      <td className="flex w-1/3 items-center justify-center overflow-hidden rounded-md py-[6px] text-center">
                        Google Analytics
                      </td>
                      <td className="flex w-1/3 items-center justify-center overflow-hidden rounded-md py-[6px] text-center">
                        {timestampToDate(event.event.timestamp_millis)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>

          {/* Right section */}
          <div className="flex w-1/2 flex-col gap-1 overflow-auto">
            {/* Overview Section */}
            <Overview selectedEvent={selectedEvent} />

            {/* Event Parameters Category */}
            <EventParameters selectedEvent={selectedEvent} />

            {/* User Properties */}
            <UserProperties selectedEvent={selectedEvent} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default withErrorBoundary(withSuspense(Panel, <div> Loading ... </div>), <div> Error Occur </div>);
