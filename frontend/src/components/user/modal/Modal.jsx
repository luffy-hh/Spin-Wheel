import { Fragment } from "react";
import ReactDOM from "react-dom";
import conSound from "../../../assets/sound/CongratulationSound2.mp3";
import "./modal.scss";
const Backdrop = (props) => {
  return (
    <div
      className="backdrop"
      onClick={() => {
        props.onClose();
        window.location.reload();
        new Audio(conSound).pause();
      }}
    ></div>
  );
};
const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlay");
const Modal = (props) => {
  const closeRightClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="overlay" onContextMenu={closeRightClick}>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </div>
  );
};
export default Modal;
