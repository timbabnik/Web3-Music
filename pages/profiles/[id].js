import Link from 'next/link'
import React, { useState, useRef, useEffect, useMemo } from 'react'
import styles from "../../styles/Home.module.css";
import { addDoc, collection, onSnapshot, getDoc, doc, serverTimestamp, deleteDoc, query, getDocs, where, orderBy, limit } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase'; // adjust the path to your firebase configuration
import { create } from 'ipfs-http-client';
import { useRouter } from "next/router";
import { ethers } from 'ethers';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
  } from 'recharts';
  import MusicFactory from "../MusicFactory.json";
  import MusicCollection from "../MusicCollection.json";
  import Mutest from "../Mutest.json";
  



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
        desc: "Let your collectors name the song you are going to upload. Choose from the best title idea that you are going to get.",
        second: "https://files.logomakr.com/0blpbd-LogoMakr.png",
        first: "https://files.logomakr.com/2TMVIT-LogoMakr.png",
        marginRight: 10
    }, {
        id: 2,
        title: "Limited edition",
        desc: "Send one of your collectors a limited edition collectable NFT of the uploaded song. After that every collector can collect the basic version for free.",
        first: "https://files.logomakr.com/43IKPg-LogoMakr.png",
        second: "https://files.logomakr.com/4ClEqp-LogoMakr.png",
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


  const [currentlyPlaying, setCurrentlyPlaying] = useState({ index: null, isPlaying: false });

  

  const handlePlayMusic = (songUrl, index) => {
    setCurrentlyPlaying((prevState) => {
        if (prevState.index === index) {
          return { index, isPlaying: !prevState.isPlaying }; // Toggle play/pause for the same song
        }
        return { index, isPlaying: true }; // Play new song
      });
  
    console.log(index);

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

const [allwhitelist, setAllwhitelist] = useState([]);

  useEffect(
    () => 
    onSnapshot(collection(db, "whitelist"),
    
    (snapshot) => setAllwhitelist(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))

, [])

const whitelistCheckerTest = () => {
  let isOnWhitelist = false; // Initialize a flag variable

  for (let i = 0; i < allwhitelist.length ; i++) {
    if (allwhitelist[i].data.address.toUpperCase() === accounts[0].toUpperCase()) {
      openUploadSong();
      isOnWhitelist = true; // Set the flag to true if your account is on the whitelist
      break; // Exit the loop since you found a match
    }
  }

  if (!isOnWhitelist) {
    alert("You are not on the whitelist");
  }
}


const [testRefresh, setTestRefresh] = useState(false);

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
    
  }, [id, testRefresh])


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
  if (!avatarUrl || !songUrl) {
    alert("One or more required fields are missing. Please ensure all fields are filled.");
    return; // Exit the function if any field is missing
  }
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
  // Check if any required fields are missing
  if (!imageObject || !imageObjectTwo || !avatarUrl || !avatarUrlTwo || !songUrl || !spotifyLink) {
    alert("One or more required fields are missing. Please ensure all fields are filled.");
    return; // Exit the function if any field is missing
  }

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
      setTestRefresh(!testRefresh);
      alert("You uploaded your song");
      setUploadSong(false);
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
      
        (snapshot) => setGetMySongs(snapshot.docs.map((doc) => ({
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

      router.push(`/profiles/${id}`);
      
}

const getMyKeysProfile = async () => {
    console.log(id);
    setGetAdd(accounts[0]);
    setProfile(false);

    

      onSnapshot(collection(db, "accounts", accounts[0], "mySongs"),
    
      (snapshot) => setGetMySongs(snapshot.docs.map((doc) => ({
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

    router.push(`/profiles/${accounts[0]}`);
    
}



const [chooseTitle, setChooseTitle] = useState(false);
const [selectTitle, setSelectTitle] = useState("");
const [selectId, setSelectId] = useState("");
const [selectAddress, setSelectAddress] = useState("");
const [selectSignature, setSelectSignature] = useState("");


const getAndSelectTitle = (id, addresss, signaturee, idTwo) => {
    setChooseTitle(true);
    setSelectTitle(id);
    setSelectAddress(addresss);
    setSelectSignature(signaturee);
    setSelectId(idTwo);
}

const imageObjectTitle = {
  name: selectTitle,
  image: getCountdown[0]?.data.imageUrl,
  animation_url: getCountdown[0]?.data.song,
}

const testChooseTitleandsend = async () => {
  const result = await ipfs.add(JSON.stringify(imageObjectTitle));

  if (result) {

  }

}


async function verifyContract(address, constructorArguments) {
  try {
      await window.hardhat.run("verify:verify", {
          address,
          constructorArguments,
      });
      console.log(`Contract at ${address} verified successfully!`);
  } catch (error) {
      console.error(`Failed to verify contract at ${address}:`, error);
  }
}


const verifyTest = async () => {
  await verifyContract(0x6b537DE41E501E6d2a93B5B31E889b1B704ad80C, [0x1B8163f3f7Ae29AF06c50dF4AE5E0Fe9375f8496, 0x2a0644d13BD9154962BD0C669aCFa94861D52BD0, "https://timomarket.infura-ipfs.io/ipfs/QmbNdXSauw1bRGbdeP44jFQZ66xT4MaaL5UsbiqPBLHXDZ", "Test idea title 17:16", "https://timomarket.infura-ipfs.io/ipfs/QmbNdXSauw1bRGbdeP44jFQZ66xT4MaaL5UsbiqPBLHXDZ"]);
}

async function chooseTitlesendTest() {
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
          const result = await ipfs.add(JSON.stringify(imageObjectTitle));
          const balance = await contract.keysSupply(id);
          console.log("tukiiiiii545454");
          console.log(getCountdown[0].data.imageUrl, selectTitle, getCountdown[0].data.song, account[0])
          

          if (result) {
            console.log("result dela")
              if (balance.toString() > 0) {
                console.log("balance dela")
                  // Listen for the event before sending the transaction
                  contract.on('MusicCollectionCreated', async (creator, collectionAddress) => {
                      console.log(`New music collection created by ${creator}, address: ${collectionAddress}`);
                      console.log(`https://timomarket.infura-ipfs.io/ipfs/${result.path}`)
                      console.log("A ti je dal contract address?")
                      // Verify the newly created contract
                      
                    

                      // Add document to Firestore
                      await addDoc(collection(db, "accounts", account[0], "mySongs"), {
                          image: getCountdown[0].data.imageUrl,
                          title: selectTitle,
                          song: getCountdown[0].data.song,
                          smartContractAddress: collectionAddress
                      });

                      // Remove the event listener after receiving the event
                      contract.off('MusicCollectionCreated');
                      console.log("5656565")
                  });
                  console.log("kaj pa tuki")
                  const transaction = await contract.createMusicCollection(`https://timomarket.infura-ipfs.io/ipfs/${result.path}`, selectAddress, selectTitle, selectSignature);
                  const receipt = await transaction.wait();
const logs = receipt.logs;
const iface = new ethers.Interface(MusicFactory.abi); // Use ethers.Interface in v6

// Find the log that matches the "MusicCollectionCreated" event
let collectionAddress = null;

for (let log of logs) {
    try {
        const parsedLog = iface.parseLog(log); // Try parsing each log
        if (parsedLog.name === "MusicCollectionCreated") {
            collectionAddress = parsedLog.args[1]; // This assumes the second argument is the collection address
            console.log("Collection Address:", collectionAddress);
            break; // Exit the loop once we find the correct log
        }
    } catch (err) {
        // If the log doesn't match the event, parsing will fail. We catch and continue.
        console.log("Log parsing failed", err);
    }
}

if (!collectionAddress) {
    console.log("No MusicCollectionCreated event found in the logs.");
} else {
    await addDoc(collection(db, "accounts", account[0], "mySongs"), {
        image: getCountdown[0].data.imageUrl,
        title: selectTitle,
        song: getCountdown[0].data.song,
        smartContractAddress: collectionAddress
    });
    chooseTitleAndSenddd();
}


                  // Navigate to /profiles/add
                  router.push(`/profiles/${id}`);

                  alert("You have uploaded your song for your key holders to collect.");
                  setChooseTitle(false);
              } else {
                  console.log("You already have");
              }
          }
      } catch (err) {
          console.log("error: ", err);
      }
  }
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





const chooseTitleAndSenddd = async () => {
  try {
      console.log("Deleting the specific document from 'countdown' collection...");
      
      // Delete the specific document from "countdown" collection
      await deleteDoc(doc(db, "accounts", accounts[0], "countdown", selectId));
      console.log("Document deleted successfully.");

      // Check if getCountdown[0] exists and has required fields
      if (!getCountdown[0] || !getCountdown[0].data || !getCountdown[0].data.imageUrl || !getCountdown[0].data.song) {
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
    await addDoc(collection(db, "accounts", accounts[0], "mySongs"), {
      image: getCountdown[0].data.image,
      title: selectTitle,
      song: getCountdown[0].data.songUrl,
  });
    await deleteDoc(doc(db, "accounts", accounts[0], "countdown", idOf));
    alert("You have sent the NFT to a random key holder");
}

async function deleteLimitedCountdownn(idOf, jsonTit, address, song, jsonLim) {
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
      console.log("a dela=", accounts[0], id);  // Make sure 'idOf' is defined

      // Check if the 'keysSupply' method exists in the ABI
      const balance = await contract.keysSupply(id);
      console.log(balance.toString(), "tuki");
      console.log("kaj", jsonTit, address, song, jsonLim);

      if (balance.toString() > 0) {
        // Listen for the event before sending the transaction
        contract.on('MusicCollectionCreated', async (creator, collectionAddress) => {
          console.log(`New music collection created by ${creator}, address: ${collectionAddress}`);

          await addDoc(collection(db, "accounts", accounts[0], "mySongs"), {
            image: getCountdown[0].data.imageUrl,
            title: getCountdown[0].data.title,
            song: getCountdown[0].data.song,
            smartContractAddress: collectionAddress
          });

          // Remove the event listener after receiving the event
          contract.off('MusicCollectionCreated');
        });

        // Execute the transaction
        const transaction = await contract.createMusicCollectionTwo(jsonTit, address, song, jsonLim);
        const receipt = await transaction.wait();  // Wait for the transaction to be mined
        const logs = receipt.logs;
const iface = new ethers.Interface(MusicFactory.abi); // Use ethers.Interface in v6

// Find the log that matches the "MusicCollectionCreated" event
let collectionAddress = null;

for (let log of logs) {
    try {
        const parsedLog = iface.parseLog(log); // Try parsing each log
        if (parsedLog.name === "MusicCollectionCreated") {
            collectionAddress = parsedLog.args[1]; // This assumes the second argument is the collection address
            console.log("Collection Address:", collectionAddress);
            break; // Exit the loop once we find the correct log
        }
    } catch (err) {
        // If the log doesn't match the event, parsing will fail. We catch and continue.
        console.log("Log parsing failed", err);
    }
}

if (!collectionAddress) {
    console.log("No MusicCollectionCreated event found in the logs.");
} else {
    await addDoc(collection(db, "accounts", account[0], "mySongs"), {
        image: getCountdown[0].data.imageUrl,
        title: getCountdown[0].data.title,
        song: getCountdown[0].data.song,
        smartContractAddress: collectionAddress
    });
    await deleteDoc(doc(db, "accounts", accounts[0], "countdown", idOf));
          alert("You have sent the NFT to a random key holder");
}

        
      } else {
        alert("You don't have any key holders");
      }
    } catch (err) {
      console.log("error: ", err);
    }
  }
}




const sendTitlee = async () => {
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

  const sendTitle = async () => {
    if (window.ethereum) {

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      
      // Check if it's not Base Sepolia (chain ID 84532 in decimal)
      if (parseInt(chainId, 16) !== 8453) { // Convert chainId to decimal for comparison
        alert("Please switch to the Base Sepolia network.");
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
  
  
        // Check balance from smart contract
        const balance = await contract.keysBalance(id, account);
        console.log("Current keysBalance:", balance.toString());
  
        if (balance.toString() > 0) {
          const message = titleInput; // Plain text message
        const hash = ethers.hashMessage(message); // Hash the message if needed
  
        const signature = await signer.signMessage(message);
        console.log('Signed message:', signature);
        console.log('Hash:', hash);
        
        console.log(accounts[0]);
          // Add document to Firestore
          await addDoc(collection(db, "accounts", id, "songTitle"), {
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


  const collectKeyy = async () => {
    connectMetamask();
    await addDoc(collection(db, "accounts", accounts[0], "myKeys"), {
      image: getCountdown[0].image,
      address: id
  })
  }


  const addressss = "0x4d4DdfB01DAa677a04d5c5278A6075A4cf7d804b";

  async function collectKey() {
    console.log("jou");
    if (window.ethereum) {

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      
      // Check if it's not Base Sepolia (chain ID 84532 in decimal)
      if (parseInt(chainId, 16) !== 8453) { // Convert chainId to decimal for comparison
        alert("Please switch to the Base Sepolia network.");
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
        console.log("a dela=", accounts[0], id);
        console.log("jap");
        const balance = await contract.keysBalance(id, account[0]);
        console.log("noup");
        const getPri = await contract.getBuyPrice(id, 1);
        console.log("sevedno");
        const priceInEther = getPri.toString();
        console.log("sevedno sevedno");
        
        console.log("konec");
        
        console.log("Current keysBalance:", balance.toString());
        console.log("Current price:", priceInEther.toString());
        console.log("Current priceeee:", ethers.formatUnits(priceInEther, "ether"));
        console.log(account[0].slice(0, 3));
        console.log(getCountdown[0]?.data?.imageUrl, "Is it working=?");

        const transaction = await contract.buyShares(id, 1, {
          value: priceInEther
        });
        const receipt = await transaction.wait(); // Wait for the transaction to be mined
        
        console.log("ha?");
            console.log("Transaction confirmed:", receipt.hash);


            

    
            if (receipt.hash) {
              await addDoc(collection(db, "accounts", id, "history"), {
                value: ethers.formatUnits(priceInEther, "ether"),
                name: account[0].slice(0, 3),
                address: accounts[0],
                buy: true,
                timestamp: serverTimestamp()
            })

            console.log("Hej")

            if (account[0] !== id && balance.toString() < 1)
              await addDoc(collection(db, "accounts", account[0], "myKeys"), {
                image: getCountdown[0]?.data?.imageUrl || "https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg", 
                address: id
            })
          
              // Navigate to /profiles/add
              router.push(`/profiles/${id}`);
        
          
              alert("You have bought this artist's key");
            } else {
              console.log("You already have");
            }
        


      } catch (err) {
        console.log("error: ", err);
      }
    }
  }



  async function collectMusic(smartcontract) {
    console.log("jou");
    if (window.ethereum) {


      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      
      // Check if it's not Base Sepolia (chain ID 84532 in decimal)
      if (parseInt(chainId, 16) !== 8453) { // Convert chainId to decimal for comparison
        alert("Please switch to the Base Sepolia network.");
        return; // Exit the function early if the network is incorrect
      }

      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
  
      setAccounts(account);
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        smartcontract,
        MusicCollection.abi,
        signer
      );
  
      try {
        console.log("a dela=", accounts[0], id);

        const transaction = await contract.mint(id);
        const receipt = await transaction.wait(); // Wait for the transaction to be mined
        
        console.log("ha?");
            console.log("Transaction confirmed:", receipt.hash);
    
            if (receipt && receipt.hash) {
              alert("You have bought this artist's music. Check it on Opensea.");
          
            
          
              
            } else {
              console.log("You already have");
            }
        


      } catch (err) {
        console.log("error: ", err);
      }
    }
  }


  const deleteKeyy = async () => {
    await deleteDoc(doc(db, "accounts", accounts[0], "myKeys", getAddTwo));
    getMyKeysProfile();
  }

  async function deleteKey() {
    console.log("jou");
    if (window.ethereum) {


      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      
      // Check if it's not Base Sepolia (chain ID 84532 in decimal)
      if (parseInt(chainId, 16) !== 8453) { // Convert chainId to decimal for comparison
        alert("Please switch to the Base Sepolia network.");
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
        console.log("a dela=", accounts[0], id);
        const balance = await contract.keysBalance(id, account[0]);
        const getPri = await contract.getBuyPrice(id, 1);
        const priceInEther = ethers.formatEther(getPri);
        console.log("Current keysBalance:", balance.toString());

        const transaction = await contract.sellShares(id, 1);
        const receipt = await transaction.wait(); // Wait for the transaction to be mined
        
        console.log("ha?");
            console.log("Transaction confirmed:", receipt.hash);

            if(receipt.hash) {

            await addDoc(collection(db, "accounts", id, "history"), {
              value: priceInEther.toString(),
              name: account[0].slice(0, 3),
              address: account[0],
              buy: false,
              timestamp: serverTimestamp()
          })

          alert("You have sold this artist's key");
        }
    
            if (receipt && receipt.hash && balance.toString() == 1) {
              await deleteDoc(doc(db, "accounts", accounts[0], "myKeys", getAddTwo));
              getMyKeysProfile();

              // Navigate to /profiles/add
              router.push(`/profiles/${id}`);
        
          
              alert("You have sold this artist's key");
            } else {
              console.log("You already have");
            }
        


      } catch (err) {
        console.log("error: ", err);
      }
    }
  }


  const addsre = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";

  const providerrr = new ethers.JsonRpcProvider("https://base-mainnet.g.alchemy.com/v2/FRb74Y_n6MGovvwsUX1yc3-baC3Lb9iT");

  const contractAward = new ethers.Contract(addressss, MusicFactory.abi, providerrr); 
  const contractAwardd = new ethers.Contract(addsre, MusicCollection.abi, providerrr); 


  const [keyNumber, setKeyNumber] = useState("");

  const getKeysNumber = async () => {
    try {
        // Ensure id and accounts[0] are valid
        if (!id) {
            throw new Error("Invalid id");
        }
        if (!accounts || !accounts[0]) {
            throw new Error("Invalid account address");
        }

        const balance = await contractAward.keysBalance(id, accounts[0]);
        console.log(balance.toString());
        setKeyNumber(balance.toString());
    } catch (error) {
        console.error("Error getting keys number:", error);
    }
};

useEffect(() => {
  getKeysNumber();
}, [accounts, id])





  const initialData = [
    { name: 'Item 1', value: 120 },
    { name: 'Item 1', value: 60 },
  ];
  
  
  
  const [graphData, setGraphData] = useState(initialData);



  const [datk, setDatk] = useState([]);

  useEffect(() => {
    // If id is not available, do not proceed
    if (!id) {
      console.log('ID is undefined');
      return;
    }

    console.log('ID is available:', id);

    const fetchData = async () => {
      try {
        console.log("Fetching data for ID:", id);
        const querySnapshot = await getDocs(query(collection(db, "accounts", id, "history"), orderBy('timestamp', 'desc'), limit(5)));

        const fetchedData = querySnapshot.docs.map(doc => ({
          name: doc.data().name, // Replace with your field name for X-axis (timestamp or any other)
          value: doc.data().value // Replace with your field name for Y-axis (value or any other)
        }));

        console.log("Fetched data:", fetchedData);
        setDatk(fetchedData.reverse()); // Reverse array to show latest data first
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const subscribeToUpdates = () => {
      try {
        const q = query(collection(db, "accounts", id, "history"), orderBy('timestamp', 'desc'), limit(5));
        console.log("Snapshot query:", q);

        return onSnapshot(q, snapshot => {
          const fetchedData = snapshot.docs.map(doc => ({
            name: doc.data().name, // Replace with your field name for X-axis (timestamp or any other)
            value: doc.data().value // Replace with your field name for Y-axis (value or any other)
          }));

          console.log("Snapshot fetched data:", fetchedData);
          setDatk(fetchedData.reverse()); // Reverse array to show latest data first
        });
      } catch (error) {
        console.error('Error setting up snapshot listener:', error);
      }
    };

    fetchData(); // Initial fetch
    const unsubscribe = subscribeToUpdates(); // Set up snapshot listener

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [id]); // Re-run effect when id changes



  


const openUploadSong = () => {
  if (keyNumber > 0) {
    setUploadSong(true);
  } else {
    alert("You have to be the first one to collect your key for others to do the same. Collect your key below and come back :)")
  }
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
        <div onClick={chooseTitlesendTest} className="bg-blue-500 text-white w-32 h-10 rounded-lg justify-center items-center flex mt-10 cursor-pointer hover:bg-blue-400">Yes</div>
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
    <div className="h-20 w-20 rounded-lg bg-gradient-to-br from-blue-300 to-blue-700"></div>


        <div className="ml-5">
            <p className="text-white text-sm font-bold">Your address</p>
            <p className="text-gray-300 text-xs mt-1">{accounts[0].slice(0, 4)}...{accounts[0].slice(-4)}</p>
        </div>
    </div>
    <div className="border-b-2 border-[#181f35] mt-8 w-full"></div>
    <div className="flex items-center">
        {gifts.map((data, index) => {
            return (
                <div onClick={() => selectGift(data.title, data.desc, data.second)} key={index} style={{marginLeft: data.marginLeft, marginRight: data.marginRight}} className={`h-44 mx-0 w-1/2 cursor-pointer ${selected.title == data.title ? "border" : null}  border-blue-300 bg-[#161d31] p-4 mt-8 rounded-lg shadow-lg shadow-[#101522]`}>
                    <img src={` ${selected.title == data.title ? data.first : data.second}`} className="h-7" />
                    <p className={`${selected.title == data.title ? "text-blue-300" : "text-white"} text-sm py-2 font-semibold`}>{data.title}</p>
                    <p className={`${selected.title == data.title ? "text-blue-300" : "text-white"} text-xs`}>{data.desc}</p>
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
                    <img src={` ${selected.title == data.title ? data.first : data.second}`} className="h-5" />
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
                  <p className="text-xs text-gray-300" style={{ width: 200, marginTop: 10, color: "lightgray" }}>(Max 2MB)</p>
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
                  <p className="text-xs text-gray-300" style={{ width: 200, marginTop: 10, color: "lightgray" }}>(Max 2MB)</p>
                </div>
                <div
                className="w-full ml-4 p-2 rounded-lg bg-[#1d212b] hover:bg-[#242936] justify-center items-center flex cursor-pointer relative"
                style={{ height: 150 }}
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
                    <p className="text-center text-white text-xs mt-2">Basic version</p>
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
                style={{ height: 150 }}
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
                    <p className="text-center text-white text-xs mt-2">Limited edition avatar</p>
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
                         <div>
                                        <div className="relative pt-10 mt-0 pb-24 w-full rounded-2xl bg-gradient-to-t from-[#4abdff] to-[#00A3FF] flex flex-col sm:flex-row justify-between ">
                                          
                                          {getCountdown.length == 0 && (
                                            <div className="flex items-center justify-center w-full mt-10 h-48">
                                             <p className="mt-10 mb-10 text-white text-xl">No upcoming music</p>
                                           <img className="w-12 ml-6" src="https://i.postimg.cc/gjtDmVwz/2h-HJpz-Logo-Makr.png" />
                                            </div>
                                          )}
                                         
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

                      
          
                      
          
                      
                     </div>
                          
                        </>
                      ) : (
                  <>
                  {
                  getCountdown.length > 0 ? (
                    <>
                    {
                        getCountdown.map((data, index) => {
                            const isPlaying = currentlyPlaying.index === data.data.title && currentlyPlaying.isPlaying;

                            return <>
                            <div className="relative pt-10 pb-24 w-full rounded-2xl bg-gradient-to-t from-[#4abdff] to-[#00A3FF] flex flex-col sm:flex-row justify-between ">
                <div className="absolute bottom-5 right-5 flex w-full justify-center items-center">
            <div className="progress-container" style={{ width: '90%', height: '2px', backgroundColor: '#ddd', marginLeft: 50, marginRight: 20 }}>
                <div className="progress-bar" style={{ width: `${progress}%`, height: '100%', backgroundColor: 'black' }}></div>
            </div>
    <div className={`w-14 h-12 bg-white cursor-pointer hover:w-16 hover:h-14 transform transition-all rounded-full flex justify-center items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}
         
         onClick={() => handlePlayMusic(data.data.song, data.data.title)}>
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
                                {data.data.limited  ? (
                                <>
                                {
                                    timeLeft.days !== undefined ? (
                                        <p>When the countdown ends, your song will be uploaded for your key holders to collect for free, and you will send a limited edition to one of the key holders.</p>
                                    ) : (
                                        <p>By clicking "Send," you will send a limited edition collectible NFT of your song to one of your key holders. Additionally, the basic version will be uploaded for every key holder to collect for free.</p>
                                    )
                                }
                                </>
                                
                                )
                                : "Here are title ideas from your key holders. The song will be uploaded once you select one of them. Once you do that, you will upload a song with a selected title, send it to the person who wrote it and give access to your holders to collect it for free."}
                                </>
                            ) : (
                                <>
                                {data.data.limited ? "Get a chance to get a free limited edition collectable of this song." : "Best idea for a title will be chosen by an artist."}
                                </>
                            )
                        }
                    
                    </div>
                    <div className="px-3 pt-2">
                        <div className="flex items-center">
                        <div style={{ fontFamily: 'Reddit Mono' }} className="flex flex-col ml-0  mt-0 p-0 text-start px-3 bg-[#064569] justify-center items-center rounded-lg text-white text-sm py-1">

                    {
                        accounts[0] == id ? (
                            <p onClick={() => console.log(imageObjectTitle)} className="mt-0">{data.data.limited ? "The song drops in:" : "Title ideas"}</p>
                        ) : (
                            <p onClick={() => console.log(getCountdown[0].data.timestamp.seconds)} className="mt-0">{data.data.limited ? "The song drops in:" : <span>{id.slice(0, 3)}...{id.slice(id.length - 4)}</span>}</p>
                        )
                    }

</div>
                    <div style={{ fontFamily: 'Reddit Mono' }} className="flex ml-2 flex-col  mt-0 p-0 text-start w-28 bg-[#6ac8ff] justify-center items-center rounded-lg text-white text-sm py-1">


              {
                data.data.limited ? (
                  <p className="mt-0"> {timeLeft.days !== undefined ? displayTime : "Time's up!"}</p>
                ) : <p>...</p>
              }      


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
                        <div onClick={() => deleteLimitedCountdownn(data.id, data.data.jsonTitle, data.data.randomAddress, data.data.title, data.data.jsonLimited)} className="mt-4 text-white bg-[#FF4F8B] hover:bg-[#e9497e] p-2 justify-center items-center flex rounded-full">Send</div>
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
                                            return <p onClick={() => getAndSelectTitle(dataa.data.title, dataa.data.address, dataa.data.signature, data.id)} key={index} className="text-white hover:bg-white hover:text-black border p-2 rounded-lg mr-2 mt-2">{dataa.data.title}</p>
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
<div className=" py-10 mt-0 w-full h-96 rounded-2xl bg-gradient-to-b from-[#00A3FF] to-[#8AD7FF] justify-center items-center flex flex-col sm:flex-row">
                 <div className="flex items-center">
                    <div onClick={whitelistCheckerTest} className="w-28 h-28 bg-white cursor-pointer hover:w-32 hover:h-32 transition-all rounded-full ml-0 sm:ml-0 justify-center items-center flex">

                        <img src="https://i.postimg.cc/L4r9HYLW/9-F7k-KO-Logo-Makr.png" className="w-12" />
                    </div>
                    <div className="ml-6 py-10">
                        <p onClick={verifyTest} className="font-bold text-2xl">UPLOAD NEW SONG</p>
                        <div className="flex items-center">
                            <p className="text-xs font-light w-48 mt-1">Let your key holders collect your music, send limited editions and give creative control.</p>
                            
                        </div>
                    </div>   
                 </div>
                
                          
            </div>
                        ) : (
                            <div className=" py-10 mt-0 w-full rounded-2xl bg-gradient-to-b from-[#00A3FF] to-[#8AD7FF] h-96 justify-center items-center flex flex-col sm:flex-row">
                            <p className="mt-10 mb-10 text-white text-xl">No upcoming music</p>
                            <img className="w-12 ml-6" src="https://i.postimg.cc/gjtDmVwz/2h-HJpz-Logo-Makr.png" />
                                     
                       </div> 
                        )
                    }
                     

            
            
                    </>
                  )}</>
                  )
                      
              }
              
              <>
            { id === "main" ? (
                null
            ) : (<> 
              <div  className="mt-10 border-2 border-[#2d3b6b] p-3 rounded-lg">
                <p  className="text-white text-xl font-bold">Collect this artist's key</p>
                <p  className="text-gray-300 text-sm mt-1">You will get a closer access to their music.</p>
                <div className="flex">
                    {
                        (profile || accounts) && keyNumber > 0 ? (
                            <div className="flex w-full">
                                <div onClick={collectKey} className="bg-[#FF69B4] hover:bg-[#f060a8] cursor-pointer text-white mt-6 h-11 w-full mr-1 justify-center items-center flex rounded-lg">Collect</div>
                                <button 
                                  onClick={deleteKey} 
                                  className={`${
                                    keyNumber == 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#f14c9f] hover:bg-[#d8428d] cursor-pointer'
                                  } text-white mt-6 h-11 w-full mr-1 justify-center items-center flex rounded-lg`}
                                  disabled={keyNumber === 0}
                                >
                                  Sell (You hold {keyNumber} keys)
                                </button>
                            </div>
                        ) : <div div onClick={collectKey} className="bg-[#FF69B4] cursor-pointer text-white mt-6 h-11 w-full mr-1 justify-center items-center flex rounded-lg">Collect</div>
                    }
                   
                    {/*<div className="bg-[#6b3b53] text-white mt-6 h-11 w-28 ml-1 justify-center items-center flex rounded-lg">
                        <img src="https://i.postimg.cc/1zQ4G4c1/4colpr-Logo-Makr.png" className="w-6" />
                    </div>*/}
                </div>
            </div>
            {
                accounts ? (
                    null
                ) : (
                    <>
                    <div className="border-b-2 border-[#181f35] mt-12"></div>
           
           <div className="flex mt-3 flex-wrap items-center justify-center">
               <div className="w-full sm:w-48 h-44 bg-[#161d31] p-4 mt-8 rounded-lg shadow-lg shadow-[#101522]">
                   <img src="https://i.postimg.cc/MG3hVt0H/4zsp-KQ-Logo-Makr.png" className="h-5" />
                   <p className="text-gray-300 text-sm py-2 font-semibold">Early music release</p>
                   <p className="text-xs text-white">You will get access to new music releases by an artist before anyone else and will be able to collect them for free..</p>
               </div>
               <div className="h-44 w-full sm:w-48 sm:mx-10 bg-[#161d31] p-4 mt-8 rounded-lg shadow-lg shadow-[#101522]">
                   <img src="https://i.postimg.cc/3NVBps6L/2v-Buzl-Logo-Makr.png" className="h-5" />
                   <p className="text-gray-300 text-sm py-2 font-semibold">Creative control</p>
                   <p className="text-xs text-white">The artist has the option to give creative control to their key holders and let them pick a title for the next uploaded song..</p>
               </div>
               <div className="h-44 w-full sm:w-48 mx-0 bg-[#161d31] mt-8 p-4 rounded-lg shadow-lg shadow-[#101522]">
                   <img src="https://i.postimg.cc/c13L18Zw/42-Fx1h-Logo-Makr.png" className="h-5" />
                   <p className="text-gray-300 text-sm py-2 font-semibold">Sell your keys</p>
                   <p className="text-xs text-white">The price of keys follows a bonding curve, which means you can sell your key for more if the artist's popularity increases.</p>
               </div>
             
           </div></>)}
           <div className="border-b-2 border-[#181f35] mt-12"></div>
                    </>
                )
            }
            
            
            {
                    getMySongs.length > 0 ? (
                        <div className="pt-6">
                            <p className="mt-6 text-gray-200 text-2xl font-bold">All songs:</p>
                             <div className="pt-6 w-full mt-4 rounded-2xl  overflow-scroll h-96 flex flex-col">
                             {getMySongs.map((data, index) => {
        const isPlaying = currentlyPlaying.index === data.data.title && currentlyPlaying.isPlaying;
        return (
          <div
            onClick={() => handlePlayMusic(data.data.song, data.data.title)}
            key={index}
            className="w-full hover:bg-[#171d33] cursor-pointer justify-between flex items-center py-2 px-1"
          >
            <div className="flex items-center ml-0">
              <img
                src={data.data.image}
                className="mt-12 sm:mt-0 sm:mr-0 h-16 w-16 rounded-md"
              />
              <div className="ml-4">
                <p className="font-semibold text-gray-300">{data.data.title}</p>
                <p className="text-xs text-gray-700">{data.data.account}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-600 w-10 h-10 justify-center items-center flex mr-6 rounded-full">
                {isPlaying ? (
                  <img
                    src="https://i.postimg.cc/hGktpVCT/8-Vjj-E5-Logo-Makr.png"
                    className="w-3"
                  />
                ) : (
                  <img
                    src="https://i.postimg.cc/13QDBT4V/5yp68q-Logo-Makr.png"
                    className="w-3"
                  />
                )}
              </div>
              {
                accounts ? (
                  <div onClick={() => collectMusic(data.data.smartContractAddress)} className="mr-0 border text-gray-600 border-gray-600 rounded-full p-2 px-6 cursor-pointer hover:bg-gray-700 hover:text-white">
                Collect
              </div>
                ) : null
              }
              
            </div>
          </div>
        );
      })}
                          </div>
                          </div>
                    ) : (
                      <div className="flex items-center justify-center h-96">
                        <p className="text-[#283152] text-2xl">No current songs</p>
                      </div>
                        
                    )
                }

<div className="border-b-2 border-[#181f35] mt-12"></div>
<div>
  {
    id == "main" ? (
      null
    ) : (
      <div>
        <p className="text-white mt-16 text-xl font-bold">Key price history</p>
       <ResponsiveContainer width="100%" height={400} style={{ marginTop: 30 }}>
      <AreaChart
        data={datk}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>

      </div>
    )
  }
</div>


             <div className="mb-96"></div>

              <div style={{height: 200}}></div>
                    
            
            
            
           
           
                   
           
           
            
            
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
