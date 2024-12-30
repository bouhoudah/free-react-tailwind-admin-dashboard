import React, { useState } from "react";

const Contacts = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Marie Bernard",
      email: "marie.bernard@orange.fr",
      phone: "0577371706",
      type: "Particulier",
      status: "prospect",
      photo: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Thomas Dupont",
      email: "thomas.dupont@entreprise.fr",
      phone: "0300365867",
      type: "Mixte (Pro & Part)",
      status: "prospect",
      photo: "https://via.placeholder.com/50",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Particulier",
    status: "prospect",
    photo: "",
  });

  // Gérer les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  // Ajouter ou modifier un contact
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editingContact) {
      // Modifier un contact existant
      setContacts(
        contacts.map((contact) =>
          contact.id === editingContact.id
            ? { ...newContact, id: editingContact.id }
            : contact
        )
      );
    } else {
      // Ajouter un nouveau contact
      const newId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;
      setContacts([...contacts, { ...newContact, id: newId }]);
    }

    // Réinitialiser le formulaire et fermer
    setShowForm(false);
    setEditingContact(null);
    setNewContact({
      name: "",
      email: "",
      phone: "",
      type: "Particulier",
      status: "prospect",
      photo: "",
    });
  };

  // Supprimer un contact
  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  // Ouvrir le formulaire pour modifier un contact
  const editContact = (contact) => {
    setEditingContact(contact);
    setNewContact(contact);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">Contacts</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingContact(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            + Nouveau contact
          </button>
        </header>

        {/* Formulaire pour ajouter ou modifier un contact */}
        {showForm && (
          <form
            className="bg-gray-50 p-6 rounded-lg shadow mb-6"
            onSubmit={handleFormSubmit}
          >
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              {editingContact ? "Modifier le contact" : "Ajouter un nouveau contact"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom :
                </label>
                <input
                  type="text"
                  name="name"
                  value={newContact.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email :
                </label>
                <input
                  type="email"
                  name="email"
                  value={newContact.email}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Téléphone :
                </label>
                <input
                  type="text"
                  name="phone"
                  value={newContact.phone}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type :
                </label>
                <select
                  name="type"
                  value={newContact.type}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 mt-1"
                >
                  <option value="Particulier">Particulier</option>
                  <option value="Professionnel">Professionnel</option>
                  <option value="Mixte">Mixte</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Statut :
                </label>
                <select
                  name="status"
                  value={newContact.status}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 mt-1"
                >
                  <option value="prospect">Prospect</option>
                  <option value="client">Client</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo (URL) :
                </label>
                <input
                  type="text"
                  name="photo"
                  value={newContact.photo}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {editingContact ? "Modifier" : "Ajouter"}
              </button>
            </div>
          </form>
        )}

        {/* Contacts Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Téléphone</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2 flex items-center gap-2">
                    <img
                      src={contact.photo || "https://via.placeholder.com/50"}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full"
                    />
                    {contact.name}
                  </td>
                  <td className="px-4 py-2">{contact.email}</td>
                  <td className="px-4 py-2">{contact.phone}</td>
                  <td className="px-4 py-2">{contact.type}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        contact.status === "client"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => editContact(contact)}
                      className="text-blue-600 hover:underline"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="text-red-600 hover:underline"
                    >
                      🗑️
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

export default Contacts;
