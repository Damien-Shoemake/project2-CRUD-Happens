const router = require("express").Router()
const withAuth = require("../utils/auth")
require("dotenv").config()
const request = require("request")

router.get("/", async (req, res) => {
  try {
    request.get(
      {
        url: "https://api.api-ninjas.com/v1/bucketlist",
        headers: {
          "X-Api-Key": process.env.API_KEY,
        },
      },
      function (error, response, body) {
        if (error) return console.error("Request failed:", error)
        else if (response.statusCode != 200)
          return console.error(
            "Error:",
            response.statusCode,
            body.toString("utf8")
          )
        else res.send(body)
      }
    )
  } catch (err) {}
})

module.exports = router
