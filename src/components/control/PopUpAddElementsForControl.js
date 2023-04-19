import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Form, Spinner } from 'react-bootstrap';
import { InputTextarea } from 'primereact/inputtextarea';
import { Image } from 'primereact/image';
import getYears from '../custom/getYears';
import { GetFrenchElementControl, PostImage } from "../../utils";
import { schema } from '../../schema/DescriptionElementControlValidator';
import ToastCustom from "../custom/ToastCustom";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ButtonSubmit from "../ButtonSubmit";
import {AiFillDelete} from "react-icons/ai";

export default function PopUpAddElementsForControl({
	openModal,
	setModalON,
	data,
	dataGet,
	nameField,
	comment,
}) {
	const handleClose = () => setModalON(false);
	const [dataControl, setDataControl] = useState({
		comment,
		image: [],
	});
	const [spiner, setSpiner] = useState(false);
	const [toastView, setToastView] = useState({
		state: false,
		body: '',
		header: '',
		delay: 6000,
		type: '',
	});

	async function onSubmit() {
		let dataUrl = [];
		setSpiner(true);
		try {
			if (dataControl.image && dataControl.image.length > 0) {
				for (let i = 0; i < dataControl.image.length; i++) {
					const { url } = await PostImage(dataControl.image[i]);
					dataUrl.push(url);
				}
			}
			dataGet({ ...data, ...dataControl, image: dataUrl });
			setSpiner(false);
			setModalON(false);
		} catch (error) {
			setToastView({
				state: true,
				body: `Une Erreur s'est produite`,
				header: 'Erreur',
				type: 'error',
			});
		}
	}

	async function validateData() {
		await schema.isValid(dataControl).then((valid) => {
			if (valid) {
				onSubmit();
			}
		});
	}

	function chooseImage({ target }) {
		var reader = new FileReader();

		reader.onloadend = function ({ target }) {
			setDataControl({
				...dataControl,
				image: [...dataControl.image, target.result],
			});
		};
		if (target.files[0]) {
			reader.readAsDataURL(target.files[0]);
		}
	}

	return (
    <>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        fullWidth={true}
        maxWidth="sm"
        open={openModal}
      >
        <BootstrapDialogTitle id="customized-dialog-title">
          Description de {GetFrenchElementControl(nameField)}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="comment">Commentaire</label>
            <br />
            <InputTextarea
              id="comment"
              type="text"
              value={dataControl.comment}
              rows={5}
              cols={30}
              onChange={({ target: { value } }) =>
                setDataControl({ ...dataControl, comment: value })
              }
            />
            <br />
            {!dataControl.comment &&
              (
                  <small className="mb-2 alert-danger p-1">
                    Le commentaire est requis ! (min: 3 caractères, max: 150
                    caractères)
                  </small>
                )}
          </div>
          <div className="mt-2 mb-2 p-field p-col-12">
            <Form.Group controlId="formFileSm"
className="mb-3">
              <label htmlFor="address">Photo de l&apos;element !</label>
              <Form.Control
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                size="md"
                onChange={chooseImage}
              />
            </Form.Group>
          </div>
          <div className="mt-2 mb-2 p-field p-col-12 d-flex align-content-center">
            {dataControl.image &&
              dataControl.image.length > 0 &&
              dataControl.image.map((image, key) => {
                return (
                  <div className="m-1" key={key}>
                    <Image
                      src={
                        image?.startsWith("http")
                          ? image
                          : `${process.env.LIEN_BACK_IMAGE}${image}`
                      }
                      template="Preview Content"
                      alt="Image Text"
                      width="80"
                      height="80"
                      style={{
                        borderRadius: "10%",
                        border: "1px solid #003863 ",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      style={{ zIndex: 15005, cursor: "pointer" }}
                      onClick={() =>
                        setDataControl({
                          ...dataControl,
                          image: dataControl.image.filter(
                            (img, id) => id !== key
                          ),
                        })
                      }
                    >
                      <AiFillDelete color="red" />
                    </IconButton>
                  </div>
                );
              })}
          </div>
        </DialogContent>
        <DialogActions>
          {spiner ? (
            <Spinner animation="border"
variant="warning" />
          ) : (
            <ButtonSubmit
              onClick={() => validateData()}
              autoFocus
              type="submit"
            />
          )}
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }}
{...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
