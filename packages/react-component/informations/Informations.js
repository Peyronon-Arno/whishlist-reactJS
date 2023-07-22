import { Link } from "react-router-dom";
import "./Informations.css";
const Informations = () => {
  return (
    <div className="main-informations">
      <h1>Informations</h1>
      <div className="details">
        <p>
          WishLists project has been realized by Batouxas Léo and Peyronon Arno
        </p>
        <p>It's possible to contact us via our Github links</p>
        <p>
          <a href="https://github.com/Peyronon-Arno">Github Arno </a>
        </p>
        <p>
          <a href="https://github.com/leobatouxas">Github Léo</a>
        </p>
      </div>
      <Link className="back" to={`/${SUBJECT}/`}>
        Back
      </Link>
    </div>
  );
};

export default Informations;
