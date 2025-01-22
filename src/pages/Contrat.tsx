import React, { useState } from "react";

const Contrats = () => {
  const [showForm, setShowForm] = useState(false);
  const [contracts, setContracts] = useState<any[]>([]); // Gestion des contrats
  const [editingContract, setEditingContract] = useState<number | null>(null);
  const [newContract, setNewContract] = useState({
    reference: "",
    client: "",
    contractType: "Auto",
    annualAmount: "",
    firstYearCommission: "",
    followingYearsCommission: "",
    fileFee: "",
    recurringFileFee: false,
    startDate: "",
    endDate: "",
    partner: "",
    status: "Actif",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setNewContract({
      ...newContract,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newContract.reference || !newContract.client || !newContract.startDate) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (editingContract !== null) {
      const updatedContracts = [...contracts];
      updatedContracts[editingContract] = newContract;
      setContracts(updatedContracts);
    } else {
      setContracts((prevContracts) => [...prevContracts, newContract]);
    }

    // Réinitialisation
    setShowForm(false);
    setEditingContract(null);
    resetForm();
  };

  const handleEdit = (index: number) => {
    setEditingContract(index);
    setNewContract(contracts[index]);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    const updatedContracts = contracts.filter((_, i) => i !== index);
    setContracts(updatedContracts);
  };

  const resetForm = () => {
    setNewContract({
      reference: "",
      client: "",
      contractType: "Auto",
      annualAmount: "",
      firstYearCommission: "",
      followingYearsCommission: "",
      fileFee: "",
      recurringFileFee: false,
      startDate: "",
      endDate: "",
      partner: "",
      status: "Actif",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">Contrats</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingContract(null);
              resetForm();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            + Nouveau contrat
          </button>
        </header>

        {showForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-999">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative z-999">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">
                  {editingContract !== null ? "Modifier le contrat" : "Nouveau contrat"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✖
                </button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  name="reference"
                  value={newContract.reference}
                  onChange={handleInputChange}
                  placeholder="Référence"
                  className="w-full border rounded-lg p-2 mb-4"
                  required
                />
                <select
                  name="client"
                  value={newContract.client}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 mb-4"
                >
                  <option value="">Sélectionner un client</option>
                  <option value="Dupont Marie (Professionnel)">
                    Dupont Marie (Professionnel)
                  </option>
                  <option value="Jean Paul (Particulier)">Jean Paul (Particulier)</option>
                </select>
                <select
                  name="contractType"
                  value={newContract.contractType}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 mb-4"
                >
                  <option value="Auto">Auto</option>
                  <option value="Habitation">Habitation</option>
                  <option value="Responsabilité civile">Responsabilité civile</option>
                  <option value="Multirisque">Multirisque</option>
                </select>
                <input
                  type="number"
                  name="annualAmount"
                  value={newContract.annualAmount}
                  onChange={handleInputChange}
                  placeholder="Montant annuel (€)"
                  className="w-full border rounded-lg p-2 mb-4"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="firstYearCommission"
                    value={newContract.firstYearCommission}
                    onChange={handleInputChange}
                    placeholder="Commission 1ère année (%)"
                    className="w-full border rounded-lg p-2 mb-4"
                  />
                  <input
                    type="number"
                    name="followingYearsCommission"
                    value={newContract.followingYearsCommission}
                    onChange={handleInputChange}
                    placeholder="Commission années suivantes (%)"
                    className="w-full border rounded-lg p-2 mb-4"
                  />
                </div>
                <input
                  type="number"
                  name="fileFee"
                  value={newContract.fileFee}
                  onChange={handleInputChange}
                  placeholder="Frais de dossier (€)"
                  className="w-full border rounded-lg p-2 mb-4"
                />
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="recurringFileFee"
                    checked={newContract.recurringFileFee}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-700">
                    Frais de dossier récurrents (chaque année)
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    name="startDate"
                    value={newContract.startDate}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2 mb-4"
                    required
                  />
                  <input
                    type="date"
                    name="endDate"
                    value={newContract.endDate}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2 mb-4"
                  />
                </div>
                <select
                  name="partner"
                  value={newContract.partner}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 mb-4"
                >
                  <option value="">Sélectionner un partenaire</option>
                  <option value="AXA Assurances">AXA Assurances</option>
                  <option value="Allianz">Allianz</option>
                </select>
                <select
                  name="status"
                  value={newContract.status}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 mb-4"
                >
                  <option value="Actif">Actif</option>
                  <option value="Inactif">Inactif</option>
                </select>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 w-full"
                >
                  {editingContract !== null ? "Modifier" : "Ajouter"}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Référence</th>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, index) => (
                <tr key={index} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">{contract.reference}</td>
                  <td className="px-4 py-2">{contract.client}</td>
                  <td className="px-4 py-2">{contract.contractType}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="fa-solid fa-pen"></i> {/* Icône Modifier */}
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fa-solid fa-trash"></i> {/* Icône Supprimer */}
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

export default Contrats;
