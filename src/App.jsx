import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import "./App.css";
import { Auth } from "./components/auth";
import { auth, db, storage } from "./config/firebase";
import { getDocs, addDoc, deleteDoc, updateDoc, doc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import {ref, uploadBytes} from 'firebase/storage'

function App() {
  const [movieList, setMovieList] = useState([]);

  const movieCollectionRef = collection(db, "movies");


  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMovieList(filteredData);
      console.log(filteredData[0]);
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const [movieTitle, setMovieTitle] = useState("");

  const [releaseDate, setReleaseDate] = useState(0);

  const [isAnOscar, setIsAnOscar] = useState(false);

  const [updateTitle, setUpdateTitle] = useState("")

  const [fileUpload, setFileUpload] = useState(null);

  const submitMovie = async () => {
    await addDoc(movieCollectionRef, {
      title: movieTitle,
      releaseDate: releaseDate,
      receivedAnOscar: isAnOscar,
      userId:auth?.currentUser?.uid
    });
    console.log(movieTitle, releaseDate, isAnOscar);

    getMovieList();
  };

  const deleteMovie = async(id) => {
  const movieDoc = doc(db, "movies", id)

    try{
await deleteDoc(movieDoc)
    }
    catch(err){
      console.warn(err)
    }
  }
  const updatMovieTitle = async(id) => {
  const movieDoc = doc(db, "movies", id)

    try{
await updateDoc(movieDoc, {title:updateTitle})
getMovieList()
    }
    catch(err){
      console.warn(err)
    }
  }

  const uploadFile = async () => {
if(!fileUpload) return;
const filesFolderRef = ref(storage, `projectDocs/${fileUpload.name}`)

await uploadBytes(filesFolderRef, fileUpload)
  }

  return (
    <Flex flexDir="column" rowGap="25px">
      <Heading>Firebase Course</Heading>
      <Auth />

      <Box>
        <Input
          placeholder="Movie Title..."
          type="text"
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <Input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setReleaseDate(Number(e.target.value))}
        />
        <input type="checkbox" onChange={(e) => e.target.checked} />
        <label>Received Oscar</label>
        <Button onClick={submitMovie}>Submit Movie</Button>
      </Box>
      <Box>
        {movieList.map((movie) => (
          <Box>
            <Heading color={movie.receivedAnOscar ? "gold" : "black"}>
              {movie.title}
            </Heading>
            <Text>{movie.releaseDate}</Text>
            <Button onClick={()=>deleteMovie(movie.id)}>Delete Movie</Button>
            <Input placeholder=" New Title..."  onChange={(e) => setUpdateTitle(e.target.value)}/>
            <Button onClick={()=>updatMovieTitle(movie.id)}>Update TItle</Button>
          </Box>
        ))}
      </Box>

      <Box>
        <Input type="file" onChange={(e)=> setFileUpload(e.target.files[0])}/>
        <Button onClick={uploadFile}>Upload File</Button>
      </Box>
    </Flex>
  ); 
}

export default App;
