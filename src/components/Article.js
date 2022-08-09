import axios from "axios";
import React, { useState } from "react";

const Article = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editcontent, setEditContent] = useState("");
  const [isdeleting, setIsdeleting] = useState(false);

  const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return newDate;
  };

  const handleEdit = () => {
    const data = {
      author: article.author,
      content: editcontent ? editcontent : article.content,
      date: article.date,
      updatedDate: Date.now(),
    };

    axios
      .put("http://localhost:3004/articles/" + article.id, data)
      .then(setIsEditing(false));
  };

  const handeleDelete = async () => {
    setIsdeleting(true);
    if (window.confirm("Voulez-vous vraiment supprimer cet article ?")) {
      axios.delete("http://localhost:3004/articles/" + article.id);
      window.location.reload();
    }
  };

  return (
    <div
      className="article"
      style={{ background: isEditing ? "#f3feff" : "white" }}
    >
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>
          {article.updatedDate ? "modifié le " : " posté le "}
          {dateFormater(
            article.updatedDate ? article.updatedDate : article.date
          )}
        </em>
      </div>
      {isEditing ? (
        <textarea
          defaultValue={editcontent ? editcontent : article.content}
          onChange={(e) => setEditContent(e.target.value)}
        ></textarea>
      ) : (
        <p>{editcontent ? editcontent : article.content}</p>
      )}
      <div className="btn-container">
        {isEditing ? (
          <button onClick={() => handleEdit()}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button onClick={() => handeleDelete()}>Supprimer</button>
      </div>
    </div>
  );
};

export default Article;
