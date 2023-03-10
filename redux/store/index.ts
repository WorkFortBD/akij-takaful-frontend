import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../reducers/AuthReducer";
import ProjectReducer from "../reducers/ProjectReducer";
import BranchReducer from "./../reducers/BranchReducer";
import employeeReducer from "../reducers/employee-reducer";
import designationReducer from "../reducers/designation-reducer";
import UnderwritingReducer from "../reducers/underwriting-reducer";
import DashboardReducer from "../reducers/proposal-dashboard-reducer";
import globalReducer from "../reducers/global-reducer";
import ProposalsReducer from "../reducers/proposal-reducer";
import roleReducer from "../reducers/role-reducer";
import StampReducer from "../reducers/stamp-reducer";

export const store = configureStore({
  reducer: {
    proposal    : ProposalsReducer,
    Auth        : AuthReducer,
    Project     : ProjectReducer,
    Branch      : BranchReducer,
    employee    : employeeReducer,
    designation : designationReducer,
    underwriting: UnderwritingReducer,
    global      : globalReducer,
    dashboard   : DashboardReducer,
    stamp       : StampReducer,
    role        : roleReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
