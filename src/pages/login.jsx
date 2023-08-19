// This is the login page
// This page will fetch the data and check if the entered user name and password is there in dummyJSON serve
// If not it will show the appropriate error on the login section
// After successful authentication it will save the id and token to localstorage for profile page reference and
// it will redirect us to the profile page

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  let [user, setUser] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    localStorage.clear();
    setError("");
    setLoading(true);

    let json = "";
    let response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user,
        password: password,
      }),
    });

    if (response.ok) {
      json = await response.json();
      localStorage.setItem("id", json.id);
      localStorage.setItem("token", json.token);
      navigate("/profile");
    } else {
      let data = await response.json();
      setError(data.message);
      setLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-screen flex items-center justify-center">
      <form className="text-xl font-[500] text-black flex flex-col rounded-3xl w-1/3 p-12 backdrop-blur-md bg-white/30 h-[80%] gap-8 md:w-1/2 sm:w-[90%] sm:h-[90%] sm:p-8 xs:p-4 tall:w-[60%]">
        <div className="relative mt-4">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={user}
            className="peer h-12 w-full bg-transparent border-b-2 border-slate-600 outline-none hover: placeholder:text-black "
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
          <label
            htmlFor="username"
            className="absolute -top-6 left-0 transition-all text-slate-800 peer-placeholder-shown:text-transparent"
          >
            Username
          </label>
        </div>

        <div className="relative mt-4">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            className="peer h-12 w-full bg-transparent border-b-2 border-slate-600 outline-none hover: placeholder:text-black "
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label
            htmlFor="password"
            className="absolute -top-6 left-0 transition-all text-slate-800 peer-placeholder-shown:text-transparent"
          >
            Password
          </label>
        </div>

        <div className="mt-4">
          <input
            type="submit"
            value="Login"
            className="self-start w-1/3 rounded-lg h-12 bg-slate-800 text-sky-200 cursor-pointer inline-block"
            onClick={handleSubmit}
          />
          {"  "}
          {loading && (
            <img
              src="./loading.png"
              width="50px"
              className="inline-block animate-spin ml-8"
            />
          )}
        </div>
        {error !== "" && <div>{error}</div>}

        <div className="flex-1 flex items-end justify-between pl-2 md:flex-col md:justify-end md:items-start md:gap-4">
          <div>
            <a href="https://dummyjson.com/users" target="_blank">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c9/JSON_vector_logo.svg"
                alt="dummyJSON_vector_logo"
                width="30px"
                className="inline-block align-middle md:hidden"
              />{" "}
              dummy<b>JSON</b>
            </a>
          </div>
          <div>
            <a
              href="https://github.com/mayur5c/f4-contest-3"
              target="_blank"
            >
              GitHub{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="mdi-github"
                viewBox="0 0 30 24"
                width="40px"
                className="inline-block"
              >
                <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
              </svg>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
