import React, { useState } from 'react'
import LocRemConfirm from './LocRemConfirm';

const DeleteButton = ({location}) => {
    const [confirm, setConfirm] = useState(false);
    return (
      <td className="border border-slate-300  px-4">
        <button
          className="border-2 border-rose-600 px-2 rounded-md text-[#dc2626] hover:bg-[#dc2626] hover:text-white"
          onClick={() => setConfirm(true)}
        >
          Delete
        </button>
        <LocRemConfirm
        open={confirm}
        onClose={() => setConfirm(false)}
        id = {location._id}
        />
      </td>
    );
}

export default DeleteButton