import React, { useState } from "react";
import { useContacts } from "../pages/ContactContext";
import ContactDetails from "../pages/ContactDetails"; // Assurez-vous que le chemin est correct
import { Contact } from "../pages/ContactContext"; // Assurez-vous que le type Contact est exporté correctement

const Contacts = () => {
  const { contacts, addContact, updateContact, deleteContact } = useContacts();
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newContact, setNewContact] = useState<Contact>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    type: "Particulier",
    status: "contact",
    photo: "",
    historique: [
      {
        type: "Création",
        date: new Date().toISOString(),
        description: "Création du contact",
      },
    ],
    contrats: [],
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
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
        setPhotoPreview(reader.result as string);
        setNewContact({ ...newContact, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneRegex = /^\+33\d{9}$/; // Validation du téléphone
    if (!phoneRegex.test(newContact.phone)) {
      setError("Le numéro de téléphone doit être au format +33XXXXXXXXX.");
      return;
    }

    setError("");
    if (editingContact) {
      updateContact({ ...editingContact, ...newContact });
      setEditingContact(null);
    } else {
      const newId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;
      addContact({ ...newContact, id: newId });
    }

    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setNewContact({
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      type: "Particulier",
      status: "contact",
      photo: "",
      historique: [
        {
          type: "Création",
          date: new Date().toISOString(),
          description: "Création du contact",
        },
      ],
      contrats: [],
    });
    setPhotoPreview(null);
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setNewContact(contact);
    setPhotoPreview(contact.photo);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    deleteContact(id);
  };

  const handleAddContract = (contract: any) => {
    if (selectedContact) {
      const updatedContact = {
        ...selectedContact,
        status: "client",
        contrats: [...selectedContact.contrats, contract],
        historique: [
          ...selectedContact.historique,
          {
            type: "Ajout de contrat",
            date: new Date().toISOString(),
            description: `Contrat ajouté : ${contract.type}`,
          },
        ],
      };
      updateContact(updatedContact);
      setSelectedContact(updatedContact);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">Contacts</h1>
          <button
            onClick={() => {
              setShowForm(true);
              resetForm();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            + Nouveau contact
          </button>
        </header>

        {showForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-999">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
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
                    <label className="block text-sm font-medium text-gray-700">
                      Ajouter une photo
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
                      value={newContact.firstName}
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
                      value={newContact.lastName}
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
                    value={newContact.email}
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
                    {editingContact ? "Modifier" : "Ajouter"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDetails && selectedContact && (
          <ContactDetails
            contact={selectedContact}
            onClose={() => setShowDetails(false)}
            onAddContract={handleAddContract}
          />
        )}

        <div className="bg-white rounded-lg shadow mt-8">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Photo</th>
                <th className="px-4 py-2">Prenom </th>
                <th className="px-4 py-2">Nom </th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Téléphone</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">
                    <img
                      src={contact.photo || "https://via.placeholder.com/50"}
                      alt={`${contact.firstName} ${contact.lastName}`}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    {contact.firstName} {contact.lastName}
                  </td>
                  <td className="px-4 py-2">{contact.email}</td>
                  <td className="px-4 py-2">{contact.phone}</td>
                  <td className="px-4 py-2">{contact.type}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowDetails(true);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <button
                      onClick={() => handleEdit(contact)}
                      className="text-green-500 hover:text-green-700"
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
