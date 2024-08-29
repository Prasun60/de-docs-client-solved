import Upload from "./contracts/Upload.sol/Upload.json";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";
// import Modal from "./components/Modal"
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import { DNA, Oval } from "react-loader-spinner";

function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [modal, setModal] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const particlesInit = useCallback(async (main) => {
    console.log(main);
    // Custom particles settings
    await loadFull(main); // Load full tsparticles package
  }, []); // Used useCallback to optimize rendering

  const options = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          area: 700,
        },
      },
      color: {
        value: ["#2EB67D", "#ECB22E", "#E01E5B", "#b83df6"],
      },
      shape: {
        type: "triangle",
      },
      opacity: {
        value: 1,
      },
      size: {
        value: { min: 1, max: 5 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#c6c4c7",
        opacity: 0.25,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outModes: "out",
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 1,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setIsFirstLoad(false);
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const loadProvider = async () => {
        if (provider) {
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          window.ethereum.on("accountChanged", () => {
            window.location.reload();
          });
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              setAccount(accounts[0]);
            } else {
              setAccount(""); // No account connected
            }
          });
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          let contractAddress = "0xF2CBFB7aa5a87A109E8bcf5a5FD0AD62CfE37665";

          const contract = new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          );
          console.log("contract communication successsssssssssssss");
          console.log(contract);
          setContract(contract);
          setProvider(provider);
        } else {
          console.error("Metamask not installed");
        }
      };
      provider && loadProvider();
    }, 2000);
  }, []);

  useEffect(() => {
    if (contract) {
      console.log("contract exisstttttttttttttttttttt");
      contract
        .display("0xE8Dc9F3cecc1E7DD7737001f1987cc2813246A93")
        .then((result) => console.log(result)) // Convert BigNumber to string
        .catch((error) => console.error("Error:", error));
    }
  }, [contract]);

  return (
    <>




      <div className="App bg-slate-900 min-h-screen max-w-screen text-white py-5">

        {isFirstLoad ? (
          <>
            <div className="flex-center w-full h-full">
              <Oval visible={true} height={50} width={50} color="violet" />
            </div>
          </>
        ) : (
          <div className="w-full min-h-screen">
            <Particles options={options} init={particlesInit} />
            <div className="flex items-center justify-around w-full min-h-screen flex-col gap-16">
              <div className="flex-center flex-col gap-1">
                <h1 className="lg:text-7xl border-b-2 border-b-slate-600 pb-0.5 bg-gradient-to-tr from-fuchsia-500 via-green-400 to-fuchsia-500 bg-clip-text text-transparent w-fit">
                  De-Share
                </h1>
                <p className="text-slate-400 text-sm">
                  A decentralized image sharing platform
                </p>
              </div>
              <div className="border-2 lg:rounded-lg p-5 bg-slate-800 border-slate-700 shadow-xl shadow-black flex flex-col">
                <p className="text-3xl flex flex-col w-full gap-4">
                  <span className="border-b-2 border-b-slate-700 pb-1">
                    Account
                  </span>
                  <span className="bg-gradient-to-br from-purple-500 from-20% via-orange-500 to-purple-500 bg-clip-text text-transparent w-fit">
                    {account ? account : "Not Connected"}
                  </span>
                </p>
              </div>
              <FileUpload
                accounts={account}
                providers={provider}
                contracts={contract}
              />
              <Display contracts={contract} accounts={account} />
              {/* <div style={{"background":"white"}}> */}
              {!modalOpen && (
                <button className="share" onClick={() => setModalOpen(true)}>
                  Share
                </button>
              )}
              {modalOpen && (
                <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
              )}
              {/* </div> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default App;
