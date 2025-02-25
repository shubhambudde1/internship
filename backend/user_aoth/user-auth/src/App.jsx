import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register setUser={setUser} />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Login setUser={setUser} />} />
            </Routes>
        </Router>
    );
}

export default App;
