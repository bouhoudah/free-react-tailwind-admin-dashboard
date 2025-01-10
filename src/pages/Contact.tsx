// Contacts.js
import React, { useState } from "react";
import { useContacts } from "../pages/ContactContext"; // Importer le contexte
import { Contact } from "../pages/ContactContext"; // Mettez le chemin correct

const Contacts = () => {
  const { contacts, addContact, updateContact, deleteContact } = useContacts();
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [newContact, setNewContact] = useState<Contact>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    type: "Particulier",
    status: "contact", // Par défaut pour un nouveau contact
    photo: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewContact({ ...newContact, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneRegex = /^\+33\d{9}$/; // Format téléphone
    if (!phoneRegex.test(newContact.phone)) {
      setError("Le numéro de téléphone doit être au format +33XXXXXXXXX.");
      return;
    }

    setError(""); // Réinitialiser les erreurs
    if (editingContact) {
      updateContact(newContact); // Modifier un contact existant
      setEditingContact(null);
    } else {
      const newId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;
      addContact({ ...newContact, id: newId }); // Ajouter un nouveau contact
    }

    setShowForm(false);
    setNewContact({
      id: 0,
      name: "",
      email: "",
      phone: "",
      type: "Particulier",
      status: "contact",
      photo: "",
    });
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setNewContact(contact);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    deleteContact(id);
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
              setNewContact({
                id: 0,
                name: "",
                email: "",
                phone: "",
                type: "Particulier",
                status: "contact",
                photo: "",
              });
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            + Nouveau contact
          </button>
        </header>

        {showForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <header className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">
                  {editingContact ? "Modifier le contact" : "Nouveau contact"}
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
                    {newContact.photo ? (
                      <img
                        src={newContact.photo}
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
                      Photo
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
                      Nom
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newContact.name}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newContact.email}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={newContact.phone}
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
                      value={newContact.type}
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
                      value={newContact.status}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                    >
                      <option value="contact">Contact</option>
                      <option value="prospect">Prospect</option>
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
                    {editingContact ? "Modifier" : "Créer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow mt-8">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Photo</th>
                <th className="px-4 py-2">Nom</th>
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
                  <td className="px-4 py-2">
                    <img
                      src={contact.photo || "https://via.placeholder.com/50"}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">{contact.name}</td>
                  <td className="px-4 py-2">{contact.email}</td>
                  <td className="px-4 py-2">{contact.phone}</td>
                  <td className="px-4 py-2">{contact.type}</td>
                  <td className="px-4 py-2">{contact.status}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(contact)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
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

export default Contacts;
