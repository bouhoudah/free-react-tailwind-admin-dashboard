import React, { useEffect, useState } from "react";
import { useContacts } from "../pages/ContactContext"; // Importer le contexte des contacts

const Clients = () => {
  const { contacts, addContact, updateContact, deleteContact } = useContacts();
  const [clients, setClients] = useState(
    contacts.filter((contact) => contact.status === "client")
  );
  const [showForm, setShowForm] = useState(false);
  const [newClient, setNewClient] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    type: "Particulier",
    status: "client", // Statut par défaut pour un nouveau client
    photo: "",
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const updatedClients = contacts.filter((contact) => contact.status === "client");
    setClients(updatedClients);
  }, [contacts]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setNewClient({ ...newClient, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneRegex = /^\+33\d{9}$/; // Format téléphone
    if (!phoneRegex.test(newClient.phone)) {
      setError("Le numéro de téléphone doit être au format +33XXXXXXXXX.");
      return;
    }

    setError("");
    if (newClient.id) {
      updateContact(newClient);
    } else {
      const newId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;
      addContact({ ...newClient, id: newId });
    }
    setShowForm(false);
    setNewClient({
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      type: "Particulier",
      status: "client",
      photo: "",
    });
    setPhotoPreview(null);
  };

  const handleDelete = (id: number) => {
    deleteContact(id); // Supprimer le contact
  };

  const handleEdit = (id: number) => {
    const clientToEdit = clients.find((client) => client.id === id);
    if (clientToEdit) {
      setNewClient(clientToEdit);
      setPhotoPreview(clientToEdit.photo);
      setShowForm(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">Clients</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            + Nouveau client
          </button>
        </header>

        {showForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-999">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative z-999">
              <header className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">
                  {newClient.id ? "Modifier le client" : "Nouveau client"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✖
                </button>
              </header>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 border rounded-full overflow-hidden bg-gray-200">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Prévisualisation"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="flex items-center justify-center h-full text-gray-500">
                        📷
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ajouter photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Prénom
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={newClient.firstName}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={newClient.lastName}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newClient.email}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={newClient.phone}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                    placeholder="+33XXXXXXXXX"
                    required
                  />
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                </div>
                <div className="flex space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type de contact
                    </label>
                    <select
                      name="type"
                      value={newClient.type}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                    >
                      <option value="Particulier">Particulier</option>
                      <option value="Professionnel">Professionnel</option>
                      <option value="Mixte">Mixte</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Statut
                    </label>
                    <select
                      name="status"
                      value={newClient.status}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                      disabled
                    >
                      <option value="client">Client</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    {newClient.id ? "Modifier" : "Ajouter"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Téléphone</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2 flex items-center gap-2">
                    <img
                      src={client.photo || "https://via.placeholder.com/50"}
                      alt={client.firstName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p>
                        {client.firstName} {client.lastName}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-2">{client.email}</td>
                  <td className="px-4 py-2">{client.phone}</td>
                  <td className="px-4 py-2">{client.type}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(client.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
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

export default Clients;
