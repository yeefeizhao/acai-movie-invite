import PartyList from "./PartyList";
import SignIn from "./SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Header from "./Header";
import "./App.css";

const App = () => {
    const [user] = useAuthState(auth);
    return (
        <div>
            <Header />
            {user ? <PartyList user={user} /> : <SignIn />}
        </div>
    );
};

export default App;
