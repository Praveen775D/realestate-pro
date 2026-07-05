import {

  createContext,

  useEffect,

  useState,

} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [admin, setAdmin] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const user = localStorage.getItem("admin");

    if (user) {

      setAdmin(JSON.parse(user));

    }

    setLoading(false);

  }, []);

  const login = (user, token) => {

    localStorage.setItem(

      "admin",

      JSON.stringify(user)

    );

    localStorage.setItem("token", token);

    setAdmin(user);

  };

  const logout = () => {

    localStorage.clear();

    setAdmin(null);

  };

  return (

    <AuthContext.Provider

      value={{

        admin,

        login,

        logout,

        loading,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

};

export default AuthContext;