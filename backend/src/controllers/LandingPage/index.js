import ResponseHandler from "../../utils/ResponseHandler.js";

export const getLatestReviews = async (req, res) => {
  const reviewsList = [
    {
      avatar: "https://i.pravatar.cc/150?img=1",
      name: "Raaj Gupta",
      stars: 5,
      review:
        "Chat-Club helped me become fluent in English within 6 months. The conversations feel so natural!",
    },
    {
      avatar: "https://i.pravatar.cc/150?img=2",
      name: "Chandan Arya",
      stars: 5,
      review:
        "Finally learned Hindi properly! The AI understands context and helps with pronunciation perfectly.",
    },
    {
      avatar: "https://i.pravatar.cc/150?img=3",
      name: "Nirbhay",
      stars: 5,
      review:
        "As an expat in India, Chat-Club made learning Hindi fun and practical. Highly recommend!",
    },
    {
      avatar: "https://i.pravatar.cc/150?img=4",
      name: "Amit Verma",
      stars: 5,
      review:
        "Using Chat-Club daily improved my confidence to talk in English with friends and at work. Super helpful!",
    },
  ];

  try {
    return new ResponseHandler({
      success: true,
      statusCode: 200,
      message: "Latest reviews fetched successfully",
      data: reviewsList,
    }).send(res);
  } catch (error) {
    console.error("LandingPage getLatestReviews Controller:", error);

    return new ResponseHandler({
      success: false,
      statusCode: 500,
      message: "Failed to fetch latest reviews",
      errors: [error.message],
    }).send(res);
  }
};
