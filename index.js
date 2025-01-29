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
    "Create content for a male audience, motivating, teasing in the form of a tweet, encouraging them to click through to Onlyfans or Fansly website, followed by the purchase of a subscription to me. It must not be vague and must be unique; must not be 280 characters and must be plain text. You can use emoji.";

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
