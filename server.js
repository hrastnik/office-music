var express = require("express");
var bodyparser = require("body-parser");
var http = require("http");
var { youtube } = require("googleapis");

var youtubeAPI = youtube({
  version: "v3"
});
// Create an instance of the express app
const app = express();

app.use(bodyparser.json());

app.get("/search/:query", function(req, res) {
  var searchQuery = req.params.query;

  youtubeAPI.search.list(
    {
      part: "snippet",
      q: searchQuery,
      key: "AIzaSyBa15Tik9fTA9fv_mBtIabCfgcjiChiMg0"
    },
    function(error, response) {
      if (error != null) {
        console.error("Error searching for videos\n\n", error);
        res.send({ error: "Error searching for videos" });
        return;
      }

      var data = response.data.items.map(video => {
        return {
          id: video.id.videoId,
          kind: video.id.kind,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.default.url
        };
      });

      res.send(data);
    }
  );
});

// Static content
app.use(express.static("./static"));

app.listen(3000, () => console.log("Listening on port 3000"));
