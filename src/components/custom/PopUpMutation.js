import { useMutation } from '@apollo/client';
import ToastCustom from '../ToastCustom';
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Select from '@mui/material/Select';

export default function PopUpMutation({
	openModal,
	setDataGet,
	query,
	setModalON,
	confirmMutation,
}) {
	const [mutation, { data, error, loading }] = useMutation(query);
	const handleClose = () => setModalON(false);

	if (loading) {
		return (
			<>
				<ToastCustom
					stateToast={true}
					header='Pattienter SVP ...'
					type='info'
					delay={5000}
					awaitView={true}
				/>
			</>
		);
	}
	if (error) {
		let title,
			msg,
			btContent = '';
		if (error.message == 'Failed to fetch') {
			title = 'Erreur';
			msg = 'Verifiez le server, veuillez reessayer plutard ! ';
			btContent = 'Reessayer';
		} else {
			title = 'Erreur';
			msg = error.message;
			btContent = 'Reessayer';
		}
		setTimeout(() => {
			setModalON(false);
		}, 60000);
		return (
			<>
				<ToastCustom
					stateToast={true}
					body={msg}
					header='Erreur'
					type='error'
					delay={5000}
				/>
			</>
		);
	}
	if (!data) {
		return (
			<>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				fullWidth={true}
				maxWidth="sm"
				open={openModal}
				>
				<BootstrapDialogTitle id="customized-dialog-title"
onClose={handleClose}>
					Vous voulez confirmer ? 
				</BootstrapDialogTitle>
				<DialogContent dividers>
					En attente de votre confirmation !
				</DialogContent>
				<DialogActions>
					<Button autoFocus 
							onClick={() => confirmMutation(mutation)}>
					Confirmer
					</Button>
				</DialogActions>
    		</BootstrapDialog>
			</>
		);
	}
	setDataGet && setDataGet(data);
	return (
		<>
			<ToastCustom
				stateToast={true}
				body='Votre requete est executer avec succes !'
				header='Felicitation'
				type='success'
			/>
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
