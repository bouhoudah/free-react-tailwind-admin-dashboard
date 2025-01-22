import React, { useState } from "react";
import { usePartners } from "./PartnerContext"; // Importer le contexte

const Partenaires = () => {
  const { partners, addPartner } = usePartners();
  const [showForm, setShowForm] = useState(false);
  const [newPartner, setNewPartner] = useState({
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewPartner({ ...newPartner, [name]: value });
  };

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = partners.length ? partners[partners.length - 1].id + 1 : 1;
    addPartner({ ...newPartner, id: newId });
    setShowForm(false);
    setNewPartner({
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
  };

  const handleEdit = (id: number) => {
    console.log("Modifier partenaire avec ID:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Supprimer partenaire avec ID:", id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">Partenaires</h1>
          <button
            onClick={() => setShowForm(true)}
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
                Nouveau partenaire
              </h2>
              <form
                onSubmit={handleFormSubmit}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-24 border border-dashed rounded-lg flex items-center justify-center bg-gray-50">
                        {newPartner.logo ? (
                          <img
                            src={newPartner.logo}
                            alt="Logo preview"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <span className="text-gray-500 text-sm">📤</span>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="logoUpload"
                          className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-200"
                        >
                          Ajouter logo
                        </label>
                        <input
                          id="logoUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="hidden"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Formats acceptés : JPG, PNG, GIF, SVG, WebP, BMP (max
                          5MB)
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={newPartner.name}
                    onChange={handleInputChange}
                    placeholder="Nom"
                    className="w-full border rounded-lg p-2 mb-4"
                    required
                  />
                  <select
                    name="type"
                    value={newPartner.type}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2 mb-4"
                  >
                    <option value="Assureur">Assureur</option>
                    <option value="Banque">Banque</option>
                    <option value="Habitation">Habitation</option>
                    <option value="Auto">Auto</option>
                    <option value="Responsabilité civile">
                      Responsabilité civile
                    </option>
                    <option value="Multirisque">Multirisque</option>
                  </select>
                  <input
                    type="text"
                    name="website"
                    value={newPartner.website}
                    onChange={handleInputChange}
                    placeholder="Site Web"
                    className="w-full border rounded-lg p-2 mb-4"
                    required
                  />
                  <input
                    type="text"
                    name="intranet"
                    value={newPartner.intranet}
                    onChange={handleInputChange}
                    placeholder="URL Intranet"
                    className="w-full border rounded-lg p-2 mb-4"
                  />
                  <input
                    type="text"
                    name="contact"
                    value={newPartner.contact}
                    onChange={handleInputChange}
                    placeholder="Contact principal"
                    className="w-full border rounded-lg p-2 mb-4"
                  />
                  <input
                    type="email"
                    name="email"
                    value={newPartner.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full border rounded-lg p-2 mb-4"
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    value={newPartner.phone}
                    onChange={handleInputChange}
                    placeholder="Téléphone"
                    className="w-full border rounded-lg p-2 mb-4"
                  />
                  <select
                    name="status"
                    value={newPartner.status}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2 mb-4"
                  >
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 w-full"
                >
                  Ajouter
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Logo</th>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Téléphone</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner.id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt="Logo"
                        className="h-8 w-auto"
                      />
                    ) : (
                      "Aucun logo"
                    )}
                  </td>
                  <td className="px-4 py-2">{partner.name}</td>
                  <td className="px-4 py-2">{partner.type}</td>
                  <td className="px-4 py-2">{partner.contact}</td>
                  <td className="px-4 py-2">{partner.email}</td>
                  <td className="px-4 py-2">{partner.phone}</td>
                  <td className="px-4 py-2">{partner.status}</td>
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
    </div>
  );
};

export default Partenaires;
