import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { GrCircleQuestion } from 'react-icons/gr';
import { AiOutlineSetting } from 'react-icons/ai';
import { TbWorld } from 'react-icons/tb';

function Titlebar({ clearEventArr, appendSampleEvent }) {
  const goTsumosSite = () => chrome.tabs.create({ url: 'https://tsumos.com' });

  return (
    <div className="flex w-full items-center justify-between bg-violet-200 px-3 py-[6px]">
      {/* Logo */}
      <button className="text-lg font-medium text-violet-600" onClick={goTsumosSite}>
        TSUMOS
      </button>
      <div className="flex items-center text-gray-900">
        <button
          onClick={appendSampleEvent}
          className="mx-1 rounded-md bg-violet-300 px-6 py-[6px] font-medium hover:bg-violet-500">
          Append Dummy Data
        </button>
        <button onClick={clearEventArr} className="rounded-sm p-1 hover:bg-violet-300">
          <FiTrash2 size={24} />
        </button>
        <div className="rounded-sm p-1 hover:bg-violet-300">
          <AiOutlineSetting size={24} />
        </div>
        <div className="rounded-sm p-1 hover:bg-violet-300">
          <TbWorld size={24} />
        </div>
        <div className="rounded-sm p-1 hover:bg-violet-300">
          <GrCircleQuestion size={24} />
        </div>
      </div>
    </div>
  );
}

export default Titlebar;
