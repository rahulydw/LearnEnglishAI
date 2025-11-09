import { useEffect, useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from '@/components/ui/collapsible';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { FaComments, FaGoogle, FaPlay } from "react-icons/fa6";
import { FaRobot, FaKeyboard, FaUsers, FaUserFriends, FaSearch, FaBookOpen, FaUserPlus, FaLightbulb, FaBook, FaArrowUp } from "react-icons/fa";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { Github, Instagram, Linkedin, Loader2Icon, TwitterIcon } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import axios from 'axios';
import { useForm } from 'react-hook-form'
import ScrollToTopButton from '@/components/ScrollToTopButton';
import CustomDialog from '@/components/CustomDialog';
import GoogleAuth from '@/components/GoogleAuth';
import { useNavigate } from 'react-router-dom';
import { checkAuth, handleGoogleLogin, LatestReviews } from '@/services/AuthServices';


const LandingPage = () => {
  // State to manage open indexes for collapsible items
  const [openIndexes, setOpenIndexes] = useState([]);
  // Reviews Data
  const [reviews, setReviews] = useState([]);
  // React Hook Form
  const { register, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm();
  // Login & Signup Dialog
  const [openDialog, setOpenDialog] = useState(false);
  // Navigate route 
  const navigate = useNavigate();
  // Login with Gooogle Loader
  const [loading, setLoading] = useState(false);
  // MenuList
  const menuList = [
    { name: "Home", link: "#home" },
    { name: "Features", link: "#features" },
    { name: "Guide", link: "#guide" },
    { name: "Why Us", link: "#why-us" },
    { name: "Reviews", link: "#reviews" },
    { name: "Contact", link: "#contact" },
  ];

  // Features List
  const featuresList = [
    {
      title: "AI-Powered Conversations",
      description: "Chat with intelligent AI that understands your context and gives natural, human-like responses to help you learn effortlessly.",
      icon: FaRobot
    },
    {
      title: "Type in Hinglish, Get English",
      description: "Just type your message in Hinglish and instantly see its correct English version suggested by AI for easy learning.",
      icon: FaKeyboard
    },
    {
      title: "Connect with Multiple Users",
      description: "Chat and learn with different users at the same time. Practice real conversations and improve your English fluency.",
      icon: FaUsers
    },
    {
      title: "Create Your Own Groups",
      description: "Make private groups with your friends, chat together in Hinglish, and learn English in a fun, collaborative way.",
      icon: FaUserFriends
    },
    {
      title: "Find Public Users Like Social Media",
      description: "Search and connect with different public users, just like social media, to practice and expand your learning circle.",
      icon: FaSearch
    },
    {
      title: "Generate Vocabulary from Your Chats",
      description: "After chatting, get a complete list of useful vocabulary from your Hinglish chats with their English versions for easy revision.",
      icon: FaBookOpen
    }
  ];

  // How It Works List
  const stepsList = [
    {
      step: "Step 1: Sign Up & Join the Community",
      description: "Jaldi se sign up karo aur app ke andar apne dosto, naye users, ya AI tutor ke saath connect ho jao.",
      icon: FaUserPlus
    },
    {
      step: "Step 2: Chat in Hindi/Hinglish & See English Instantly",
      description: "Apne dosto ya AI ke saath Hinglish ya Hindi mein baat karo – turant uska sahi English version dekho aur seekho.",
      icon: FaComments
    },
    {
      step: "Step 3: Learn About Anything in English",
      description: "AI tutor se apne kaam, interests, ya topics par baat karo aur sath hi sath English bhi sikho – simple aur natural learning.",
      icon: FaLightbulb
    },
    {
      step: "Step 4: Build Your Daily Vocabulary List",
      description: "Apni daily chats se ek click mein automatic vocabulary list banao – Hindi se English words yaad karo aur roz better bano.",
      icon: FaBook
    }
  ];

  // Why Us List
  const benefitsList = [
    {
      title: "Flexible Learning Anytime",
      description: "No fixed schedule. Chat and learn whenever it suits you, from anywhere."
    },
    {
      title: "Real-Life Conversations",
      description: "Practice chats you’ll actually have with friends, colleagues, and new people."
    },
    {
      title: "Instant Translations & Corrections",
      description: "Type in Hindi or Hinglish and get instant, correct English versions to improve quickly."
    },
    {
      title: "Cultural Understanding",
      description: "Learn the right words and the cultural meaning behind them for real communication."
    }
  ];


  // Footer Social Media Links
  const socialLinks = [
    { icons: Github, link: "#", hover: "Github" },
    { icons: Linkedin, link: "#", hover: "Linkedin" },
    { icons: TwitterIcon, link: "#", hover: "Twitter" },
    { icons: Instagram, link: "#", hover: "Instagram" },
  ];

  // State to manage open indexes for collapsible items
  const toggleIndex = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter(i => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  // Contact Form :
  const onSubmit = (data) => {
    setTimeout(() => { }, 500)
    console.log("Form Data:", data);
    // yahan API call kar sakte ho
    reset(); // form clear after submit
  };

  // Sigin With Google Btn action
  const LoginWithgoogle = () => {
    setLoading(true);
    handleGoogleLogin();
  }

  // Login Form:
  const onSubmitLoginForm = async (data) => {
    try {
      const response = await axios.post('/api/auth/login', data, {
        withCredentials: true,
      });

      if (response.data.success) {
        navigate('/chat');
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };

  // // Dialog Content Login Form:
  const dialogConfig = {
    title: "Login to your account",
    desc: "Enter your credentials to access your dashboard",
    children: (
      <div>
        <div className='flex justify-center items-center'><Button className='cursor-pointer bg-blue-500 hover:bg-blue-600 text-white' onClick={LoginWithgoogle}>{loading ? (<div className='flex justify-center items-center'><Loader2Icon className="animate-spin h-4 w-4" /><span className='text-base font-tinos'>Logging in...</span></div>) : (<div className='flex justify-center items-center gap-2'><FaGoogle /><span className='text-center'>Login with Google</span></div>)}</Button></div>
        <form onSubmit={handleSubmit(onSubmitLoginForm)} className="space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full font-semibold py-2 rounded-md transition duration-200 cursor-pointer"
          >
            Login
          </Button>
        </form>
      </div>
    ),
  };

  // Check User Is Not Already Login:
  useEffect(() => {
  const check = async () => {
    try {
      const res = await checkAuth(); 
      if (res.success) {
        navigate("/chat");
      } else {
        navigate("/");
      }
    } catch (err) {
      navigate("/");
    }
  };

  check();
}, []);


  // Data Get using api:
  useEffect(() => {
    const Reviews = async () => {
      const responses = await LatestReviews();
      if (responses.success) {
        setReviews(responses.data);
      }
    };
    Reviews();
  }, []);

  return (
    <div className='max-w-full flex flex-col gap-5'>
      {/* Header */}
      <header className='sticky top-0 z-50 backdrop-blur-2xl w-full h-[60px] border-b flex justify-center items-center px-2 md:px-0'>
        <nav className='w-full md:w-[80%] h-full flex justify-between items-center'>
          {/* Logo + Brand Name */}
          <div className='flex justify-center items-center gap-3 md:gap-4 cursor-pointer'>
            <span className='flex justify-center items-center px-2 w-8 h-8 rounded-md text-white text-xl bg-neutral-800 hover:bg-neutral-900'>
              <FaComments />
            </span>
            <span className='text-2xl font-lobster tracking-wide text-neutral-600'>Talk-One</span>
          </div>
          {/* MenuList */}
          <ul className='hidden lg:flex justify-center items-center'>
            {menuList.map((item, index) => (
              <li key={index} className='relative group mx-4 text-neutral-600 hover:text-neutral-800 font-semibold cursor-pointer'>
                <a href={item.link}>{item.name}</a>
                <span className='absolute bottom-0 left-0 w-0 bg-neutral-700 h-[2px] transition-all duration-300 group-hover:w-full' />
              </li>
            ))}
          </ul>
          {/* Action Button */}
          <div className='flex justify-center items-center text-md md:text-xl gap-5 [&>button]:cursor-pointer'>
            <Button variant="outline" onClick={() => { setOpenDialog(prev => !prev) }} >Login</Button>
            <GoogleAuth />
          </div>
        </nav>
        {/* Login And Signup Dialog */}
        <CustomDialog
          open={openDialog}
          setOpen={setOpenDialog}
          title={dialogConfig.title}
          desc={dialogConfig.desc}
        >
          {dialogConfig.children}
        </CustomDialog>
      </header>

      {/* Home Section */}
      <section id='home' className='h-[calc(100vh-60px)] w-full flex justify-center items-start lg:items-center bg-[#fff]'>
        <article className='w-full pl-5 pr-4 md:px-0 md:w-[80%] flex flex-col lg:flex-row sm:mt-0 md:mt-0'>
          {/* Left Box */}
          <article className='w-full sm:h-1/2 lg:w-2/3'>
            <h1 className='w-full text-2xl sm:text-4xl lg:text-6xl font-bold md:font-semibold font-Poppins tracking-wide lg:w-[80%] md:leading-12 lg:leading-18'>Learn English Through Natural Hinglish Conversations</h1>
            <p className='text-sm md:text-lg font-semibold tracking-wider w-[90%] md:w-[80%] lg:w-[70%] text-neutral-700 mt-5 leading-6 md:leading-8'>Practice English with Hinglish Conversations. Proven by educators, this is the easiest way to learn daily-use words and real-life speaking skills naturally.</p>
            <div className='flex justify-start items-center my-8 gap-6 sm:gap-15 md:gap-10 [&>button]:cursor-pointer'>
              <Button className='px-8'>Start Learning</Button>
              <Button variant="outline" className='ml-3 px-4 flex justify-center items-center gap-2'><FaPlay /><span>Watch Demo Free</span></Button>
            </div>
          </article>
          {/* Right Box */}
          <article className='w-full sm:h-1/2 lg:w-2/3 flex justify-center items-center'>
            <AspectRatio ratio={1 / 1} className='w-full h-full mt-15 sm:my-4 md:mt-0 sm:flex justify-center items-start'>
              <img
                src="/final1.jpg"
                alt="Photo by Drew Beamer"
                className="w-full sm:w-[80%] h-full sm:h-[80%] lg:h-full lg:w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </AspectRatio>
          </article>
        </article>
      </section>

      {/* Features Section */}
      <section id='features' className='w-full md:h-screen flex flex-col justify-center items-center bg-[#fff] mt-5'>
        <div className='flex flex-col justify-center items-center mb-10'>
          <span className='text-2xl md:text-3xl font-semibold font-poppins tracking-wide text-neutral-700'>Powerful Features for Learners</span>
          <p className='text-sm md:text-lg font-semibold font-tinos text-neutral-600'>Hinglish likho, English sikho – sab kuch ek hi jagah par!</p>
        </div>
        {/* Features grid */}
        <div className='w-[80%] grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-5'>
          {featuresList.map((features, index) => {
            const Icon = features.icon;
            return (
              <div key={index} className='flex flex-col border bg-[#ffffff] shadow-xl hover:shadow-2xl rounded-xl py-10 px-5 group'>
                <span className='w-10 h-10 bg-neutral-800 rounded-md mb-5 flex justify-center items-center'>
                  <Icon className='text-2xl text-white group-hover:text-blue-600' />
                </span>
                <span className='mb-4 font-spaceGrotesk font-semibold text-xl text-neutral-500'>{features.title}</span>
                <p className='font-tinos text-md text-neutral-800'>{features.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Guide Section */}
      <section id='guide' className='w-full md:h-screen flex flex-col justify-center items-center bg-[#f9f9f9]'>
        <div className='flex flex-col justify-center items-center my-10'>
          <span className='text-2xl md:text-3xl font-semibold font-poppins tracking-wider text-neutral-700'>How It Works</span>
          <p className='text-sm md:text-lg font-semibold font-tinos text-neutral-600'>Learn English naturally through engaging conversations.</p>
        </div>
        {/* Steps grid */}
        <div className='w-[80%] grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-5'>
          {stepsList.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className='flex flex-col border bg-[#ffffff] shadow-xl hover:shadow-2xl rounded-xl py-10 px-5 group'>
                <span className='w-10 h-10 bg-neutral-800 rounded-md mb-5 flex justify-center items-center'>
                  <Icon className='text-2xl text-white group-hover:text-blue-600' />
                </span>
                <span className='mb-4 font-spaceGrotesk font-semibold text-xl text-neutral-500'>{step.step}</span>
                <p className='font-tinos text-md text-neutral-800'>{step.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Why Us Section */}
      <section id='why-us' className='w-full lg:h-screen flex flex-col justify-center items-center mt-10 bg-[#fff]'>
        <div className='flex flex-col justify-center items-center mb-5'>
          <span className='text-2xl md:text-3xl font-semibold font-poppins tracking-wide text-neutral-700'>Why Choose Us?</span>
          <p className='text-sm md:text-lg font-semibold font-tinos text-neutral-600'>Flexible, natural learning that fits your life.</p>
        </div>
        {/* Benefits Container */}
        <div className='w-full lg:w-[80%] flex flex-col md:flex-row justify-center lg:items-center gap-5 mt-10'>
          {/* Left Collapsible Box */}
          <article className='w-full md:w-1/2 flex flex-col justify-center items-center gap-5 px-5'>
            {benefitsList.map((benefit, index) => (
              <Collapsible
                key={index}
                className='w-full'
                open={openIndexes.includes(index)}
                onOpenChange={() => toggleIndex(index)}
              >
                <CollapsibleTrigger className='flex text-md justify-between items-center w-full p-4 border-b cursor-pointer hover:bg-neutral-100'>
                  <span className='font-semibold'>{benefit.title}</span>
                  <span className='text-neutral-500'>
                    {openIndexes.includes(index) ? '–' : '+'}
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent className='p-4'>
                  <p className='text-neutral-600'>{benefit.description}</p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </article>

          {/* Right Image Container */}
          <div className='hidden w-full md:w-1/2 md:flex justify-center items-center'>
            <AspectRatio ratio={16 / 9} className='w-full h-full mt-15 md:mt-0'>
              <img
                src="/final3.jpg"
                alt="Photo by Drew Beamer"
                className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id='reviews' className='w-full md:h-[60vh] flex flex-col justify-center items-center bg-[#f9f9f9]'>
        <div className='flex flex-col justify-center items-center mb-10'>
          <span className='text-2xl md:text-3xl font-semibold font-poppins tracking-wide text-neutral-700'>What Our Users Say</span>
          <p className='text-sm md:text-lg font-semibold font-tinos text-neutral-600'>Real feedback from real users.</p>
        </div>
        {/* Reviews grid */}
        <div className='w-[80%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
          {reviews.map((review, index) => (
            <div key={index} className='bg-white p-5 rounded-lg shadow-md hover:shadow-2xl'>
              <Avatar className="hover:scale-150 transition-all duration-300 ease-linear cursor-pointer">
                <AvatarImage src={review.avatar} alt={review.name} />
                <AvatarFallback className='w-16 h-16 rounded-full'> {review.name.charAt(0)} </AvatarFallback>
              </Avatar>
              <h3 className='text-lg font-semibold text-neutral-800 mt-3'>{review.name}</h3>
              <div className='flex items-center mt-1'>
                {[...Array(review.stars)].map((_, i) => (
                  <span key={i} className='text-yellow-500'>★</span>
                ))}
              </div>
              <p className='text-sm text-neutral-600 mt-2'>{review.review}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id='contact' className='w-full md:h-[60vh] flex flex-col justify-center items-center bg-[#fff]'>
        <div className='flex flex-col justify-center items-center mb-10'>
          <span className='text-2xl md:text-3xl font-semibold font-poppins tracking-wide text-neutral-700'>Get in Touch</span>
          <p className='text-sm md:text-lg font-semibold font-tinos text-neutral-600'>We'd love to hear from you!</p>
        </div>
        {/* Container Box */}
        <div className='w-full md:w-[80%] flex flex-col md:flex-row justify-between items-start gap-5 px-5'>
          {/* Left Box */}
          <article className='hidden w-full md:w-1/3 lg:flex flex-col justify-center items-start gap-5'>
            {/* About Chat Club */}
            <h3 className='text-lg font-semibold text-neutral-800 font-poppins'>About Chat Club</h3>
            <p className='text-lg text-neutral-800 font-playfair'>Chat-Club is a modern, AI-powered language learning platform designed for real-world use. Whether you want to improve your English, practice Hindi, or learn through Hinglish conversations - Chat-Club helps you do it naturally.</p>
          </article>
          {/* Right Box */}
          <article className='w-full lg:w-2/3 flex flex-col justify-center items-center lg:items-end gap-5'>
            {/* Contact Form  */}
            <form onSubmit={handleSubmit(onSubmit)} className='w-full lg:w-[80%] flex flex-col gap-5'>
              <input {...register("name")} type="text" placeholder="Your Name" className='p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
              <input {...register("email")} type="email" placeholder="Your Email" className='p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
              <textarea {...register("msg")} placeholder="Your Message" className='p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32'></textarea>
              <Button type="submit" disabled={isSubmitting} className='px-8 cursor-pointer di'>{isSubmitting ? "Sending..." : "Send Message"}</Button>
            </form>
          </article>
        </div>
      </section>

      {/* Footer Section */}
      <div className='w-full md:h-[30vh] bg-neutral-900 flex flex-col justify-between items-around px-10'>
        <div className='w-full flex flex-col md:flex-row justify-around items-center mt-10'>
          {/* Box-1 */}
          <div className='md:w-md flex justify-center items-start flex-col'>
            <div className='flex justify-start items-center gap-3 md:gap-4 cursor-pointer'>
              <span className='flex justify-center items-center px-2 w-8 h-8 rounded-md text-white bg-neutral-800 hover:bg-neutral-900'>
                <FaComments />
              </span>
              <span className='text-2xl font-lobster tracking-wide text-neutral-200'>Chat-Club</span>
            </div>
            <p className='w-[70%] text-md text-neutral-400 font-semibold font-tinos my-5'>Chat-Club is your friendly platform to learn English through Hindi real conversations.</p>
          </div>

          {/* Box-2 */}
          <div className='md:w-md flex flex-col md:flex-row justify-between items-center gap-2 md:gap-5'>
            <div className='flex flex-col gap-2'>
              <span className='text-lg font-semibold text-neutral-200'>Menu Links</span>
              <div className='grid grid-cols-5 md:grid-cols-3 gap-5'>
                {menuList.map((item, index) => (
                  <div key={index} className='relative group block my-1'>
                    <a href={item.link} className='text-sm text-sky-200 hover:text-blue-800 font-semibold cursor-pointer'>
                      {item.name}
                    </a>
                    <span className='absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all duration-500 ease-linear'></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Box-3 */}
          <div className='md:w-md flex justify-center md:justify-end items-center md:items-start py-5 md:py-0'>
            <ul className='grid  grid-cols-4  text-neutral-200 gap-5 [&>li]:hover:text-blue-700 [&>li]:cursor-pointer'>
              {socialLinks.map((link, index) => {
                const Icons = link.icons;
                return (
                  <Tooltip key={index} >
                    <TooltipTrigger>
                      <li className='flex justify-start items-center gap-2 text-lg font-semibold cursor-pointer'>
                        <Icons className='text-xl hover:text-blue-700' />
                      </li>
                    </TooltipTrigger>
                    <TooltipContent>
                      <a href={link.link} target="_blank" rel="noopener noreferrer" className='text-white-600 hover:underline'>{link.hover}</a>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <footer className='pb-2 text-sm text-neutral-100 text-center font-semibold tracking-wide'>Designed & Developed by <a href="https://linkedin.com/in/iamrahulydw" target="_blank" rel="noopener noreferrer" className='text-sky-200 hover:underline'>Rahul Kumar</a> © {new Date().getFullYear()}</footer>
      </div>
      {/* Help Sticky Button */}
      <ScrollToTopButton />
    </div>
  )
}

export default LandingPage;