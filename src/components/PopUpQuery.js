import { useQuery } from "@apollo/client";
import ToastCustom from "./ToastCustom";

export default function PopUpQuery({ setDataGet = null, query, setModalON }) {
  const { data, error, loading } = useQuery(query);
  const handleClose = () => setModalON(false);
  if (loading) {
    return (
      <>
        <ToastCustom
          stateToast={true}
          header="Pattienter SVP ..."
          type="info"
          awaitView={true}
        />
      </>
    );
  }
  if (error) {
    let title,
      msg,
      btContent = "";
    if (error.message == "Failed to fetch") {
      title = "Erreur";
      msg = "Verifiez le server veuillez reessayer plutard ! ";
      btContent = "Reessayer";
    } else {
      title = "Erreur";
      msg = error.message;
      btContent = "Reessayer";
    }
    setTimeout(() => {
      handleClose();
    }, 5000);
    return (
      <>
        <ToastCustom
          stateToast={true}
          body={msg}
          header="Erreur"
          type="error"
          delay={5000}
        />
      </>
    );
  }
  setDataGet ? setDataGet(data) : null;
  setTimeout(() => {
    handleClose();
  }, 2000);
  return (
    <>
      <ToastCustom
        stateToast={true}
        body="Votre requete est executer avec succes !"
        header="Felicitation"
        type="success"
      />
    </>
  );
}
