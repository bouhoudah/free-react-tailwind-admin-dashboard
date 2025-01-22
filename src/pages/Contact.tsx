import React, { useState } from "react";
import { usePartners } from "./PartnerContext"; // Importer le contexte

const Partenaires = () => {
  const { partners, addPartner, updatePartner, deletePartner } = usePartners(); // Contexte
  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState<number | null>(null);
  const [newPartner, setNewPartner] = useState({
    id: 0,
    name: "",
    type: "Assureur",
    website: "",
    intranet: "",
    contact: "",
    email: "",
    phone: "",
    status: "Actif",
    logo: "",
  });

  // Gestion des changements de formulaire
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewPartner({ ...newPartner, [name]: value });
  };

  // Gestion de l'image du logo
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPartner({ ...newPartner, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Soumission du formulaire
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPartner !== null) {
      // Modifier un partenaire existant
      updatePartner({ ...newPartner, id: editingPartner });
    } else {
      // Ajouter un nouveau partenaire
      const newId = partners.length ? partners[partners.length - 1].id + 1 : 1;
      addPartner({ ...newPartner, id: newId });
    }
    resetForm();
    setShowForm(false);
  };

  // Modification d'un partenaire
  const handleEdit = (id: number) => {
    const partnerToEdit = partners.find((partner) => partner.id === id);
    if (partnerToEdit) {
      setNewPartner(partnerToEdit);
      setEditingPartner(id);
      setShowForm(true);
    }
  };

  // Suppression d'un partenaire
  const handleDelete = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce partenaire ?")) {
      deletePartner(id);
    }
  };

  // Réinitialisation du formulaire
  const resetForm = () => {
    setNewPartner({
      id: 0,
      name: "",
      type: "Assureur",
      website: "",
      intranet: "",
      contact: "",
      email: "",
      phone: "",
      status: "Actif",
      logo: "",
    });
    setEditingPartner(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">Partenaires</h1>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            + Nouveau partenaire
          </button>
        </header>

        {showForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-999">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full max-w-md overflow-y-auto relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
              <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
                {editingPartner !== null ? "Modifier partenaire" : "Nouveau partenaire"}
              </h2>
              <form onSubmit={handleFormSubmit}>
                {/* Formulaire */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="mb-4"
                  />
                  <input
                    type="text"
                    name="name"
                    value={newPartner.name}
                    onChange={handleInputChange}
                    placeholder="Nom"
                    className="w-full border rounded-lg p-2 mb-4"
                    required
                  />
                  {/* Autres champs */}
                  {/* ... */}
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 w-full"
                  >
                    {editingPartner !== null ? "Modifier" : "Ajouter"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Logo</th>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">
                  {partner.logo && (
                    <img
                      src={partner.logo}
                      alt="Logo partenaire"
                      className="h-10 w-10"
                    />
                  )}
                </td>
                <td className="px-4 py-2">{partner.name}</td>
                <td className="px-4 py-2">{partner.type}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(partner.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(partner.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Partenaires;
