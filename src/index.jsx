import { createRoot } from 'react-dom/client';
import MainView from './components/main-view/main-view';
import { Container } from 'react-bootstrap';
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { LoadingView } from './components/loading-view/loading-view';
// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MoonFlixApplication = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<LoadingView />} persistor={persistor}>
          <Container>
            <MainView />
          </Container>
        </PersistGate>
      </Provider>
    </>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MoonFlixApplication />);