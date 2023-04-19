import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idStand: null,
  firstStep: {
    idDriver: null,
    imageTowing: {
      infractionImage: [],
      imageLeft: null,
      imageRight: null,
      imageFront: null,
      imageBack: null,
    },
    position: null,
  },
  secondStep: {
    model: null,
    brand: null,
    color: null,
    numberPlaque: null,
    typeCar: null,
  },
  thirdStep: {
    name: null,
    lastName: null,
    adress: "",
    phone: "",
    identityPerson: {
      type: null,
      number: null,
    },
    pinkCard: "",
    yellowCard: "",
  },
  fourthStep: {
    hood: {
      state: null,
    },
    grille: {
      state: null,
    },
    headLightsAV: {
      state: null,
    },
    blinkersAV: {
      state: null,
    },
    bumperAV: {
      state: null,
    },
    wheelArchesAV: {
      state: null,
    },
    windShieldAV: {
      state: null,
    },
  },
  fifthStep: {
    lightsAR: {
      state: null,
    },
    chest: {
      state: null,
    },
    headLightAR: {
      state: null,
    },
    turnSignalAR: {
      state: null,
    },
    bumperAR: {
      state: null,
    },
    wheelArchAR: {
      state: null,
    },
    windShieldAR: {
      state: null,
    },
  },
  sixth: {
    wingAVLeft: {
      state: null,
    },
    doorAVLeft: {
      state: null,
    },
    doorARLeft: {
      state: null,
    },
    crateArmLeft: {
      state: null,
    },
    mirrorLeft: {
      state: null,
    },
    boxPanelLeft: {
      state: null,
    },
    wingARLeft: {
      state: null,
    },
  },
  seventh: {
    wingAVRight: {
      state: null,
    },
    doorAVRight: {
      state: null,
    },
    doorARRight: {
      state: null,
    },
    crateArmRight: {
      state: null,
    },
    mirrorRight: {
      state: null,
    },
    boxPanelRight: {
      state: null,
    },
    wingARRight: {
      state: null,
    },
  },
  eighth: {
    tireAVLeft: {
      state: null,
    },
    tireAVRight: {
      state: null,
    },
    tireARLeft: {
      state: null,
    },
    tireARRight: {
      state: null,
    },
  },
  stateVehicle: {
    good: 0,
    damaged: 0,
    grooves: 0,
    outService: 0,
  },
  activeStep: 0,
};

export const towingPoliceSlice = createSlice({
  name: "towing",
  initialState,
  reducers: {
    addDriver: (state, action) => {
      state.firstStep.idDriver = action.payload;
    },
    addStatus: (state, action) => {
      state.firstStep.status = action.payload;
    },
    addImageTowing: (state, action) => {
      state.firstStep.imageTowing = {
        ...state.firstStep.imageTowing,
        ...action.payload,
      };
    },
    addPosition: (state, action) => {
      state.firstStep.position = action.payload;
    },
    addSecondStep: (state, action) => {
      state.secondStep = {
        ...state.secondStep,
        ...action.payload,
      };
    },
    addThrirdStep: (state, action) => {
      state.thirdStep = {
        ...state.thirdStep,
        ...action.payload,
      };
    },
    addFourthStep: (state, action) => {
      state.fourthStep = {
        ...state.fourthStep,
        ...action.payload,
      };
    },
    addFifthStep: (state, action) => {
      state.fifthStep = {
        ...state.fifthStep,
        ...action.payload,
      };
    },
    addSixthStep: (state, action) => {
      state.sixth = {
        ...state.sixth,
        ...action.payload,
      };
    },
    addSeventhStep: (state, action) => {
      state.seventh = {
        ...state.seventh,
        ...action.payload,
      };
    },
    addEighthStep: (state, action) => {
      state.eighth = {
        ...state.eighth,
        ...action.payload,
      };
    },
    addStateVehicle: (state, action) => {
      state.stateVehicle = {
        ...state.stateVehicle,
        ...action.payload,
      };
    },
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    setIdStand: (state, action) => {
      state.idStand = action.payload;
    },
    initialiseState: () => initialState,
  },
});

// Export Actions
export const {
  addSecondStep,
  addDriver,
  addStatus,
  addImageTowing,
  addPosition,
  addThrirdStep,
  addFourthStep,
  addFifthStep,
  addSixthStep,
  addSeventhStep,
  addEighthStep,
  addStateVehicle,
  setActiveStep,
  initialiseState,
  setIdStand,
} = towingPoliceSlice.actions;

export default towingPoliceSlice.reducer;
// 3.3.21
