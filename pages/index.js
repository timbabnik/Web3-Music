import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'
import { ethers, BigNumber } from 'ethers';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, serverTimestamp, orderBy, getDoc } from '@firebase/firestore';
import { db } from '../firebase';
import { useRouter } from "next/router";
import Mutest from "./Mutest.json";
import MusicFactory from "./MusicFactory.json";


function Music() {


    const [accounts, setAccounts] = useState("");

    const connectMetamask = () => {
      return new Promise(async (resolve, reject) => {
        if (window.ethereum) {
          try {
            const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccounts(account);
            resolve(account);
          } catch (error) {
            console.error('Error connecting to Metamask: ', error);
            reject('Error connecting to Metamask');
          }
        } else {
          alert('Metamask is not installed. Please install it to continue.');
          reject('Metamask is not installed');
        }
      });
    };
    


      
    
      const timerComponents = [];
    
      

      const [isVisible, setIsVisible] = useState(true);
      const [isPlaying, setIsPlaying] = useState(false);
  const textContainerRef = useRef(null);
  const blurryImageRef = useRef(null);
  const audioRef = useRef(null); // Initialize ref without a value

  const handlePlayMusic = (songUrl) => {
    // If there's already an audio playing and it's the same song, toggle play/pause
    if (audioRef.current && audioRef.current.src === songUrl) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      // If it's a different song, create a new Audio object
      if (audioRef.current) {
        audioRef.current.pause(); // Pause the previous audio if any
      }
      audioRef.current = new Audio(songUrl);
      audioRef.current.play();
      setIsPlaying(true);

      // Add event listener to update the state when the song ends
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = textContainerRef.current.scrollTop;
      const blurAmount = scrollPosition / 50;
      const brightness = Math.max(100 - scrollPosition / 5, 50);
      
      blurryImageRef.current.style.filter = `blur(${blurAmount}px) brightness(${brightness}%)`;
      setIsVisible(scrollPosition <= 100);
    };

    const textContainer = textContainerRef.current;
    textContainer.addEventListener('scroll', handleScroll);

    return () => {
      textContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const [signedMessage, setSignedMessage] = useState('');
  const [account, setAccount] = useState('');

  const signMessage = async () => {
    if (window.ethereum) {
        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        setAccounts(account);
        
    }
    const neki = ethereum.request({method: "personal_sign", params: [accounts[0], "0xf9188b9de4e7b8b1910f6377c101425d0d7f7f8e779c18124c284728be964c88"]})
    const p = Promise.resolve(neki);

          p.then(value => {
            
            console.log(value); // 👉️ "bobbyhadz.com"
          }).catch(err => {
            console.log(err);
          });
  };

  const signMessagee = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      await provider.send("eth_requestAccounts", []); // Request access
      const account = await signer.getAddress();
      setAccount(account);

      const message = "Timo test"; // Plain text message
      const hash = ethers.utils.id(message); // Hash the message if needed

      const signature = await signer.signMessage(message);
      console.log('Signed message:', signature);
      console.log('Hash:', hash);
    } catch (error) {
      console.error('Error signing message:', error.message);
    }
  };
    
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const startProgress = () => {
    // Clear any existing intervals
    clearInterval(intervalRef.current);
    // Set an interval to update the progress
    intervalRef.current = setInterval(() => {
        if (audioRef.current) {
            const { currentTime, duration } = audioRef.current;
            const progress = (currentTime / duration) * 100;
            setProgress(progress);
        }
    }, [1000]); // Update every second
};

// Effect to manage the lifecycle of the audio playback
useEffect(() => {
    if (isPlaying) {
        startProgress();
    } else {
        clearInterval(intervalRef.current);
    }

    // Cleanup on unmount
    return () => {
        clearInterval(intervalRef.current);
    };
}, [isPlaying]);


const Dovv = async () => {
  await addDoc(collection(db, "test"), {
    name: "text"
})};



const [allMusic, setAllMusic] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);
const [titleInput, setTitleInput] = useState("");


useEffect(() => {
  const fetchData = async () => {
    onSnapshot(collection(db, "music"), (snapshot) => {
      const musicData = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setAllMusic(musicData);
    });
  };

  fetchData();
}, []);

const handleClick = () => {
  if (isPlaying) {
    audioRef.current.pause();
    setIsPlaying(false);
  }
  const newIndex = (currentIndex + 1) % allMusic.length;
  setCurrentIndex(newIndex);

  if (allMusic[newIndex] && allMusic[newIndex].data.timestamp) {
    const serverTimestamp = allMusic[newIndex].data.timestamp;
    const targetTime = new Date(serverTimestamp.toDate().getTime() + 3 * 24 * 60 * 60 * 1000);
    setTargetDate(targetTime);
  }

  // Additional logic for changing background and resetting title input
  changeBackground();
  setTitleInput("");
};



const handleClickMobile = () => {
  if (isPlaying) {
    audioRef.current.pause();
    setIsPlaying(false);
  }
  
  // Get the next index
  const newIndex = (currentIndex + 1) % allMusic.length;
  
  // Update the current index
  setCurrentIndex(newIndex);

  // Get the timestamp of the next song and set the target date
  if (allMusic[newIndex] && allMusic[newIndex].data.timestamp) {
    const serverTimestamp = allMusic[newIndex].data.timestamp;
    const targetTime = new Date(serverTimestamp.toDate().getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days later
    setTargetDate(targetTime);
  }

  // Additional logic for changing background and resetting title input
  changeBackground();
  setTitleInput("");

  // Play the next song
  handlePlayMusic(allMusic[newIndex].data.song);
};





// Prejsna verzija handleClick

const handleClickk = () => {
  setCurrentIndex((prevIndex) => (prevIndex + 1) % allMusic.length);
  changeBackground();
  setTitleInput("");
};


const [timeLeft, setTimeLeft] = useState({});

const [targetDate, setTargetDate] = useState(null);

useEffect(() => {
  const fetchMusicData = async () => {
    try {
      const musicCollectionRef = collection(db, 'music');
      const q = query(musicCollectionRef);
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const musicData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }));

        setAllMusic(musicData);

        // Set initial target date
        if (musicData[0] && musicData[0].data.timestamp) {
          const serverTimestamp = musicData[0].data.timestamp;
          const targetTime = new Date(serverTimestamp.toDate().getTime() + 3 * 24 * 60 * 60 * 1000);
          setTargetDate(targetTime);
        }
      } else {
        console.log('No documents in music collection!');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  fetchMusicData();
}, [db]);


const calculateTimeLeft = () => {
    if (!targetDate) return {};

    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
            minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0'),
            seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, '0')
        };
    }

    return timeLeft;
};

useEffect(() => {
    if (targetDate) {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    }
}, [targetDate, timeLeft]);


const [back, setBack] = useState(0);

  const backCol = [
    {
      first: "#6EC8FF",
      second: "#3E91FF",
    },
    {
      first: "#3A8DFF",
      second: "#1E60FF",
    },
    {
      first: "#5CA1FF",
      second: "#336EFF",
    },
    {
      first: "#5DC1FF",
      second: "#1F9AFF",
    },
    {
      first: "#00B0FF",
      second: "#008CFF",
    },
  ];

  const changeBackground = () => {
    if (backCol.length > back + 1) {
      setBack(back + 1);
    } else {
      setBack(0);
    }
  };

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to top, ${backCol[back].first}, ${backCol[back].second})`,
  };

  const router = useRouter();


  const addressss = "0x4d4DdfB01DAa677a04d5c5278A6075A4cf7d804b";

  
  async function testek() {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
  
      setAccounts(account);
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        addressss,
        MusicFactory.abi,
        signer
      );
  
      try {

        const transaction = await contract.keysBalance(accounts[0], accounts[0]);
        console.log(transaction);

      } catch (err) {
        console.log("error: ", err);
      }
    }
  }


  async function collectSmartContract(img, add) {
    console.log("jou");
    if (window.ethereum) {
      
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      
      // Check if it's not Base Sepolia (chain ID 84532 in decimal)
      if (parseInt(chainId, 16) !== 8453) { // Convert chainId to decimal for comparison
        alert("Please switch to the Base network.");
        return; // Exit the function early if the network is incorrect
      }



      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
  
      setAccounts(account);
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        addressss,
        MusicFactory.abi,
        signer
      );
  
      try {
        console.log("a dela=", accounts[0], add);
        const balance = await contract.keysBalance(add, account[0]);
        const getPri = await contract.getBuyPrice(add, 1);
        const priceInEther = getPri.toString();
        console.log("Current keysBalance:", balance.toString());
        console.log("Current price:", (priceInEther / (10 ** 18)).toString());
        console.log(account[0].slice(0, 3))

        const transaction = await contract.buyShares(add, 1, {
          value: priceInEther
        });

        const priceInEtherr = (priceInEther / (10 ** 18)).toString(); 
        
        const receipt = await transaction.wait(); // Wait for the transaction to be mined
        
        console.log("ha?");
            console.log("Transaction confirmed:", receipt.hash);
    
            if (receipt.hash) {
              await addDoc(collection(db, "accounts", add, "history"), {
                value: priceInEtherr,
                name: account[0].slice(0, 3),
                address: account[0],
                buy: true,
                timestamp: serverTimestamp()
            })

            if (account[0] !== add && balance.toString() < 1) {
              await addDoc(collection(db, "accounts", account[0], "myKeys"), {
                image: img,
                address: add
              });
            }
              // Navigate to /profiles/add
              router.push(`/profiles/${add}`);
        
          
              alert("You have bought this artist's key");
            } else {
              console.log("You already have");
            }
        


      } catch (err) {
        console.log("error: ", err);
      }
    }
  }
  
  
  


  const collectKey = async (img, add) => {
    
  
    try {
      const account = await connectMetamask();
  
      // Check if accounts[0] is set before proceeding
      if (!account || !account[0]) {
        console.error('Account is not set.');
        alert('Unable to retrieve account. Please try again.');
        return;
      }
  
      // Proceed with adding the document to the collection
      await addDoc(collection(db, "accounts", account[0], "myKeys"), {
        image: img,
        address: add
      });
  
      // Navigate to /profiles/add
      router.push(`/profiles/${add}`);

  
      alert("You have bought this artist's key");
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  



  const sendTitle = async () => {
    if (window.ethereum) {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      
      // Check if it's not Base Sepolia (chain ID 84532 in decimal)
      if (parseInt(chainId, 16) !== 8453) { // Convert chainId to decimal for comparison
        alert("Please switch to the Base network.");
        return; // Exit the function early if the network is incorrect
      }
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
  
        // Set the account state
        setAccounts(accounts);
  
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const account = await signer.getAddress();
        setAccount(account);
  
        
  
        // Define contract details
        
  
        // Create contract instance
        const contract = new ethers.Contract(
          addressss,
          MusicFactory.abi,
          signer
        );
  
        const add = allMusic[currentIndex].data.address;
  
        // Check balance from smart contract
        const balance = await contract.keysBalance(add, account);
        console.log("Current keysBalance:", balance.toString());
  
        if (balance.toString() > 0) {
          const message = titleInput; // Plain text message
        const hash = ethers.hashMessage(message); // Hash the message if needed
  
        const signature = await signer.signMessage(message);
        console.log('Signed message:', signature);
        console.log('Hash:', hash);
        console.log(allMusic[currentIndex].data.address);
        console.log(accounts[0]);
          // Add document to Firestore
          await addDoc(collection(db, "accounts", allMusic[currentIndex].data.artist, "songTitle"), {
            title: titleInput,
            address: accounts[0],
            signature: signature,
          });
  
          alert("Successfully sent title idea.");
        } else {
          alert("You do not hold any keys for this artist.");
        }
  
      } catch (error) {
        console.error('Error signing message or interacting with smart contract:', error.message);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };


  const handleStopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };
  


const displayTime = `${timeLeft.days || '00'}:${timeLeft.hours || '00'}:${timeLeft.minutes || '00'}:${timeLeft.seconds || '00'}`;

    

  return (
    <div className={styles.backgroundForm}>
        <Link href="/profiles/main">
        <div className="absolute top-5 right-0 left-0 bg-white p-3 rounded-lg mx-7 px-6 sm:w-auto sm:right-5 sm:left-auto flex justify-center items-center">
    <div className="text-sm" style={{ fontFamily: 'Reddit Mono' }}>Upload music</div>
</div>


        </Link>
        <div style={{ fontFamily: 'Reddit Mono', color: "white" }} className="mt-24 text-white text-3xl hidden sm:block">Discover new artists</div>
        <img src="https://i.postimg.cc/15y4pXbG/Group-1-1.png" className="h-12 absolute left-5 top-5 cursor-pointer hidden sm:block" />

       {/* <div className="hidden sm:flex mt-4 overflow-x-auto">
            <img src="https://i.postimg.cc/7LY02nX5/9098818-Coop-Records-Headshot.webp" className="h-14 w-14 border border-white rounded-full mx-2" />
            <img src="https://i.postimg.cc/SRrmCCgK/8138403-new-Image.webp" className="h-14 w-14 rounded-full mx-2 border border-white" />
            <img src="https://i.postimg.cc/pTQvMKbB/3609966-new-Image.webp" className="h-14 w-14 rounded-full mx-2 border border-white" />
            <img src="https://i.postimg.cc/LX9ChPgD/323380-whoinvitedgrady.webp" className="h-14 w-14 rounded-full mx-2 border border-white" />
            <img src="https://i.postimg.cc/PxS6Dqmj/2315205-bennymayne.webp" className="h-14 w-14 rounded-full mx-2 border border-white" />
            <img src="https://i.postimg.cc/Qx96BhC2/700239-1b1b.webp" className="h-14 w-14 rounded-full mx-2 border border-white" />
            <img src="https://i.postimg.cc/DZNrF4r8/7251961-407-ACB8-B-46-F3-4938-AEEB-C9-C2-B8-D90-C83.webp" className="h-14 w-14 border border-white rounded-full mx-2" />
            <img src="https://i.postimg.cc/pTdFNgnG/3366655-new-Image-2.jpg" className="h-14 w-14 rounded-full mx-2 border border-white" />
            <img src="https://i.postimg.cc/J4Z26R8b/5736065-1py-VAGp7-400x400-1.webp" className="h-14 w-14 rounded-full mx-2 border border-white" />
            <img src="https://i.postimg.cc/XYWDttNt/8945629-Coop-Records-Twitter.webp" className="h-14 w-14 rounded-full mx-2 border border-white" />
  </div>*/}
        <div className={styles.form}>
            

        


        <div
      style={backgroundStyle}
      className="relative pt-10 pb-10 sm:pb-24 w-full rounded-2xl flex flex-col sm:flex-row justify-between"
    >
                <div className="absolute bottom-5 right-0 sm:right-5 hidden sm:flex w-full justify-center items-center">
            <div className="hidden sm:block" style={{ width: '90%', height: '2px', backgroundColor: '#ddd', marginLeft: 50, marginRight: 20 }}>
                <div className="progress-bar" style={{ width: `${progress}%`, height: '100%', backgroundColor: 'black' }}></div>
            </div>
    <div className={`w-14 h-12 bg-white cursor-pointer hover:w-16 hover:h-14 transform transition-all rounded-full flex justify-center items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}
         
         onClick={() => handlePlayMusic(allMusic[currentIndex].data.song)}>
           {
             isPlaying ? (
              <img src="https://i.postimg.cc/hGktpVCT/8-Vjj-E5-Logo-Makr.png" className="w-4" />
             ) : (
              <img src="https://i.postimg.cc/13QDBT4V/5yp68q-Logo-Makr.png" className="w-4" />
             )
           }
        
    </div>
    <div className={`w-14 h-12 bg-white cursor-pointer ml-2 hover:w-16 hover:h-14 transform transition-all rounded-full flex justify-center items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}

         onClick={handleClick}>
        <img src="https://i.postimg.cc/7LsGm3pb/3-Xa-YMX-Logo-Makr.png" className="w-4" />
    </div>
    </div>
    <div className="relative mr-0 mt-0 sm:mt-0 sm:mr-0 ml-0">
    
      <div className="relative overflow-hidden ml-8 mr-8 sm:mr-0" style={{ height: 220, borderRadius: 10 }}>
        
        
      {allMusic.length > 0 && (
  <div className="relative w-full h-full">
    {/* The Blurry Image (always visible) */}
    <img 
      ref={blurryImageRef} 
      className="absolute top-0 left-0 w-full h-full object-cover rounded-md" 
      src={allMusic[currentIndex].data.image} 
    />

    {/* Buttons (only visible on small screens) */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center sm:hidden">
      {/* Play/Pause Button */}
      <div 
        className={`w-16 h-16 mr-6 bg-white cursor-pointer  transform transition-all rounded-full flex justify-center items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => handlePlayMusic(allMusic[currentIndex].data.song)}
      >
        {isPlaying ? (
          <img src="https://i.postimg.cc/hGktpVCT/8-Vjj-E5-Logo-Makr.png" className="w-5" />
        ) : (
          <img src="https://i.postimg.cc/13QDBT4V/5yp68q-Logo-Makr.png" className="w-5" />
        )}
      </div>

      {/* Next Button */}
      <div 
        className={`w-16 h-16 bg-white cursor-pointer ml-2 transform transition-all rounded-full flex justify-center items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClickMobile}
      >
        <img src="https://i.postimg.cc/7LsGm3pb/3-Xa-YMX-Logo-Makr.png" className="w-5" />
      </div>
    </div>
  </div>
)}

        
        <div ref={textContainerRef} className="relative overflow-y-scroll h-full justify-center flex" style={{ paddingTop: '100%', width: 220 }}>
       
         
        </div>
      </div>
    </div>

                 <div className="flex ml-0 p-0 w-full flex-col  px-8">
                    
                    
                    <div>
                    <div className="flex mt-0 items-center justify-center">
              
              
                

              
            </div>
            
            <div className="relative group w-full sm:w-full sm:mx-0  p-0 rounded-lg border mt-10 sm:mt-0 cursor-pointer">
                    <div className="absolute bottom-full mb-2 bg-black rounded-lg text-white text-xs p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out hidden group-hover:block">
                    {allMusic[currentIndex]?.data?.title ? "The artist will review all the title suggestions and choose the best one. A person whose title is chosen will receive the first collectible music NFT of that collection." : "Get a chance to get a free limited edition collectable of this song."}
                    </div>
                    <div className="px-3 pt-2">
                        <div className="flex items-center">
                    <div style={{ fontFamily: 'Reddit Mono' }} className="flex flex-col  mt-0 p-0 text-start w-28 bg-[#6ac8ff] justify-center items-center rounded-lg text-white text-sm py-1">

                    
                    <p className="text-xs sm:text-sm">
                    {timeLeft.days !== undefined ? displayTime : "Time's up!"}
           
          </p>
</div>
<div style={{ fontFamily: 'Reddit Mono' }} className="flex flex-col ml-2  mt-0 p-0 text-start px-3 bg-[#064569] justify-center items-center rounded-lg text-white text-sm py-1">

                    
{allMusic.length > 0 && (
      <Link href={`/profiles/${allMusic[currentIndex].data.artist}`} onClick={handleStopMusic}>
      <p className="mt-0 text-xs sm:text-sm">
        {allMusic[currentIndex].data.artist.length > 6 
          ? `${allMusic[currentIndex].data.artist.slice(0, 3)}...${allMusic[currentIndex].data.artist.slice(-3)}` 
          : allMusic[currentIndex].data.artist}
      </p>
    </Link>
      )}
</div>
</div>
        {
          allMusic.length > 0 && (
            <>
              {allMusic[currentIndex].data.title ? (
                <>
                  <div className="flex items-center mt-2">
                        
                  <p className="text-white text-xs sm:text-lg font-semibold mt-1 ml-2">Listen to this song, give it a title, and become a part of the next big hit.</p>
                  
                  </div>
            
              
              
              <div className="p-2">
              <input
                  onChange={(e) => setTitleInput(e.target.value)}
                  value={titleInput}
                  placeholder="Write a title..."
                  className="w-full border-0 border-b border-white bg-transparent p-2 sm:text-sm text-xs placeholder-gray-300 focus:outline-none"
              />
<div onClick={sendTitle} className="bg-gray-700 p-2 hover:bg-black text-xs sm:text-base mt-3 sm:mt-5 text-white rounded-full justify-center flex items-center">
    Send
</div>

              </div>
              </>
              ) : (
                <>
                <div className="flex items-center mt-2">
                        
                {allMusic.length > 0 && (
                    <p className="text-white text-lg font-semibold mt-1 ml-2">
                      {allMusic[currentIndex].data.musicTitle} {/* Adjust this to display the desired data */}
                    </p>
                  )}
                
                </div>
          
                <p className="text-gray-200 text-xs sm:text-base mt-1 ml-2 pb-0">One key holder will receive a one-of-a-kind limited edition of this music collectible.</p>
            <div className="flex items-center p-2 mt-4 border-t border-[#cfcfcf]">
            <p className="p-0 pb-0 font-bold text-white">FREE</p>
            <p className="text-gray-200 text-sm ml-3">0/1 mints</p>
            </div>
            
            
            </>
              )}
            </>
          )
        }
                        

                    
                </div>
                
                </div>

                    </div>
                 </div>
                {/* <div className="relative mr-0 mt-12 sm:mt-0 sm:mr-10 ml-10">
    <div className="aspect-w-1 aspect-h-1 w-56">
        <img src="https://i.postimg.cc/pTdFNgnG/3366655-new-Image-2.jpg" className="h-full w-full rounded-lg object-cover" />
    </div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white cursor-not-allowed hover:w-16 hover:h-16 transition-all rounded-full flex justify-center items-center">
        <img src="https://i.postimg.cc/13QDBT4V/5yp68q-Logo-Makr.png" className="w-4" />
    </div>
  </div>*/}


   
       

            </div>

            




            
           {/* <div className="pt-6 w-full rounded-b-2xl bg-[#8AD7FF] justify-between overflow-scroll h-72 items-center flex flex-col">
                 <div className="w-full justify-between flex items-center">
                     <div className="flex items-center ml-5">
                        <img src="https://i.postimg.cc/pTdFNgnG/3366655-new-Image-2.jpg" className="mt-12 sm:mt-0 sm:mr-0 h-16 w-16 rounded-md" />
                        <div className="ml-4">
                            <p className="font-semibold">Timo fasdf </p>
                            <p className="text-xs text-gray-700">0x1...sdf</p>
                        </div>
                     </div>
                     <p className="mr-4 text-sm text-gray-700">2:13</p>
                 </div>
                 <div className="w-full justify-between mt-6 flex items-center">
                     <div className="flex items-center ml-5">
                        <img src="https://i.postimg.cc/pTdFNgnG/3366655-new-Image-2.jpg" className="mt-12 sm:mt-0 sm:mr-0 h-16 w-16 rounded-md" />
                        <div className="ml-4">
                            <p className="font-semibold">Timo fasdf </p>
                            <p className="text-xs text-gray-700">0x1...sdf</p>
                        </div>
                     </div>
                     <p className="mr-4 text-sm text-gray-700">2:13</p>
                 </div>
                 <div className="w-full justify-between mt-6 flex items-center">
                     <div className="flex items-center ml-5">
                        <img src="https://i.postimg.cc/pTdFNgnG/3366655-new-Image-2.jpg" className="mt-12 sm:mt-0 sm:mr-0 h-16 w-16 rounded-md" />
                        <div className="ml-4">
                            <p className="font-semibold">Timo fasdf </p>
                            <p className="text-xs text-gray-700">0x1...sdf</p>
                        </div>
                     </div>
                     <p className="mr-4 text-sm text-gray-700">2:13</p>
                 </div>
                 <div className="w-full justify-between mt-6 flex items-center mb-6">
                     <div className="flex items-center ml-5">
                        <img src="https://i.postimg.cc/pTdFNgnG/3366655-new-Image-2.jpg" className="mt-12 sm:mt-0 sm:mr-0 h-16 w-16 rounded-md" />
                        <div className="ml-4">
                            <p className="font-semibold">Timo fasdf </p>
                            <p className="text-xs text-gray-700">0x1...sdf</p>
                        </div>
                     </div>
                     <p className="mr-4 text-sm text-gray-700">2:13</p>
                 </div>
</div>*/}
           
            <div  className="mt-10 border-2 border-[#2d3b6b] p-3 rounded-lg">
                <p className="text-white text-xl font-bold">Collect this artist's key</p>
                <p className="text-gray-300 text-sm mt-1">You will get a closer access to their music.</p>
                <div onClick={() => collectSmartContract(allMusic[currentIndex].data.image, allMusic[currentIndex].data.artist)} className="flex">
                    <div className="bg-[#FF69B4] hover:bg-[#e05c9e] cursor-pointer text-white mt-6 h-11 w-full mr-1 justify-center items-center flex rounded-lg">Collect</div>
                    {/*<div className="bg-[#6b3b53] text-white mt-6 h-11 w-28 ml-1 justify-center items-center flex rounded-lg">
                        <img src="https://i.postimg.cc/1zQ4G4c1/4colpr-Logo-Makr.png" className="w-6" />
                    </div>*/}
                </div>
            </div>
           
            <div className="border-b-2 border-[#181f35] mt-12"></div>
            <div className="flex mt-3 flex-wrap items-center justify-center">
                <div className="w-full sm:w-48 h-44 bg-[#161d31] p-4 mt-8 rounded-lg shadow-lg shadow-[#101522]">
                    <img src="https://i.postimg.cc/MG3hVt0H/4zsp-KQ-Logo-Makr.png" className="h-5" />
                    <p className="text-gray-300 text-sm py-2 font-semibold">Early music release</p>
                    <p className="text-xs text-white">You will get access to new music releases by an artist before anyone else and will be able to collect them for free.</p>
                </div>
                <div className="h-44 w-full sm:w-48 sm:mx-10 bg-[#161d31] p-4 mt-8 rounded-lg shadow-lg shadow-[#101522]">
                    <img src="https://i.postimg.cc/3NVBps6L/2v-Buzl-Logo-Makr.png" className="h-5" />
                    <p className="text-gray-300 text-sm py-2 font-semibold">Creative control</p>
                    <p className="text-xs text-white">The artist has the option to give creative control to their key holders and let them pick a title for the next uploaded song.</p>
                </div>
                <div className="h-44 w-full sm:w-48 mx-0 bg-[#161d31] mt-8 p-4 rounded-lg shadow-lg shadow-[#101522]">
                    <img src="https://i.postimg.cc/c13L18Zw/42-Fx1h-Logo-Makr.png" className="h-5" />
                    <p className="text-gray-300 text-sm py-2 font-semibold">Sell your keys</p>
                    <p className="text-xs text-white">The price of keys follows a bonding curve, which means you can sell your key for more if the artist's popularity increases.</p>
                </div>
              
            </div>
            <div>
      
    </div>
            <div className="mb-32"></div>
            {/*<div className="overflow-scroll" style={{height: 400}}>
                <p className="text-[#354272] text-lg py-2"></p>
                <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center">
                        <div className="h-11 w-11 bg-red-900 rounded-full mt-0"></div>
                        <p className="ml-4 text-lg font-bold text-white">Timo</p>
                        <p className="ml-2 text-lg text-gray-200 font-light">received 0.005 eth royalty</p>
                    </div>
                    <p className="text-sm text-gray-600">2h ago</p>
                </div>
                <div className="flex justify-between items-center mt-8">
                    <div className="flex items-center">
                        <div className="h-11 w-11 bg-blue-900 rounded-full mt-0"></div>
                        <p className="ml-4 text-lg font-bold text-white">Timo</p>
                        <p className="ml-2 text-lg text-gray-200 font-light">received limited edition song NFT</p>
                    </div>
                    <p className="text-sm text-gray-600">3h ago</p>
                </div>
                <div className="flex justify-between items-center mt-8">
                    <div className="flex items-center">
                        <div className="h-11 w-11 bg-orange-900 rounded-full mt-0"></div>
                        <p className="ml-4 text-lg font-bold text-white">Timo</p>
                        <p className="ml-2 text-lg text-gray-200 font-light">received 0.001 eth royalty</p>
                    </div>
                    <p className="text-sm text-gray-600">6h ago</p>
                </div>
                <div className="flex justify-between items-center mt-8">
                    <div className="flex items-center">
                        <div className="h-11 w-11 bg-blue-900 rounded-full mt-0"></div>
                        <p className="ml-4 text-lg font-bold text-white">Timo</p>
                        <p className="ml-2 text-lg text-gray-200 font-light">gets credit on NFT</p>
                    </div>
                    <p className="text-sm text-gray-600">12h ago</p>
                </div>
                <div className="flex justify-between items-center mt-8">
                    <div className="flex items-center">
                        <div className="h-11 w-11 bg-yellow-900 rounded-full mt-0"></div>
                        <p className="ml-4 text-lg font-bold text-white">Timo</p>
                        <p className="ml-2 text-lg text-gray-200 font-light">received 0.005 eth royalty</p>
                    </div>
                    <p className="text-sm text-gray-600">13h ago</p>
                </div>
                <div className="flex justify-between items-center mt-8">
                    <div className="flex items-center">
                        <div className="h-11 w-11 bg-yellow-900 rounded-full mt-0"></div>
                        <p className="ml-4 text-lg font-bold text-white">Timo</p>
                        <p className="ml-2 text-lg text-gray-200 font-light">received 0.005 eth royalty</p>
                    </div>
                    <p className="text-sm text-gray-600">13h ago</p>
                </div>
                
                </div>*/}
        </div>


        
       
    </div>
  )
}

export default Music