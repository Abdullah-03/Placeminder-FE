import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationInterface {
    name: string;
    coordinates: string;
    radius: number;
    tasks: string[];
}
export interface LocationsInterface {
    locations: LocationInterface[];
    error: string | null;
}

const initialState: LocationsInterface = {
    locations: [
        {
            name: '',
            coordinates: '',
            radius: 1,
            tasks: [],
        },
    ],
    error: null,
};

export const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        addLocation: (state, action: PayloadAction<LocationInterface>) => {
            const exists = state.locations.some((location) => location.name === action.payload.name);
            if (!exists) {
                state.locations.push(action.payload);
                state.error = null;
            } else {
                state.error = 'Location with this name already exists.';
            }
        },
        removeLocation: (state, action: PayloadAction<string>) => {
            state.locations = state.locations.filter((location) => location.name !== action.payload);
            state.error = null;
        },
        updateLocation: (state, action: PayloadAction<string>) => {
            const i = state.locations.findIndex((l) => l.name === action.payload);
            if (i !== -1) {
                state.locations[i].name = action.payload;
                state.error = null;
            } else {
                state.error = 'Given location name does not exist';
            }
        },

        addTask: (state, action: PayloadAction<{ locationName: string; taskName: string }>) => {
            const i = state.locations.findIndex((l) => l.name === action.payload.locationName);
            if (i !== -1) {
                const j = state.locations[i].tasks.findIndex((t) => t === action.payload.taskName);
                if (j === -1) {
                    state.locations[i].tasks.push(action.payload.taskName);
                    state.error = null;
                } else {
                    state.error = 'Given task already exists';
                }
            } else {
                state.error = 'Given location name does not exist';
            }
        },
        removeTask: (state, action: PayloadAction<{ locationName: string; taskName: string }>) => {
            const i = state.locations.findIndex((l) => l.name === action.payload.locationName);
            if (i !== -1) {
                const j = state.locations[i].tasks.findIndex((t) => t === action.payload.taskName);
                if (j !== -1) {
                    state.locations[i].tasks.splice(j, 1);
                    state.error = null;
                } else {
                    state.error = 'Given task does not exist';
                }
            } else {
                state.error = 'Given location name does not exist';
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { addLocation, removeLocation, updateLocation, addTask, removeTask, clearError } = locationsSlice.actions;
export default locationsSlice.reducer;
