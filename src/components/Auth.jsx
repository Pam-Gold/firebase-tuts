import { Box, Button, Input } from "@chakra-ui/react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.warn(err);
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <Box>
      <Input
        type="email"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={signIn}>Sign In</Button>
      <Button onClick={signInWithGoogle}>Sign In with Google</Button>
      <Button onClick={logOut}>Sign Out</Button>
    </Box>
  );
};

export { Auth };
