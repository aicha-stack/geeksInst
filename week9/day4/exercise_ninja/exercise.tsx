import React, { useReducer, useContext, createContext, useRef, useEffect } from "react";

// ===================== Exercise 1: Managing User Profile with useReducer =====================
type ProfileStatus = "initial" | "loading" | "success" | "error";

interface Profile {
  name: string;
  bio: string;
}

interface ProfileState {
  status: ProfileStatus;
  profile: Profile | null;
}

type ProfileAction =
  | { type: "LOAD" }
  | { type: "UPDATE"; payload: Profile }
  | { type: "ERROR"; payload: string };

const profileInitialState: ProfileState = {
  status: "initial",
  profile: null,
};

function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
  switch (action.type) {
    case "LOAD":
      return { ...state, status: "loading" };
    case "UPDATE":
      return { status: "success", profile: action.payload };
    case "ERROR":
      return { ...state, status: "error" };
    default:
      return state;
  }
}

const UserProfile: React.FC = () => {
  const [state, dispatch] = useReducer(profileReducer, profileInitialState);

  const updateProfile = () => {
    dispatch({ type: "LOAD" });
    setTimeout(() => {
      try {
        const profile: Profile = { name: "Alice", bio: "Web Developer" };
        dispatch({ type: "UPDATE", payload: profile });
      } catch {
        dispatch({ type: "ERROR", payload: "Failed to update" });
      }
    }, 1000);
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>Status: {state.status}</p>
      {state.profile && <p>Name: {state.profile.name}, Bio: {state.profile.bio}</p>}
      <button onClick={updateProfile}>Update Profile</button>
    </div>
  );
};

// ===================== Exercise 2: Managing Survey Feedback =====================
type SurveyStatus = "initial" | "submitting" | "completed";

interface SurveyState {
  status: SurveyStatus;
  feedback: string;
}

type SurveyAction =
  | { type: "START" }
  | { type: "SUBMIT"; payload: string }
  | { type: "RESET" };

const surveyInitialState: SurveyState = { status: "initial", feedback: "" };

function surveyReducer(state: SurveyState, action: SurveyAction): SurveyState {
  switch (action.type) {
    case "START":
      return { ...state, status: "submitting" };
    case "SUBMIT":
      return { status: "completed", feedback: action.payload };
    case "RESET":
      return surveyInitialState;
    default:
      return state;
  }
}

const SurveyForm: React.FC = () => {
  const [state, dispatch] = useReducer(surveyReducer, surveyInitialState);

  return (
    <div>
      <h2>Survey Feedback</h2>
      <p>Status: {state.status}</p>
      {state.status === "submitting" && (
        <>
          <input
            value={state.feedback}
            onChange={(e) => dispatch({ type: "SUBMIT", payload: e.target.value })}
            placeholder="Your feedback"
          />
        </>
      )}
      <button onClick={() => dispatch({ type: "START" })}>Start Survey</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      {state.status === "completed" && <p>Feedback: {state.feedback}</p>}
    </div>
  );
};

// ===================== Exercise 3: Managing Form State =====================
interface FormFields {
  name: string;
  email: string;
  message: string;
}

type FormAction =
  | { type: "UPDATE_FIELD"; field: keyof FormFields; value: string }
  | { type: "RESET_FORM" };

const formInitialState: FormFields = { name: "", email: "", message: "" };

function formReducer(state: FormFields, action: FormAction): FormFields {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return formInitialState;
    default:
      return state;
  }
}

const ContactForm: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, formInitialState);

  return (
    <div>
      <h2>Contact Form</h2>
      <input
        placeholder="Name"
        value={state.name}
        onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "name", value: e.target.value })}
      />
      <input
        placeholder="Email"
        value={state.email}
        onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "email", value: e.target.value })}
      />
      <textarea
        placeholder="Message"
        value={state.message}
        onChange={(e) =>
          dispatch({ type: "UPDATE_FIELD", field: "message", value: e.target.value })
        }
      />
      <button onClick={() => dispatch({ type: "RESET_FORM" })}>Reset</button>
      <p>Current State: {JSON.stringify(state)}</p>
    </div>
  );
};

// ===================== Exercise 4: Global State with useContext =====================
interface Contact {
  id: number;
  name: string;
}

type ContactState = { contacts: Contact[] };
type ContactAction =
  | { type: "ADD_CONTACT"; payload: Contact }
  | { type: "REMOVE_CONTACT"; payload: number };

const ContactContext = createContext<{
  state: ContactState;
  dispatch: React.Dispatch<ContactAction>;
} | null>(null);

const contactInitialState: ContactState = { contacts: [] };

function contactReducer(state: ContactState, action: ContactAction): ContactState {
  switch (action.type) {
    case "ADD_CONTACT":
      return { contacts: [...state.contacts, action.payload] };
    case "REMOVE_CONTACT":
      return { contacts: state.contacts.filter(c => c.id !== action.payload) };
    default:
      return state;
  }
}

const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, contactInitialState);
  return <ContactContext.Provider value={{ state, dispatch }}>{children}</ContactContext.Provider>;
};

const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) throw new Error("useContacts must be used within a ContactProvider");
  return context;
};

const ContactList: React.FC = () => {
  const { state, dispatch } = useContacts();
  return (
    <div>
      <h2>Contacts</h2>
      <button
        onClick={() =>
          dispatch({ type: "ADD_CONTACT", payload: { id: Date.now(), name: "New Contact" } })
        }
      >
        Add Contact
      </button>
      <ul>
        {state.contacts.map(c => (
          <li key={c.id}>
            {c.name} <button onClick={() => dispatch({ type: "REMOVE_CONTACT", payload: c.id })}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ===================== Exercise 5: Managing DOM Elements with useRef =====================
const FocusInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div>
      <h2>Focus Input</h2>
      <input ref={inputRef} placeholder="Focus me" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
};

// ===================== App Component =====================
const App: React.FC = () => {
  return (
    <ContactProvider>
      <div>
        <UserProfile />
        <SurveyForm />
        <ContactForm />
        <ContactList />
        <FocusInput />
      </div>
    </ContactProvider>
  );
};

export default App;
