import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import styles from "../../styles/Home.module.css";
import { addDoc, collection, onSnapshot, getDoc, doc, serverTimestamp, deleteDoc, query, getDocs, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase'; // adjust the path to your firebase configuration
import { create } from 'ipfs-http-client';
import { useRouter } from "next/router";
import { ethers } from 'ethers';



function Profil() {

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

    const router = useRouter();
    const { id } = router.query;    


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

            if (account) {
                router.push(`/profiles/${account}`);
              }
            
            
        }

        
      }




    const gifts = [{
        id: 1,
        title: "Title for this song",
        desc: "Let your collectors name the song you are going to upload. Choose from the best title idea that you are going to get. After that every collector can collect it for free.",
        first: "https://i.postimg.cc/dQ9qpfTp/5-E62yk-Logo-Makr.png",
        second: "https://i.postimg.cc/c13L18Zw/42-Fx1h-Logo-Makr.png",
        marginRight: 10
    }, {
        id: 2,
        title: "Limited edition",
        desc: "Send one of your collectors a limited edition collectable NFT of the uploaded song. After that every collector can collect the basic version for free.",
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
      const ipfsUrl = `https://timomarket.infura-ipfs.io/ipfs/${added.path}`;

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
      const ipfsUrl = `https://timomarket.infura-ipfs.io/ipfs/${added.path}`;

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
          const ipfsUrl = `https://timomarket.infura-ipfs.io/ipfs/${added.path}`;
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


  

  const [timeLeft, setTimeLeft] = useState({});

  const [targetDate, setTargetDate] = useState(null);

  useEffect(() => {
    if (!id) return; // Exit early if id is not defined

    const fetchTimestamp = async () => {
        try {
            const countdownCollectionRef = collection(db, 'accounts', id, 'countdown');
            const q = query(countdownCollectionRef);
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0];
                const serverTimestamp = docSnap.data().timestamp; // replace 'timestamp' with your actual timestamp field name
                const targetTime = new Date(serverTimestamp.toDate().getTime() + 3 * 24 * 60 * 60 * 1000);
                setTargetDate(targetTime);
            } else {
                console.log('No documents in countdown collection!');
            }
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    };

    fetchTimestamp();
}, [id]);

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

const displayTime = `${timeLeft.days || '00'}:${timeLeft.hours || '00'}:${timeLeft.minutes || '00'}:${timeLeft.seconds || '00'}`;

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
  
      onSnapshot(collection(db, "accounts", id.toLowerCase(), "countdown"),
    
      (snapshot) => setGetCountdown(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
      }))))
  
    };
  
   
    if (id) {
      fetchData();
    }
    
  }, [id])


  useEffect(() => {
    console.log("postIds has changed:", id);
    console.log(getCountdown.length)
}, [id]);


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

    onSnapshot(collection(db, "accounts", id.toLowerCase(), "mySongs"),
  
    (snapshot) => setGetMySongs(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))

  };

 
  if (id) {
    fetchData();
  }
  
}, [id])




const addIpfs = async () => {
    await addDoc(collection(db, "accounts", accounts[0], "countdown"), {
      imageUrl: avatarUrl,
      song: songUrl,
      limited: false,
      timestamp: serverTimestamp()
    });
  alert("Succesful upload");
  setUploadSong(false);
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
        jsonTitle: `https://timomarket.infura-ipfs.io/ipfs/${result.path}`,
        jsonLimited: `https://timomarket.infura-ipfs.io/ipfs/${resultTwo.path}`,
        imageUrl: avatarUrl,
        song: songUrl,
        title: spotifyLink,
        limited: true,
        timestamp: serverTimestamp()
      });
  
      console.log("Document added with timestamp");
      alert("You uploaded your song");
      setUploadSong(false);
      set
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  
};




useEffect(() => {

  const fetchData = async () => {

    onSnapshot(collection(db, "accounts", accounts[0], "myKeys"),
  
    (snapshot) => setAllKeys(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))

  };

  if (accounts) {
    fetchData();
  }
  
}, [accounts])



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

const [getAdd, setGetAdd] = useState("");

const [getAddTwo, setGetAddTwo] = useState("");



const getKeysProfile = async (id, idTwo) => {
      console.log(id);
      setGetAdd(id);
      setGetAddTwo(idTwo);
      setProfile(true);

      

        onSnapshot(collection(db, "accounts", id, "mySongs"),
      
        (snapshot) => setGetKeysMusic(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
      }))))


       onSnapshot(collection(db, "accounts", id, "countdown"),
      
        (snapshot) => setGetCountdown(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
      }))))
    
    
      console.log(getKeysMusic);
      console.log(getCountdown);
      
}

const getMyKeysProfile = async () => {
    console.log(id);
    setGetAdd(accounts[0]);
    setProfile(false);

    

      onSnapshot(collection(db, "accounts", accounts[0], "mySongs"),
    
      (snapshot) => setGetKeysMusic(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
    }))))


     onSnapshot(collection(db, "accounts", accounts[0], "countdown"),
    
      (snapshot) => setGetCountdown(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
    }))))
  
  
    console.log(getKeysMusic);
    console.log(getCountdown);
    
}



const [chooseTitle, setChooseTitle] = useState(false);
const [selectTitle, setSelectTitle] = useState("");
const [selectId, setSelectId] = useState("");


const getAndSelectTitle = (id, idTwo) => {
    setChooseTitle(true);
    setSelectTitle(id);
    setSelectId(idTwo);
}


const chooseTitleAndSend = async () => {
    try {
        console.log("Deleting the specific document from 'countdown' collection...");
        await addDoc(collection(db, "accounts", accounts[0], "mySongs"), {
            image: getCountdown[0].data.image,
            title: selectTitle,
            song: getCountdown[0].data.songUrl,
        });
        // Delete the specific document from "countdown" collection
        await deleteDoc(doc(db, "accounts", accounts[0], "countdown", selectId));
        console.log("Document deleted successfully.");

        // Check if getCountdown[0] exists and has required fields
        if (!getCountdown[0] || !getCountdown[0].data || !getCountdown[0].data.image || !getCountdown[0].data.songUrl) {
            throw new Error("Missing data in getCountdown[0]");
        }

        console.log("Adding a new document to 'mySongs' collection...");
        // Add a new document to "mySongs" collection
        
        console.log("Document added to 'mySongs' collection successfully.");

        console.log("Fetching all documents in 'songTitle' collection...");
        // Fetch all documents in "songTitle" collection
        const songTitleCollectionRef = collection(db, "accounts", accounts[0], "songTitle");
        const songTitleDocsSnapshot = await getDocs(songTitleCollectionRef);

        if (songTitleDocsSnapshot.empty) {
            console.log("No documents found in 'songTitle' collection.");
        } else {
            console.log(`Found ${songTitleDocsSnapshot.docs.length} documents in 'songTitle' collection.`);
        }

        console.log("Deleting all documents in 'songTitle' collection...");
        // Delete all documents in "songTitle" collection
        const deletePromises = songTitleDocsSnapshot.docs.map((docSnapshot) =>
            deleteDoc(docSnapshot.ref)
        );

        await Promise.all(deletePromises);
        console.log("All documents in 'songTitle' collection deleted successfully.");

        // Provide feedback to the user
        setChooseTitle(false);
        alert("You have named your song and sent it to the address.");
    } catch (error) {
        console.error("Error occurred during the operation: ", error);
        alert("An error occurred. Please try again.");
    }
};





const [titleInput, setTitleInput] = useState("");
const [moreMusic, setMoreMusic] = useState(false);


const deleteLimitedCountdown = async (idOf) => {
    await deleteDoc(doc(db, "accounts", accounts[0], "countdown", idOf));
}


const sendTitle = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
  
        // Set the account state
        setAccounts(accounts);
  
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        setAccount(account);
  
        const message = titleInput; // Plain text message
        const hash = ethers.utils.id(message); // Hash the message if needed
  
        const signature = await signer.signMessage(message);
        console.log('Signed message:', signature);
        console.log('Hash:', hash);
        
  
        // Add document to Firestore
        await addDoc(collection(db, "accounts", id, "songTitle"), {
          title: titleInput,
          address: accounts[0],
          signature: signature,
        });
  
  
        alert("Successfully sent title idea.")
  
      } catch (error) {
        console.error('Error signing message:', error.message);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };


  const collectKey = async () => {
    connectMetamask();
    await addDoc(collection(db, "accounts", accounts[0], "myKeys"), {
      image: getCountdown[0].image,
      address: id
  })
  }


  const deleteKey = async () => {
    await deleteDoc(doc(db, "accounts", accounts[0], "myKeys", getAddTwo));
  }




    

  return (
    <div className={styles.backgroundForm}>
        {
            chooseTitle && (
                <div className={styles.modaloverlay}>
  <div style={{ backgroundColor: "#121728", paddingTop: 30, paddingLeft: 30, paddingRight: 30 }} className={styles.modalcontentttt}>
  <img onClick={() => setChooseTitle(false)} src="https://i.postimg.cc/V6Xtb0FJ/0-JZes-U-Logo-Makr.png" className={`absolute cursor-pointer top-5 right-5 w-8 justify-center items-center flex`}/>
        <img src="https://i.postimg.cc/yYcHRxk7/8d-CSST-Logo-Makr.png" className="w-20" />
        <p className="text-gray-400 text-2xl mt-10 border-t border-[#202947] w-96 text-center pt-6">Title of your song: <span className="text-white">{selectTitle}</span></p>
        <p className="text-white font-light text-sm w-96 text-center mt-5">Do you want to select that to be the title of your song, and send the first collectable music NFT of that song to the person that suggested the title?</p>
        <div onClick={chooseTitleAndSend} className="bg-blue-500 text-white w-32 h-10 rounded-lg justify-center items-center flex mt-10 cursor-pointer hover:bg-blue-400">Yes</div>
      </div></div>
            )
        }
        {
            accounts ? (
                <div onClick={getMyKeysProfile} className="absolute top-10 right-5 bg-white p-3 rounded-lg px-6 cursor-pointer">
            <div className="text-sm" style={{ fontFamily: 'Reddit Mono' }}>{accounts[0].length > 6 ? `${accounts[0].slice(0, 3)}...${accounts[0].slice(-3)}` : accounts}</div>
        </div>
            ) : (
                <div onClick={connectMetamask} className="absolute top-10 right-5 bg-white p-3 rounded-lg px-6 cursor-pointer">
            <div className="text-sm" style={{ fontFamily: 'Reddit Mono' }}>Your profile</div>
        </div>
                
            )
        }
      
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
    <p className="text-xl text-white font-bold">Upload Song</p>
    <div className="flex items-center">
    {gifts.map((data, index) => {
            return (
                <div onClick={() => selectGift(data.title, data.desc, data.second)} key={index} style={{marginLeft: data.marginLeft, marginRight: data.marginRight}} className={`mx-0 h-40 w-1/2 cursor-pointer ${selected.title == data.title ? "border" : null}  border-blue-300 bg-[#161d31] p-4 mt-8 rounded-lg shadow-lg shadow-[#101522]`}>
                    
                    <p className={`${selected.title == data.title ? "text-blue-300" : "text-white"} text-sm py-2 font-semibold`}>{data.title}</p>
                    <p className={`${selected.title == data.title ? "text-blue-300" : "text-white"} text-xs`}>{data.desc}</p>
                </div>
            );
        })}
        </div>

        <div className="rounded-lg mt-4 text-sm text-[#2d395f]  flex" style={{height: 450}}>
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
                    <p className="text-center text-white text-xs mt-2">Basic version</p>
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
                    <p>Select one option above</p>
                </div>
        }
        
    </div>
      {
        selected.title == "Limited edition" ? (
          <button disabled={!selectedtwo} onClick={addLimited} className={`mt-4 w-full p-3 ${selectedtwo ? "cursor-pointer bg-[#FF69B4]" : "cursor-not-allowed bg-gray-400"} justify-center items-center flex rounded-lg text-white text-sm`}>Upload song</button>
        ) : selected.title == "Title for this song" ? (
          <button disabled={!selectedtwo} onClick={addIpfs} className={`mt-8 w-full p-3 ${selectedtwo ? "cursor-pointer bg-[#FF69B4]" : "cursor-not-allowed bg-gray-400"} justify-center items-center flex rounded-lg text-white text-sm`}>Upload song</button>
        ) : null
      }
    
  </div>
</div>



            )
        }
        <div className="hidden sm:flex mt-24 overflow-x-autoto">
          {
            allKeys.map((data, index) => {
              return <img key={index} onClick={() => getKeysProfile(data.data.address, data.id)} src={data.data.image} className="h-16 cursor-pointer hover:border-4 w-16 border border-white transition-all rounded-full mx-2" />
            })
          }
        
        </div>
        <div className={styles.form} style={{height: uploadCountdown ? 1200 : null}}>
            
            
                
                  <>
                    {
                      profile ? (
                        <>
                        {
                          allKeys.map((data, index) => {
                            return <div>
                                        <div className="relative pt-10 mt-0 pb-24 w-full rounded-t-2xl bg-gradient-to-t from-[#4abdff] to-[#00A3FF] flex flex-col sm:flex-row justify-between ">
                                            {
                                                getCountdown.map((data, index) => {
                                                    return <>
                                                                <div className="absolute bottom-5 right-5 flex w-full justify-center items-center">
                      <div className="progress-container" style={{ width: '90%', height: '2px', backgroundColor: '#ddd', marginLeft: 50, marginRight: 20 }}>
                          <div className="progress-bar" style={{ width: `${progress}%`, height: '100%', backgroundColor: 'black' }}></div>
                      </div>
              <div className={`w-14 h-12 bg-white cursor-pointer hover:w-16 hover:h-14 transform transition-all rounded-full flex justify-center items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                   
                   onClick={() => handlePlayMusic(data.data.song)}>
        {
             isPlaying ? (
              <img src="https://i.postimg.cc/hGktpVCT/8-Vjj-E5-Logo-Makr.png" className="w-4" />
             ) : (
              <img src="https://i.postimg.cc/13QDBT4V/5yp68q-Logo-Makr.png" className="w-4" />
             )
           }
                 
              </div>
              
              </div>
              <div className="relative mr-0 mt-12 sm:mt-0 sm:mr-0 ml-0">
              
                <div onClick={handlePlayMusic} className="relative overflow-hidden cursor-pointer ml-8 mr-8 sm:mr-0" style={{ height: 220, borderRadius: 10 }}>
                  <img ref={blurryImageRef} className="absolute top-0 left-0 w-full h-full object-cover rounded-md" src={data.data.imageUrl} />
                  
          
                  
                  <div ref={textContainerRef} className="relative overflow-y-scroll h-full justify-center flex" style={{ paddingTop: '100%', width: 220 }}>
                  <div className="w-24 sm:w-24 h-24 p-4 mt-8 rounded-lg shadow-lg border cursor-pointer mb-16">
                              <img src="https://i.postimg.cc/MG3hVt0H/4zsp-KQ-Logo-Makr.png" className="h-5" />
                              <p className="text-white text-xs py-2 font-semibold">Firsdt listener</p>
                              
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
          
                              
          <p className="mt-0">Artist: {getAdd.slice(0, 3)}...{getAdd.slice(getAdd.length - 4)}</p>

          
          </div>
          
          </div>
          {
                        data.data.limited ? (
                            <>
                           
                                    <div className="p-2 flex items-start flex-wrap overflow-scroll" style={{height: 180}}>
                                <div className="flex items-center mt-2">
                        
                       
                            <p className="text-white text-lg font-semibold mt-1 ml-0">
                              {data.data.title} {/* Adjust this to display the desired data */}
                            </p>
                        
                        
                        </div>
                  
                        <p className="text-gray-200 text-md mt-1 ml-0 pb-0">One key holder will get the limited edition of this music collectable.</p>
                    <div className="flex items-center pt-2 mt-4 border-t w-full border-[#cfcfcf]">
                    <p className="p-0 pb-0 font-bold text-white">FREE</p>
                    <p className="text-gray-200 text-sm ml-3">0/1 mints</p>
                    </div>
                            </div>
                               
                            </>
                            
                        ) : (
                            <>
                                
                                    <>
                                    <div className="flex items-center mt-2">
                                          
                                    <p className="text-white text-lg px-2 font-semibold mt-1 ml-2">Listen to this song, give it a title and be a part of the next big hit</p>
                                    
                                    </div>
                              
                                
                                
                                <div className="p-2">
                                <input
                                    onChange={(e) => setTitleInput(e.target.value)}
                                    value={titleInput}
                                    placeholder="Write a title..."
                                    className="w-full border-0 border-b border-white bg-transparent p-2 text-sm placeholder-gray-300 focus:outline-none"
                                />
                               <div onClick={sendTitle} className="bg-gray-700 p-2 hover:bg-black text-white rounded-full mt-5 justify-center flex items-center">Send</div>
                                </div>
                                </>
                                
                                
                            </>
                            
                        )
                    }
                                  
                            
                              </div>
                              
                            
          
                              
                          </div>
                          
          
          
                              </div>
                          </div>
                                                           </>
                                                })
                                            }
                         {/* <div className="absolute bottom-5 right-5 flex w-full justify-center items-center">
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
                              <p className="text-white text-xs py-2 font-semibold">Firsdt listener</p>
                              
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
                                  
                                  <p className="text-white text-lg font-semibold mt-1 ml-2">Title ohf the song</p>
                                  
                                  </div>
                            
                              </div>
                              
                              <div className="p-2">
           
                             <div className="bg-gray-700 p-2 hover:bg-black text-white rounded-full mt-5 justify-center flex items-center">Collect</div>
                              </div>
          
                              
                          </div>
                          
          
          
                              </div>
                          </div>*/}
                          {/* <div className="relative mr-0 mt-12 sm:mt-0 sm:mr-10 ml-10">
              <div className="aspect-w-1 aspect-h-1 w-56">
                  <img src="https://i.postimg.cc/pTdFNgnG/3366655-new-Image-2.jpg" className="h-full w-full rounded-lg object-cover" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white cursor-not-allowed hover:w-16 hover:h-16 transition-all rounded-full flex justify-center items-center">
                  <img src="https://i.postimg.cc/13QDBT4V/5yp68q-Logo-Makr.png" className="w-4" />
              </div>
            </div>*/}
          
          
             
                 
          
                      </div>

                      <div className="pt-0 w-full rounded-b-2xl bg-[#8AD7FF] overflow-scroll h-72 flex flex-col">
                {
                    getMySongs.length > 0 ? (
                        <div className="pt-6">
                       {
                      getKeysMusic.map((data, index) => {
                        return <div onClick={() => handlePlayMusic(data.data.song)} key={index} className="w-full hover:bg-[#79d0ff] cursor-pointer justify-between flex items-center py-2">
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
                    ) : (
                        <div className="justify-center items-center flex h-full">
                        <p className="">This address hasn't uploaded any music yet</p>
                        </div>
                    )
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
                    {
                        getCountdown.map((data, index) => {
                            return <>
                            <div className="relative pt-10 pb-24 w-full rounded-2xl bg-gradient-to-t from-[#4abdff] to-[#00A3FF] flex flex-col sm:flex-row justify-between ">
                <div className="absolute bottom-5 right-5 flex w-full justify-center items-center">
            <div className="progress-container" style={{ width: '90%', height: '2px', backgroundColor: '#ddd', marginLeft: 50, marginRight: 20 }}>
                <div className="progress-bar" style={{ width: `${progress}%`, height: '100%', backgroundColor: 'black' }}></div>
            </div>
    <div className={`w-14 h-12 bg-white cursor-pointer hover:w-16 hover:h-14 transform transition-all rounded-full flex justify-center items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}
         
         onClick={() => handlePlayMusic(data.data.song)}>
        {
             isPlaying ? (
              <img src="https://i.postimg.cc/hGktpVCT/8-Vjj-E5-Logo-Makr.png" className="w-4" />
             ) : (
              <img src="https://i.postimg.cc/13QDBT4V/5yp68q-Logo-Makr.png" className="w-4" />
             )
           }
    </div>
    
    </div>
    <div className="relative mr-0 mt-12 sm:mt-0 sm:mr-0 ml-0">
    
      <div onClick={handlePlayMusic} className="relative overflow-hidden cursor-pointer ml-8 mr-8 sm:mr-0" style={{ height: 220, borderRadius: 10 }}>
        <img ref={blurryImageRef} className="absolute top-0 left-0 w-full h-full object-cover rounded-md" src={data.data.imageUrl} />
        

        
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
                        {
                            accounts[0] == id ? (
                                <>
                                {data.data.limited ? "When the countdown ends your song will be uploaded for your key holders to collect for free + you will send one limited edition to one of the key holder." : "Here are title ideas from your key holders. The song will be uploaded once you select one of them. Once you do that, you will upload a song with a selected title, send it to the person who wrote it and give access to your holders to collect it for free."}
                                </>
                            ) : (
                                <>
                                {data.data.limited ? "Get a chance to get a free limited edition collectable of this song." : "Best idea for a title will be chosen by an artist. A person who´s title will be chosen will also get a one-of-one limited edition NFT of a song."}
                                </>
                            )
                        }
                    
                    </div>
                    <div className="px-3 pt-2">
                        <div className="flex items-center">
                        <div style={{ fontFamily: 'Reddit Mono' }} className="flex flex-col ml-0  mt-0 p-0 text-start px-3 bg-[#064569] justify-center items-center rounded-lg text-white text-sm py-1">

                    {
                        accounts[0] == id ? (
                            <p onClick={() => console.log(getCountdown[0].data.timestamp.seconds)} className="mt-0">{data.data.limited ? "The song drops in:" : "Title ideas"}</p>
                        ) : (
                            <p onClick={() => console.log(getCountdown[0].data.timestamp.seconds)} className="mt-0">{data.data.limited ? "The song drops in:" : <span>{id.slice(0, 3)}...{id.slice(id.length - 4)}</span>}</p>
                        )
                    }

</div>
                    <div style={{ fontFamily: 'Reddit Mono' }} className="flex ml-2 flex-col  mt-0 p-0 text-start w-28 bg-[#6ac8ff] justify-center items-center rounded-lg text-white text-sm py-1">

                    
<p className="mt-0"> {timeLeft.days !== undefined ? displayTime : "Time's up!"}</p>

</div>

</div>
                        
                    </div>

                    {
                        data.data.limited ? (
                            <>
                            {
                                accounts[0] == id ? (
                                    <>
                                        {
                                            timeLeft.days !== undefined ? (
                                                <div className="p-4 flex items-start flex-wrap overflow-scroll" style={{height: 180}}>
                                <div className="flex items-center mt-2">
                        
                       
                            <p className="text-white text-lg font-semibold mt-1 ml-0">
                              {data.data.title} {/* Adjust this to display the desired data */}
                            </p>
                        
                        
                        </div>
                  
                        <p className="text-gray-200 text-sm mt-1 ml-0 pb-0">When the time is up you will choose one of the key holder and send them a limited edition NFT.</p>
                    <div className="flex items-center pt-2 mt-4 border-t w-full border-[#cfcfcf]">
                    <p className="p-0 pb-0 font-bold text-white">FREE</p>
                    <p className="text-gray-200 text-sm ml-3">0/1 mints</p>
                    </div>
                            </div>
                                            ) : (
                                                <div className="px-4 flex flex-col overflow-scroll" style={{height: 180}}>
                                <div className="flex items-center mt-2">
                        
                       
                            <p className="text-white text-lg font-semibold mt-2 ml-0">
                              {data.data.title} {/* Adjust this to display the desired data */}
                            </p>
                        
                        
                        </div>
                  
                        <p className="text-gray-200 text-sm mt-2 ml-0 pb-0">Send limited edition NFT of this song to one of your key holders.</p>
                        <div onClick={() => deleteLimitedCountdown(data.id)} className="mt-4 text-white bg-[#FF4F8B] p-2 justify-center items-center flex rounded-full">Send</div>
                            </div>
                                            )
                                        }
                                    </>
                                    
                                ) : (
                                    <div className="p-4 flex items-start flex-wrap overflow-scroll" style={{height: 180}}>
                                <div className="flex items-center mt-2">
                        
                       
                            <p className="text-white text-lg font-semibold mt-1 ml-0">
                              {data.data.title} {/* Adjust this to display the desired data */}
                            </p>
                        
                        
                        </div>
                  
                        <p className="text-gray-200 text-md mt-1 ml-0 pb-0">One key holder will get the limited edition of this music collectable.</p>
                    <div className="flex items-center pt-2 mt-4 border-t w-full border-[#cfcfcf]">
                    <p className="p-0 pb-0 font-bold text-white">FREE</p>
                    <p className="text-gray-200 text-sm ml-3">0/1 mints</p>
                    </div>
                            </div>
                                )
                            }
                            </>
                            
                        ) : (
                            <>
                                {
                                accounts[0] == id ? (
                                    <div className="p-4 flex items-start flex-wrap overflow-scroll" style={{height: 250}}>
                                        {
                                            getSongTitle.length > 0 ? (
                                                <>
                                                    {
                                            getSongTitle.map((dataa, index) => {
                                            return <p onClick={() => getAndSelectTitle(dataa.data.song, data.id)} key={index} className="text-white hover:bg-white hover:text-black border p-2 rounded-lg mr-2 mt-2">{dataa.data.song}</p>
                                            })
                                        }
                                                </>
                                            ) : <div className="justify-center items-center flex h-full text-center text-sm text-white w-full"><p className="w-64">No current title suggestion by your key holders.</p></div>
                                        }
                                        
                                        
                                    </div>
                                ) : (
                                    <>
                                    <div className="flex items-center mt-2">
                                          
                                    <p className="text-white text-lg px-2 font-semibold mt-1 ml-2">Listen to this song, give it a title and be a part of the next big hit</p>
                                    
                                    </div>
                              
                                
                                
                                <div className="p-2">
                                <input
                                    onChange={(e) => setTitleInput(e.target.value)}
                                    value={titleInput}
                                    placeholder="Write a title..."
                                    className="w-full border-0 border-b border-white bg-transparent p-2 text-sm placeholder-gray-300 focus:outline-none"
                                />
                               <div onClick={sendTitle} className="bg-gray-700 p-2 hover:bg-black text-white rounded-full mt-5 justify-center flex items-center">Send</div>
                                </div>
                                </>
                                )
                                }
                            </>
                            
                        )
                    }
                    
                    

                    
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
           
{
    moreMusic ? (
<div className="pt-6 w-full rounded-b-2xl bg-[#8AD7FF] overflow-scroll h-72 flex flex-col">
  {
    getMySongs.map((data, index) => {
      return (
        <div key={index} className="w-full flex items-center justify-between p-2">
          <div className="flex items-center ml-5">
            <img src={data.data.image} alt={data.data.title} className="mt-12 sm:mt-0 sm:mr-0 h-16 w-16 rounded-md" />
            <div className="ml-4">
              <p className="font-semibold">{data.data.title}</p>
             
            </div>
          </div>
        </div>
      );
    })
  }
</div>
    ) : null
}

            

                            </>
                        })
                    }
                    
            </>
                  ) : (

                    <>
                    {
                        accounts[0] == id ? (
<div className=" py-10 mt-0 w-full rounded-t-2xl bg-[#00A3FF] justify-center items-center flex flex-col sm:flex-row">
                 <div className="flex items-center">
                    <div onClick={() => setUploadSong(true)} className="w-28 h-28 bg-white cursor-pointer hover:w-32 hover:h-32 transition-all rounded-full ml-0 sm:ml-0 justify-center items-center flex">

                        <img src="https://i.postimg.cc/L4r9HYLW/9-F7k-KO-Logo-Makr.png" className="w-12" />
                    </div>
                    <div className="ml-6 py-10">
                        <p className="font-bold text-2xl">UPLOAD NEW SONG</p>
                        <div className="flex items-center">
                            <p className="text-xs font-light w-48 mt-1">Let your key holders collect your music, send limited editions and give creative control.</p>
                            
                        </div>
                    </div>   
                 </div>
                
                          
            </div>
                        ) : (
                            <div className=" py-10 mt-0 w-full rounded-t-2xl bg-[#00A3FF] justify-center items-center flex flex-col sm:flex-row">
                            <p className="mt-10 mb-10 text-white text-xl">No upcoming music</p>
                            <img className="w-12 ml-6" src="https://i.postimg.cc/gjtDmVwz/2h-HJpz-Logo-Makr.png" />
                                     
                       </div> 
                        )
                    }
                     

            <div className="pt-0 w-full rounded-b-2xl bg-[#8AD7FF] overflow-scroll h-72 flex flex-col">
                {
                    getMySongs.length > 0 ? (
                        <div className="pt-6">
                        {
                            getMySongs.map((data, index) => {
                              return (
                                <div key={index} className="w-full flex items-center justify-between p-3">
                                  <div className="flex items-center ml-5">
                                    <img src={data.data.image} alt={data.data.title} className="mt-12 sm:mt-0 sm:mr-0 h-16 w-16 rounded-md" />
                                    <div className="ml-4">
                                      <p className="font-semibold">{data.data.title}</p>
                                      <p className="text-xs text-gray-700">
                                      {id ? (
  <>
    {id.slice(0, 3)}...{id.slice(id.length - 4)}
  </>
) : (
  <p>Address not available</p>
)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          }
                          </div>
                    ) : (
                        <div className="justify-center items-center flex h-full">
                        <p className="">This address hasn't uploaded any music yet</p>
                        </div>
                    )
                }
 
</div>

            
                    </>
                  )}</>
                  )
                      
              }
              
              <>
              <div className="border-b-2 border-[#181f35] mt-12"></div>
              <div  className="mt-10 border-2 border-[#2d3b6b] p-3 rounded-lg">
                <p className="text-white text-xl font-bold">Discover new artists</p>
                <p className="text-gray-300 text-sm mt-1">Collect a key of an artist and get closer access to their music.</p>
                <div className="flex">
                    {
                        profile || accounts ? (
                            <div className="flex w-full">
                                <div onClick={collectKey} className="bg-[#FF69B4] cursor-pointer text-white mt-6 h-11 w-full mr-1 justify-center items-center flex rounded-lg">Collect</div>
                                <div onClick={deleteKey} className="bg-[#f14c9f] cursor-pointer text-white mt-6 h-11 w-full mr-1 justify-center items-center flex rounded-lg">Sell (You hold 5 keys)</div>
                            </div>
                        ) : <div className="bg-[#FF69B4] cursor-pointer text-white mt-6 h-11 w-full mr-1 justify-center items-center flex rounded-lg">Collect</div>
                    }
                   
                    {/*<div className="bg-[#6b3b53] text-white mt-6 h-11 w-28 ml-1 justify-center items-center flex rounded-lg">
                        <img src="https://i.postimg.cc/1zQ4G4c1/4colpr-Logo-Makr.png" className="w-6" />
                    </div>*/}
                </div>
            </div>
           
           
            <div className="flex mt-3 flex-wrap items-center justify-center">
                <div className="w-full sm:w-48 h-44 bg-[#161d31] p-4 mt-8 rounded-lg shadow-lg shadow-[#101522]">
                    <img src="https://i.postimg.cc/MG3hVt0H/4zsp-KQ-Logo-Makr.png" className="h-5" />
                    <p className="text-gray-300 text-sm py-2 font-semibold">Early music release</p>
                    <p className="text-xs text-white">You will get access to new music releases by an artist before anyone else and will be able to collect them for free.</p>
                </div>
                <div className="h-44 w-full sm:w-48 sm:mx-10 bg-[#161d31] p-4 mt-8 rounded-lg shadow-lg shadow-[#101522]">
                    <img src="https://i.postimg.cc/3NVBps6L/2v-Buzl-Logo-Makr.png" className="h-5" />
                    <p className="text-gray-300 text-sm py-2 font-semibold">Creative control</p>
                    <p className="text-xs text-white">When the new music drops, either one of the key holders will get access to pick the song's title or get a limited edition collectable.</p>
                </div>
                <div className="h-44 w-full sm:w-48 mx-0 bg-[#161d31] mt-8 p-4 rounded-lg shadow-lg shadow-[#101522]">
                    <img src="https://i.postimg.cc/c13L18Zw/42-Fx1h-Logo-Makr.png" className="h-5" />
                    <p className="text-gray-300 text-sm py-2 font-semibold">Sell your keys</p>
                    <p className="text-xs text-white">The price of keys follows a bonding curve, which means you can sell your key for more if the artist's popularity increases.</p>
                </div>
              
            </div>
            <div className="border-b-2 border-[#181f35] mt-12"></div>
            
            {
                    getMySongs.length > 0 && !profile ? (
                        <div className="pt-6">
                        {
                            getMySongs.map((data, index) => {
                              return (
                                <div className="pt-6 w-full mt-20 rounded-2xl bg-[#8AD7FF] overflow-scroll h-96 flex flex-col">
                                <div onClick={() => handlePlayMusic(data.data.song)} key={index} className="w-full hover:bg-[#79d0ff] cursor-pointer justify-between flex items-center py-2">
                                    <div className="flex items-center ml-5">
                                      <img src={data.data.signMessage} className="mt-12 sm:mt-0 sm:mr-0 h-16 w-16 rounded-md" />
                                      <div className="ml-4">
                                          <p className="font-semibold">{data.data.title} </p>
                                          <p className="text-xs text-gray-700">{data.data.account}</p>
                                      </div>
                                    </div>
                                    <div className="mr-6 border text-gray-700 border-gray-700 rounded-full p-2 px-6 cursor-pointer hover:bg-gray-700 hover:text-white">Collect</div>
                                </div>
                                </div>
                              );
                            })
                          }
                          </div>
                    ) : (
                        null
                    )
                }

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


               


            
            <div className=" mt-10"></div>
            
        </div>
       
    </div>
  )
}

export default Profil
