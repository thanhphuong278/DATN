import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeaderDetail.css";

const HeaderDetail = ({ title, isOwner, isPublic }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="detail-header-bar">

      <button className="back-btn" onClick={() => navigate(-1)}>
        ←
      </button>

      <div className="header-title">
        {title}
      </div>

      <div className="menu-wrapper" ref={menuRef}>
        <button
          className="menu-btn"
          onClick={() => setOpen((prev) => !prev)}
        >
          ⋮
        </button>

        {open && (
          <div className="menu-dropdown">

            {isOwner && (
              <>
                <div className="menu-item">Sửa</div>
                <div className="menu-item danger">Xoá</div>
              </>
            )}

            {isPublic && (
              <div className="menu-item">Share</div>
            )}

            {!isOwner && (
              <div className="menu-item">Lưu</div>
            )}

          </div>
        )}
      </div>

    </div>
  );
};

export default HeaderDetail;