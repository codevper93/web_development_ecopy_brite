import { AppRouting } from "./core/components/AppRouting";
import { AuthUserProvider } from "./core/components/_hooks/_Context/AuthUserContext";
import { ModalAppProvider } from "./core/components/_hooks/_Context/ModalAppContext";

import './core/assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return <>
    <AuthUserProvider>
      <ModalAppProvider>
        <AppRouting />
      </ModalAppProvider>
    </AuthUserProvider>
  </>;
}

export default App;
