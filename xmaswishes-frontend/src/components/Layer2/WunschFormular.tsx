import React, { useState } from 'react';

const WunschFormular: React.FC = () => {
  const [formData, setFormData] = useState({
    vorname: '',
    wunsch: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Um den Status der Anfrage zu verfolgen
  const [message, setMessage] = useState<string | null>(null); // Für Erfolgs- oder Fehlermeldungen

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Anfrage wird gestartet
    setMessage(null); // Vorherige Nachrichten zurücksetzen

    try {
      const response = await fetch('/api/wunsch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Dein Wunsch wurde erfolgreich gesendet!');
        setFormData({ vorname: '', wunsch: '' }); // Formular zurücksetzen
      } else {
        setMessage('Etwas ist schiefgelaufen. Bitte versuche es erneut.');
      }
    } catch (error) {
      console.error('Fehler beim Senden:', error);
      setMessage('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
    } finally {
      setIsSubmitting(false); // Anfrage beendet
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="vorname" className="block text-sm font-medium text-gray-700">
          Vorname
        </label>
        <input
          type="text"
          id="vorname"
          name="vorname"
          value={formData.vorname}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="wunsch" className="block text-sm font-medium text-gray-700">
          Wunsch
        </label>
        <textarea
          id="wunsch"
          name="wunsch"
          value={formData.wunsch}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          rows={4}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full inline-flex justify-center rounded-md py-2 px-4 font-medium shadow-sm ${
          isSubmitting
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
        }`}
      >
        {isSubmitting ? 'Wird gesendet...' : 'Abschicken'}
      </button>

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-gray-700">{message}</p>
      )}
    </form>
  );
};

export default WunschFormular;
