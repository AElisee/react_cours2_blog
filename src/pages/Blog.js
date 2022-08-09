import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import Article from "../components/Article";
import Card from "../components/Card";

const Blog = () => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(false);
  const [blogData, setBlogData] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:3004/articles")
      .then((res) => setBlogData(res.data));
  };
  useEffect(() => getData(), []);

  const handleSubit = (e) => {
    e.preventDefault();

    if (content.length < 140) {
      setError(true);
    } else {
      const postData = async () => {
        await axios.post("http://localhost:3004/articles", {
          author,
          content,
          date: Date.now(),
        });
        // on appelle la fonction getData() pour un chargement auto
        getData();
        setAuthor(false);
        setAuthor("");
        setContent("");
      };
      postData();
    }
  };

  return (
    <div className="blog-container">
      <Logo />
      <Navigation />
      <h1>Blog</h1>
      <form onSubmit={(e) => handleSubit(e)}>
        <input
          type="text"
          placeholder="Nom"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        <textarea
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          placeholder="Message"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        {error && <p>Veuillez saissir un minimun de 140 caractères</p>}
        <input type="submit" value="Envoyer" />
      </form>
      <ul>
        {blogData &&
          blogData
            .sort((a, b) => b.date - a.date)
            .map((article) => <Article key={article.id} article={article} />)}
      </ul>
    </div>
  );
};

export default Blog;
