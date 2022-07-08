import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../redux/features/user/userSlice";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userState = useSelector((state) => state.user);
  const { users } = userState;
  const dispatch = useDispatch();
  const UID = localStorage.getItem("uid");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = () => {
      const user = users.find((user) => user._id === UID);
      !!user && setCurrentUser(user);
      setLoading(false);
    };

    unsubscribe();
  }, [users, UID]);

  const login = (email, password) => {
    const user = users.find((user) => user.email === email);
    if (user.email === email && user.password === password) {
      localStorage.setItem("uid", user._id);
    } else {
      throw new Error("Incorrect Email or Password");
    }
  };

  const logout = () => {
    !!UID && localStorage.removeItem("uid");
    setCurrentUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
