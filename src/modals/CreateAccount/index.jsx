import React, {useState} from "react";
import { Heading, Button, Img, CheckBox, Input } from "../../components";
import { default as ModalProvider } from "react-modal";
import { Link } from "react-router-dom";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";

export default function CreateAccount({ isOpen, ...props }) {

  const [passwordVisible, setPasswordVisible] = useState(false)
  //to store the form data and be used for client side validation
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
//handling the password toggle
  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateInputs = () => {
    //retrieving the values from the document
    setFormData({firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      userName: document.getElementById("userName").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
    console.log(formData)
    let  {firstName, lastName, userName, email, password} = formData ;
    //to check and alert for any empty field
    if (!firstName || !lastName || !userName || !email || !password) {
      alert("Please fill in all fields.");
      return false;
    }
    //attempted email validation
    if(!email.includes('@')){
      alert("Please enter a valid email")
      return false
    }
      return true;
  };

  const handleSubmit = () => {
    if (!validateInputs()) return;

    fetch("https://estate-api-wn9c.onrender.com/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Account created successfully:", data);
      })
      .catch((error) => {
        console.error("Error creating account:", error);
      });

    console.log("You have signed up successfully")
  };


  return (
    <ModalProvider {...props} appElement={document.getElementById("root")} isOpen={isOpen} className="min-w-[480px]">
      <div className="flex flex-row justify-center w-full p-[29px] sm:p-5 border-blue_gray-100_01 border border-solid bg-white-A700 rounded-[10px]">
        <div className="flex flex-col items-center justify-start w-full mt-2.5 mb-[7px] gap-[29px]">
          <div className="flex flex-col items-start justify-start w-full gap-[15px]">
            <div className="flex flex-col items-center justify-start w-full gap-6">
              <div className="flex flex-row justify-between items-center w-full">
                <Heading size="4xl" as="h1" className="tracking-[-0.72px]">
                  Create Account
                </Heading>
                <Button size="sm" shape="square" className="w-[30px] hover:bg-white-A700 hover:text-black hover:border-black hover: border-[0.25px] duration-700 transition-all">
                  <FaTimes className="rounded-sm "/>
                </Button>
              </div>
              <div className="flex flex-row md:flex-col justify-center w-full gap-5">
                <div className="flex flex-col items-center justify-start w-[60%] md:w-full gap-5">
                  <Input
                    shape="round"
                    type="text"
                    name="First Name"
                    placeholder="First Name"
                    id="firstName"
                    prefix={<Img src="images/img_icon_24px_user.svg" alt="First Name" />}
                    className="w-full gap-3.5 font-semibold border-blue_gray-100_01 border border-solid text-black"
                    onChange={handleInputChange}
                  />
                  <Input
                    shape="round"
                    type="text"
                    name="Last Name"
                    id="lastName"
                    placeholder="Last Name"
                    onChange={handleInputChange}
                    prefix={<Img src="images/img_icon_24px_user.svg" alt="Last Name" />}
                    className="w-full gap-3.5 font-semibold border-blue_gray-100_01 border border-solid text-black"
                  />
                  <Input
                    shape="round"
                    type="text"
                    name="User Name"
                    id="userName"
                    placeholder="User Name"
                    onChange={handleInputChange}
                    prefix={<Img src="images/img_user_icon.svg" alt="Last Name" />}
                    className="w-full gap-3.5 font-semibold border-blue_gray-100_01 border border-solid text-black "
                  />
                  <Input 
                    shape="round"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    prefix={<Img src="images/img_icon_24px_email.svg" alt="icon / 24px / email" />}
                    className="w-full gap-3.5 font-semibold border-blue_gray-100_01 border border-solid text-black"
                    onChange={handleInputChange}
                  />
                  <Input
                    shape="round"
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    id="password"
                    prefix={<Img src="images/img_icon_20px_lock.svg" alt="Lock" />}
                    suffix={
                      <span onClick={handlePasswordVisibility} className="cursor-pointer" >
                        {passwordVisible ? <FaEyeSlash color={"gray"} /> : <FaEye color={"gray"} />}
                      </span>
                    }
                    className="w-full gap-3.5 font-semibold border-blue_gray-100_01 border border-solid focus:outline-none text-black"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <CheckBox
              shape="round"
              name="check_list"
              label="I agree to all Terms & Conditions"
              id="checklist"
              className="gap-2 !text-gray-600_02 text-left font-bold my-2 mx-auto"
            />
          </div>
          <div className="flex flex-col items-center justify-start w-[60%] gap-[18px]">
            <Button size="4xl" shape="round" className="w-full sm:px-5 font-bold" onClick={handleSubmit}>
              Create Account
            </Button>
            <Button
              color="white_A700"
              size="4xl"
              shape="round"
              leftIcon={<Img src="images/img_icon_20px_google.svg" alt="icon / 20px / google" />}
              className="w-full gap-2.5 sm:px-5 text-gray-900 font-bold border-gray-600_02 border border-solid"
            >
              Create Account with Google
            </Button>
          </div>
          <div className="h-px w-full bg-blue_gray-100_01" />
          <div className="flex flex-row md:flex-col justify-center w-full gap-2">
            <a href="#" className="mb-px ml-[196px] md:ml-5">
              <Heading size="lg" as="h2" className="!text-gray-600_02 tracking-[-0.40px] text-center">
                Have an account?
              </Heading>
            </a>
            <a href="#" className="mr-[196px] md:mr-5">
              <Heading size="lg" as="h3" className="tracking-[-0.40px]">
                <Link to='/login'>
                  Log in
                </Link>
              </Heading>
            </a>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
}
