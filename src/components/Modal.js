import { useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".accessaddress").value.trim();
    console.log("access address : ", address);
    await contract.allow(address);
    setModalOpen(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <>
      <div className="h-screen w-screen fixed flex-center bg-slate-800/70 text-black">
        <div className="flex-center flex-col gap-10 bg-slate-700 px-8 py-7 rounded-lg shadow-lg shadow-black w-2/5">
          <h1 className="text-4xl border-b-2 border-slate-600 w-full bg-gradient-to-tr from-blue-500 via-violet-500 to-violet-500 bg-clip-text text-transparent">
            Share With
          </h1>
          <div className="body w-full">
            <input
              type="text"
              className="px-3 text-white py-2 rounded bg-transparent outline-none bg-slate-600 w-full border border-slate-500"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm w-full">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="selectNumber" className="text-slate-300">
                Select User
              </label>
              <select
                name="selectNumber"
                id="selectNumber"
                className="address bg-black rounded-md border-2 shadow-md shadow-cyan-800 border-cyan-800 px-1.5 py-2 mb-4 cursor-pointer text-cyan-500 outline-none h-fit w-full"
              >
                <option className="w-full">People With Access</option>
              </select>
            </div>
          </form>
          <div className="flex items-center justify-between w-full text-sm">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              className="bg-red-500 border-2 border-red-500 hover:text-red-400 hover:bg-transparent cursor-pointer px-2.5 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => sharing()}
              className="bg-green-500 border-2 border-green-500 hover:text-green-400 hover:bg-transparent cursor-pointer px-2.5 py-2 rounded"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
