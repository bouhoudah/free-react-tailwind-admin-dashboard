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
};

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export const PartnerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [partners, setPartners] = useState<Partner[]>([]);

  const addPartner = (partner: Partner) => {
    setPartners((prevPartners) => [...prevPartners, partner]);
  };

  return (
    <PartnerContext.Provider value={{ partners, addPartner }}>
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
