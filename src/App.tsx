import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Contact from './pages/Contact';
import Contrat from './pages/Contrat';
import Clients from './pages/Client';
import Prospect from './pages/Prospect'; // Correct path for Prospect page
import Partenaire from './pages/Partenaire'; // Correct path for Partenaire page

// Import du ContactsProvider et du PartnerProvider
import { ContactsProvider } from './pages/ContactContext';
import { PartnerProvider } from './pages/PartnerContext'; // Nouveau contexte pour les partenaires

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    // Encapsulation de l'application dans les providers nécessaires
    <ContactsProvider>
      <PartnerProvider>
        <DefaultLayout>
          <Routes>
            <Route
              index
              element={
                <>
                  <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <ECommerce />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <PageTitle title="Contact | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Contact />
                </>
              }
            />
            <Route
              path="/contrat"
              element={
                <>
                  <PageTitle title="Contrat | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Contrat />
                </>
              }
            />
            <Route
              path="/contrat/:contactId"
              element={
                <>
                  <PageTitle title="Créer un contrat | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Contrat />
                </>
              }
            />
            <Route
              path="/clients"
              element={
                <>
                  <PageTitle title="Clients | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Clients />
                </>
              }
            />
            <Route
              path="/prospect"
              element={
                <>
                  <PageTitle title="Prospect | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Prospect />
                </>
              }
            />
            <Route
              path="/partenaire"
              element={
                <>
                  <PageTitle title="Partenaire | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Partenaire />
                </>
              }
            />
            {/* Autres routes inchangées */}
          </Routes>
        </DefaultLayout>
      </PartnerProvider>
    </ContactsProvider>
  );
}

export default App;
