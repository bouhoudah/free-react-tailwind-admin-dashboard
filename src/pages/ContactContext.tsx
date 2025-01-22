import React, { createContext, useState, useContext } from "react";


// Type des contacts
// Type des contacts
export interface Contact {
    id: number;
    name: string;
    company?: string; // Ajout de la propriété company (optionnelle)
    email: string;
    phone: string;
    type: string;
    status: string;
    photo: string;
  }
  export interface Contract {
    id: number;
    type: string;
    montantAnnuel: number;
    dateDebut: string;
    dateFin: string;
  }
  

// Type du contexte
interface ContactsContextProps {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  updateContact: (updatedContact: Contact) => void;
  deleteContact: (id: number) => void;
}

// Création du contexte
const ContactsContext = createContext<ContactsContextProps | undefined>(undefined);

// Provider
export const ContactsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Ajouter un contact
  const addContact = (contact: Contact) => {
    setContacts((prevContacts) => [...prevContacts, contact]);
  };

  // Mettre à jour un contact
  const updateContact = (updatedContact: Contact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  // Supprimer un contact
  const deleteContact = (id: number) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  return (
    <ContactsContext.Provider value={{ contacts, addContact, updateContact, deleteContact }}>
      {children}
    </ContactsContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
};
