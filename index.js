// By VishwaGauravIn (https://itsvg.in)

const { OpenAI } = require("openai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.APP_KEY,
  appSecret: SECRETS.APP_SECRET,
  accessToken: SECRETS.ACCESS_TOKEN,
  accessSecret: SECRETS.ACCESS_SECRET,
});

const openai = new OpenAI({ apiKey: SECRETS.OPENAI_API_KEY });

async function run() {
  // Write your prompt here
  const prompt =
    "Generate a web development content, tips and tricks or something new or some rant or some advice as a tweet. It should not be vague and should be unique; under 280 characters and should be plain text. You can use emojis.";

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "system", content: "You are an assistant generating tweets." }, { role: "user", content: prompt }],
    max_tokens: 100,
  });

  const text = response.choices[0].message.content;
  console.log(text);
  sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}
