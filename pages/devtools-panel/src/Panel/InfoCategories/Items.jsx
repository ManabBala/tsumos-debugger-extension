import React, { useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import { CodeBlock, CopyBlock, googlecode } from 'react-code-blocks';

function Items({ items }) {
  const [CategoryHidden, setCategoryHidden] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setCategoryHidden(!CategoryHidden)}
        className="flex w-full gap-2 rounded-md bg-gray-300 px-2 py-4">
        {CategoryHidden ? <FaCaretRight size={24} /> : <FaCaretDown size={24} />}
        Items
      </button>
      {!CategoryHidden && (
        <div className="max-h-96 w-full overflow-auto border">
          {items && (
            // Later use CopyBlock for clipboard
            <CodeBlock
              text={JSON.stringify(items, null, 2)}
              language={'js'}
              showLineNumbers={false}
              wrapLines
              className="w-96"
              theme={googlecode}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Items;
