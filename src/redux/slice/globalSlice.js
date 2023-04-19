import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "globalState",
  initialState: {
    vehicles: [],
    drivers: [],
    pointers: [],
    sabotiers: [],
    controllers: [],
    responsables: [],
    vehiclesHistory: [],
    policeTowings: [],
    plages: [],
  },
  reducers: {
    setPlages: (state, action) => {
      state.plages = action.payload;
    },
    setVehicles: (state, action) => {
      state.vehicles = action.payload;
    },
    setDrivers: (state, action) => {
      state.drivers = action.payload;
    },
    setPointers: (state, action) => {
      state.pointers = action.payload;
    },
    setSabotiers: (state, action) => {
      state.sabotiers = action.payload;
    },
    setControllers: (state, action) => {
      state.controllers = action.payload;
    },
    setPoliceTowings: (state, action) => {
      state.policeTowings = action.payload;
    },
    setResponsables: (state, action) => {
      state.responsables = action.payload;
    },
    setVehiclesHistory: (state, action) => {
      state.vehiclesHistory = action.payload;
    },
    deleteVehicle: (state, action) => {
      state.vehicles = state.vehicles.filter(({ id }) => id !== action.payload);
    },
    deletePlage: (state, action) => {
      state.plages = state.plages.filter(({ id }) => id !== action.payload);
    },
    deleteDriver: (state, action) => {
      state.drivers = state.drivers.filter(({ id }) => id !== action.payload);
    },
    deletePointer: (state, action) => {
      state.pointers = state.pointers.filter(({ id }) => id !== action.payload);
    },
    deleteController: (state, action) => {
      state.controllers = state.controllers.filter(
        ({ id }) => id !== action.payload
      );
    },
    deleteSabotier: (state, action) => {
      state.sabotiers = state.sabotiers.filter(
        ({ id }) => id !== action.payload
      );
    },
    deleteResponsable: (state, action) => {
      state.responsables = state.responsables.filter(
        ({ id }) => id !== action.payload
      );
    },
    addVehicleInState: (state, action) => {
      state.vehicles = [...state.vehicles, action.payload];
    },
    addDriverInState: (state, action) => {
      state.drivers = [...state.drivers, action.payload];
    },
    AddPointerInState: (state, action) => {
      state.pointers = [...state.pointers, action.payload];
    },

    AddSabotierInState: (state, action) => {
      state.sabotiers = [...state.sabotiers, action.payload];
    },

    AddControllerInState: (state, action) => {
      state.controllers = [...state.controllers, action.payload];
    },
    addResponsableInState: (state, action) => {
      state.responsables = [...state.responsables, action.payload];
    },
    addPlageInState: (state, action) => {
      state.plages = [...state.plages, action.payload];
    },
    updateVehicleInState: (state, action) => {
      state.vehicles = state.vehicles.map((vehicle) => {
        if (vehicle.id === action.payload.id) {
          return action.payload;
        }
        return vehicle;
      });
    },
    updatePlageInState: (state, action) => {
      state.plages = state.plages.map((plage) => {
        if (plage.id === action.payload.id) {
          return action.payload;
        }
        return plage;
      });
    },
    updateDriveInState: (state, action) => {
      state.drivers = state.drivers.map((driver) => {
        if (driver.id === action.payload.id) {
          return action.payload;
        }
        return driver;
      });
    },
    updatePointerInState: (state, action) => {
      state.pointers = state.pointers.map((type) => {
        if (type.id === action.payload.id) {
          return action.payload;
        }
        return type;
      });
    },

    updateSabotierInState: (state, action) => {
      state.sabotiers = state.sabotiers.map((type) => {
        if (type.id === action.payload.id) {
          return action.payload;
        }
        return type;
      });
    },

    updateControllerInState: (state, action) => {
      state.controllers = state.controllers.map((type) => {
        if (type.id === action.payload.id) {
          return action.payload;
        }
        return type;
      });
    },
    updateResponsableInState: (state, action) => {
      state.responsables = state.responsables.map((responsable) => {
        if (responsable.id === action.payload.id) {
          return action.payload;
        }
        return responsable;
      });
    },
  },
});

// Export Actions
export const {
  setVehicles,
  setDrivers,
  setSabotiers,
  setControllers,
  setPointers,
  setResponsables,
  setVehiclesHistory,
  deleteVehicle,
  deleteSabotier,
  deleteDriver,
  deleteResponsable,
  deletePointer,
  deleteController,
  addDriverInState,
  AddSabotierInState,
  AddControllerInState,
  addResponsableInState,
  addVehicleInState,
  AddPointerInState,
  updateDriveInState,
  updateControllerInState,
  updateResponsableInState,
  updatePointerInState,
  updateVehicleInState,
  updateSabotierInState,
  setPoliceTowings,
  setPlages,
  deletePlage,
  updatePlageInState,
  addPlageInState,
} = globalSlice.actions;

export default globalSlice.reducer;
