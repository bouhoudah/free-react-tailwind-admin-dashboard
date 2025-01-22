import React, { createContext, useState, useContext } from "react";

export type Partner = {
  id: number;
  name: string;
  type: string;
  website: string;
  intranet: string;
  contact: string;
  email: string;
  phone: string;
  status: string;
  logo: string;
};

type PartnerContextType = {
  partners: Partner[];
  addPartner: (partner: Partner) => void;
  updatePartner: (updatedPartner: Partner) => void;
  deletePartner: (id: number) => void;
};

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export const PartnerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [partners, setPartners] = useState<Partner[]>([]);

  // Ajouter un nouveau partenaire
  const addPartner = (partner: Partner) => {
    setPartners((prevPartners) => [...prevPartners, partner]);
  };

  // Mettre à jour un partenaire existant
  const updatePartner = (updatedPartner: Partner) => {
    setPartners((prevPartners) =>
      prevPartners.map((partner) =>
        partner.id === updatedPartner.id ? updatedPartner : partner
      )
    );
  };

  // Supprimer un partenaire
  const deletePartner = (id: number) => {
    setPartners((prevPartners) =>
      prevPartners.filter((partner) => partner.id !== id)
    );
  };

  return (
    <PartnerContext.Provider
      value={{ partners, addPartner, updatePartner, deletePartner }}
    >
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartners = () => {
  const context = useContext(PartnerContext);
  if (!context) {
    throw new Error("usePartners must be used within a PartnerProvider");
  }
  return context;
};
