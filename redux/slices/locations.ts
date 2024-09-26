import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
    locations: [],
    error: null,
};

function findLocation(locations: LocationInterface[], locationName: string): [number, string | null] {
    const index = locations.findIndex(location => location.name === locationName);
    return index !== -1 ? [index, null] : [-1, 'Location does not exist'];
}

function findTask(locations: LocationInterface[], locationName: string, taskName: string): [number, number | null, string | null] {
    const locationIndex = locations.findIndex(location => location.name === locationName);
    if (locationIndex === -1) return [-1, null, 'Location does not exist'];

    const taskIndex = locations[locationIndex].tasks.indexOf(taskName);
    if (taskIndex === -1) return [locationIndex, -1, 'Task does not exist'];

    return [locationIndex, taskIndex, null];
}

export const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        addLocation: (state, action: PayloadAction<LocationInterface>) => {
            const [locationIndex] = findLocation(state.locations, action.payload.name);
            if (locationIndex !== -1) {
                state.error = 'Location with this name already exists.';
            } else {
                state.locations.push(action.payload);
                state.error = null;
            }
        },
        removeLocation: (state, action: PayloadAction<string>) => {
            const [locationIndex, error] = findLocation(state.locations, action.payload);
            if (error) {
                state.error = error;
            } else {
                state.locations.splice(locationIndex, 1);
                state.error = null;
            }
        },
        updateLocation: (state, action: PayloadAction<{
            prevLocation: LocationInterface,
            newLocation: LocationInterface
        }>) => {
            const [locationIndex, error] = findLocation(state.locations, action.payload.prevLocation.name);
            if (error) {
                state.error = error;
            } else {
                state.locations[locationIndex] = action.payload.newLocation;
                state.error = null;
            }
        },

        addTask: (state, action: PayloadAction<{ locationName: string; taskName: string }>) => {
            const [locationIndex, taskIndex] = findTask(state.locations, action.payload.locationName, action.payload.taskName);
            if (locationIndex === -1) {
                state.error = 'Location does not exist';
            } else if (taskIndex !== -1) {
                state.error = 'Task already exists';
            } else {
                state.locations[locationIndex].tasks.push(action.payload.taskName);
                state.error = null;
            }
        },
        removeTask: (state, action: PayloadAction<{ locationName: string; taskName: string }>) => {
            const [locationIndex, taskIndex, error] = findTask(state.locations, action.payload.locationName, action.payload.taskName);
            if (error) {
                state.error = error;
            } else {
                state.locations[locationIndex].tasks = state.locations[locationIndex].tasks.filter((_, index) => index !== taskIndex);
                state.error = null;
            }
        },
        updateTask: (state, action: PayloadAction<{
            locationName: string;
            prevTaskName: string,
            newTaskName: string
        }>) => {
            const [locationIndex, taskIndex, error] = findTask(state.locations, action.payload.locationName, action.payload.prevTaskName);
            if (error) {
                state.error = error;
            } else {
                // @ts-ignore
                state.locations[locationIndex].tasks[taskIndex] = action.payload.newTaskName;
                state.error = null;
            }
        },

        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    addLocation,
    removeLocation,
    updateLocation,
    addTask,
    removeTask,
    updateTask,
    clearError
} = locationsSlice.actions;
export default locationsSlice.reducer;
