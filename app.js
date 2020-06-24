//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts =[]

// Example blog posts

posts.push({
  title: "Day 1",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan sit amet nulla facilisi morbi tempus iaculis. Turpis egestas integer eget aliquet nibh praesent tristique magna sit. Nunc faucibus a pellentesque sit amet. Viverra mauris in aliquam sem fringilla ut. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Id interdum velit laoreet id donec ultrices tincidunt. Dignissim diam quis enim lobortis scelerisque. Tincidunt eget nullam non nisi est."
}, {
  title: "Day 2",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim nec dui nunc mattis enim ut. Laoreet suspendisse interdum consectetur libero id faucibus. Senectus et netus et malesuada fames ac turpis. Magnis dis parturient montes nascetur. Vel turpis nunc eget lorem dolor sed viverra ipsum nunc. Viverra suspendisse potenti nullam ac. Vestibulum sed arcu non odio. Amet aliquam id diam maecenas. Donec ultrices tincidunt arcu non sodales neque sodales ut etiam."
}, {
  title: "Day 3",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent semper feugiat nibh sed pulvinar proin. At volutpat diam ut venenatis tellus in metus vulputate eu. Morbi quis commodo odio aenean sed. Ac tincidunt vitae semper quis lectus nulla at volutpat diam. Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros in. Fermentum et sollicitudin ac orci phasellus. Bibendum ut tristique et egestas quis ipsum suspendisse. Consequat interdum varius sit amet mattis vulputate enim nulla."
})

// Home Section

app.get("/", function(req, res) {
  res.render("home", {homeContent: homeStartingContent, posts: posts, _: _})
})

// About Section

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent})
})

// Contact Section

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent})
})

// Compose Section

app.get("/compose", function(req, res) {
  res.render("compose")
})

app.post("/compose", function(req, res) {
  const composeTitle = req.body.composeTitle
  const composeContent = req.body.composeContent
  const post = {
    title: composeTitle,
    content: composeContent,
  }
  posts.push(post)
  res.redirect("/")
})

// Post Detail

app.get("/posts/:title", function(req, res) {
  const title = _.lowerCase(req.params.title)

  posts.forEach(post => {
    if (_.lowerCase(post.title) === title) {
      res.render("post", {post: post})
    }
  })
  const post404 = {
    title: "Error 404",
    content: "Page not found."
  }
  res.render("post", {post: post404})
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
