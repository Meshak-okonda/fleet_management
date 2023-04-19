import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setToggleNav } from '../redux/slice/toggleNavSlice';

export default function MenuItems({
	name,
	path,
	icon,
	deconnexion = null,
	subMenus = null,
}) {
	const dispatch = useDispatch();
	const [expand, setExpand] = useState(false);
	const deleteSpaceAndToLowerCase = (str) => {
		return str.replace(/\s/g, '').toLowerCase();
	};
	return (
    <>
      <div className="divider"></div>
      <ul>
        <li>
          <div
            className="menu-item"
            onClick={() => {
              setExpand(!expand);
              name === "Deconnection" && deconnexion();
            }}
          >
            <div>
              <div className="menu-icon">
                {name == "Véhicule" ? (
                  <ion-icon
                    style={{ transform: "translateY(5px)" }}
                    name="logo-model-s"
                  ></ion-icon>
                ) : (
                  <i className={icon}></i>
                )}
              </div>
              {subMenus && subMenus.length > 0 ? (
                <span>{name}</span>
              ) : (
                <Link to={path}>
                  <span>{name}</span>
                </Link>
              )}
            </div>
            {subMenus ? (
              !expand ? (
                <i className="bi bi-caret-down-fill"></i>
              ) : (
                <i className="bi bi-caret-up-fill"></i>
              )
            ) : (
              ""
            )}
          </div>
          {subMenus && subMenus.length > 0 ? (
            <ul className={`sub-menu ${expand ? "active" : ""}`}>
              {subMenus.map(({ action, icon }, id) => (
                <li key={id}>
                  <div className="sub-menu-line">
                    <i className={icon}></i>
                    <Link to={`${path}/${deleteSpaceAndToLowerCase(action)}`}>
                      {action}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      </ul>
    </>
  );
}
