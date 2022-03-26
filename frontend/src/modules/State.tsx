import { createContext, useContext, useReducer } from "react"
import { AuthRoot, Tokens } from "./auth/Auth"
import { User } from "./user/User"



export const actionTypes = {
    SetState: '[SetState] Action',
    Login: '[Login] Action',
    Logout: '[Logout] Action',
    SetUser: '[SetUser] Action',
    ToggleForm: 'ToggleForm',
}
export const AuthFormtypes = {
    Login: '[Login] Form',
    Signup: '[Logout] Signup',
}

export interface Auth {
    Form: string
    visible: Boolean
}

export interface IMainState {
    IsLoggedin: boolean
    AccessToken?: string
    RefreshToken?: string
    User?: User
    Auth: Auth
}

export interface IMainContext {
    State: IMainState,
    ToggleAuthModal: (Formtype?: string) => void
    Login: (Loginpayload: AuthRoot) => void,
    Logout: () => void,
    SetUser: (tokens: Tokens, User: User) => void,
    SetState: (state: IMainState) => void
}

const IntialMainState: IMainState = {
    IsLoggedin: false,
    AccessToken: undefined,
    RefreshToken: undefined,
    User: undefined,
    Auth: {
        Form: AuthFormtypes.Login,
        visible: false
    }

}
const IntialContext: IMainContext = {
    State: IntialMainState,
    ToggleAuthModal: (Formtype?: string) => { },
    Login: (Loginpayload: AuthRoot) => { },
    Logout: () => { },
    SetUser: (tokens: Tokens, User: User) => { },
    SetState: (state: IMainState) => { },
}
export const MainDataContext = createContext<IMainContext>(IntialContext)

const MainStateReducer = (state: IMainState, action: any) => {
    switch (action.type) {
        case actionTypes.ToggleForm: {
            const formtype = action.Formtype
            const newstate: IMainState = {
                ...state,
                Auth: {
                    Form: formtype ? formtype : state.Auth.Form,
                    visible: formtype ? state.Auth.visible : !state.Auth.visible
                }
            }
            return newstate
        }case actionTypes.Login: {
            const RootData: AuthRoot = action.Loginpayload
            const newstate: IMainState = {
                ...state,
                IsLoggedin: true,
                User: RootData.user,
                AccessToken: RootData.tokens.access,
                RefreshToken: RootData.tokens.refresh,
                Auth: {
                    visible: false,
                    Form: "",
                }
            }
            return newstate
        }
        case actionTypes.Logout: {
            return {
                ...IntialMainState,
            }
        }
        case actionTypes.SetUser: {
            const User: User = action.User
            const newstate: IMainState = {
                ...state,
                IsLoggedin: true,
                User: User
            }
            return newstate
        }
        
        default:
            return state;
    }

}

export const MainInit: React.FC = (props: any) => {

    const [MainState, dispatch] = useReducer(MainStateReducer, IntialMainState);

    var value: IMainContext = {
        State: MainState,
        ToggleAuthModal: (Formtype?: string) => {
            dispatch({ type: actionTypes.ToggleForm, Formtype: Formtype })
        },
        Login: (Loginpayload: AuthRoot) => { dispatch({ type: actionTypes.Login, Loginpayload: Loginpayload }) },

        SetUser: (tokens: Tokens, User: User) => { dispatch({ type: actionTypes.SetUser, tokens: tokens, User: User }) },
        SetState: (newstate: IMainState) => { dispatch({ type: actionTypes.SetState, newstate: newstate }); },
        Logout: () => {
            dispatch({ type: actionTypes.Logout })
        },
    }
    return (<MainDataContext.Provider value={value}>
        {props.children}
    </MainDataContext.Provider>)
}
export function UseMainDataContext() {
    return useContext(MainDataContext)
}
