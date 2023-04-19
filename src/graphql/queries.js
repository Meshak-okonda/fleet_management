import { gql } from '@apollo/client';

export const GET_RESPONSABLE = gql`
  query {
    getResponsables {
      id
      name
      lastName
      password
      superAdm
      addVehicle
      upVehicle
      delVehicle
      addDriver
      upDriver
      delDriver
      addResponsable
      upResponsable
      delResponsable
      delete
    }
  }
`;

export const GET_TOWING_POLICE_BY_ID = gql`
  query GetPoliceTowing($getPoliceTowingId: String!) {
    getPoliceTowing(id: $getPoliceTowingId) {
      id
      idDriver
      status
      imageTowing {
        infractionImage
        imageLeft
        imageRight
        imageFront
        imageBack
      }
      model
      brand
      typeCar
      numberPlaque
      color
      pinkCard
      yellowCard
      name
      lastName
      adress
      phone
      identityPerson {
        type
        number
      }
      hood {
        state
        image
        comment
      }
      grille {
        state
        image
        comment
      }
      headLightsAV {
        state
        image
        comment
      }
      blinkersAV {
        state
        image
        comment
      }
      bumperAV {
        state
        image
        comment
      }
      wheelArchesAV {
        state
        image
        comment
      }
      windShieldAV {
        state
        image
        comment
      }
      lightsAR {
        state
        image
        comment
      }
      chest {
        state
        image
        comment
      }
      headLightAR {
        state
        image
        comment
      }
      turnSignalAR {
        state
        image
        comment
      }
      bumperAR {
        state
        image
        comment
      }
      wheelArchAR {
        state
        image
        comment
      }
      windShieldAR {
        state
        image
        comment
      }
      wingAVLeft {
        state
        image
        comment
      }
      doorAVLeft {
        state
        image
        comment
      }
      doorARLeft {
        state
        image
        comment
      }
      crateArmLeft {
        state
        image
        comment
      }
      mirrorLeft {
        state
        image
        comment
      }
      boxPanelLeft {
        state
        image
        comment
      }
      wingARLeft {
        state
        image
        comment
      }
      wingAVRight {
        state
        image
        comment
      }
      doorAVRight {
        state
        image
        comment
      }
      doorARRight {
        state
        image
        comment
      }
      crateArmRight {
        state
        image
        comment
      }
      mirrorRight {
        state
        image
        comment
      }
      boxPanelRight {
        state
        image
        comment
      }
      wingARRight {
        state
        image
        comment
      }
      tireAVLeft {
        state
        image
        comment
      }
      tireAVRight {
        state
        image
        comment
      }
      tireARLeft {
        state
        image
        comment
      }
      tireARRight {
        state
        image
        comment
      }
      dateEnterPound
      VehiclePoundInfo
      refPositionTake
      refPositionRestitution
      dateOutPound
      date
      stateVehicle {
        good
        damaged
        grooves
        outService
      }
      position {
        lat
        long
      }
      createdAt
      delete
    }
  }
`;

export const GET_TOWING_PRIVATE_BY_ID = gql`
  query GetPrivateTowing($getPrivateTowingId: String!) {
    getPrivateTowing(id: $getPrivateTowingId) {
      id
      idDriver
      status
      imageTowing {
        infractionImage
        imageLeft
        imageRight
        imageFront
        imageBack
      }
      model
      brand
      typeCar
      numberPlaque
      color
      pinkCard
      yellowCard
      name
      lastName
      adress
      phone
      identityPerson {
        type
        number
      }
      hood {
        state
        image
        comment
      }
      grille {
        state
        image
        comment
      }
      headLightsAV {
        state
        image
        comment
      }
      blinkersAV {
        state
        image
        comment
      }
      bumperAV {
        state
        image
        comment
      }
      wheelArchesAV {
        state
        image
        comment
      }
      windShieldAV {
        state
        image
        comment
      }
      lightsAR {
        state
        image
        comment
      }
      chest {
        state
        image
        comment
      }
      headLightAR {
        state
        image
        comment
      }
      turnSignalAR {
        state
        image
        comment
      }
      bumperAR {
        state
        image
        comment
      }
      wheelArchAR {
        state
        image
        comment
      }
      windShieldAR {
        state
        image
        comment
      }
      wingAVLeft {
        state
        image
        comment
      }
      doorAVLeft {
        state
        image
        comment
      }
      doorARLeft {
        state
        image
        comment
      }
      crateArmLeft {
        state
        image
        comment
      }
      mirrorLeft {
        state
        image
        comment
      }
      boxPanelLeft {
        state
        image
        comment
      }
      wingARLeft {
        state
        image
        comment
      }
      wingAVRight {
        state
        image
        comment
      }
      doorAVRight {
        state
        image
        comment
      }
      doorARRight {
        state
        image
        comment
      }
      crateArmRight {
        state
        image
        comment
      }
      mirrorRight {
        state
        image
        comment
      }
      boxPanelRight {
        state
        image
        comment
      }
      wingARRight {
        state
        image
        comment
      }
      tireAVLeft {
        state
        image
        comment
      }
      tireAVRight {
        state
        image
        comment
      }
      tireARLeft {
        state
        image
        comment
      }
      tireARRight {
        state
        image
        comment
      }
      dateEnterPound
      VehiclePoundInfo
      refPositionTake
      refPositionRestitution
      dateOutPound
      date
      stateVehicle {
        good
        damaged
        grooves
        outService
      }
      position {
        lat
        long
      }
      createdAt
      delete
    }
  }
`;


export const REVERSE_VEHICLE = (id) => {
  return gql`
    mutation {
      reverseDeleteVehicle(id: "${id}") {
        idTypeVehicle
        id
        idDriver
        name
        model
        serie
        gpsData
        image
        color
        startYear
        registrationNumber
		yearConstruction
        power
        delete
        createdAt
      }
    }
  `;
};

export const REVERSE_RESPONSABLE = (id) => {
  return gql`
    mutation {
      reverseDeleteResponsable(id: "${id}") {
        name
        id
        lastName
        password
        email
        phone
        image
        age
        sex
        superAdm
        addVehicle
        upVehicle
        delVehicle
        addDriver
        upDriver
        delDriver
        addResponsable
        upResponsable
        delResponsable
        delete
        createdAt
      }
    }
  `;
};

export const REVERSE_DRIVER = (id) => {
  return gql`
    mutation  {
      reverseDeleteDriver(id: "${id}") {
        id
        lastName
        password
        licenseValidity
        email
        name
        phone
        image
        age
        sex
        createdAt
        delete
      }
    }
  `;
};

export const GET_ONE_RESPONSABLE = (id) => {
  return gql`
		query {
			getResponsable(id: "${id}") {
				name
				email
				password
				phone
				image
				age
				sex
				lastName
				superAdm
				addVehicle
				upVehicle
				addDriver
				upDriver
				delete
			}
		}
	`;
};

export const REINITIALISATION_ACCOUNT = gql`
  mutation RecoveryAccount($name: String!, $code: String!) {
    recoveryAccount(name: $name, code: $code)
  }
`;

export const GET_VEHICLES = gql`
  query GetVehicles {
    getVehicles {
      idDriver
      id
      name
      model
      serie
      image
      color
      stratYear
      registrationNumber
      yearConstruction
      power
      delete
    }
  }
`;

export const CREATE_POINTER = gql`
  mutation CreatePointer($pointer: PointerInput) {
    createPointer(pointer: $pointer) {
      id
      name
      lastName
      password
      age
      sex
      createdAt
      delete
    }
  }
`;

export const CREATE_SABOTIER = gql`
  mutation CreateSabotier($sabotier: SabotierInput) {
    createSabotier(sabotier: $sabotier) {
      id
      name
      lastName
      password
      sex
      createdAt
      delete
    }
  }
`;

export const CREATE_CONTROLLER = gql`
  mutation CreateController($controller: ControllerInput) {
    createController(controller: $controller) {
      id
      name
      lastName
      password
      sex
      createdAt
      delete
    }
  }
`;

export const UPDATE_POINTER = gql`
  mutation UpdatePointer($updatePointerId: String!, $pointer: PointerInput) {
    updatePointer(id: $updatePointerId, pointer: $pointer) {
      id
      name
      lastName
      password
      age
      sex
      createdAt
      delete
    }
  }
`;

export const UPDATE_SABOTIER = gql`
  mutation UpdateSabotier(
    $updateSabotierId: String!
    $sabotier: SabotierInput
  ) {
    updateSabotier(id: $updateSabotierId, sabotier: $sabotier) {
      id
      name
      lastName
      password
      sex
      createdAt
      delete
    }
  }
`;

export const UPDATE_CONTROLLER = gql`
  mutation UpdateController(
    $updateControllerId: String!
    $controller: ControllerInput
  ) {
    updateController(id: $updateControllerId, controller: $controller) {
      id
      name
      lastName
      password
      sex
      createdAt
      delete
    }
  }
`;

export const DELETE_POINTER = gql`
  mutation CreatePointer($deletePointerId: String!) {
    deletePointer(id: $deletePointerId) {
      id
      name
      lastName
      password
      age
      sex
      createdAt
      delete
    }
  }
`;

export const DELETE_SABOTIER = gql`
  mutation DeleteSabotier($deleteSabotierId: String!) {
    deleteSabotier(id: $deleteSabotierId) {
      id
      name
      lastName
      password
      sex
      createdAt
      delete
    }
  }
`;

export const DELETE_CONTROLLER = gql`
  mutation DeleteController($deleteControllerId: String!) {
    deleteController(id: $deleteControllerId) {
      id
      name
      lastName
      password
      sex
      createdAt
      delete
    }
  }
`;

export const RECOVERY_SABOTIER = gql`
  mutation ReverseDeleteSabotier($reverseDeleteSabotierId: String!) {
    reverseDeleteSabotier(id: $reverseDeleteSabotierId) {
      id
      name
      lastName
      password
      age
      sex
      createdAt
      delete
    }
  }
`;

export const RECOVERY_CONTROLLER = gql`
  mutation DeleteController($reverseDeleteControllerId: String!) {
    reverseDeleteController(id: $reverseDeleteControllerId) {
      id
      name
      lastName
      password
      age
      sex
      createdAt
      delete
    }
  }
`;

export const GET_PLAGES = gql`
  query GetPlages {
    getPlages {
      id
      name
      zone
      delete
      createdAt
    }
  }
`;

export const CREATE_PLAGE = gql`
  mutation CreatePlage($plage: PlageInput) {
    createPlage(plage: $plage) {
      id
      name
      zone
      createdAt
      delete
    }
  }
`;

export const DELETE_PLAGE = gql`
  mutation DeletePlage($deletePlageId: ID!) {
    deletePlage(id: $deletePlageId) {
      id
      name
      zone
    }
  }
`;

export const RECOVERY_POINTER = gql`
  mutation DeletePointer($reverseDeletePointerId: String!) {
    reverseDeletePointer(id: $reverseDeletePointerId) {
      id
      name
      lastName
      password
      age
      sex
      createdAt
      delete
    }
  }
`;

export const GET_VEHICLES_NAME_BY_ID = (id) => gql`
	query GetVehicle {
		getVehicle(id: "${id}") {
			name
		}
	}
`;

export const REFRESH_ALL_DATA = gql`
  query {
    getResponsables {
      id
      name
      lastName
      email
      phone
      image
      age
      sex
      delete
      superAdm
      addVehicle
      upVehicle
      delVehicle

      addDriver
      upDriver
      delDriver

      addResponsable
      upResponsable
      delResponsable
      createdAt
      delete
    }

    getPlages {
      id
      name
      zone
      delete
      createdAt
    }

    getDrivers {
      id
      name
      lastName
      password
      licenseValidity
      email
      phone
      image
      age
      sex
      createdAt
      delete
    }
    getVehicles {
      id
      idDriver
      name
      model
      serie
      gpsData
      image
      color
      startYear
      registrationNumber
      yearConstruction
      power
      delete
    }
    getPointers {
      id
      name
      lastName
      password
      age
      sex
      createdAt
      delete
    }

    getSabotiers {
      id
      name
      lastName
      password
      sex
      createdAt
      delete
    }

    getControllers {
      id
      name
      lastName
      password
      sex
      createdAt
      delete
    }

    getVehicleHistories {
      idDriver
      idVehicle
      createdAt
    }
  }
`;

export const UPDATE_PLAGE = gql`
  mutation UpdatePlage($updatePlageId: ID!, $plage: PlageInput) {
    updatePlage(id: $updatePlageId, plage: $plage) {
      id
      name
      zone
      delete
      createdAt
    }
  }
`;

export const CONNECTION_RESPONSABLE = gql`
  query ($name: String!, $password: String!) {
    connectionResponsable(name: $name, password: $password) {
      id
      name
      lastName
      password
      email
      phone
      image
      token
      age
      superAdm
      addVehicle
      upVehicle
      delVehicle

      addDriver
      upDriver
      delDriver

      addResponsable
      upResponsable
      delResponsable
      sex
      createdAt
      delete
    }
  }
`;


export const VERIFICATION_VEHICLE_ADD = gql`
  subscription VerificationVehicleAdded {
    VerificationVehicleAdded {
      idVehicle
      stateVehicle {
        good
        damaged
        missing
      }
    }
  }
`;

export const DELETE_VEHICLE = (id) => {
  return gql`
		mutation {
			deleteVehicle(id: "${id}") {
				id
				idDriver
				name
				model
				serie
				gpsData
				image
				color
				startYear
				registrationNumber
				yearConstruction
				power
				createdAt
				delete
			}
		}
	`;
};

export const CREATE_VEHICLE = gql`
  mutation createVehicle($vehicle: VehicleInput) {
    createVehicle(vehicle: $vehicle) {
      id
      idDriver
      name
      serie
      model
      gpsData
      image
      color
      startYear
      registrationNumber
      yearConstruction
      power
      createdAt
      delete
    }
  }
`;

export const UPDATE_VEHICLE = gql`
  mutation UpdateVehicle($updateVehicleId: String!, $vehicle: VehicleInput) {
    updateVehicle(id: $updateVehicleId, vehicle: $vehicle) {
      id
      idDriver
      name
      serie
      model
      gpsData
      image
      color
      startYear
      registrationNumber
      yearConstruction
      power
      createdAt
      delete
    }
  }
`;

export const CREATE_TYPE_VEHICLE = gql`
	mutation CreateTypeVehicle($typeVehicle: TypeVehicleInput) {
		createTypeVehicle(typeVehicle: $typeVehicle) {
			id
			name
			description
			startYear
		}
	}
`;

export const DELETE_TYPE_VEHICLE = (id) => {
	return gql`
		mutation {
			deleteTypeVehicle(id: "${id}") {
				id
				name
				description
				startYear
			}
		}
	`;
};

export const UPDATE_TYPE_VEHICLE = gql`
	mutation UpdateTypeVehicle(
		$updateTypeVehicleId: String!
		$typeVehicle: TypeVehicleInput
	) {
		updateTypeVehicle(id: $updateTypeVehicleId, typeVehicle: $typeVehicle) {
			id
			name
			description
			startYear
		}
	}
`;

export const CREATE_DRIVER = gql`
	mutation CreateDriver($driver: DriverInput) {
		createDriver(driver: $driver) {
			id
			name
			password
			lastName
			licenseValidity
			phone
			email
			image
			age
			sex
			delete
		}
	}
`;

export const DELETE_DRIVER = (id) => {
	return gql`
		mutation {
			deleteDriver(id: "${id}") {
				id
				name
				password
				lastName
				licenseValidity
				email
				phone
				image
				age
				sex
				delete
			}
		}
	`;
};

export const UPDATE_DRIVER = gql`
  mutation UpdateDriver($updateDriverId: String!, $driver: DriverInput) {
    updateDriver(id: $updateDriverId, driver: $driver) {
      id
      name
      lastName
      password
      licenseValidity
      email
      phone
      image
      age
      sex
      delete
    }
  }
`;

export const CREATE_RESPONSABLE = gql`
  mutation CreateResponsable($responsable: ResponsableInput) {
    createResponsable(responsable: $responsable) {
      id
      name
      lastName
      password
      email
      phone
      age
      image
      addVehicle
      upVehicle
      delVehicle
      addDriver
      upDriver
      delDriver
      addResponsable
      upResponsable
      delResponsable
      sex
      createdAt
      delete
    }
  }
`;

export const DELETE_RESPONSABLE = (id) => {
	return gql`
		mutation {
			deleteResponsable(id: "${id}") {
				id
				name
				lastName
				password
				email
				phone
				image
				age
				sex
				delete
			}
		}
	`;
};

export const UPDATE_RESPONSABLE = gql`
  mutation UpdateResponsable(
    $updateResponsableId: String!
    $responsable: ResponsableInput
  ) {
    updateResponsable(id: $updateResponsableId, responsable: $responsable) {
      id
      name
      lastName
      password
      email
      phone
      image
      superAdm
      addVehicle
      upVehicle
      delVehicle
      addDriver
      upDriver
      delDriver
      addResponsable
      upResponsable
      delResponsable
      age
      sex
      createdAt
      delete
    }
  }
`;

export const CREATE_CONTROL_VEHICLE = gql`
	mutation CreateVehicleVerification(
		$vehicleVerification: VerificationVehicleInput
	) {
		createVehicleVerification(vehicleVerification: $vehicleVerification) {
			id
			idVehicle
			honk {
				state
				image
				comment
			}
			motor {
				state
				image
				comment
			}
			stopLight {
				state
				image
				comment
			}
			startUp {
				state
				image
				comment
			}
			handBrake {
				state
				image
				comment
			}
			stricken {
				state
				image
				comment
			}
			siegeState {
				state
				image
				comment
			}
			ceilingState {
				state
				image
				comment
			}
			windshieldConditionAV {
				state
				image
				comment
			}
			windshieldConditionAR {
				state
				image
				comment
			}
			carStateOut {
				state
				image
				comment
			}
			carStateIn {
				state
				image
				comment
			}
			shockAbsorbersAV {
				state
				image
				comment
			}
			shockAbsorbersAR {
				state
				image
				comment
			}
			brakingSystem {
				state
				image
				comment
			}
			radioAndReader {
				state
				image
				comment
			}
			reserveTire {
				state
				image
				comment
			}
			leftAndRightTireAV {
				state
				image
				comment
			}
			leftAndRightTireAR {
				state
				image
				comment
			}
			gironfardOperation {
				state
				image
				comment
			}
			flashingOperationAV {
				state
				image
				comment
			}
			flashingOperationAR {
				state
				image
				comment
			}
			warningLightsOperation {
				state
				image
				comment
			}
			windshieldWipers {
				state
				image
				comment
			}
			mechanismOperation {
				state
				image
				comment
			}
			cric {
				state
				image
				comment
			}
			wheelWrench {
				state
				image
				comment
			}
			cricRemover {
				state
				image
				comment
			}
			mileage
			dateVerification
			stateVehicle {
				damaged
				good
				missing
			}
		}
	}
`;

export const UPDATE_CONTROL_VEHICLE = gql`
	mutation updateVehicleVerification(
		$id: String!
		$updateVehicleVerification: VerificationVehicleInput
	) {
		updateVehicleVerification(
			id: $id
			updateVehicleVerification: $updateVehicleVerification
		) {
			honk {
				state
				image
				comment
			}
			mileage
			dateVerification
			stateVehicle {
				damaged
				good
				missing
			}
		}
	}
`;

export const GET_ONE_DAY_CONTROL_VEHICLE = (idVehicle, dateVerification) => {
	return gql`
		query {
			getVehicleVerificationElementsOfOneDay(
				idVehicle: "${idVehicle}",
				dateVerification: "${dateVerification}"
			) {
				id
				idVehicle
				mileage
				dateVerification
				honk {
					state
					image
					comment
				}
				motor {
					state
					image
					comment
				}
				stopLight {
					state
					image
					comment
				}
				startUp {
					state
					image
					comment
				}
				handBrake {
					state
					image
					comment
				}
				stricken {
					state
					image
					comment
				}
				siegeState {
					state
					image
					comment
				}
				ceilingState {
					state
					image
					comment
				}
				windshieldConditionAV {
					state
					image
					comment
				}
				windshieldConditionAR {
					state
					image
					comment
				}
				carStateOut {
					state
					image
					comment
				}
				carStateIn {
					state
					image
					comment
				}
				shockAbsorbersAV {
					state
					image
					comment
				}
				shockAbsorbersAR {
					state
					image
					comment
				}
				brakingSystem {
					state
					image
					comment
				}
				radioAndReader {
					state
					image
					comment
				}
				reserveTire {
					state
					image
					comment
				}
				leftAndRightTireAV {
					state
					image
					comment
				}
				leftAndRightTireAR {
					state
					image
					comment
				}
				gironfardOperation {
					state
					image
					comment
				}
				flashingOperationAV {
					state
					image
					comment
				}
				flashingOperationAR {
					state
					image
					comment
				}
				warningLightsOperation {
					state
					image
					comment
				}
				windshieldWipers {
					state
					image
					comment
				}
				mechanismOperation {
					state
					image
					comment
				}
				cric {
					state
					image
					comment
				}
				wheelWrench {
					state
					image
					comment
				}
				cricRemover {
					state
					image
					comment
				}
				stateVehicle {
					damaged
					good
					missing
				}
			}
		}
	`;
};

export const GET_VERIFIED_ONE_DAY_CONTROL_VEHICLE = (
	idVehicle,
	dateVerification
) => {
	return gql`
		query {
			getVerifiedVerificationElementsOfOneDay(
				idVehicle: "${idVehicle}",
				dateVerification: "${dateVerification}"
			) {
				id
			}
		}
	`;
};
export const DELETE_CONTROL = (id) => {
	return gql`
	mutation {
		deleteVehicleVerification(id: "${id}") {
		id
		}
	}
	`;
};

export const GET_RANGE_STATISTIC_CONTROL = (id, range) => {
	return gql`
		query {
			getVehicleVerificationElementsByRange(
				idVehicle: "${id}",
				range: "${range}"
			) {
				id
				idVehicle
				mileage
				dateVerification
				honk {
					state
					image
					comment
				}
				motor {
					state
					image
					comment
				}
				stopLight {
					state
					image
					comment
				}
				startUp {
					state
					image
					comment
				}
				handBrake {
					state
					image
					comment
				}
				stricken {
					state
					image
					comment
				}
				siegeState {
					state
					image
					comment
				}
				ceilingState {
					state
					image
					comment
				}
				windshieldConditionAV {
					state
					image
					comment
				}
				windshieldConditionAR {
					state
					image
					comment
				}
				carStateOut {
					state
					image
					comment
				}
				carStateIn {
					state
					image
					comment
				}
				shockAbsorbersAV {
					state
					image
					comment
				}
				shockAbsorbersAR {
					state
					image
					comment
				}
				brakingSystem {
					state
					image
					comment
				}
				radioAndReader {
					state
					image
					comment
				}
				reserveTire {
					state
					image
					comment
				}
				leftAndRightTireAV {
					state
					image
					comment
				}
				leftAndRightTireAR {
					state
					image
					comment
				}
				gironfardOperation {
					state
					image
					comment
				}
				flashingOperationAV {
					state
					image
					comment
				}
				flashingOperationAR {
					state
					image
					comment
				}
				warningLightsOperation {
					state
					image
					comment
				}
				windshieldWipers {
					state
					image
					comment
				}
				mechanismOperation {
					state
					image
					comment
				}
				cric {
					state
					image
					comment
				}
				wheelWrench {
					state
					image
					comment
				}
				cricRemover {
					state
					image
					comment
				}
				stateVehicle {
					damaged
					good
					missing
				}
			}
		}
	`;
};

export const GET_MONTH_STATISTIC_CONTROL = (id, month) => {
	return gql`
		query {
			getVehicleVerificationElementsByMonth(
				idVehicle: "${id}",
				month: "${month}"
			) {
				id
				idVehicle
				mileage
				dateVerification
				honk {
					state
					image
					comment
				}
				motor {
					state
					image
					comment
				}
				stopLight {
					state
					image
					comment
				}
				startUp {
					state
					image
					comment
				}
				handBrake {
					state
					image
					comment
				}
				stricken {
					state
					image
					comment
				}
				siegeState {
					state
					image
					comment
				}
				ceilingState {
					state
					image
					comment
				}
				windshieldConditionAV {
					state
					image
					comment
				}
				windshieldConditionAR {
					state
					image
					comment
				}
				carStateOut {
					state
					image
					comment
				}
				carStateIn {
					state
					image
					comment
				}
				shockAbsorbersAV {
					state
					image
					comment
				}
				shockAbsorbersAR {
					state
					image
					comment
				}
				brakingSystem {
					state
					image
					comment
				}
				radioAndReader {
					state
					image
					comment
				}
				reserveTire {
					state
					image
					comment
				}
				leftAndRightTireAV {
					state
					image
					comment
				}
				leftAndRightTireAR {
					state
					image
					comment
				}
				gironfardOperation {
					state
					image
					comment
				}
				flashingOperationAV {
					state
					image
					comment
				}
				flashingOperationAR {
					state
					image
					comment
				}
				warningLightsOperation {
					state
					image
					comment
				}
				windshieldWipers {
					state
					image
					comment
				}
				mechanismOperation {
					state
					image
					comment
				}
				cric {
					state
					image
					comment
				}
				wheelWrench {
					state
					image
					comment
				}
				cricRemover {
					state
					image
					comment
				}
				stateVehicle {
					damaged
					good
					missing
				}
			}
		}
	`;
};

export const GET_YEAR_STATISTIC_CONTROL = (id, year) => {
	return gql`
		query {
			getVehicleVerificationElementsByYear(
				idVehicle: "${id}",
				year: "${year}"
			) {
				month
				dataMonth {
					stateVehicle {
						good
						damaged
						missing
					}
					honk {
						good
						damaged
						missing
					}
					motor {
						good
						damaged
						missing
					}
					stopLight {
						good
						damaged
						missing
					}
					mileage
					cricRemover {
						missing
						damaged
						good
					}
					startUp {
						missing
						damaged
						good
					}
					handBrake {
						good
						damaged
						missing
					}
					stricken {
						good
						damaged
						missing
					}
					siegeState {
						good
						damaged
						missing
					}
					ceilingState {
						missing
						damaged
						good
					}
					windshieldConditionAV {
						missing
						damaged
						good
					}
					windshieldConditionAR {
						missing
						damaged
						good
					}
					carStateOut {
						damaged
						missing
						good
					}
					carStateIn {
						missing
						damaged
						good
					}
					shockAbsorbersAV {
						good
						damaged
						missing
					}
					shockAbsorbersAR {
						missing
						damaged
						good
					}
					brakingSystem {
						missing
						damaged
						good
					}
					radioAndReader {
						missing
						damaged
						good
					}
					reserveTire {
						good
						damaged
						missing
					}
					leftAndRightTireAV {
						good
						damaged
						missing
					}
					leftAndRightTireAR {
						missing
						damaged
						good
					}
					gironfardOperation {
						missing
						damaged
						good
					}
					flashingOperationAV {
						good
						damaged
						missing
					}
					flashingOperationAR {
						good
						damaged
						missing
					}
					warningLightsOperation {
						missing
						damaged
						good
					}
					windshieldWipers {
						missing
						damaged
						good
					}
					mechanismOperation {
						missing
						damaged
						good
					}
					cric {
						missing
						damaged
						good
					}
					wheelWrench {
						missing
						damaged
						good
					}
				}
			}
		}
	`;
};
