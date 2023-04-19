import logo from "../assets/logo.png";

export const Logo = (props) => {
  return <img src={logo.src}
{...props}
alt="Logo" />;
};
