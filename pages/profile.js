import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { addDoc, collection, onSnapshot, getDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase'; // adjust the path to your firebase configuration
import { create } from 'ipfs-http-client';



function Profile() {

    const [selected, setSelected] = useState([{}]);
    const [switchh, setSwitchh] = useState(false);
    const [upload, setUpload] = useState(false);
    const [uploadSong, setUploadSong] = useState(false);
    const [selectedtwo, setSelectedtwo] = useState(false);
    const [accounts, setAccounts] = useState("");
    const [percentage, setPercentage] = useState("");

    const [allKeys, setAllKeys] = useState([]);

    const fileInputRefAvatar = useRef(null); // Ref for image file input
    const fileInputRefAvatarTwo = useRef(null); // Ref for image file input
  const fileInputRefSong = useRef(null);
    

    const category = ["Top", "Earliest"];


    const switchstate = (id, desc, img) => {
        setSelected([{
            title: id,
            description: desc,
            image: img 
        }]);
        setSwitchh(!switchh);
    }

    const selectGift = (id, desc, img) => {
        setSelected({
            title: id,
            description: desc,
            image: img 
        });
        setSelectedtwo(true);
    }


    const connectMetamask = async() => {
        if (window.ethereum) {
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            setAccounts(account);
            
        }

        
      }




    const gifts = [{
        id: 1,
        title: "Title for this song",
        desc: "Let your collectors name the song you are going to upload. Choose from the best title idea that you are going to get.",
        first: "https://i.postimg.cc/dQ9qpfTp/5-E62yk-Logo-Makr.png",
        second: "https://i.postimg.cc/c13L18Zw/42-Fx1h-Logo-Makr.png",
        marginRight: 10
    }, {
        id: 2,
        title: "Limited edition",
        desc: "Send one of your collectors a limited edition collectable NFT of the uploaded song.",
        first: "https://i.postimg.cc/j2WTCyTf/1-Bf3-Am-Logo-Makr.png",
        second: "https://i.postimg.cc/FHztR2c8/5g-Wsnx-Logo-Makr.png",
        marginLeft: 10
    }]


    const [allGift, setAllGift] = useState([]);


    const addGift = () => {
        // Create a copy of the current allGift array
       

        setAllGift([...allGift, {name: "fasdf"}])
    }



    const sendGift = () => {
        const updatedGifts = [...allGift];
    // Push the new gift object into the copied array
        updatedGifts.push(selected);
        // Update the state with the new array
        setAllGift(updatedGifts);
        setUpload(false);
        setAllGift([...allGift, selected])
    }


    const [avatarUrl, setAvatarUrl] = useState('');
    const [avatarUrlTwo, setAvatarUrlTwo] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileTwo, setSelectedFileTwo] = useState(null);
    const [selectedFileThree, setSelectedFileThree] = useState(null);




   const projectId = '2JyR9CgkNwhqTpEUk0SMTqE733d';
  const projectSecret = '0f85d5460bbafd3f2aa6b79ceb46b03a';
  const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  
  const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
  authorization: auth,
  },
  });


    

const handleAvatarChange = async (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = async () => {
    // Upload the image to IPFS
    try {
      const added = await ipfs.add(reader.result);
      const ipfsUrl = `https://ipfs.infura.io/ipfs/${added.path}`;

      // Set the avatar URL to the IPFS URL of the uploaded image
      setAvatarUrl(ipfsUrl);
      console.log(ipfsUrl);
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
    }
  };

  if (file) {
    reader.readAsArrayBuffer(file); // Read the file as ArrayBuffer for IPFS upload
    setSelectedFile(file);
  }
};


const handleAvatarChangeTwo = async (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = async () => {
    // Upload the image to IPFS
    try {
      const added = await ipfs.add(reader.result);
      const ipfsUrl = `https://ipfs.infura.io/ipfs/${added.path}`;

      // Set the avatar URL to the IPFS URL of the uploaded image
      setAvatarUrlTwo(ipfsUrl);
      console.log(ipfsUrl);
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
    }
  };

  if (file) {
    reader.readAsArrayBuffer(file); // Read the file as ArrayBuffer for IPFS upload
    setSelectedFile(file);
  }
};


    const handleAvatarContainerClick = () => {
        fileInputRefAvatar.current.click();
      };


    const handleAvatarContainerClickTwo = () => {
      fileInputRefAvatarTwo.current.click();
    };
    
      const handleSongContainerClick = () => {
        fileInputRefSong.current.click();
      };


    const [songUrl, setSongUrl] = useState('');
  

    const handleSongChange = async (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = async () => {
        try {
          const added = await ipfs.add(reader.result);
          const ipfsUrl = `https://ipfs.infura.io/ipfs/${added.path}`;
          setSongUrl(ipfsUrl);
          console.log(ipfsUrl);
        } catch (error) {
          console.error('Error uploading file to IPFS:', error);
        }
      };
  
      if (file) {
        reader.readAsArrayBuffer(file);
        setSelectedFileTwo(file);
      }
    };

  const handleContainerClickk = () => {
    // Trigger click on the file input when the container is clicked
    fileInputReff.current.click();
  };


  



      const calculateTimeLeft = () => {
        const difference = +new Date("2025-05-30T23:11:00") - +new Date();
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
    
      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    
      useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
    
        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
      });
    
      const timerComponents = [];
    
      const displayTime = `${timeLeft.days || '00'}:${timeLeft.hours || '00'}:${timeLeft.minutes || '00'}:${timeLeft.seconds || '00'}`;

      const [isVisible, setIsVisible] = useState(true);
      const [isPlaying, setIsPlaying] = useState(false);
  const textContainerRef = useRef(null);
  const blurryImageRef = useRef(null);
  const audioRef = useRef(null); // Initialize ref without a value

  useEffect(() => {
    // Create the Audio object inside useEffect to ensure it's client-side
    audioRef.current = new Audio('https://ipfs.io/ipfs/QmTDjdgpsyzMAQN3dCY8tmbHKA7EEqrj9VdrE8cbV3152i');
  }, []);

  const handlePlayMusic = () => {
    if (!audioRef.current) return; // Guard clause in case the audio isn't initialized

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying); // Toggle play state
  };

 

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

      const message = "Name of the song"; // Plain text message
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



const [uploadCountdown, setUploadCountdown] = useState(false);
const [selectedTitle, setSelectedTitle] = useState(false);
const [spotifyLink, setSpotifyLink] = useState("");




const uploadImageAndData = async () => {
  if (!selectedFile && !selectedFileTwo) {
    console.log('No file selected');
    return;
  }

  try {
    // Upload the image to Firebase Storage
    const storageRef = ref(storage, `images/${selectedFile.name}`);
    await uploadBytes(storageRef, selectedFile);
    const imageUrl = await getDownloadURL(storageRef);

    const mp3StorageRef = ref(storage, `songs/${selectedFileTwo.name}`);
    await uploadBytes(mp3StorageRef, selectedFileTwo);
    const mp3Url = await getDownloadURL(mp3StorageRef);


    // Add the data to Firestore
    await addDoc(collection(db, "test"), {
      imageUrl: avatarUrl,
      songUrl: songUrl,
      title: "",
      type: selected.title
    });

    console.log('Document successfully written!');
  } catch (error) {
    console.error('Error writing document: ', error);
  }
};






const imageObject = {
  name: spotifyLink,
  image: avatarUrl,
  animation_url: songUrl,
}

const imageObjectTwo = {
  name: spotifyLink,
  image: avatarUrlTwo,
  animation_url: songUrl,
}


const [getCountdown, setGetCountdown] = useState([]);
const [getSongTitle, setGetSongTitle] = useState([]);
const [getMySongs, setGetMySongs] = useState([]);

useEffect(() => {

  const fetchData = async () => {

    onSnapshot(collection(db, "accounts", accounts[0], "countdown"),
  
    (snapshot) => setGetCountdown(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))

  };

 
  if (accounts) {
    fetchData();
  }
  
}, [accounts])


useEffect(() => {

  const fetchData = async () => {

    onSnapshot(collection(db, "accounts", accounts[0], "songTitle"),
  
    (snapshot) => setGetSongTitle(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))

  };

 
  if (accounts) {
    fetchData();
  }
  
}, [accounts])


useEffect(() => {

  const fetchData = async () => {

    onSnapshot(collection(db, "accounts", accounts[0], "mySongs"),
  
    (snapshot) => setGetMySongs(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))

  };

 
  if (accounts) {
    fetchData();
  }
  
}, [accounts])




const addIpfs = async () => {
  if (getCountdown.length > 0) {
    alert("jfou");
  } else {
    await addDoc(collection(db, "accounts", accounts[0], "countdown"), {
      imageUrl: avatarUrl,
      songUrl: songUrl,
      limited: false,
      timestamp: serverTimestamp()
    });
  }
}




const addLimited = async () => {
  if (getCountdown.length > 0) {
    alert("jou");
  } else {
    try {
      // Add imageObject and imageObjectTwo to IPFS
      const result = await ipfs.add(JSON.stringify(imageObject));
      const resultTwo = await ipfs.add(JSON.stringify(imageObjectTwo));
      console.log(`https://ipfs.infura.io/ipfs/${result.path}`);
  
      // Add the document to Firestore with a timestamp
      await addDoc(collection(db, "accounts", accounts[0], "countdown"), {
        imageTitle: `https://ipfs.infura.io/ipfs/${result.path}`,
        imageLimited: `https://ipfs.infura.io/ipfs/${resultTwo.path}`,
        title: spotifyLink,
        limited: true,
        timestamp: serverTimestamp()
      });
  
      console.log("Document added with timestamp");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  
};




useEffect(() => {

  const fetchData = async () => {

    onSnapshot(collection(db, "myKeys"),
  
    (snapshot) => setAllKeys(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))

  };

 
    fetchData();
  
}, [])



const [myMusic, setMyMusic] = useState([]);


useEffect(() => {

  const fetchData = async () => {

    onSnapshot(collection(db, "myMusic"),
  
    (snapshot) => setMyMusic(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))

  };

 
    fetchData();
  
}, [])



const [profile, setProfile] = useState(false);
const [getKeysMusic, setGetKeysMusic] = useState([]);



const getKeysProfile = async (id) => {
      console.log(id);
      setProfile(true);

      

      onSnapshot(collection(db, "myKeys", id, "allMusic"),
      
        (snapshot) => setGetKeysMusic(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
      }))))
    
    
      
      
}

    

  return (
    <div className={styles.backgroundForm}>
      <div onClick={() => setProfile(false)} className="absolute top-10 right-5 bg-white p-3 rounded-lg px-6 cursor-pointer">
            <div className="text-sm" style={{ fontFamily: 'Reddit Mono' }}>Your profile</div>
        </div>
      {
        selectedTitle && (
          <div  className={styles.modaloverlay}>
            <div style={{backgroundColor: "#121728", paddingTop: 30, paddingLeft: 30, paddingRight: 30}} className={styles.modalConte}>
            <img onClick={() => setSelectedTitle(false)} src="https://i.postimg.cc/V6Xtb0FJ/0-JZes-U-Logo-Makr.png" className={`absolute cursor-pointer top-5 right-5 w-8 justify-center items-center flex`}/>
            <div className="relative pt-10 mt-0 pb-10 w-full rounded-2xl bg-gradient-to-t from-[#4abdff] to-[#00A3FF] flex flex-col sm:flex-row justify-between ">
                <div className="absolute bottom-5 right-5 flex w-full justify-center items-center">
           
    
    </div>
    <div className="relative mr-0 mt-12 sm:mt-0 sm:mr-0 ml-0">
    
      <div onClick={handlePlayMusic} className="relative overflow-hidden cursor-pointer ml-8 mr-8 sm:mr-0" style={{ height: 155, width: 155,borderRadius: 10 }}>
        <img ref={blurryImageRef} className="absolute top-0 left-0 w-full h-full object-cover rounded-md" src="https://i.postimg.cc/xTQmD2kW/3366655-new-Image-2.jpg" />
        

        
        <div ref={textContainerRef} className="relative overflow-y-scroll h-full justify-center flex" style={{ paddingTop: '100%', width: 220 }}>
        <div className="w-24 sm:w-24 h-24 p-4 mt-8 rounded-lg shadow-lg border cursor-pointer mb-16">
                    <img src="https://i.postimg.cc/MG3hVt0H/4zsp-KQ-Logo-Makr.png" className="h-5" />
                    <p className="text-white text-xs py-2 font-semibold">First listener</p>
                    
                </div>
         
        </div>
      </div>
    </div>

                 <div className="flex ml-0 p-0 w-full flex-col  px-8">
                    
                    
                    <div>
                    <div className="flex mt-0 items-center justify-center">
              
              
                

              
            </div>
            
            <div className="relative group w-full sm:w-full sm:mx-0  p-0 rounded-lg border mt-10 sm:mt-0 cursor-pointer">
                    
                    <div className="px-3 pt-2">
                        <div className="flex items-center">
                    
<div style={{ fontFamily: 'Reddit Mono' }} className="flex flex-col ml-0  mt-0 p-0 text-start px-3 bg-[#064569] justify-center items-center rounded-lg text-white text-sm py-1">

                    
<p className="mt-0">Artist: Timow</p>
</div>
</div>
                        <div className="flex items-center mt-2">
                        
                        <p className="text-white text-lg font-semibold mt-1 ml-2">Title of the sosng</p>
                        
                        </div>
                  
                    </div>
                    
                    <div className="p-2">
 
                   <div className="bg-gray-700 p-2 hover:bg-black text-white rounded-full mt-5 justify-center flex items-center">Collect</div>
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

                <p className="text-white text-center text-sm px-10 mt-10">By clicking "Yes," you will choose "Title" as the title of your song and send the first NFT edition to the address that suggested this title idea.</p>
                <div className="bg-blue-500 text-white rounded-lg px-10 py-3 mt-8 cursor-pointer hover:bg-blue-600">Yes</div>
              </div>
            </div>
        )
      }
      
        {upload && (
          <div  className={styles.modaloverlay}>
            <div style={{backgroundColor: "#121728", paddingTop: 30, paddingLeft: 30, paddingRight: 30}} className={styles.modalcontentt}>
            <div className="p-0 w-full relative">
    <div className="flex items-center">
        <img src="https://i.postimg.cc/7LY02nX5/9098818-Coop-Records-Headshot.webp" className="h-20 rounded-lg" />
        <div className="ml-5">
            <p className="text-white text-sm font-bold">Timoo fsadfa</p>
            <p className="text-gray-300 text-xs mt-1">0x324...fas3</p>
        </div>
    </div>
    <div className="border-b-2 border-[#181f35] mt-8 w-full"></div>
    <div className="flex items-center">
        {gifts.map((data, index) => {
            return (
                <div onClick={() => selectGift(data.title, data.desc, data.second)} key={index} style={{marginLeft: data.marginLeft, marginRight: data.marginRight}} className={`h-44 mx-0 w-1/2 cursor-pointer ${selected.title == data.title ? "border" : null}  border-blue-300 bg-[#161d31] p-4 mt-8 rounded-lg shadow-lg shadow-[#101522]`}>
                    <img src={` ${selected.title == data.title ? data.first : data.second}`} className="h-5" />
                    <p className={`${selected.title == data.title ? "text-blue-300" : "text-white"} text-sm py-2 font-semibold`}>{data.title}</p>
                    <p className={`${selected.title == data.title ? "text-blue-300" : "text-white"} text-xs`}>This artist has created a royalty treasure for one or more of their earnings with them.</p>
                </div>
            );
        })}
    </div>
    
    <div className="rounded-lg mt-8 text-sm text-[#2d395f]  flex" style={{height: 450}}>
        {
            selected.title == "Title for this song" ? (
                <div className="p-3 w-full border-2 border-[#1e2641] rounded-lg bg-[#121728]">
                    <p className="text-lg text-white border-b-2 w-full border-[#1e2641] pb-1 pt-1">Your balance: 0.025 eth</p>
                    <div className="mt-6 flex items-center w-full">
                        <div className="">
                            <p className="text-white text-base">Percentage</p>
                            <p className="text-xs text-gray-300" style={{ width: 200 }}>Choose a percentage of your fans.</p>
                        </div>
                        <input onChange={() => setPercentage(e.target)} value={percentage} placeholder="0.0025 eth" className="w-full ml-4 p-2 rounded-lg bg-[#1d212b] text-white" />
                    </div>
                </div>

            ) : selected.title == "Limited edition" ? (
                <div className="p-4 w-full border-2 border-[#1e2641] rounded-lg bg-[#121728]">
                   <div className="mt-4 flex w-full">
        <div className="">
          <p className="text-white text-base">Avatar</p>
          <p className="text-xs text-gray-300" style={{ width: 200 }}>Choose a percentage of your fans.</p>
        </div>
        <div
        className="w-full ml-4 p-2 rounded-lg bg-[#1d212b] hover:bg-[#242936] justify-center items-center flex cursor-pointer relative"
        style={{ height: 200 }}
        onClick={handleAvatarContainerClick}
      >
        {avatarUrl ? (
          <>
            <img src={avatarUrl} className="h-full rounded-lg" alt="Avatar" />
            <div className="absolute inset-0 flex items-center justify-center">
             
            </div>
          </>
        ) : (
          <>
            <img src="https://i.postimg.cc/cHbr8k9B/7-Ap6nq-Logo-Makr.png" className="h-6 rounded-lg" alt="Upload" />
          </>
        )}
        <input
          ref={fileInputRefAvatar}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>
    </div>
      <div className="mt-8 flex items-center w-full">
        <div className="">
          <p className="text-white text-base">Upload Music</p>
          <p className="text-xs text-gray-300" style={{ width: 200 }}>Choose a percentage of your fans.</p>
        </div>
        <div
        className="w-full ml-4 p-2 rounded-lg bg-[#1d212b] hover:bg-[#242936] justify-center items-center flex cursor-pointer relative"
        style={{ height: 80 }}
        onClick={handleSongContainerClick}
      >
        {songUrl ? (
          <>
            <audio src={songUrl} controls className="h-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              
            </div>
          </>
        ) : (
          <>
            <div className="h-full w-full flex items-center justify-center">
            <img src="https://i.postimg.cc/Y96ttncS/06w-Ja-B-Logo-Makr.png" className="h-6" />
            </div>
          </>
        )}
        <input
          ref={fileInputRefSong}
          type="file"
          accept="audio/mp3"
          className="hidden"
          onChange={handleSongChange}
        />
      </div>
    </div>
      <div className="mt-8 flex items-center w-full">
        <div className="">
          <p className="text-white text-base">Spotify URL</p>
          <p className="text-xs text-gray-300" style={{ width: 200 }}>Choose a percentage of your fans.</p>
        </div>
        <input placeholder="Link" className="w-full ml-4 p-2 rounded-lg bg-[#1d212b] text-white" />
      </div>
                </div>
            )  : <div className="w-full border-2 border-[#1e2641] rounded-lg bg-[#121728] justify-center items-center flex">
                    <p>Select a gift above</p>
                </div>
        }
        
    </div>
    <div onClick={sendGift} className={`absolute bottom-0 ${selectedtwo ? "cursor-pointer" : "cursor-not-allowed"} ${selectedtwo ? "bg-[#FF69B4]" : "bg-gray-400"} w-full justify-center items-center flex p-3 rounded-lg text-white text-sm`}>Send gift</div>
    <img onClick={() => setUpload(false)} src="https://i.postimg.cc/V6Xtb0FJ/0-JZes-U-Logo-Makr.png" className={`absolute cursor-pointer top-0 right-0 w-8 justify-center items-center flex`}/>
</div>

                
                
            </div>
          </div>
            )}

        {
            uploadSong && (
                <div className={styles.modaloverlay}>
  <div style={{ backgroundColor: "#121728", paddingTop: 30, paddingLeft: 30, paddingRight: 30 }} className={styles.modalcontenttt}>
  <img onClick={() => setUploadSong(false)} src="https://i.postimg.cc/V6Xtb0FJ/0-JZes-U-Logo-Makr.png" className={`absolute cursor-pointer top-5 right-5 w-8 justify-center items-center flex`}/>
    <p className="text-xl text-white font-bold">Upload Songg</p>
    <div className="flex items-center">
    {gifts.map((data, index) => {
            return (
                <div onClick={() => selectGift(data.title, data.desc, data.second)} key={index} style={{marginLeft: data.marginLeft, marginRight: data.marginRight}} className={`mx-0 h-32 w-1/2 cursor-pointer ${selected.title == data.title ? "border" : null}  border-blue-300 bg-[#161d31] p-4 mt-8 rounded-lg shadow-lg shadow-[#101522]`}>
                    
                    <p className={`${selected.title == data.title ? "text-blue-300" : "text-white"} text-sm py-2 font-semibold`}>{data.title}</p>
                    <p className={`${selected.title == data.title ? "text-blue-300" : "text-white"} text-xs`}>{data.desc}</p>
                </div>
            );
        })}
        </div>

        <div className="rounded-lg mt-8 text-sm text-[#2d395f]  flex" style={{height: 450}}>
        {
            selected.title == "Title for this song" ? (
              <div className="p-4 w-full border mt-4 border-[#1e2641] rounded-lg bg-[#121728]">
              <div className="mt-0 flex w-full">
                <div className="">
                  <p className="text-white text-base">Avatar</p>
                  <p className="text-xs text-gray-300" style={{ width: 200 }}>Choose an image for your collectable NFT music.</p>
                </div>
                <div
                className="w-full ml-4 p-2 rounded-lg bg-[#1d212b] hover:bg-[#242936] justify-center items-center flex cursor-pointer relative"
                style={{ height: 200 }}
                onClick={handleAvatarContainerClick}
              >
                {avatarUrl ? (
                  <>
                    <img src={avatarUrl} className="h-full rounded-lg" alt="Avatar" />
                    <div className="absolute inset-0 flex items-center justify-center">
                     
                    </div>
                  </>
                ) : (
                  <>
                    <img src="https://i.postimg.cc/cHbr8k9B/7-Ap6nq-Logo-Makr.png" className="h-6 rounded-lg" alt="Upload" />
                  </>
                )}
                <input
                  ref={fileInputRefAvatar}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
              <div className="mt-8 flex items-center w-full">
                <div className="">
                  <p className="text-white text-base">Upload Music</p>
                  <p className="text-xs text-gray-300" style={{ width: 200 }}>Choose the mp3 of your song.</p>
                </div>
                <div
                className="w-full ml-4 p-2 rounded-lg bg-[#1d212b] hover:bg-[#242936] justify-center items-center flex cursor-pointer relative"
                style={{ height: 80 }}
                onClick={handleSongContainerClick}
              >
                {songUrl ? (
                  <>
                    <audio src={songUrl} controls className="h-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      
                    </div>
                  </>
                ) : (
                  <>
                    <div className="h-full w-full flex items-center justify-center">
                    <img src="https://i.postimg.cc/Y96ttncS/06w-Ja-B-Logo-Makr.png" className="h-6" />
                    </div>
                  </>
                )}
                <input
                  ref={fileInputRefSong}
                  type="file"
                  accept="audio/mp3"
                  className="hidden"
                  onChange={handleSongChange}
                />
              </div>
            </div>
              <div className="mt-8 flex items-center w-full">
                <div className="">
                
                  <p className="text-xs text-gray-300" style={{ width: 200 }}></p>
                </div>
               
              </div>
              <div className="flex items-center w-full bg-black mt-0">
                <div className="w-full p-0">
                  
                </div>
              </div>
            </div>

            ) : selected.title == "Limited edition" ? (
                
                  <div className="p-4 w-full border mt-4 border-[#1e2641] rounded-lg bg-[#121728]">
              <div className="mt-0 flex w-full">
                <div className="">
                  <p className="text-white text-base">Avatar</p>
                  <p className="text-xs text-gray-300" style={{ width: 200 }}>Choose an image for your collectable NFT music.</p>
                </div>
                <div
                className="w-full ml-4 p-2 rounded-lg bg-[#1d212b] hover:bg-[#242936] justify-center items-center flex cursor-pointer relative"
                style={{ height: 200 }}
                onClick={handleAvatarContainerClick}
              >
                {avatarUrl ? (
                  <>
                    <img src={avatarUrl} className="h-full rounded-lg" alt="Avatar" />
                    <div className="absolute inset-0 flex items-center justify-center">
                     
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <img src="https://i.postimg.cc/cHbr8k9B/7-Ap6nq-Logo-Makr.png" className="h-6 rounded-lg" alt="Upload" />
                    <p className="text-center text-white text-xs mt-2">Limited edition avatar</p>
                  </div>
                )}
                <input
                  ref={fileInputRefAvatar}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <div
                className="w-full ml-4 p-2 rounded-lg bg-[#1d212b] hover:bg-[#242936] justify-center items-center flex cursor-pointer relative"
                style={{ height: 200 }}
                onClick={handleAvatarContainerClickTwo}
              >
                {avatarUrlTwo ? (
                  <>
                    <img src={avatarUrlTwo} className="h-full rounded-lg" alt="Avatar" />
                    <div className="absolute inset-0 flex items-center justify-center">
                     
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <img src="https://i.postimg.cc/cHbr8k9B/7-Ap6nq-Logo-Makr.png" className="h-6 rounded-lg" alt="Upload" />
                    <p className="text-center text-white text-xs mt-2">Normal avatar</p>
                  </div>
                )}
                <input
                  ref={fileInputRefAvatarTwo}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChangeTwo}
                />
              </div>
            </div>
              <div className="mt-8 flex items-center w-full">
                <div className="">
                  <p className="text-white text-base">Upload Music</p>
                  <p className="text-xs text-gray-300" style={{ width: 200 }}>Choose the mp3 of your song.</p>
                </div>
                <div
                className="w-full ml-4 p-2 rounded-lg bg-[#1d212b] hover:bg-[#242936] justify-center items-center flex cursor-pointer relative"
                style={{ height: 80 }}
                onClick={handleSongContainerClick}
              >
                {songUrl ? (
                  <>
                    <audio src={songUrl} controls className="h-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      
                    </div>
                  </>
                ) : (
                  <>
                    <div className="h-full w-full flex items-center justify-center">
                    <img src="https://i.postimg.cc/Y96ttncS/06w-Ja-B-Logo-Makr.png" className="h-6" />
                    </div>
                  </>
                )}
                <input
                  ref={fileInputRefSong}
                  type="file"
                  accept="audio/mp3"
                  className="hidden"
                  onChange={handleSongChange}
                />
              </div>
            </div>
              <div className="mt-8 flex items-center w-full">
                <div className="">
                  <p className="text-white text-base">Song Title</p>
                  <p className="text-xs text-gray-300" style={{ width: 200 }}></p>
                </div>
                <input onChange={(e) => setSpotifyLink(e.target.value)} value={spotifyLink} placeholder="Aa..." className="w-full ml-4 p-2 rounded-lg bg-[#1d212b] text-white" />
              </div>
              <div className="flex items-center w-full bg-black mt-0">
                <div className="w-full p-0">
                  
                </div>
              </div>
            
                </div>
            )  : <div className="w-full border-2 border-[#1e2641] rounded-lg bg-[#121728] justify-center items-center flex">
                    <p>Select a gift above</p>
                </div>
        }
        
    </div>
      {
        selected.title == "Limited edition" ? (
          <button disabled={!selectedtwo} onClick={addLimited} className={`mt-8 w-full p-3 ${selectedtwo ? "cursor-pointer bg-[#FF69B4]" : "cursor-not-allowed bg-gray-400"} justify-center items-center flex rounded-lg text-white text-sm`}>Upload song</button>
        ) : selected.title == "Title for this song" ? (
          <button disabled={!selectedtwo} onClick={addIpfs} className={`mt-8 w-full p-3 ${selectedtwo ? "cursor-pointer bg-[#FF69B4]" : "cursor-not-allowed bg-gray-400"} justify-center items-center flex rounded-lg text-white text-sm`}>Upload song</button>
        ) : null
      }
    
  </div>
</div>



            )
        }
        <div className="hidden sm:flex mt-10 overflow-x-autoto">
          {
            allKeys.map((data, index) => {
              return <img key={index} onClick={() => getKeysProfile(data.id)} src={data.data.image} className="h-16 cursor-pointer hover:border-4 w-16 border border-white transition-all rounded-full mx-2" />
            })
          }
        
        </div>
        <div className={styles.form} style={{height: uploadCountdown ? 1200 : null}}>
            
            {
                accounts ? (
                  <>
                    {
                      profile ? (
                        <>
                        {
                          allKeys.map((data, index) => {
                            return <div>
                                        <div className="relative pt-10 mt-0 pb-24 w-full rounded-t-2xl bg-gradient-to-t from-[#4abdff] to-[#00A3FF] flex flex-col sm:flex-row justify-between ">
                          <div className="absolute bottom-5 right-5 flex w-full justify-center items-center">
                      <div className="progress-container" style={{ width: '90%', height: '2px', backgroundColor: '#ddd', marginLeft: 50, marginRight: 20 }}>
                          <div className="progress-bar" style={{ width: `${progress}%`, height: '100%', backgroundColor: 'black' }}></div>
                      </div>
              <div className={`w-14 h-12 bg-white cursor-pointer hover:w-16 hover:h-14 transform transition-all rounded-full flex justify-center items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                   style={{ transition: 'opacity 0.5s, width 0.5s, height 0.5s' }}
                   onClick={handlePlayMusic}>
                  <img src="https://i.postimg.cc/13QDBT4V/5yp68q-Logo-Makr.png" className="w-4" />
              </div>
              <div className={`w-14 h-12 bg-white cursor-pointer ml-2 hover:w-16 hover:h-14 transform transition-all rounded-full flex justify-center items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                   style={{ transition: 'opacity 0.5s, width 0.5s, height 0.5s' }}
                   onClick={handlePlayMusic}>
                  <img src="https://i.postimg.cc/7LsGm3pb/3-Xa-YMX-Logo-Makr.png" className="w-4" />
              </div>
              </div>
              <div className="relative mr-0 mt-12 sm:mt-0 sm:mr-0 ml-0">
              
                <div onClick={handlePlayMusic} className="relative overflow-hidden cursor-pointer ml-8 mr-8 sm:mr-0" style={{ height: 220, borderRadius: 10 }}>
                  <img ref={blurryImageRef} className="absolute top-0 left-0 w-full h-full object-cover rounded-md" src="https://i.postimg.cc/xTQmD2kW/3366655-new-Image-2.jpg" />
                  
          
                  
                  <div ref={textContainerRef} className="relative overflow-y-scroll h-full justify-center flex" style={{ paddingTop: '100%', width: 220 }}>
                  <div className="w-24 sm:w-24 h-24 p-4 mt-8 rounded-lg shadow-lg border cursor-pointer mb-16">
                              <img src="https://i.postimg.cc/MG3hVt0H/4zsp-KQ-Logo-Makr.png" className="h-5" />
                              <p className="text-white text-xs py-2 font-semibold">First listener</p>
                              
                          </div>
                   
                  </div>
                </div>
              </div>
          
                           <div className="flex ml-0 p-0 w-full flex-col  px-8">
                              
                              
                              <div>
                              <div className="flex mt-0 items-center justify-center">
                        
                        
                          
          
                        
                      </div>
                      
                      <div className="relative group w-full sm:w-full sm:mx-0  p-0 rounded-lg border mt-10 sm:mt-0 cursor-pointer">
                              
                              <div className="px-3 pt-2">
                                  <div className="flex items-center">
                              
          <div style={{ fontFamily: 'Reddit Mono' }} className="flex flex-col ml-0  mt-0 p-0 text-start px-3 bg-[#064569] justify-center items-center rounded-lg text-white text-sm py-1">
          
                              
          <p className="mt-0">Artist: Timow</p>
          </div>
          </div>
                                  <div className="flex items-center mt-2">
                                  
                                  <p className="text-white text-lg font-semibold mt-1 ml-2">Title of the song</p>
                                  
                                  </div>
                            
                              </div>
                              
                              <div className="p-2">
           
                             <div className="bg-gray-700 p-2 hover:bg-black text-white rounded-full mt-5 justify-center flex items-center">Collect</div>
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
          
                      
                      <div className="pt-6 w-full rounded-b-2xl bg-[#8AD7FF] justify-between overflow-scroll h-72 items-center flex flex-col">
          
                    {
                      getKeysMusic.map((data, index) => {
                        return <div key={index} className="w-full justify-between flex items-center">
                                    <div className="flex items-center ml-5">
                                      <img src={data.data.signMessage} className="mt-12 sm:mt-0 sm:mr-0 h-16 w-16 rounded-md" />
                                      <div className="ml-4">
                                          <p className="font-semibold">{data.data.title} </p>
                                          <p className="text-xs text-gray-700">{data.data.account}</p>
                                      </div>
                                    </div>
                                    <div className="mr-6 border text-gray-700 border-gray-700 rounded-full p-2 px-6 cursor-pointer hover:bg-gray-700 hover:text-white">Collect</div>
                                </div>
                      })
                    }

                    </div>
          
                      
                     </div>
                          })
                        }
                        </>
                      ) : (
                  <>
                  {
                  getCountdown.length > 0 ? (
                    <>
                    <div className="relative pt-10 pb-24 w-full rounded-t-2xl bg-gradient-to-t from-[#4abdff] to-[#00A3FF] flex flex-col sm:flex-row justify-between ">
                <div className="absolute bottom-5 right-5 flex w-full justify-center items-center">
            <div className="progress-container" style={{ width: '90%', height: '2px', backgroundColor: '#ddd', marginLeft: 50, marginRight: 20 }}>
                <div className="progress-bar" style={{ width: `${progress}%`, height: '100%', backgroundColor: 'black' }}></div>
            </div>
    <div className={`w-14 h-12 bg-white cursor-pointer hover:w-16 hover:h-14 transform transition-all rounded-full flex justify-center items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}
         style={{ transition: 'opacity 0.5s, width 0.5s, height 0.5s' }}
         onClick={handlePlayMusic}>
        <img src="https://i.postimg.cc/13QDBT4V/5yp68q-Logo-Makr.png" className="w-4" />
    </div>
    
    </div>
    <div className="relative mr-0 mt-12 sm:mt-0 sm:mr-0 ml-0">
    
      <div onClick={handlePlayMusic} className="relative overflow-hidden cursor-pointer ml-8 mr-8 sm:mr-0" style={{ height: 220, borderRadius: 10 }}>
        <img ref={blurryImageRef} className="absolute top-0 left-0 w-full h-full object-cover rounded-md" src={getCountdown[0].data.image} />
        

        
        <div ref={textContainerRef} className="relative overflow-y-scroll h-full justify-center flex" style={{ paddingTop: '100%', width: 220 }}>
        <div className="w-24 sm:w-24 h-24 p-4 mt-8 rounded-lg shadow-lg border cursor-pointer mb-16">
                    <img src="https://i.postimg.cc/MG3hVt0H/4zsp-KQ-Logo-Makr.png" className="h-5" />
                    <p className="text-white text-xs py-2 font-semibold">First listener</p>
                    
                </div>
         
        </div>
      </div>
    </div>

                 <div className="flex ml-0 p-0 w-full flex-col  px-8">
                    
                    
                    <div>
                    <div className="flex mt-0 items-center justify-center">
              
              
                

              
            </div>
            
            <div className="relative group w-full sm:w-full sm:mx-0  p-0 rounded-lg border mt-10 sm:mt-0 cursor-pointer">
                    <div className="absolute bottom-full mb-2 bg-black rounded-lg text-white text-xs p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out hidden group-hover:block">
                    Best idea for a title will be chosen by an artist. A person who´s title will be chosen will also get a one-of-one limited edition NFT of a song.
                    </div>
                    <div className="px-3 pt-2">
                        <div className="flex items-center">
                        <div style={{ fontFamily: 'Reddit Mono' }} className="flex flex-col ml-0  mt-0 p-0 text-start px-3 bg-[#064569] justify-center items-center rounded-lg text-white text-sm py-1">

                    
<p onClick={() => console.log(getCountdown[0].data.timestamp.seconds)} className="mt-0">Your song drop in:</p>
</div>
                    <div style={{ fontFamily: 'Reddit Mono' }} className="flex ml-2 flex-col  mt-0 p-0 text-start w-28 bg-[#6ac8ff] justify-center items-center rounded-lg text-white text-sm py-1">

                    
<p className="mt-0"> {timeLeft.days !== undefined ? displayTime : "Time's up!"}</p>
</div>

</div>
                        
                    </div>
                    
                    <div className="p-4 flex items-start flex-wrap overflow-scroll" style={{height: 250}}>
                  {
                    getSongTitle.map((data, index) => {
                      return <p key={index} className="text-white hover:bg-white hover:text-black border p-2 rounded-lg mr-2 mt-2">{data.data.song}</p>
                    })
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
           


            <div className="pt-6 w-full rounded-b-2xl bg-[#8AD7FF] justify-between overflow-scroll h-72 items-center flex flex-col">
              {
                getMySongs.map((data, index) => {
                  return <div key={index} className="w-full justify-between flex items-center">
                              <div className="flex items-center ml-5">
                                <img src={data.data.image} className="mt-12 sm:mt-0 sm:mr-0 h-16 w-16 rounded-md" />
                                <div className="ml-4">
                                    <p className="font-semibold">{data.data.title}</p>
                                    <p className="text-xs text-gray-700">{accounts[0].slice(0,3)}...{accounts[0].slice(accounts[0].length - 4, accounts[0].length)}</p>
                                </div>
                              </div>
                              <p className="mr-4 text-sm text-gray-700">2:13</p>
                         </div>
                })
              }
              </div>
            </>
                  ) : (
                    <>
                     <div className=" py-10 mt-0 w-full rounded-t-2xl bg-[#00A3FF] justify-center items-center flex flex-col sm:flex-row">
                 <div className="flex items-center">
                    <div onClick={() => setUploadSong(true)} className="w-28 h-28 bg-white cursor-pointer hover:w-32 hover:h-32 transition-all rounded-full ml-0 sm:ml-0 justify-center items-center flex">

                        <img src="https://i.postimg.cc/L4r9HYLW/9-F7k-KO-Logo-Makr.png" className="w-12" />
                    </div>
                    <div className="ml-6 py-10">
                        <p className="font-bold text-2xl">UPLOAD NEW SONG</p>
                        <div className="flex items-center">
                            <p className="text-sm font-light w-48">Let your key holders collect your music, give limited edition and creative control.</p>
                            
                        </div>
                    </div>   
                 </div>
                
                          
            </div>

            <div className="pt-6 w-full rounded-b-2xl bg-[#8AD7FF] justify-between overflow-scroll h-72 items-center flex flex-col">
              {
                myMusic.map((data, index) => {
                  return <div key={index} className="w-full justify-between flex items-center">
                              <div className="flex items-center ml-5">
                                <img src="https://i.postimg.cc/pTdFNgnG/3366655-new-Image-2.jpg" className="mt-12 sm:mt-0 sm:mr-0 h-16 w-16 rounded-md" />
                                <div className="ml-4">
                                    <p className="font-semibold">{data.data.title}</p>
                                    <p className="text-xs text-gray-700">0x1...sdf</p>
                                </div>
                              </div>
                              <p className="mr-4 text-sm text-gray-700">2:13</p>
                         </div>
                })
              }
                 <div className="w-full justify-between flex items-center">
                     <div className="flex items-center ml-5">
                        <img src="https://i.postimg.cc/pTdFNgnG/3366655-new-Image-2.jpg" className="mt-12 sm:mt-0 sm:mr-0 h-16 w-16 rounded-md" />
                        <div className="ml-4">
                            <p className="font-semibold">ffasdf </p>
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
            </div>
            
                    </>
                  )}</>
                  )
                      
              }
              
              <>
              <div className="border-b-2 border-[#181f35] mt-12"></div>

             <div className="mb-96"></div>

              

            
            
            
           
           
                   
           
           
            
            
            <div className="flex mt-3 flex-wrap items-center justify-center">
              

                {
                    allGift.map((data, index) => {
                        return <div key={index} className="w-full mx-4 sm:w-48 h-44 bg-[#161d31] p-4 mt-8 rounded-lg shadow-lg shadow-[#101522]">
                                    <img src={data.image} className="h-5" />
                                    <p className="text-gray-300 text-sm py-2 font-semibold">{data.title}</p>
                                    <p className="text-xs text-white">{data.description}</p>
                                </div>
                    })
                }


               {/* <div onClick={() => setUpload(true)} className="h-44 w-full sm:w-48 mx-4 border border-white cursor-pointer hover:bg-[#0f1422] bg-[#161d31] mt-8 p-4 rounded-lg shadow-lg shadow-[#101522] justify-center items-center flex flex-col">
                    <img src="https://i.postimg.cc/X7HgGWNt/2mc-Sq-I-Logo-Makr.png" className="h-12" />
                    
              </div>*/}
                
              
            </div>
              </>
              </>


                ) : (
                    <div className="mt-30 h-full flex items-center flex-col" style={{height: 1000}}>
                        <img src="https://i.postimg.cc/Y9GmScv6/0-XCbs-Z-Logo-Makr.png" className="h-32 w-32" />
                        <p style={{ fontFamily: 'Oswald' }} className="mt-4 text-xl text-white">Connect to your wallet to see your profile</p>
                        <div onClick={connectMetamask} className="border-[#fff] py-3 mt-12 w-full border rounded-lg justify-center flex p-2 items-center hover:cursor-pointer hover:bg-[#1e2947] text-gray-500 hover:text-black ml-0">
                                <img className="w-6" src="https://i.postimg.cc/mrT1hFKC/Meta-Mask-Fox-svg-2.png" />
                                <p className="text-xs font-bold ml-1 text-[#fff]">Connect Metamask</p>
                            </div>
                    </div>
                )
            }


            
            <div className=" mt-10"></div>
            
        </div>
       
    </div>
  )
}

export default Profile
