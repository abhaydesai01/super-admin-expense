import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import SigninImage from "../../assets/sign-in/sign-in.png";
import SigninImage2 from "../../assets/sign-in/sign-in2.png";

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };

  return (
    <div className="h-[100vh] w-[100%] flex flex-col md:flex-row justify-center lg:justify-between items-center ">
      {/* left container */}
      <div className="hidden md:flex flex-col justify-center items-center w-[50%] h-[100vh] bg-gray-200">
        <div className="h-auto w-[80%] flex flex-col justify-center items-start gap-y-4">
          <div>
            <h1 className="font-bold text-3xl pb-2">Dashboard</h1>
            <p className="text-md font-semibold text-gray-600">
              Manage your team and expenses in a easy way
            </p>
          </div>
          <div className="w-full h-[70vh]">
            <Slider {...settings}>
              <div>
                <img
                  src={SigninImage}
                  alt="signin-image"
                  className="h-auto w-[60%] object-cover"
                ></img>
              </div>
              <div>
                <img
                  src={SigninImage2}
                  alt="signin-image"
                  className="h-auto w-[100%] "
                ></img>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      {/* right container */}
      <div className="flex justify-center items-center px-4 w-full lg:w-[50%]">
        <div className="flex flex-col justify-center gap-y-4 w-full lg:w-[60%]">
          <h1 className="text-3xl font-semibold text-black">
            Sign in to Dashboard
          </h1>
          <form className="relative flex flex-col justify-center items-center w-full gap-y-4 py-6">
            <div className="flex flex-col items-start w-full">
              <label htmlFor="email" className="font-semibold px-2 pb-2">
                Email
              </label>
              <input
                type="email"
                className="border border-custom-blue text-sm rounded-md px-2 py-2 w-full focus:outline-none"
                placeholder="input your email in here"
              />
            </div>
            <div className="relative flex flex-col items-start w-full">
              <label htmlFor="password" className="font-semibold px-2 pb-2">
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                className="border border-custom-blue text-sm rounded-md px-2 py-2 w-full focus:outline-none"
                placeholder="input your password in here"
              />
              <span
                onClick={handlePasswordVisibility}
                className="absolute bottom-2 right-2 text-gray-500"
              >
                {passwordVisible ? (
                  <IoEyeOutline size={19} />
                ) : (
                  <IoEyeOffOutline size={19} />
                )}
              </span>
            </div>
            <button className="text-gray-400 text-sm font-semibold absolute right-0 bottom-0">
              Forgot Password?
            </button>
          </form>

          <div className="flex flex-col justify-center items-center w-full gap-y-2">
            <Link to="/dashboard" className=" w-full">
              <button className="bg-custom-blue text-white py-2 text-md rounded-md w-full">
                sign in
              </button>
            </Link>
            <button className="border border-custom-blue py-2 text-md rounded-md w-full">
              sign in with google
            </button>
            <p className="text-gray-400 text-md">or</p>
            <p className="text-gray-400">
              Doesnt have an account?{" "}
              <span className="text-custom-blue font-semibold">
                Sign up now
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
