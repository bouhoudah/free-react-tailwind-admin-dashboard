import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Contact } from "../pages/ContactContext"; // Assurez-vous d'utiliser les bons chemins

interface ContactDetailsProps {
  contact: Contact;
  onClose: () => void;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ contact, onClose }) => {
  const [newComment, setNewComment] = useState({
    type: "Autre",
    sujet: "Autre",
    message: "",
  });

  const navigate = useNavigate(); // Hook pour naviguer entre les pages

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.message) {
      alert("Veuillez ajouter un commentaire.");
      return;
    }
    contact.historique.push({
      type: newComment.type,
      date: new Date().toISOString(),
      description: `${newComment.sujet}: ${newComment.message}`,
    });
    setNewComment({ type: "Autre", sujet: "Autre", message: "" });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-999">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
        {/* Header */}
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">Détails du Contact</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </header>

        {/* Contact Details */}
        <div className="flex gap-4 mb-6">
          <img
            src={contact.photo || "https://via.placeholder.com/150"}
            alt={contact.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-bold">{contact.name}</h3>
            <p>Email : {contact.email}</p>
            <p>Téléphone : {contact.phone}</p>
            <p>Statut : {contact.status}</p>
          </div>
        </div>

        {/* Historique */}
        <div className="mb-6">
          <h4 className="font-bold mb-2">Historique</h4>
          <ul className="list-disc pl-5">
            {contact.historique.map((entry, index) => (
              <li key={index}>
                <p>{entry.type}</p>
                <p className="text-sm text-gray-600">
                  {new Date(entry.date).toLocaleString()} - {entry.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Commentaires */}
        <div className="mb-6">
          <h4 className="font-bold mb-2">Commentaires</h4>
          <form onSubmit={handleAddComment} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  name="type"
                  value={newComment.type}
                  onChange={handleCommentChange}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="Autre">Autre</option>
                  <option value="Service">Service</option>
                  <option value="Support">Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sujet
                </label>
                <select
                  name="sujet"
                  value={newComment.sujet}
                  onChange={handleCommentChange}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="Autre">Autre</option>
                  <option value="Problème">Problème</option>
                  <option value="Question">Question</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ajouter un commentaire
              </label>
              <input
                type="text"
                name="message"
                value={newComment.message}
                onChange={handleCommentChange}
                placeholder="Ajoutez votre commentaire..."
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>

        {/* Redirection vers Contrats */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate(`/contrat/${contact.id}`)} // Redirection vers la page Contrat avec l'ID du contact
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            + Nouveau contrat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
