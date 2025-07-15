import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from '@/components/ui/collapsible';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { FaComments, FaPlay } from "react-icons/fa6";
import { FaRobot, FaKeyboard, FaUsers, FaUserFriends, FaSearch, FaBookOpen, FaUserPlus, FaLightbulb, FaBook } from "react-icons/fa";
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Github, Instagram, Linkedin, TwitterIcon } from 'lucide-react';
import {Tooltip,TooltipContent,TooltipTrigger} from "@/components/ui/tooltip"

const LandingPage = () => {
  // State to manage open indexes for collapsible items
  const [openIndexes, setOpenIndexes] = useState([]);

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

  // Reviews List
  const reviewsList = [
    {
      avatar: "https://i.pravatar.cc/150?img=1",
      name: "Priya Sharma",
      stars: 5,
      review: "Chat-Club helped me become fluent in English within 6 months. The conversations feel so natural!"
    },
    {
      avatar: "https://i.pravatar.cc/150?img=2",
      name: "Raj Patel",
      stars: 5,
      review: "Finally learned Hindi properly! The AI understands context and helps with pronunciation perfectly."
    },
    {
      avatar: "https://i.pravatar.cc/150?img=3",
      name: "Sarah Johnson",
      stars: 5,
      review: "As an expat in India, Chat-Club made learning Hindi fun and practical. Highly recommend!"
    },
    {
      avatar: "https://i.pravatar.cc/150?img=4",
      name: "Amit Verma",
      stars: 5,
      review: "Using Chat-Club daily improved my confidence to talk in English with friends and at work. Super helpful!"
    }
  ];

  // Footer Social Media Links
  const socialLinks = [
    {icons: Github, link:"#", hover: "Github"},
    {icons: Linkedin, link:"#", hover: "Linkedin"},
    {icons: TwitterIcon, link:"#", hover: "Twitter"},
    {icons: Instagram, link:"#", hover: "Instagram"},
  ];

  // State to manage open indexes for collapsible items
  const toggleIndex = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter(i => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };
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
            <span className='text-2xl font-lobster tracking-wide text-neutral-600'>Chat-Club</span>
          </div>
          {/* MenuList */}
          <ul className='hidden md:flex justify-center items-center'>
            {menuList.map((item, index) => (
              <li key={index} className='relative group mx-4 text-neutral-600 hover:text-neutral-800 font-semibold cursor-pointer'>
                <a href={item.link}>{item.name}</a>
                <span className='absolute bottom-0 left-0 w-0 bg-neutral-700 h-[2px] transition-all duration-300 group-hover:w-full' />
              </li>
            ))}
          </ul>
          {/* Action Button */}
          <div className='flex justify-center items-center text-md md:text-xl gap-5 [&>button]:cursor-pointer'>
            <Button variant="outline">Login</Button>
            <Button>Sign Up</Button>
          </div>
        </nav>
      </header>

      {/* Home Section */}
      <section id='home' className='h-[calc(100vh-60px)] w-full flex justify-center items-start md:items-center bg-[#fff]'>
        <article className='w-full pl-5 pr-4 md:px-0 md:w-[80%] flex flex-col md:flex-row mt-20 md:mt-0'>
          {/* Left Box */}
          <article className='w-full md:w-2/3'>
            <h1 className='w-full text-2xl md:text-6xl font-bold md:font-semibold font-Poppins tracking-wide md:w-[80%] '>Learn English Through Natural Hinglish Conversations</h1>
            <p className='text-sm md:text-lg font-semibold tracking-wider w-[90%] md:w-[70%] text-neutral-700 mt-5'>Practice English with Hinglish Conversations. Proven by educators, this is the easiest way to learn daily-use words and real-life speaking skills naturally.</p>
            <div className='flex justify-start items-center my-8 gap-6 md:gap-10 [&>button]:cursor-pointer'>
              <Button className='px-8'>Start Learning</Button>
              <Button variant="outline" className='ml-3 px-4 flex justify-center items-center gap-2'><FaPlay /><span>Watch Demo Free</span></Button>
            </div>
          </article>
          {/* Right Box */}
          <article className='w-full md:w-1/3 flex justify-center items-center'>
            <AspectRatio ratio={1 / 1} className='w-full h-full mt-15 md:mt-0'>
              <img
                src="/img2.jpg"
                alt="Photo by Drew Beamer"
                fill
                className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </AspectRatio>
          </article>
        </article>
      </section>

      {/* Features Section */}
      <section id='features' className='w-full md:h-screen flex flex-col justify-center items-center bg-[#fff]'>
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
      <section id='why-us' className='w-full md:h-screen flex flex-col justify-center items-center mt-10 bg-[#fff]'>
        <div className='flex flex-col justify-center items-center mb-5'>
          <span className='text-2xl md:text-3xl font-semibold font-poppins tracking-wide text-neutral-700'>Why Choose Us?</span>
          <p className='text-sm md:text-lg font-semibold font-tinos text-neutral-600'>Flexible, natural learning that fits your life.</p>
        </div>
        {/* Benefits Container */}
        <div className='w-full md:w-[80%] flex flex-col md:flex-row justify-center md:items-center gap-5'>
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
            <AspectRatio ratio={1 / 1} className='w-full h-full mt-15 md:mt-0'>
              <img
                src="/img2.jpg"
                alt="Photo by Drew Beamer"
                fill
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
        <div className='w-[80%] grid grid-cols-1 md:grid-cols-4 gap-5'>
          {reviewsList.map((review, index) => (
            <div key={index} className='bg-white p-5 rounded-lg shadow-md'>
              <Avatar>
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
      <section className='w-full md:h-[60vh] flex flex-col justify-center items-center bg-[#fff]'>
        <div className='flex flex-col justify-center items-center mb-10'>
          <span className='text-2xl md:text-3xl font-semibold font-poppins tracking-wide text-neutral-700'>Get in Touch</span>
          <p className='text-sm md:text-lg font-semibold font-tinos text-neutral-600'>We'd love to hear from you!</p>
        </div>
        {/* Container Box */}
        <div className='w-full md:w-[80%] flex flex-col md:flex-row justify-between items-start gap-5 px-5'>
          {/* Left Box */}
          <article className='hidden w-full md:w-1/3 md:flex flex-col justify-center items-start gap-5'>
            {/* About Chat Club */}
            <h3 className='text-lg font-semibold text-neutral-800 font-poppins'>About Chat Club</h3>
            <p className='text-lg text-neutral-800 font-playfair'>Chat-Club is a modern, AI-powered language learning platform designed for real-world use. Whether you want to improve your English, practice Hindi, or learn through Hinglish conversations - Chat-Club helps you do it naturally.</p>
          </article>
          {/* Right Box */}
          <article className='w-full md:w-2/3 flex flex-col justify-center items-end gap-5'>
            {/* Contact Form  */}
            <form className='w-full md:w-[80%] flex flex-col gap-5'>
              <input type="text" placeholder="Your Name" className='p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
              <input type="email" placeholder="Your Email" className='p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
              <textarea placeholder="Your Message" className='p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32'></textarea>
              <Button type="submit" className='px-8 cursor-pointer'>Send Message</Button>
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
              <span className='flex justify-center items-center px-2 w-8 h-8 rounded-md text-white text-xl bg-neutral-800 hover:bg-neutral-900'>
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
                            <Icons className='text-xl hover:text-blue-700'/>
                        </li>
                      </TooltipTrigger>
                      <TooltipContent>
                        <a href={link.link} target="_blank" rel="noopener noreferrer" className='text-white-600 hover:underline'>{link.hover}</a>
                      </TooltipContent>
                    </Tooltip>
                  )})}
                </ul>
          </div>

        </div>

        {/* Bottom Footer */}
        <footer className='pb-2 text-sm text-neutral-100 text-center font-semibold tracking-wide'>Designed & Developed by <a href="https://linkedin.com/in/iamrahulydw" target="_blank" rel="noopener noreferrer" className='text-sky-200 hover:underline'>Rahul Kumar</a> © {new Date().getFullYear()}</footer>
      </div>
    </div>
  )
}

export default LandingPage;