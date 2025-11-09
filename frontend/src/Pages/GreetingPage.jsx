import React from 'react';

const GreetingPage = () => {
  const hours = new Date().getHours();
  let greeting = '';
  if (hours < 12) greeting = 'Good Morning';
  else if (hours < 17) greeting = 'Good Afternoon';
  else greeting = 'Good Evening';

  return (
    <div className="h-[calc(100vh-65px)] w-[90%] mx-auto flex flex-col justify-center items-center text-center gap-4 p-4 bg-gray-50 font-playfair">
      <h1 className="text-3xl font-semibold text-gray-700">{greeting} 👋</h1>
      <h2 className="text-2xl font-medium text-gray-800">Welcome to Chat-Club</h2>
      <p className="text-gray-600 max-w-2xl text-base">
        A new way to learn English using Hinglish chat. Communicate your daily thoughts,
        discuss topics, and enjoy fun learning with friends and bots!
      </p>

      {/* Instructions Card */}
      <div className="mt-6 w-full max-w-3xl rounded-lg shadow-sm p-6 text-left bg-gray-50/60">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">📘 How to Use:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 font-tinos text-md">
          <li>🔍 <strong>Find friends</strong> by username and start chatting.</li>
          <li>👥 <strong>Create group chats</strong> with your friends.</li>
          <li>🤖 <strong>Chat with AI bot</strong> to improve your English.</li>
          <li>📝 <strong>Summarize chats</strong> and extract useful vocabulary.</li>
          <li>🎭 <strong>Roleplay mode:</strong> Choose a saved chat and let AI speak your friend’s lines in English. You reply back live in English and learn by acting!</li>
        </ul>
      </div>
    </div>
  );
};

export default GreetingPage;
