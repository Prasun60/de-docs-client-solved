import { useState } from "react";
import "./Display.css";
import { MagnifyingGlass } from "react-loader-spinner";

const Display = ({ contracts, accounts }) => {
  const [data, setData] = useState([]);
  const [startedFetch, setStartedFetch] = useState(false);

  const getdata = async () => {
    setStartedFetch(true);
    console.log("Button clicked");
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    // console.log(Otheraddress)

    setTimeout(async () => {
      try {
        if (Otheraddress) {
          dataArray = await contracts.display(Otheraddress);
          console.log(dataArray);
          setData(dataArray);
        } else {
          console.log(accounts);
          dataArray = await contracts.display(accounts);
          console.log("Fetched data array", dataArray);
          setData(dataArray);
        }
      } catch (e) {
        console.log("hhhhhhhhhhhiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        console.error(e);
        alert("You don't have access");
      } finally {
        setStartedFetch(false);
      }
    }, 1500);
    // console.log(dataArray);
    // const isEmpty = Object.keys(dataArray).length === 0;
    // console.log("Running");
    // if (!isEmpty) {
    //   const str = dataArray.toString();
    //   const str_array = str.split(",");
    //   console.log(str);
    //   console.log("HI");
    //   console.log(str_array);
    //   const images = str_array.map((item, i) => {
    //     return (
    //       <></>
    //       // <a href={item} key={i} target="_blank">
    //       //   <img
    //       //     key={i}
    //       //     src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
    //       //     alt="new"
    //       //     className="image-list"
    //       //   ></img>
    //       // </a>
    //     );
    //   });
    //   setData(images);
    // } else {
    //   alert("No image to display");
    //   console.log("Nope");
    // }
  };

  console.log("data : ", data);
  return (
    <>
      {/* <div className="image-list">{data}</div> */}
      <div className="flex-center flex-col gap-10">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Address"
          className="address px-2.5 py-2 border rounded-md bg-transparent text-slate-300 bg-slate-700 outline-none border-slate-600 shadow-md shadow-black"
        />
        <button
          className={`center button flex-center ${
            startedFetch ? "bg-black border-slate-600" : "bg-green-600"
          } border-2 border-green-600 hover:text-green-400 hover:bg-transparent hover:cursor-pointer px-2.5 py-2 rounded-md`}
          onClick={getdata}
        >
          {startedFetch ? (
            <MagnifyingGlass visible={true} height={40} width={40} />
          ) : (
            "Fetch"
          )}
        </button>
      </div>

        <div className="grid grid-cols-4 gap-10 my-5 border-t-2 pt-10 border-t-slate-700">

      {data.map((item, index) => {
        return (
           <div>
            
            <img src={`${item}`} alt={`Image-${index + 1}`} height={300} width={300} key={index} className="border-2 rounded-lg border-slate-700 shadow-lg shadow-black cursor-pointer hover:-translate-y-5 transition hover:border-indigo-700"/>
          </div>
          
        );
      })}
      </div>
      </div>
    </>
  );
};
export default Display;
