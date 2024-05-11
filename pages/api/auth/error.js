// pages/api/auth/error.js
export default function handler(req, res) {
  const { method } = req;

  // Only allow POST requests to this endpoint
  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  // Extract error details from the request body
  const { errorType, errorMessage } = req.body;

  // Log the error or perform other error handling here
  console.error("Auth Error:", errorType, errorMessage);

  // Respond with an error message and appropriate HTTP status code
  switch (errorType) {
    case "TOKEN_EXPIRED":
      res
        .status(401)
        .json({ error: true, message: "Your session has expired." });
      break;
    case "INVALID_CREDENTIALS":
      res
        .status(403)
        .json({ error: true, message: "Invalid credentials provided." });
      break;
    case "UNAUTHORIZED_ACCESS":
      res
        .status(403)
        .json({
          error: true,
          message: "You are not authorized to access this resource.",
        });
      break;
    default:
      res
        .status(400)
        .json({
          error: true,
          message: "An unknown authentication error occurred.",
        });
      break;
  }
}
